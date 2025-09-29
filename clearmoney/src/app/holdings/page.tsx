"use client";

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import { Calc } from "./Calc";
import PublicHoldings from "./PublicHoldings";
import PrivateHoldings from "./PrivateHoldings";
import BondsandCashHoldings from "./BondsandCashHoldings";

type HoldingsData = {
  public_companies: any[];
  Private_Investments: any[];
  Bonds: any[];
  Cash: any[];
};

type Results = {
  holdingsData: HoldingsData;
  balance: number;
};

export default function Page() {
  const actionButton = React.useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<"terms" | "case" | "close">("terms");
  const [ResultsData, setResultsData] = React.useState<Results | null>(null);

  React.useEffect(() => {
    console.log("📊 holdingsData updated:", ResultsData);
  }, [ResultsData]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <HeroSection reference={actionButton}></HeroSection>
      <div className="flex justify-center items-center mt-16">
        <Calc onResults={setResultsData} ref={actionButton}></Calc>
      </div>
      <section className="mt-28 w-screen">
        <div className="max-w-7xl mx-auto sm:px-6 py-8">
          {/* Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setView("terms")}
              className={`px-4 py-2 xs:w-[7rem] sm:w-[9rem] md:w-[11rem] rounded-3xl text-sm ${view === "terms" ? "bg-gray-900 text-white" : "border"}`}
            >
              Public Companies
            </button>
            <button
              onClick={() => setView("case")}
              className={`px-4 py-2 xs:w-[7rem] sm:w-[9rem] md:w-[11rem] rounded-3xl text-sm ${view === "case" ? "bg-gray-900 text-white" : "border"}`}
            >
              Private Investments
            </button>
            <button
              onClick={() => setView("close")}
              className={`px-4 py-2 xs:w-[7rem] sm:w-[9rem] md:w-[11rem] rounded-3xl text-sm ${view === "close" ? "bg-gray-900 text-white" : "border"}`}
            >
              Bonds and Cash
            </button>
          </div>

          {/* Content */}
          {view === "terms" && ResultsData && (
            <PublicHoldings
              holdingsData={ResultsData.holdingsData.public_companies}
              balance={ResultsData.balance}
            />
          )}
          {view === "case" && ResultsData && (
            <PrivateHoldings
              holdingsData={ResultsData.holdingsData.Private_Investments}
              balance={ResultsData.balance}
            />
          )}
          {view === "close" && ResultsData && (
            <BondsandCashHoldings
              holdingsCashData={ResultsData.holdingsData.Cash}
              holdingsbondsData={ResultsData.holdingsData.Bonds}
              balance={ResultsData.balance}
            ></BondsandCashHoldings>
          )}
        </div>
      </section>
    </div>
  );
}
