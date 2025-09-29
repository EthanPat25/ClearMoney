import pandas as pd
from abc import ABC, abstractmethod
import os

def run_all_parsers():
    os.chdir("data")
    root_directory = os.getcwd()
    for super_fund_directory in os.listdir(root_directory):
        if not os.path.isdir(super_fund_directory):
            continue
        os.chdir(super_fund_directory)
        if os.path.exists("Raw"):
            os.chdir("Raw")
            current_directory = os.getcwd()
            for raw_data_file in os.listdir(current_directory):
                raw_data_path = os.path.join(current_directory, raw_data_file)
                normalized_directory = os.path.join(current_directory, "..", "Normalised")
                create_fund_parser(super_fund_directory, raw_data_path, normalized_directory)
        os.chdir(root_directory)


def create_fund_parser(fund_name: str, file_path, output_directory):
    if fund_name == "AustralianSuper":
        FundParser = AustralianSuper(file_path)          
        FundParser.parse() 
        FundParser.remove_totals()
        FundParser.remove_derivatives()
        FundParser.normalise_company_names()
        FundParser.normalise_percentage()
        FundParser.normalise_dollar()
        FundParser.recompute_percentages()
        FundParser.save_to_normalized_file(output_directory)
        print(fund_name + " " + os.path.splitext(os.path.basename(file_path))[0] + ": Completed")
    elif fund_name == "Rest":
        FundParser = Rest(file_path)
        FundParser.parse() 
        FundParser.remove_totals()
        FundParser.normalise_company_names()
        FundParser.normalise_percentage()
        FundParser.normalise_dollar()
        FundParser.recompute_percentages()
        FundParser.save_to_normalized_file(output_directory)
        print(fund_name + " " + os.path.splitext(os.path.basename(file_path))[0] + ": Completed")

class superFund(ABC):
    def __init__(self, file_path):
        self.df = None
        self.totals_df = None 
        self.derivatives_df = None
        self.file_path = file_path 

    @abstractmethod
    def parse(self):
        """Each child fund implements its own parsing logic."""
        pass

    @abstractmethod
    def remove_totals(self):
        pass

    def save_to_normalized_file(self, output_directory):
        file_name = os.path.splitext(os.path.basename(self.file_path))[0]
        full_output_path = os.path.join(output_directory, f"{file_name}.normalised.csv")
        self.df.to_csv(full_output_path, index=False)

    def normalise_percentage(self):
        if "Weighting_Percentage" in self.df.columns:
            self.df["Weighting_Percentage"] = (
                self.df["Weighting_Percentage"]
                .astype(str)
                .str.replace('%', '', regex=False)
            )
          
    def normalise_dollar(self):
        if "Dollar_Value" in self.df.columns:
          self.df["Dollar_Value"] = (
                self.df["Dollar_Value"]
                .astype(str)
                .str.replace(r'[$,]', '', regex=True)
                .str.replace("-", "", regex=False)
            )

    def normalise_company_names(self):
        if "Name" not in self.df.columns:
            return

        mask = (
            self.df["Listing_Status"].str.contains("Listed", case=False, na=False)
            & self.df["Asset_Class"].str.contains("Equity", case=False, na=False)
        )

        # Clean names
        self.df.loc[mask, "Name"] = (
            self.df.loc[mask, "Name"]
            .str.replace(r"\s+", " ", regex=True)
            .str.strip()
            .str.title()
        )


    def recompute_percentages(self):
        if "Dollar_Value" in self.df.columns:
            # ensure numeric
            self.df["Dollar_Value"] = pd.to_numeric(self.df["Dollar_Value"], errors="coerce")
            total = self.df["Dollar_Value"].sum()
            
            if total > 0:
                self.df["Weighting_Percentage_Clean"] = (self.df["Dollar_Value"] / total) * 100
            else:
                self.df["Weighting_Percentage_Clean"] = 0

