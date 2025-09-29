import React from "react";
import Info from "../FHSS/Info";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";

type PublicHoldingsProps = {
  holdingsData: Holding[] | null;
  balance: number;
};

type Holding = {
  Name: string;
  Weighting_Percentage: number;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Dollar_Value?: number;
  Domain?: string;
  Parsed_Name: string;
  Weighting_Percentage_Clean: number;
};

const PublicHoldings: React.FC<PublicHoldingsProps> = ({
  holdingsData,
  balance,
}) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const pageSize = 9;

  const pager = holdingsData?.slice(startIndex, startIndex + pageSize);

  const listedPercentage =
    holdingsData
      ?.filter((h) => h.Listing_Status.toLowerCase() === "listed")
      .reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0) ?? 0;

  const listedAmount = (listedPercentage / 100) * balance;

  return (
    <div className="bg-gray-100  w-full rounded-[5rem]">
      <div className="flex xxs:flex-col lg:flex-row lg:justify-between items-center text-center px-4 sm:px-10 py-6">
        <div className="md:flex-1"></div> {/* spacer */}
        <div className="md:flex-2">
          <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold">
            Top Holdings (Listed Assets)
          </p>
          <h2 className="font-bold xs:text-[1.3rem] sm:text-[1.7rem] md:text-[2.3rem]">
            Where Your Money is Invested
          </h2>
        </div>
        <div className="md:flex-1 flex justify-center lg:justify-end">
          <div className="mt-3 lg:mt-0 lg:w-[13rem] px-3 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-[RGB(82,105,127)] text-white font-semibold xs:text-md sm:text-lg">
            <NumericFormat
              value={listedAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />

            <br></br>

            <span className="ml-2 text-[RGB(251,99,64)]">
              {`(${listedPercentage.toFixed(1)}%)`}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <button
          className="ml-16"
          onClick={() => setStartIndex((prev) => Math.max(0, prev - pageSize))}
        >
          <ArrowLeft></ArrowLeft>
        </button>
        <div>
          <h3 className="text-gray-400">
            {startIndex + 1}-{startIndex + 9} of 2043 results
          </h3>
        </div>
        <button
          className="mr-16"
          onClick={() => setStartIndex((prev) => prev + pageSize)}
        >
          <ArrowRight></ArrowRight>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 justify-items-center xs:px-5 sm:px-10 lg:px-32">
        {pager &&
          pager.map((holding: Holding, index) => {
            const scaledValue =
              balance && holding.Weighting_Percentage_Clean
                ? (holding.Weighting_Percentage_Clean / 100) * balance
                : 0;

            return (
              <motion.div
                key={`${startIndex}-${index}`} // ensures remount on page flip
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
              >
                {/* Original name in top-left */}
                <p
                  className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
                  title={holding.Name}
                >
                  {holding.Name}
                </p>

                {/* Info icon */}
                <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

                {/* Logo container */}
                <div className="flex flex-col justify-between items-center">
                  <img
                    className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[8rem] md:h-[8rem] rounded-[3rem] mb-4"
                    src={`https://cdn.brandfetch.io/${holding.Domain}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                    alt={`${holding.Name} logo`}
                  />
                </div>

                {/* Company name + hard-coded dollar value */}
                <h2 className="xs:text-sm md:text-base font-medium">
                  {holding.Parsed_Name}:{" "}
                  <span className="font-semibold text-base">
                    ${scaledValue.toFixed(2)}
                  </span>
                </h2>
              </motion.div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-12 text-center pb-10">
        <h1 className="text-xl font-semibold">
          <NumericFormat
            value={listedAmount}
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            displayType="text"
          />{" "}
          of your super is invested across NA Listed Companies
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

export default PublicHoldings;
