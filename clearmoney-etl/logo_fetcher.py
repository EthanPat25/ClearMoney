#This script:
#1. Connects to your Supabase/Postgres database.
#2. Retrieves distinct asset names from the `holdings` table
#   that do not yet have an associated logo.
#3. Calls the Brandfetch API to fetch the logo for each asset.
#4. Inserts/updates the logo into a separate `logos` table
#   (linked via foreign key), or directly updates the holdings table.
#"""
import os
#from supabase import create_client, Client
from dotenv import load_dotenv
import requests
import pandas as pd
import time

load_dotenv()
api_key = os.getenv("BRANDFETCH_API_KEY")

def fetch_logos(df):
    df["Domain"] = None  # ✅ Create this first

    # Create a mask for listed equities
    mask = df["Listing_Status"].str.contains("Listed", case=False, na=False) & \
        df["Asset_Class"].str.contains("Equity", case=False, na=False)

    # Filter dataframe
    top_50_equities = df.loc[mask].sort_values("Weighting_Percentage_Clean", ascending=False).head(120)

    for index, row in top_50_equities.iterrows():
        name = row["Name"] 

        if name == "BHP":
            df.loc[index, "Domain"] = "bhp.com"
        elif name == "Meta":
            df.loc[index, "Domain"] = "meta.com"
        else:
            url = f"https://api.brandfetch.io/v2/search/{name}"
            headers = {"Authorization": f"Bearer {api_key}"}
            res = requests.get(url, headers=headers).json()
            print(res)
            if isinstance(res, list) and len(res) > 0: 
                df.loc[index, "Domain"] = str(res[0]["domain"])
                print(df.loc[index, "Domain"])
            else:
                print("error")
            time.sleep(1.5)
    return df

#def fetch_test():
#    url = "https://api.brandfetch.io/v2/search/APPLE"
#    headers = {"Authorization": f"Bearer {api_key}"}
#    res = requests.get(url, headers=headers).json()
#    return str(res[0]["domain"])

#def connect_Supabase():
#    url: str = os.environ.get("SUPABASE_URL")
#    key: str = os.environ.get("SUPABASE_KEY")
#    supabase: Client = create_client(url, key)
#
#    response = (
#        supabase
#            .table("SuperFunds")   
#            .select("fund_name, asset_name, asset_class")
#            .eq("asset_class", "list_Equity")      
#           .execute()        
#    )

def fetch_super_holdings():
    # Go into data folder
    os.chdir("data")
    root_directory = os.getcwd()

    for super_fund in os.listdir(root_directory):
        print("Stating: " + super_fund)
        if not os.path.isdir(super_fund):
            continue  # skip non-directories like .DS_Store
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

fetch_super_holdings()
