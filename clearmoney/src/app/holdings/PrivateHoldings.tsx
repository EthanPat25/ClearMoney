import React from "react";
import PiePrivate from "./PiePrivate";
import { TablePrivate } from "./TablePrivate";
import { NumericFormat } from "react-number-format";
import { Highway } from "../AnimationComponents/Highway";
import { House } from "../AnimationComponents/House";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import { Briefcase } from "../AnimationComponents/Briefcase";
import { Puzzle } from "../AnimationComponents/Puzzle";

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
  const categories = [
    { name: "Infrastructure", icon: <Highway initialSize={130} /> },
    { name: "Property", icon: <House initialSize={130} /> },
    { name: "Equity", icon: <Briefcase initialSize={130}></Briefcase> },
    { name: "Alternatives", icon: <Puzzle initialSize={130} /> }, // placeholder
  ];

  function getColorForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return "bg-sky-100 text-sky-700";
      case "Property":
        return "bg-green-100 text-green-700";
      case "Equity":
        return "bg-yellow-100 text-yellow-700";
      case "Alternatives":
        return "bg-orange-100 text-orange-700";
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
            Unlisted Assets
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
            <br></br>
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

      {/* Category Cards */}
      <div className="mx-auto mt-10 grid grid-cols-2 gap-10 max-w-2xl place-items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[18rem] relative"
          >
            {/* Icon */}
            <div className="flex flex-col justify-between items-center gap-6">
              {cat.icon}
            </div>

            {/* Category pill */}
            <h2 className="xs:text-sm md:text-base font-medium mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                  cat.name
                )}`}
              >
                {cat.name}
              </span>
            </h2>

            {/* Dollar + percentage */}
            <h2 className="xs:text-sm md:text-base font-medium mt-2">
              <NumericFormat
                value={0}
                thousandSeparator
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                displayType="text"
              />{" "}
              <span className="text-[RGB(251,99,64)]">(0%)</span>
            </h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center mt-12 text-center pb-10">
        <h1 className="text-xl font-semibold">
          <NumericFormat
            value={amount}
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            displayType="text"
          />{" "}
          of your super is invested across NA Privately Listed Assets
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
