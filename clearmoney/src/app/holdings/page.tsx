"use client";

import React, { useState } from "react";
import EverydayTerms from "./EverydayTerms";
import HeroSection from "./HeroSection";
import { Calc } from "./Calc";

export default function Page() {
  const [view, setView] = useState<"terms" | "case" | "close">("terms");
  const [holdingsData, setHoldingsData] = React.useState(null);

  React.useEffect(() => {
    console.log("📊 holdingsData updated:", holdingsData);
  }, [holdingsData]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <HeroSection></HeroSection>
      <div className="flex justify-center items-center mt-16">
        <Calc onResults={setHoldingsData}></Calc>
      </div>
      <section className="mt-28 w-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Toggle */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            <button
              onClick={() => setView("terms")}
              className={`px-4 py-2 w-[11rem] rounded-3xl text-sm ${view === "terms" ? "bg-gray-900 text-white" : "border"}`}
            >
              Public Companies
            </button>
            <button
              onClick={() => setView("case")}
              className={`px-4 py-2 w-[11rem] rounded-3xl text-sm ${view === "case" ? "bg-gray-900 text-white" : "border"}`}
            >
              Private Investments
            </button>
            <button
              onClick={() => setView("close")}
              className={`px-4 py-2 w-[11rem] rounded-3xl text-sm ${view === "close" ? "bg-gray-900 text-white" : "border"}`}
            >
              Bonds and Cash
            </button>
          </div>

          {/* Content */}
          {view === "terms" && <EverydayTerms holdingsData={holdingsData} />}
          {view === "case" && <EverydayTerms holdingsData={holdingsData} />}
          {view === "close" && (
            <div className="flex justify-evenly mt-10">
              <div className=" flex justify-center items-center w-[55%]">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full">
                  <h4 className="text-base font-medium mb-2">Impact</h4>
                  <div className="h-[360px] bg-gray-50 rounded-xl p-3"></div>
                  <p className="text-sm text-gray-600 mt-3">
                    Adjust the weekly amount to see how your trajectory changes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
