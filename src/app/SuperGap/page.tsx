"use client";

import React, { useState } from "react";
import EverydayTerms from "./EverydayTerms";
import Breakdown from "./Breakdown";
import { Calc } from "./Calc";
import Graph from "./Graph";
import { Button } from "@/components/ui/button";
import UnderStand from "./UnderStand";
import InsightCard from "./InsightCard";
import Info from "../FHSS/Info";
import { MitigationCalc } from "./Calc copy";
import { Tabs } from "@/components/ui/tabs";
import { Superannuation } from "../AnimationComponents/Superannuation";


export default function SuperContributions() {
  const [inflation, setInflation] = useState(true);
  const [view, setView] = useState<"terms" | "case" | "close">("terms");

    const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold">
           <EverydayTerms />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
        </div>
      ),
    },
  ];

  return (

    <>
        <div className="w-screen min-h-screen flex flex-col">

        <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16">
            <div className="mt-24 flex flex-col items-center p-10">
              <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
                <Superannuation animate={true} />
              </div>
              <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem]">
                The Super Gap is Real <br /> 
              </h2>
              <h3 className="text-center xs:text-[1rem] sm:text-[1.3rem] text-[RGB(255,255,255)]">Life happens — caring, part-time work, or time off can mean less super.
<br></br>Check your gap and help raise awareness.</h3>
            </div>
    
                  <div className="flex justify-center mb-5">
    
                 
              <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] w-[15rem] h-12 text-[0.9rem] font-bold text-white">
                Calculate My Gap
                <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M19 9l-7 7-7-7" />
</svg>
             
              </Button>
  
    
             
            </div>
    
        
          </div>
    
    <div className="w-screen p-6 bg-[RGB(250,251,252)] relative">
      
      <div className="mt-10"></div>

      {/* TOP SECTION */}
      <div className="flex mt-20 justify-evenly">
        <div className="flex justify-center">
          <div className="w-[30rem]">
            <Calc />
          </div>
        </div>

        <div className="flex flex-col w-1/2 items-center">
          <div className="flex justify-start mb-5 w-full ml-12 items-center">
            <Button
              onClick={() => setInflation(true)}
              className="rounded-3xl mr-5 w-36"
              variant={inflation ? "default" : "outline"}
            >
              Adjust For Inflation
            </Button>
            <Button
              onClick={() => setInflation(false)}
              variant={inflation ? "outline" : "default"}
              className="rounded-3xl w-36"
            >
              Ignore Inflation
            </Button>
            <Info className="w-6 h-6 flex justify-center items-center ml-2" />
          </div>

          <Breakdown />
          <InsightCard />
        </div>
      </div>

      {/* FULL-WIDTH TOGGLE + CONTENT */}
     
    </div>
     <section className="mt-16 w-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Toggle */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setView("terms")}
              className={`px-4 py-2 w-[9.7rem] rounded-3xl text-sm ${view === "terms" ? "bg-gray-900 text-white" : "border"}`}
            >
              In Everyday Terms
            </button>
            <button
              onClick={() => setView("case")}
              className={`px-4 py-2 w-[9.7rem] rounded-3xl text-sm ${view === "case" ? "bg-gray-900 text-white" : "border"}`}
            >
              Why Gaps Matter
            </button>
            <button
              onClick={() => setView("close")}
              className={`px-4 py-2 w-[9.7rem] rounded-3xl text-sm ${view === "close" ? "bg-gray-900 text-white" : "border"}`}
            >
              Close the Gap
            </button>
          </div>

          {/* Content */}
          {view === "terms" && <EverydayTerms />}
          {view === "case" && <UnderStand />}
          {view === "close" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <MitigationCalc />
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-base font-medium mb-2">Impact</h4>
                <div className="h-[360px] bg-gray-50 rounded-xl p-3">
                  <Graph />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Adjust the weekly amount to see how your trajectory changes.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>

    </>
  );
}