class AustralianSuper(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        df = df[[
            "Option Name", "Asset Class", "Name", "Filter", "Sub-Filter","Name Type",
            "Currency", "Security Identifier", "$ Value", "Weighting (%)"
        ]]

        df["combined"] = df["Filter"].fillna('') + " " + df["Sub-Filter"].fillna('')
        df["Listing_Status"] = df["combined"].str.extract(r'(?i)(Listed|Unlisted)', expand=False)
        df["Management_Type"] = df["combined"].str.extract(r'(?i)(Internally Managed|Externally Managed)', expand=False)
        df.drop(columns=["combined"], inplace=True)
        df.drop(columns=["Filter"], inplace=True)
        df.drop(columns=["Sub-Filter"], inplace=True)


        df["Management_Type"] = df["Management_Type"].fillna("").str.title()
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        df["Management_Type"] = (
            df["Management_Type"]
            .replace({
                "Internally Managed": "Internally",
                "Externally Managed": "Externally"
            })
        )

        df.rename(columns = {
            "Option Name": "Option_Name",
            "Asset Class": "Asset_Class",
            "Name": "Name",
            "Name Type": "Name_Type",
            "Currency": "Currency",
            "Security Identifier": "Security_Identifier",
            "$ Value": "Dollar_Value",
            "Weighting (%)": "Weighting_Percentage",
        }, inplace=True)

        self.df = df


    def remove_totals(self):
        if 'Name' in self.df.columns and 'Name_Type' in self.df.columns:
            mask = (self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")) & \
                   (self.df['Name_Type'].astype(str).str.strip().str.fullmatch(r"(?i)Total"))
            
            self.totals_df = self.df[mask]
            self.df = self.df[~mask]
            self.df = self.df.drop(columns=['Name_Type'])
            # Rest Index
            self.df = self.df.reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(r'(?i)^Derivatives', na=False)
            
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask]
            
            self.df = self.df.reset_index(drop=True)

    
class Rest(superFund):
    def parse(self):
        df = pd.read_excel(self.file_path, header=1, engine="openpyxl")

        df["Name"] = (
            df["NAME / KIND OF INVESTMENT ITEM"].replace("-", pd.NA)
            .fillna(df["NAME OF INSTITUTION"].replace("-", pd.NA))
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"].replace("-", pd.NA))
            .fillna(df["NAME OF FUND MANAGER"].replace("-", pd.NA))
        )

       
        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED", "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]]

        df["Listing_Status"] = df["ASSET CLASS"].str.extract(r'(?i)^(LISTED|UNLISTED)', expand=False)
        df["ASSET CLASS"] = df["ASSET CLASS"].str.replace(r'(?i)^(LISTED|UNLISTED)\s*', '', regex=True)
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["ASSET CLASS"] = df["ASSET CLASS"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__
        file_name = os.path.splitext(os.path.basename(self.file_path))[0]
        option_name = file_name.replace("_", " ").strip().title()
        df["Option_Name"] = option_name
        
        df.rename(columns = {
            "ASSET CLASS": "Asset_Class",
            "INTERNALLY MANAGED OR EXTERNALLY MANAGED": "Management_Type", 
            "CURRENCY": "Currency",
            "SECURITY IDENTIFIER": "Security_Identifier",
            "VALUE(AUD)": "Dollar_Value",
            "WEIGHTING(%)": "Weighting_Percentage",
        }, inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title()

        self.df = df


    def remove_totals(self):
      if 'Asset_Class' in self.df.columns:
        values = self.df['Asset_Class'].astype(str).str.strip()
        mask = values.str.contains(r'(?i)^(SUB TOTAL|TOTAL)', na=False)
        clean_mask = mask.fillna(False)
        
        self.totals_df = self.df[clean_mask]
        self.df = self.df[~clean_mask]
        
        self.df = self.df.reset_index(drop=True)



class AwareSuper(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)


        df["Name"] = (
            df["NAME OF INSTITUTION"]
            .fillna(df["NAME / KIND OF INVESTMENT ITEM"])
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"])
            .fillna(df["NAME OF FUND MANAGER"])
        )

        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER"
        ]]

        df["combined"] = df["Filter"].fillna('') + " " + df["Sub-Filter"].fillna('')
        df["Listing_Status"] = df["combined"].str.extract(r'(?i)(Listed|Unlisted)', expand=False)
        df["Management_Type"] = df["combined"].str.extract(r'(?i)(Internally Managed|Externally Managed)', expand=False)
        df.drop(columns=["combined"], inplace=True)
        df.drop(columns=["Filter"], inplace=True)
        df.drop(columns=["Sub-Filter"], inplace=True)


        df["Management_Type"] = df["Management_Type"].fillna("").str.title()
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        df["Management_Type"] = (
            df["Management_Type"]
            .replace({
                "Internally Managed": "Internally",
                "Externally Managed": "Externally"
            })
        )

        df.rename(columns = {
            "Option Name": "Option_Name",
            "Asset Class": "Asset_Class",
            "Name": "Name",
            "Name Type": "Name_Type",
            "Currency": "Currency",
            "Security Identifier": "Security_Identifier",
            "$ Value": "Dollar_Value",
            "Weighting (%)": "Weighting_Percentage",
        }, inplace=True)

        self.df = df


    def remove_totals(self):
        if 'Name' in self.df.columns and 'Name_Type' in self.df.columns:
            mask = (self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")) & \
                   (self.df['Name_Type'].astype(str).str.strip().str.fullmatch(r"(?i)Total"))
            
            self.totals_df = self.df[mask]
            self.df = self.df[~mask]
            self.df = self.df.drop(columns=['Name_Type'])
            # Rest Index
            self.df = self.df.reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(r'(?i)^Derivatives', na=False)
            
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask]
            
            self.df = self.df.reset_index(drop=True)



