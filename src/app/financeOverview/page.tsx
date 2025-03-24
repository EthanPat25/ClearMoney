"use client";

import React, { useState } from "react";
import { Medicare } from "../AnimationComponents/Medicare";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Money } from "../AnimationComponents/Money";
import { Taxes } from "../AnimationComponents/Taxes";
import { House } from "../AnimationComponents/House";
import Pie from "./Pie";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import Info from "../FHSS/Info";
import Pie1 from "./Pie1";
import { motion } from "motion/react"

export default function SuperContributions() {
  const [showInfo, setShowInfo] = useState(false);
  const [extraSuper, setExtraSuper] = useState(0);
  
  const salary = 70000;
  const marginalTaxRate = 0.325; // Example: 32.5% tax rate
  const superTaxRate = 0.15;

  // Calculate the tax savings if contributing extra to super
  const taxSavings = extraSuper * (marginalTaxRate - superTaxRate);
  const takeHomePay = salary - salary * marginalTaxRate - extraSuper + taxSavings;

  return (
    <div className="w-screen p-6 bg-[RGB(250,251,252)] relative">
                <div className="mt-10"></div>

      <div className="flex flex-col items-center p-6 w-full">
        <p className="text-sm text-[RGB(251,99,64)] font-semibold">Visualise</p>
        <h2 className="font-bold xs:text-[1.5rem] sm:text-[2rem] md:text-[2.5rem]">Where Does My Salary Go?</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-3xl p-6 shadow-md w-[70%] text-center">
    
          {/* Slider for extra super contributions */}

          <div className="w-full flex">
            <div className="flex flex-col w-1/2 justify-center items-center">
              <h2 className="font-bold text-xl text-[RGB(82,83,127)]">Your Income: $70,000</h2>
              <p>Your Pay After Tax: ${takeHomePay.toLocaleString()}</p>
              <p className="text-sm text-[RGB(251,99,64)] font-semibold mt-52 mb-3">10% Higher than the Median</p>

              <div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>
            </div>
            <div className=" h-96 w-1/2 flex justify-center items-center">
              <Pie1></Pie1>
            </div>

          </div>
                
        </div>
      </div>
      
      {/* Salary Allocation Cards */}
      <div className="flex justify-evenly mt-20">
        {[
          { label: "Paid to you", icon: <MoneyBag sizeSp = {150}></MoneyBag>, amount: takeHomePay },
          { label: "Paid in taxes", icon: <Taxes animate = {true}></Taxes>, amount: salary * marginalTaxRate },
          { label: "Paid into Medicare", icon: <Medicare animate = {true}></Medicare>, amount: 2000 },
          { label: "Paid into Super", icon: <Superannuation animate = {true}></Superannuation>, amount: 7000 }
        ].map((item, index) => (
          <motion.div key={index} className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-1/5" whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 200, damping: 10 }}>
                        <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
            <h2 className="font-semibold text-white">{item.label}</h2>
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h2 className="font-semibold text-white">${item.amount.toLocaleString()}</h2>
          </motion.div>
        ))}
      </div>
        </div>
  );
}