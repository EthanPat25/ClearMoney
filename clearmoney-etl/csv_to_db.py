#This script:
#1. Connects to your Supabase/Postgres database.
#2. Retrieves distinct asset names from the `holdings` table
#   that do not yet have an associated logo.
#3. Calls the Brandfetch API to fetch the logo for each asset.
#4. Inserts/updates the logo into a separate `logos` table
#   (linked via foreign key), or directly updates the holdings table.
#"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import requests
import pandas as pd
import numpy as np


load_dotenv()

def connect_Supabase():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    return supabase

def upload_all_holdings():
    supabase = connect_Supabase()

    os.chdir("data")
    root_directory = os.getcwd()

    for super_fund in os.listdir(root_directory):
        if not os.path.isdir(super_fund):
            continue
        os.chdir(super_fund)
        if os.path.exists("Normalised"):
            os.chdir("Normalised")
            current_directory = os.getcwd()
            for holdings_file in os.listdir(current_directory):
                if holdings_file.endswith(".csv"):
                    df = pd.read_csv(holdings_file)
                    insert_holdings_to_db(df, supabase)
            os.chdir("..")
        os.chdir(root_directory)


def insert_holdings_to_db(df, supabase):
    df = df.replace({np.nan: None, np.inf: None, -np.inf: None})

    payload = df.to_dict(orient="records")
    response = (
        supabase
        .table("Holdings")
        .insert(payload)
        .execute()
    )

    print(response)


upload_all_holdings()