class ART(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        df = df[[
            "OptionName", "Type", "Name", "Currency", "SecurityIdentifier", "Value", "Weighting"
        ]]

        df["Super_Fund"] = self.__class__.__name__

        df.rename(columns = {
            "OptionName": "Option_Name",
            "Type": "Asset_Class",
            "Name": "Name",
            "Currency": "Currency",
            "SecurityIdentifier": "Security_Identifier",
            "Value": "Dollar_Value",
            "Weighting": "Weighting_Percentage",
            #"Location": "Location"    
        }, inplace=True)

        self.df = df


def test(df):
    suffixes = ["GROUP", "LTD", "LIMITED", "CORP", "CORPORATION",
                    "INC", "HOLDINGS?", "PTY", "PLC", "CO", "LP"]

    pattern = r"\b(" + "|".join(suffixes) + r")\b"

    mask = df["Listing_Status"].str.contains("Listed", case=False, na=False) & \
        df["Asset_Class"].str.contains("Equity", case=False, na=False)
    
    df.loc[mask, "Name"] = (
        df.loc[mask, "Name"]
        .str.replace(pattern, "", regex=True, case=False)   
        .str.replace(",", "", regex=False)                
        .str.replace(r"\.(?!com\b)(?!co\b)", "", regex=True)  
        .str.replace(r"\s+", " ", regex=True)            
        .str.strip()                                     
        .str.title()
    )

      
    overrides = {
        r"(?i)^amazon.*": "Amazon",
        r"(?i)^eli lilly.*": "Eli Lilly",     
        r"(?i)^booking holdings.*": "Booking Holdings",     
        r"(?i)^merck.*": "Merck",
        r"(?i)^bhp$": "BHP",
        r"(?i)^national.*australia.*bank.*": "NAB",
        r"(?i)^westpac.*": "Westpac", 
        r"(?i)^taiwan semiconductor.*": "TSMC",
        r"(?i)^commonwealth bank.*": "CommBank",
        r"(?i)^auckland.*airport.*": "Auckland Airport",
        r"(?i)^mirvac.*": "Mirvac",
        r"(?i)^carsales.*": "Carsales",
        r"(?i)^citigroup.*": "Citi",
        r"(?i)^goodman.*": "Goodman",
        r"(?i)^jpmorgan.*": "JPMORGAN",
        r"(?i)^downer.*": "Downer Group",
        r"(?i)^citi.*": "Citi Bank",
        r"(?i)^costco.*": "Costco",
        r"(?i)^meta.*": "Meta",
    }

    for pattern, replacement in overrides.items():
        df.loc[mask, "Name"] = df.loc[mask, "Name"].str.replace(
            pattern, replacement, regex=True
    )

run_all_parsers()