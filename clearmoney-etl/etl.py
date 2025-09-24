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
        FundParser.normalise_company_names()
        FundParser.normalise_percentage()
        FundParser.normalise_dollar()
        FundParser.remove_totals()
        FundParser.recompute_percentages()
        FundParser.save_to_normalized_file(output_directory)
        print(fund_name + " " + os.path.splitext(os.path.basename(file_path))[0] + ": Completed")
    elif fund_name == "Rest":
        FundParser = Rest(file_path)
        FundParser.parse() 
        FundParser.normalise_company_names()
        FundParser.normalise_percentage()
        FundParser.normalise_dollar()
        FundParser.remove_totals()
        FundParser.recompute_percentages()
        FundParser.save_to_normalized_file(output_directory)
        print(fund_name + " " + os.path.splitext(os.path.basename(file_path))[0] + ": Completed")

class superFund(ABC):
    def __init__(self, file_path):
        self.df = None
        self.file_path = file_path 

    @abstractmethod
    def parse(self):
        """Each child fund implements its own parsing logic."""
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
            )
        
        
    def normalise_company_names(self):
        if "Name" in self.df.columns:
            suffixes = ["GROUP", "LTD", "LIMITED", "CORP", "CORPORATION",
                    "INC", "HOLDINGS?", "PTY", "PLC", "CO", "LP"]

            pattern = r"\b(" + "|".join(suffixes) + r")\b"

            mask = self.df["Listing_Status"].str.contains("Listed", case=False, na=False) & \
               self.df["Asset_Class"].str.contains("Equity", case=False, na=False)
            
            self.df.loc[mask, "Name"] = (
                self.df.loc[mask, "Name"]
                .str.replace(pattern, "", regex=True, case=False)   # remove suffixes (GROUP, LTD, etc.)
                .str.replace(",", "", regex=False)                 # remove commas
                .str.replace(r"\.(?!com\b)(?!co\b)", "", regex=True)  # remove dots NOT followed by com/co
                .str.replace(r"\s+", " ", regex=True)              # collapse multiple spaces into one
                .str.strip()                                       # trim leading/trailing spaces
                .str.title()
            )

                    # Custom overrides (case-insensitive patterns)
        overrides = {
            r"(?i)^amazon.*": "Amazon",
            r"(?i)^eli lilly.*": "Eli Lilly",     # safely remove & Co
            r"(?i)^booking holdings.*": "Booking Holdings",     # keep .com if it's relevant to the brand
            r"(?i)^merck.*": "Merck",
            r"(?i)^bhp$": "BHP",
            r"(?i)^national.*australia.*bank.*": "NAB",
            r"(?i)^westpac.*": "Westpac",  # leave Westpac as-is, already short
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
            # Add more as needed
        }

        for pattern, replacement in overrides.items():
            self.df.loc[mask, "Name"] = self.df.loc[mask, "Name"].str.replace(
                pattern, replacement, regex=True
            )


    def normalize(self, df):
    # Make Asset_Class consistent
        if "Asset_Class" in df.columns:
            df["Asset_Class"] = df["Asset_Class"].fillna("").str.title()
        self.df = df
    
    def recompute_percentages(self):
        if "Dollar_Value" in self.df.columns:
            # ensure numeric
            self.df["Dollar_Value"] = pd.to_numeric(self.df["Dollar_Value"], errors="coerce")
            total = self.df["Dollar_Value"].sum()
            
            if total > 0:
                self.df["Weighting_Percentage_Clean"] = (self.df["Dollar_Value"] / total) * 100
            else:
                self.df["Weighting_Percentage_Clean"] = 0

    def remove_totals(self):
        """
        Removes roll-up rows like 'Total', 'Total Investment',
        'Sub Total ...', and 'Grand Total',
        whether they appear in Name or Asset_Class.
        Safe for companies like 'TOTALENERGIES SE'.
        """
        for col in ["Name", "Asset_Class"]:
            if col in self.df.columns:
                values = self.df[col].astype(str).str.strip()

                mask = (
                    values.str.fullmatch(r"(?i)total") |                   # exact 'Total'
                    values.str.contains(r"(?i)^total(?:\s+investment.*)?$", na=False) |  # 'Total' or 'Total Investment...'
                    values.str.contains(r"(?i)^sub\s*total", na=False) |   # 'Sub Total...'
                    values.str.contains(r"(?i)^grand\s*total", na=False)   # 'Grand Total...'
                )

                self.df = self.df[~mask.fillna(False)]

        self.df = self.df.reset_index(drop=True)
        return self.df



class AustralianSuper(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        df = df[[
            "Option Name", "Asset Class", "Name", "Filter", "Sub-Filter",
            "Currency", "Security Identifier", "$ Value", "Weighting (%)"
        ]]

        df["combined"] = df["Filter"].fillna('') + " " + df["Sub-Filter"].fillna('')
        df["Source_Name"] = df["Name"]
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
            "Currency": "Currency",
            "Security Identifier": "Security_Identifier",
            "$ Value": "Dollar_Value",
            "Weighting (%)": "Weighting_Percentage",
            #"Location": "Location"    
        }, inplace=True)

        self.df = df

       
class Rest(superFund):
    def parse(self):
        df = pd.read_excel(self.file_path, header=1, engine="openpyxl")

        df["Name"] = (
            df["NAME / KIND OF INVESTMENT ITEM"]
            .fillna(df["NAME OF INSTITUTION"])
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"])
            .fillna(df["NAME OF FUND MANAGER"])
        )

        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED", "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]]

        df["Source_Name"] = df["Name"]
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

run_all_parsers()