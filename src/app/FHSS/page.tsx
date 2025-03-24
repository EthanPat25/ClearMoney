"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/login-form"
import { Coffee } from "../AnimationComponents/Coffee";
import { Passport } from "../AnimationComponents/Passport";
import { Dinner } from "../AnimationComponents/Dinner";
import { Dental } from "../AnimationComponents/Dental";
import { Iphone } from "../AnimationComponents/Iphone";
import { Hotelbed } from "../AnimationComponents/Hotelbed";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableDemo } from "./Table";
import Info from "./Info";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import EverydayTerms from "./EverydayTerms";
import Breakdown from "./Breakdown";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from "@/components/ui/button";
import BarGraph from "./BarGraph";
import SideBySide from "./SideBySide";


export default function SuperContributions() {
  const [showInfo, setShowInfo] = useState(false);
  const [extraSuper, setExtraSuper] = useState(0);
  
  const salary = 70000;
  const marginalTaxRate = 0.325; // Example: 32.5% tax rate
  const superTaxRate = 0.15;

  // Calculate the tax savings if contributing extra to super
  const taxSavings = extraSuper * (marginalTaxRate - superTaxRate);
  const takeHomePay = salary - salary * marginalTaxRate - extraSuper + taxSavings;

  // bg-[RGB(250,251,252)]
  //  bg-gray-100

  return (
    <div className="w-screen p-6 bg-[RGB(250,251,252)] relative">
        <div className="mt-10">
        </div>

        <div className="flex mt-20 justify-evenly">
          <div className="flex justify-center items-center">
            <div className="w-[30rem]">
              <h1 className="ml-4 mb-1 text-[0.8rem] hover:underline hover:cursor-pointer" >
                <a>
                Confused by the Difference?
                </a>
                </h1>
              <LoginForm/>
            </div>
          </div>


          <div className="flex flex-col w-1/2 items-center">

          <Breakdown></Breakdown>
                </div>
          </div>


          <div className="w-full h-[50rem] flex flex-col items-center pt-12">



          <div className="flex flex-col items-center p-6 w-full">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">Understand</p>
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">The Breakdown</h2>
          </div>
          

     <div className="w-[75%]">

        <SideBySide></SideBySide>

        </div>

            

          
          

            </div>

<EverydayTerms></EverydayTerms>

    </div>
  );
}