import React from "react";
import Info from "../FHSS/Info";
import { motion } from "framer-motion";
import { Highway } from "../AnimationComponents/Highway";
import { House } from "../AnimationComponents/House";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import PiePrivate from "./PiePrivate";
import { TablePrivate } from "./TablePrivate";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";
import { NumericFormat } from "react-number-format";

type PrivateHoldingsProps = {
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
  Source_Name: string;
  Asset_Class: string;
  Weighting_Percentage_Clean: number;
};

const PrivateHoldings: React.FC<PrivateHoldingsProps> = ({
  holdingsData,
  balance,
}) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const pageSize = 3;

  const pager = holdingsData?.slice(startIndex, startIndex + pageSize);

  function getIconForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return <Highway initialSize={130} />;
      case "Property":
        return <House initialSize={130} />;
      case "Equity":
        return <MoneyBag initialSize={130} />;
      default:
        return null;
    }
  }

  function getColorForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return "bg-blue-100 text-blue-700";
      case "Property":
        return "bg-green-100 text-green-700";
      case "Equity":
        return "bg-purple-100 text-purple-700";
      case "Alternatives":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }

  const percentage =
    holdingsData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0
    ) ?? 0;

  const amount = (percentage / 100) * balance;

  return (
    <div className="bg-gray-100 w-full rounded-[5rem]">
      {/* Header */}
      <div className="flex xxs:flex-col lg:flex-row lg:justify-between items-center text-center px-4 sm:px-10 py-6">
        <div className="md:flex-1"></div>
        <div className="md:flex-2">
          <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold">
            Top Holdings (Unlisted Assets)
          </p>
          <h2 className="font-bold xs:text-[1.3rem] sm:text-[1.7rem] md:text-[2.3rem]">
            Where Your Money is Invested
          </h2>
        </div>
        <div className="md:flex-1 flex justify-center lg:justify-end">
          <div className="mt-3 lg:mt-0 lg:w-[13rem] px-3 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-[RGB(82,105,127)] text-white font-semibold xs:text-md sm:text-lg">
            <NumericFormat
              value={amount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />{" "}
            <span className="text-[RGB(251,99,64)]">
              {`(${percentage.toFixed(1)}%)`}
            </span>
          </div>
        </div>
      </div>

      {/* Pie + Table */}
      <div className="flex justify-evenly items-center w-full">
        <div className="w-[25rem] h-[25rem] ml-[10rem]">
          <PiePrivate />
        </div>
        <div className="mr-[10rem]">
          <TablePrivate />
        </div>
      </div>

      {/* Cards + compact arrows */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {/* Left arrow */}
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setStartIndex((prev) => Math.max(0, prev - pageSize))}
        >
          <ArrowLeft />
        </button>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 justify-items-center xs:px-5 sm:px-10 lg:px-32">
          {pager &&
            pager.map((holding: Holding, index) => (
              <motion.div
                key={`${startIndex}-${index}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
              >
                {/* Source name */}
                <p
                  className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
                  title={holding.Source_Name}
                >
                  {holding.Source_Name}
                </p>

                {/* Info icon */}
                <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

                {/* Logo + Label */}
                <div className="flex flex-col justify-between items-center">
                  {getIconForAssetClass(holding.Asset_Class)}

                  <span
                    className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                      holding.Asset_Class
                    )}`}
                  >
                    {holding.Asset_Class}
                  </span>
                </div>

                {/* Company name + $ value */}
                <h2 className="xs:text-sm md:text-base font-medium mt-3">
                  {holding.Name}:{" "}
                  <span className="font-semibold text-base">$60.50</span>
                </h2>
              </motion.div>
            ))}
        </div>

        {/* Right arrow */}
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setStartIndex((prev) => prev + pageSize)}
        >
          <ArrowRight />
        </button>
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-12 text-center pb-10">
        <h1 className="text-xl font-semibold">
          $2,579.50 of your super is invested across {holdingsData?.length ?? 0}{" "}
          Privately Listed Assets
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

export default PrivateHoldings;
