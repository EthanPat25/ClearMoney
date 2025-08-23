"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";


import Info from "../FHSS/Info";

import { Tabs } from "@/components/ui/tabs";
import { Superannuation } from "../AnimationComponents/Superannuation";


export default function SuperContributions() {
  const [inflation, setInflation] = useState(true);
  const [view, setView] = useState<"terms" | "case" | "close">("terms");

   

  return (

    <>
        <div className="w-screen min-h-screen flex flex-col">

        <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16">
            <div className="mt-24 flex flex-col items-center p-10">
              <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
                <Superannuation animate={true} />
              </div>
              <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2.5rem] sm:text-[3rem] md:text-[3.7rem]">
                Your Super Isn’t Just Sitting There<br /> 
              </h2>
              <h3 className="text-center text-[1.3rem] text-[RGB(255,255,255)]">If you’re with a super fund, your money’s likely invested in companies, projects, and industries. 
<br></br>Get a dollar-by-dollar breakdown based on your balance.</h3>
            </div>
    
                  <div className="flex justify-center mb-5">
    
                 
              <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] w-[15rem] h-12 text-[0.9rem] font-bold text-white">
                See My Investments
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
   

      {/* FULL-WIDTH TOGGLE + CONTENT */}
      <section className="mt-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white">
       
      </section>

       
    </div>

    </div>

    </>
  );
}
