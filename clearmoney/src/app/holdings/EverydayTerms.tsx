import React from "react";
import Info from "../FHSS/Info";

type EverydayTermsProps = {
  holdingsData: Holding[] | null;
};

type Holding = {
  Name: string;
  Weighting_Percentage: number;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Dollar_Value?: number;
  Domain?: string;
  Source_Name: string;
};

const EverydayTerms: React.FC<EverydayTermsProps> = ({ holdingsData }) => {
  const pager = holdingsData?.slice(0, 9);

  return (
    <div className="bg-gray-100 h-[67rem] w-full rounded-[5rem]">
      {/* Floating circle summary */}

      {/* Header */}

      <div className="relative flex justify-center items-center w-full">
        {/* Centre text */}
        <div className="flex flex-col items-center p-10">
          <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold">
            Top Holdings
          </p>
          <h2 className="text-center font-bold xs:text-[1.3rem] sm:text-[1.7rem] md:text-[2.3rem]">
            Where Your Money is Invested
          </h2>
        </div>

        {/* Left circle */}

        {/* Right pill */}
        <div
          className="
    absolute right-4 sm:right-10
    px-2 sm:px-4 py-1 sm:py-2
    rounded-2xl bg-[RGB(82,105,127)]
    text-white font-semibold
    xxs:text-[0.7rem] xs:text-base sm:text-lg
  "
        >
          $2,579.50
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 justify-items-center xs:px-5 sm:px-10 lg:px-32">
        {pager &&
          pager.map((holding: Holding, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
              >
                {/* Original name in top-left */}
                <p
                  className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
                  title={holding.Source_Name}
                >
                  {holding.Source_Name}
                </p>

                {/* Info icon */}
                <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

                {/* Logo container */}
                <div className="flex flex-col justify-between items-center">
                  <img
                    className="xs:w-[6rem] xs:h-[6rem] md:w-[8rem] md:h-[8rem] rounded-[3rem] mb-4"
                    src={`https://cdn.brandfetch.io/${holding.Domain}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                    alt={`${holding.Name} logo`}
                  />
                </div>

                {/* Company name + hard-coded dollar value */}
                <h2 className="xs:text-sm md:text-base font-medium">
                  {holding.Name}:{" "}
                  <span className="font-semibold text-base">$60.50</span>
                </h2>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-12 text-center">
        <h1 className="text-xl font-semibold">
          $2,579.50 of your super is invested across 2,043 Listed Companies
        </h1>
        <p className="mt-3 text-xs xxs:text-sm text-gray-500 max-w-[35rem] leading-relaxed">
          Based on official holdings data from
          <span className="font-medium"> December 2024</span>. Holdings are
          updated every 6 months. These results are estimates, intended to give
          an overview of where your money is invested, not a live or exact
          breakdown.
        </p>
      </div>
    </div>
  );
};

export default EverydayTerms;
