"use client";

import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, Tooltip, YAxis, XAxis, LineChart, Line } from "recharts";
import EverydayTerms from "./EverydayTerms";
import Breakdown from "./Breakdown";
import { Calc } from "./Calc";
import Graph from "./Graph";
import { Button } from "@/components/ui/button";

const userActivity = [
  {
    Title: "FHSS",
    Contributions: 35000,
    Refunded: 11000,
    Interest: 4000,
  },
  {
    Title: "Savings Account",
    Contributions: 35000,
    Refunded: 0,
    Interest: 4000,
  }
];

export default function SuperContributions() {
  const [extraSuper, setExtraSuper] = useState(0);
  const [timeOff, setTimeOff] = useState(6); // Default: 6 months off
  const [contributionMethod, setContributionMethod] = useState("before");

  const salary = 70000;
  const superRate = 0.115;
  const superTaxRate = 0.15;
  const expectedReturn = 0.07;
  const inflationRate = 0.04;
  const yearsUntilRetirement = 34;
  
  // Calculate lost super from taking time off
  const lostSuper = ((salary * superRate) * (timeOff / 12)) * (1 + expectedReturn) ** yearsUntilRetirement;
  
  // Calculate weekly voluntary contribution to offset loss
  const weeksToContribute = contributionMethod === "before" ? 104 : contributionMethod === "during" ? timeOff * 4 : 104;
  const weeklyContribution = lostSuper / weeksToContribute;

  // Graph Data: Super Growth Scenarios
  const graphData = Array.from({ length: yearsUntilRetirement }, (_, i) => {
    const year = i + 1;
    return {
      year: 2024 + year,
      Baseline: (salary * superRate) * (1 + expectedReturn) ** year,
      WithoutContributions: (salary * superRate) * (1 + expectedReturn) ** (year - (timeOff / 12)),
      WithVoluntary: (salary * superRate + weeklyContribution * 52) * (1 + expectedReturn) ** year,
    };
  });

  return (
    <div className="w-screen p-6 bg-[RGB(250,251,252)] relative">
      <div className="mt-10"></div>

      <div className="flex mt-20 justify-evenly">
        <div className="flex justify-center items-center">
          <div className="w-[30rem]">
  
            <Calc />
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center">
        <div className="flex justify-start mb-5">
                  <Button className="rounded-3xl mr-5 w-36">Inflation Adjusted</Button>
                  <Button className="rounded-3xl w-36">Non Inflation</Button>
                </div>
          <Breakdown />
          <div className="mt-10 w-full flex flex-col items-center">
        <h2 className="text-xl font-bold">Mitigate Your Super Gap</h2>
        <p className="text-gray-600 text-sm">See How Voluntary Contributions can close the Gap</p>
        <div className="w-[40rem] h-[20rem] mt-6 bg-gray-100 p-4 rounded-lg">
<Graph></Graph>         
        </div>

        <p className="mt-4 text-gray-700 font-semibold">To fully offset your super loss, contribute <span className="text-blue-500">${weeklyContribution.toFixed(2)} per week</span> for {weeksToContribute} weeks.</p>
      </div>


        </div>
      </div>

      
      <EverydayTerms />
    </div>
  );
}