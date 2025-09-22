import React from "react";
import Info from "../FHSS/Info";
import Image from "next/image";

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

      <div className="flex-col font-semibold flex justify-center items-center absolute h-20 w-32 rounded-full bg-[RGB(82,105,127)] text-white right-32 top-[84rem]">
        <p className="text-md text-[RGB(251,99,64)]">36.85%</p>
        <h2 className="text-lg">$2,579.50</h2>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center p-10 w-full">
        <p className="text-sm text-[RGB(251,99,64)] font-semibold">
          Top Holdings
        </p>
        <h2 className="font-bold xs:text-[1rem] sm:text-[1.7rem] md:text-[2.3rem]">
          Where Your Money is Invested
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {pager &&
          pager.map((holding: Holding, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative"
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
                  <Image
                    className="w-[8rem] h-[8rem] rounded-[3rem] mb-4"
                    src={`https://cdn.brandfetch.io/${holding.Domain}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                    alt={`${holding.Name} logo`}
                  />
                </div>

                {/* Company name + hard-coded dollar value */}
                <h2 className="text-base font-medium">
                  {holding.Name}:{" "}
                  <span className="font-semibold text-base">$60.50</span>
                </h2>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-xl">
          $2,579.50 of your super is invested across 2,043 companies
        </h1>
        <button className="mt-3 px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
          View More
        </button>
      </div>
    </div>
  );
};

export default EverydayTerms;
