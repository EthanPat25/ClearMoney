"use client";

import React from "react";
import { Dental } from "../AnimationComponents/Dental";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { TaxGuidelines } from "../AnimationComponents/TaxGuidelines";
import Info from "../FHSS/Info";

const page = () => {
  return (
    <div className="w-screen h-screen bg-[RGB(250,251,252)] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center p-14 w-full">
        <div className="flex w-full justify-center items-center mt-[80rem]"></div>

        <div className="w-full bg-[RGB(242,242,242)] h-[80rem]">
          <div className="flex flex-col p-5 justify-center items-center w-full mt-20">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">
              Understand
            </p>

            <h1 className=" text-4xl font-bold text-center mt-5">
              Different Tax Rules Apply To{" "}
              <span className="text-[RGB(0,133,135)]">Super.</span>
            </h1>
            <h1 className="text-[RGB(82,95,127)] text-2xl mt-4 text-center">
              {" "}
              Understanding these rules can help you make smarter decisions
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <TaxGuidelines animate={true}></TaxGuidelines>
          </div>

          <h1 className=" text-4xl font-bold mt-16 text-center">
            Super Contributions are classified as either:{" "}
          </h1>

          <div className="flex justify-evenly mt-10 mb-96">
            <div className="flex flex-col p-5 justify-center items-center bg-[RGB(82,105,127)] w-[36rem] h-[20rem] rounded-[2rem] relative">
              <p className="text-sm text-[RGB(251,99,64)] font-semibold">
                Understand
              </p>

              <h2 className="font-bold xs:text-[1rem] sm:text-[1.5rem] md:text-[2.5rem] text-white">
                Concessional
              </h2>

              <ul>
                <li className="text-[RGB(229,229,229)] text-[1.2rem]">
                  1. Contributions from income you haven’t paid tax on yet
                </li>
                <li className="text-[RGB(229,229,229)] text-[1.2rem]">
                  2. Taxed at 15% when deposited into super
                </li>
              </ul>
              <Info
                className={
                  "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
                }
              ></Info>
              <div className="bg-white rounded-full h-[5rem] w-[5rem] justify-center items-center flex absolute left-5 top-5">
                <h1 className="text-center text-md font-bold text-[RGB(0,181,183)]">
                  Before Tax
                </h1>
              </div>
            </div>

            <div className="flex flex-col p-5 justify-center items-center bg-[RGB(82,105,127)] w-[36rem] h-[20rem] rounded-[2rem] relative">
              <p className="text-sm text-[RGB(251,99,64)] font-semibold">
                Understand
              </p>
              <h2 className="font-bold xs:text-[1rem] sm:text-[1.5rem] md:text-[2.5rem] text-white">
                Non-Concessional
              </h2>

              <ul>
                <li className="text-[RGB(229,229,229)] text-lg">
                  1. Contributions from income you’ve already paid tax on
                </li>
                <li className="text-[RGB(229,229,229)] text-lg">
                  2. Not taxed again when deposited into super
                </li>
              </ul>
              <Info
                className={
                  "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
                }
              ></Info>
              <div className="bg-white rounded-full h-[5rem] w-[5rem] justify-center items-center flex absolute left-5 top-5">
                <h1 className="text-center text-md font-bold text-[RGB(0,181,183)]">
                  After <br></br> Tax
                </h1>
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-bold text-2xl text-center p-4">Meet Johnny</h1>

        <div className="flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]">
          <Dental></Dental>

          <p>
            Julia earns $70,000 per year, after tax she takes home $55,000.{" "}
            <br></br> This Year she voluntarily contributed $2,000 to her super.
          </p>
        </div>

        <div className="flex w-full justify-evenly mt-10">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-center p-4">
              Before Notice of Intent
            </h1>

            <div className="flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem] relative">
              <div className="bg-white rounded-full h-20 w-20 justify-center items-center flex absolute left-5 top-5">
                <h1 className="text-center text-2xl font-bold text-[RGB(0,181,183)]">
                  30%
                </h1>
              </div>
              <Dental></Dental>

              <p>
                Her $2,000 was automically classified as non-concessional,
                meaning no extra tax, but no tax deduction.
              </p>
              <p>
                He had already paid 30% tax on it, so no further tax savings.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-center p-4">
              After Notice of Intent
            </h1>

            <div className="flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem] relative">
              <div className="bg-white rounded-full h-20 w-20 justify-center items-center flex absolute left-5 top-5">
                <h1 className="text-center text-2xl font-bold text-[RGB(0,181,183)]">
                  15%
                </h1>
              </div>
              <Dental></Dental>

              <p>
                Johnny reclassifies his $2,000 as concessional. His super fund
                taxes the contribution at 15% ($300 deducted, leaving $1,700 in
                super).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
