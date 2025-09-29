#This script:
#1. Connects to your Supabase/Postgres database.
#2. Retrieves distinct asset names from the `holdings` table
#   that do not yet have an associated logo.
#3. Calls the Brandfetch API to fetch the logo for each asset.
#4. Inserts/updates the logo into a separate `logos` table
#   (linked via foreign key), or directly updates the holdings table.
#""" gemini-2.5-flash
import os
from dotenv import load_dotenv
import requests
import pandas as pd
import time
from openai import OpenAI
from google import genai
from pydantic import BaseModel

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print("Loaded GEMINI key:", api_key)
client = genai.Client(api_key=api_key)

#client = OpenAI()

llm_batch_size = 100

class CompanyInfo(BaseModel):
    original_name: str   
    domain: str | None
    parsed_name: str | None
    sector: str | None
    country: str | None
    description: str | None

class CompanyBatch(BaseModel):
    companies: list[CompanyInfo]

class CompanyInfo2(BaseModel):
    original_name: str   
    domain: str | None
    parsed_name: str | None

class CompanyBatch2(BaseModel):
    companies: list[CompanyInfo2]

cache = {}

def fetch_logos(df):

    df["Domain"] = None 
    df["Parsed_Name"] = None
    df["Sector"] = None 
    df["Description"] = None 

    mask = df["Listing_Status"].str.fullmatch("Listed", case=False, na=False)
       
    equities = df.loc[mask].sort_values("Weighting_Percentage_Clean", ascending=False)

    message_instruction1 = """
        Return a JSON array with fields: original_name, domain, parsed_name, sector, country, description.

        Rules:
        - original_name = echo back the company name exactly as given in input.
        - parsed_name = common short name ("JPMorgan Chase & Co" → "JPMorgan").
        - domain = main website domain: no https, no www ("Apple inc" → "apple.com").
        - sector = broad industry.
        - country = HQ country.
        - description = very short (≤12 words), plain English and neutral.
        - If unsure return null.

        Examples:
        Input: "Novo Nordisk A/S"
        Output: {"original_name": "Novo Nordisk A/S", "domain": "novonordisk.com", 
        "parsed_name": "Novo Nordisk", "sector": "Pharmaceuticals", "country": "Denmark", 
        "description": "Global diabetes and obesity drug maker"}

        Input: "Prudential Financial Inc"
        Output: {"original_name": "Prudential Financial Inc", "domain": "prudential.com", 
        "parsed_name": "Prudential Financial", "sector": "Insurance", "country": "United States", 
        "description": "Large US life and retirement insurer"}
    """

    message_instruction2 = """
        Return a JSON array with fields: original_name, domain, parsed_name, sector, country, description.

        Rules:
        - original_name = echo back the company name exactly as given in input.
        - parsed_name = common short name ("JPMorgan Chase & Co" → "JPMorgan").
        - domain = main website domain: no https, no www ("Apple inc" → "apple.com").
        - If unsure return null.

        Examples:
        Input: "Novo Nordisk A/S"
        Output: {"original_name": "Novo Nordisk A/S", "domain": "novonordisk.com", 
        "parsed_name": "Novo Nordisk"}

        Input: "Prudential Financial Inc"
        Output: {"original_name": "Prudential Financial Inc", "domain": "prudential.com", 
        "parsed_name": "Prudential Financial"}
    """

    start_time = time.time()

    for i in range(0, len(equities), llm_batch_size):
        batch_start = time.time()
        batch = equities.iloc[i:i+llm_batch_size]

        names = []
        indexes = []

        # Collect names for this batch
        for idx, row in batch.iterrows():
            name = row["Name"].strip()
            if name in cache:
                df.loc[idx, "Parsed_Name"] = cache[name]["parsed_name"]
                df.loc[idx, "Sector"] = cache[name]["sector"]
                df.loc[idx, "Description"] = cache[name]["description"]
                df.loc[idx, "Domain"] = cache[name]["domain"]
                print(f"Cache hit: {name}")
            else:
                names.append(name)
                indexes.append(idx)

        # 🔑 only call Gemini once per batch
        if not names:
            continue

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    {"role": "user", "parts": [{"text": message_instruction2}]},
                    {"role": "user", "parts": [{"text": ", ".join(names)}]},
                ],
                config={
                    "response_mime_type": "application/json",
                    "response_schema": list[CompanyInfo2],
                },
            )

            Companies: list[CompanyInfo2] = response.parsed


            for company, idx in zip(Companies, indexes):
                if company.original_name and company.original_name.strip().lower() == df.loc[idx, "Name"].strip().lower():
                    df.loc[idx, "Parsed_Name"] = company.parsed_name
                    df.loc[idx, "Sector"] = getattr(company, "sector", None)
                    df.loc[idx, "Description"] = getattr(company, "description", None)

                if company.domain:
                    df.loc[idx, "Domain"] = company.domain
                elif company.parsed_name:
                    brandfetch(df, company.parsed_name, idx)

                cache[company.original_name.strip()] = {
                    "parsed_name": company.parsed_name,
                    "sector": getattr(company, "sector", None),
                    "description": getattr(company, "description", None),
                    "domain": company.domain,
                }

                print(company.original_name + " completed")

        except Exception as e:
            print("error:" + str(e))

        batch_time = time.time() - batch_start
        total_time = time.time() - start_time
        print(f"Batch {i//llm_batch_size + 1} took {batch_time:.2f}s "
            f"(total {total_time/60:.1f}m so far)")

    return df

            

def fetch_super_holdings():
    os.chdir("data")
    root_directory = os.getcwd()

    for super_fund in os.listdir(root_directory):
        print("Stating: " + super_fund)
        if not os.path.isdir(super_fund):
            continue
        os.chdir(super_fund)
        if os.path.exists("Normalised"):
            os.chdir("Normalised")
            current_directory = os.getcwd()
            for holdings_file in os.listdir(current_directory):
                print("Stating: " + holdings_file + " from: " + super_fund)
                if holdings_file.endswith(".csv"):
                    df = pd.read_csv(holdings_file)
                    df = fetch_logos(df) 
                    df.to_csv(holdings_file, index=False)
                print("Finishing: " + holdings_file + " from: " + super_fund)
            os.chdir("..")
        os.chdir(root_directory)
        print("Finishing: " + super_fund)


def brandfetch(df, parsed_name, idx):
    api_key = os.getenv("BRANDFETCH_API_KEY")
    url = f"https://api.brandfetch.io/v2/search/{parsed_name}"
    headers = {"Authorization": f"Bearer {api_key}"}
    res = requests.get(url, headers=headers).json()
    print(res)
    if isinstance(res, list) and len(res) > 0: 
        df.loc[idx, "Domain"] = str(res[0]["domain"])
        print(df.loc[idx, "Domain"])
    else:
        print("error")
        time.sleep(0.5)
    return df

fetch_super_holdings()
