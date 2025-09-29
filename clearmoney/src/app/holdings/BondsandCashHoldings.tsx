import React from "react";
import PiePrivate from "./PiePrivate";
import { TablePrivate } from "./TablePrivate";
import { TableCashandBonds } from "./TableCashandBonds";
import PieCashandBonds from "./PieCashandBonds";
import { NumericFormat } from "react-number-format";

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

  console.log(percentageCash);
  return (
    <div className="bg-gray-100 w-full rounded-[5rem]">
      {/* Header */}
      <div className="flex xxs:flex-col lg:flex-row lg:justify-between items-center text-center px-4 sm:px-10 py-6">
        <div className="md:flex-1"></div>
        <div className="md:flex-2">
          <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold">
            Top Holdings (Bonds + Cash)
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
              ({percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Pie + Table */}
      <div className="flex justify-evenly items-center w-full">
        <div className="w-[25rem] h-[25rem] ml-[10rem]">
          <PieCashandBonds dataforward={dataforward}></PieCashandBonds>
        </div>
        <div className="mr-[10rem]">
          <TableCashandBonds dataforward={dataforward}></TableCashandBonds>
        </div>
      </div>

      {/* Cards + compact arrows */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {/* Left arrow */}

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 justify-items-center xs:px-5 sm:px-10 lg:px-32"></div>

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
