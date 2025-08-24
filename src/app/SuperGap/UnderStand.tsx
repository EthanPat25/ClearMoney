import React from "react";
import { Wallet } from "../AnimationComponents/Wallet";
import { CompoundGrowth } from "../AnimationComponents/CompoundGrowth";
import { Graph } from "../AnimationComponents/Graph";
import { PotPlant } from "../AnimationComponents/PotPlant";
import { ParentA } from "../AnimationComponents/ParentA";
import { ParentB } from "../AnimationComponents/ParentB";

const UnderStand = () => {
  return (
    <div className=" bg-gray-100 h-[37%] mt-20 rounded-[5rem]">
      <div className="flex flex-col items-center p-10 w-full">
        <p className="text-sm text-[RGB(251,99,64)] font-semibold">
          The Bigger Picture
        </p>
        <h2 className="font-bold xs:text-[1rem] sm:text-[1.7rem] md:text-[2.3rem]">
          Why Super Gaps Matter?
        </h2>
      </div>

      <div className="pl-28 pr-28">
        <div className="flex flex-row">
          <div className="w-[50rem] flex flex-col justify-center">
            <div className="flex items-center">
              <h1 className="font-semibold text-5xl mr-3 text-[RGB(0,181,183)]">
                1.{" "}
              </h1>
              <h1 className="font-semibold text-2xl">
                Income breaks = contribution breaks
              </h1>
            </div>
            <p className="text-lg mt-4 mb-6 text-justify">
              Parenting, study, or time off for health can sometimes mean less
              super.
            </p>
          </div>
          <div className="flex justify-center items-center w-[30rem]">
            <Wallet animate={true}></Wallet>
          </div>
        </div>

        <div className="flex flex-row mt-4">
          <div className="flex justify-center items-center w-[30rem]">
            <CompoundGrowth animate={true}></CompoundGrowth>
          </div>
          <div className="w-[50rem] flex flex-col justify-center">
            <div className="flex items-center">
              <h1 className="font-semibold text-5xl mr-3 text-[RGB(0,181,183)]">
                2.{" "}
              </h1>
              <h1 className="font-semibold text-2xl">Compounding matters</h1>
            </div>
            <p className="text-lg mt-4 mb-6 text-justify">
              Early and steady contributions grow the most over decades.
            </p>
          </div>
        </div>

        <div className="flex flex-row mt-4">
          <div className="w-[50rem] flex flex-col justify-center">
            <div className="flex items-center">
              <h1 className="font-semibold text-5xl mr-3 text-[RGB(0,181,183)]">
                3.{" "}
              </h1>
              <h1 className="font-semibold text-2xl">Not equal for everyone</h1>
            </div>
            <p className="text-lg mt-4 mb-6 text-justify">
              {" "}
              Women, carers, First Nations Australians, and part-time workers on
              average retire with less.
            </p>
          </div>
          <div className="flex justify-center items-center w-[30rem]">
            <Graph animate={true}></Graph>
          </div>
        </div>

        <div className="flex flex-row mt-4">
          <div className="flex justify-center items-center w-[30rem]">
            <PotPlant animate={true}></PotPlant>
          </div>
          <div className="w-[50rem] flex flex-col justify-center">
            <div className="flex items-center">
              <h1 className="font-semibold text-5xl mr-3 text-[RGB(0,181,183)]">
                4.{" "}
              </h1>
              <h1 className="font-semibold text-2xl">Often invisible</h1>
            </div>
            <p className="text-lg mt-4 mb-6 text-justify">
              Many don’t notice gaps until it’s too late. Awareness helps you
              plan.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full flex bg-[RGB(82,105,127)] h-[25rem] relative">
        <div className="w-[56rem] flex justify-center flex-col items-center bg-[RGB(82,105,127)]">
          <h1 className="text-3xl font-bold text-[RGB(251,99,64)]">
            Meet Parent A and Parent B
          </h1>

          <p className="mt-2 text-xl text-center text-[RGB(229,229,229)]">
            After their first child, Parent B works part-time for 10 years to
            care for family.
          </p>
          <br></br>
          <p className="text-lg text-center text-[RGB(229,229,229)]">
            Even after returning to full-time work, Parent B retires with
            $80,000 less super than Parent A.
          </p>
          <p className="text-lg text-center text-[RGB(229,229,229)]">
            How did this happen? It’s called a{" "}
            <span className="text-[RGB(0,181,183)] font-semibold">
              SuperGap
            </span>{" "}
            – and it’s more common than you might think.
          </p>
          <button className="px-6 py-2 bg-[RGB(251,99,64)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 mt-10">
            Learn About Compound Interest
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center rounded-2xl">
            <ParentA animate={true}></ParentA>
            <h1 className="text-center font-bold text-white">
              Parent A: <span className="font-normal">$500,000</span>
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center rounded-2xl">
            <ParentB animate={true}></ParentB>
            <h1 className="text-center font-bold text-white">
              Parent B: <span className="font-normal">$400,000</span>
            </h1>
          </div>
        </div>
        <div className="rounded-full bg-white absolute top-5 left-5 h-20 w-20 flex justify-center items-center">
          <h1 className="font-bold text-[RGB(0,181,183)] text-center">
            Case Study
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UnderStand;
