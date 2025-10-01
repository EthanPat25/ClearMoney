import React from "react";

import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import { Banknote } from "../AnimationComponents/Banknote";
import { Bond } from "../AnimationComponents/Bond";

export type BondsandCashHoldingsProps = {
  holdingsCashData: Holding[] | null;
  holdingsbondsData: Holding[] | null;
  balance: number;
};

export type dataforwardProps = {
  cashAmount: number;
  bondsAmount: number;
  percentageCash: number;
  totalamount: number;
  totalpercentage: number;
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

const BondsandCashHoldings: React.FC<BondsandCashHoldingsProps> = ({
  holdingsCashData,
  holdingsbondsData,
  balance,
}) => {
  const percentageCash =
    holdingsCashData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0
    ) ?? 0;

  const cashAmount = (percentageCash / 100) * balance;

  const percentageBonds =
    holdingsbondsData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0
    ) ?? 0;

  const bondsAmount = (percentageBonds / 100) * balance;

  const amount = cashAmount + bondsAmount;

  const percentage = percentageCash + percentageBonds;

  const dataforward = {
    cashAmount: cashAmount,
    bondsAmount: bondsAmount,
    percentageCash: percentageCash,
    totalamount: amount,
    totalpercentage: percentage,
  };

  function getColorForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return "bg-blue-100 text-blue-700";
      case "Property":
        return "bg-green-100 text-green-700";
      case "Equity":
        return "bg-slate-100 text-slate-700";
      case "Alternatives":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }

  console.log(percentageCash);
  return (
    <div className="bg-gray-100 w-full rounded-[5rem]">
      {/* Header */}
      <div className="flex xxs:flex-col lg:flex-row lg:justify-between items-center text-center px-4 sm:px-10 py-6">
        <div className="md:flex-1"></div>
        <div className="md:flex-2">
          <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold">
            Cash & Fixed Interest (Bonds)
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
            <br className="xs:hidden lg:block"></br>
            <span className="text-[RGB(251,99,64)]">
              ({percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Cards + compact arrows */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
        >
          {/* Original name in top-left */}
          <p className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]">
            {}
          </p>

          {/* Info icon */}

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center gap-6">
            <Banknote></Banknote>
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                "Property"
              )}`}
            >
              {"Cash"}
            </span>
            {}
          </h2>
          <h2 className="xs:text-sm md:text-base font-medium mt-2">
            <NumericFormat
              value={dataforward.cashAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
        >
          {/* Original name in top-left */}
          <p className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]">
            {}
          </p>

          {/* Info icon */}

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <Bond></Bond>
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                "Equity"
              )}`}
            >
              {"Fixed Interest (Bonds)"}
            </span>
            {}
          </h2>
          <h2 className="xs:text-sm md:text-base font-medium mt-2">
            <NumericFormat
              value={dataforward.bondsAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </h2>
        </motion.div>
        {/* Left arrow */}

        {/* Card grid */}

        {/* Right arrow */}
      </div>
      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-12 text-center pb-10">
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

export default BondsandCashHoldings;
