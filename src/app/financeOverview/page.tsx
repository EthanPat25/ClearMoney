"use client";

import React, { useState } from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { House } from "../AnimationComponents/House";
import { Piee } from "../AnimationComponents/Piee";
import { Bar } from "../AnimationComponents/Bar";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Plant } from "../AnimationComponents/Plant";
import Info from "../FHSS/Info";

export default function SuperContributions() {
  const [extraSuper, setExtraSuper] = useState(0);
  const [Basics, updatebasics] = React.useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col">

      {/* ==== TOP SECTION (TEAL) ==== */}
      <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16">
        <div className="mt-24 flex flex-col items-center p-10">
          <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
            <Superannuation animate={true} />
          </div>
          <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2.2rem] sm:text-[3rem] md:text-[3.7rem]">
            Get a Clearer View of <br /> Your Super
          </h2>
        </div>

              <div className="flex justify-center mb-5">

                <div className="flex w-[31rem] justify-between">
          <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] xs:w-[13.5rem] sm:w-[15rem] h-12 text-[0.9rem] font-bold text-white">
            Start With My Balance
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Button>

            <Button className="flex items-center justify-center gap-2 bg-[RGB(82,105,127)] xs:w-[13.5rem] sm:w-[15rem] h-12 text-[0.9rem] font-bold text-white">
            Analyse Statements <p className="text-[RGB(251,99,64)]">(AI)</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Button>

          </div>
        </div>

    
      </div>

      {/* ==== BOTTOM SECTION (WHITE) ==== */}
      <div className=" bg-gray-100 p-6 h-[50rem]">
               <div className="flex flex-col items-center p-14 w-full">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">See Your Super Story</p>
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">Use Our Tools</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-5">

          {/* Card 1 */}
          <motion.div className="bg-[RGB(255,255,255)] rounded-2xl p-6 shadow-md w-[24rem] h-[23.5rem] flex flex-col justify-between" animate = {{scale: Basics ? 2 : 1}} whileHover={{scale: Basics ? 2: 1.05}} transition={{type: "spring", stiffness: 200, damping: 10 }}>
            <div>
              <h2 className="font-bold text-center text-[1.1rem]">
                See How Career Breaks Affect Your Retirement Balance
              </h2>
              <div className="flex justify-center my-4">
                <Bar />
              </div>
           
            </div>
            <div className="flex justify-center">
              <Button className="w-[14.5rem] h-10 bg-[RGB(82,105,127)] font-bold">See the Difference</Button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="bg-[RGB(255,255,255)] rounded-2xl p-6 shadow-md w-[24rem] h-[23.5rem] flex flex-col justify-between" animate = {{scale: Basics ? 2 : 1}} whileHover={{scale: Basics ? 2: 1.05}} transition={{type: "spring", stiffness: 200, damping: 10 }}>
            <div>
              <h2 className="font-bold text-center text-[1.1rem]">
                See How Super Can Boost Your First Home Deposit
              </h2>
              <div className="flex justify-center my-4">
                <House />
              </div>
            
            </div>
            <div className="flex justify-center">
              <Button className="w-[14.5rem] h-10 bg-[RGB(82,105,127)] font-bold">Calculate The Boost with FHSS</Button>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div className="bg-[RGB(255,255,255)] rounded-2xl p-6 shadow-md w-[24rem] h-[23.5rem] flex flex-col justify-between" animate = {{scale: Basics ? 2 : 1}} whileHover={{scale: Basics ? 2: 1.05}} transition={{type: "spring", stiffness: 200, damping: 10 }}>
            <div>
              <h2 className="font-bold text-center text-[1.1rem]">
                See What Your Super Fund Actually Invests In
              </h2>
              <div className="flex justify-center my-4">
                <Piee />
              </div>
             
            </div>
            <div className="flex justify-center">
              <Button className="bg-[RGB(82,105,127)] w-[14.5rem] h-10 font-bold">See Where It’s Invested</Button>
            </div>
          </motion.div>

        </div>
      </div>
       <div className="flex flex-col items-center p-14 w-full">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">See Your Super Story</p>
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">Learn</h2>
        </div>

           <div className="flex flex-col items-start p-14 w-full">
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[2.5rem]">Superannuation Basics</h2>
        </div>

         <div className="flex flex-col items-start p-14 w-full">
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[2.5rem]">Superannuation and Tax</h2>
        </div>

              <motion.div className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-72 h-72 flex flex-col justify-center items-center" animate = {{scale: Basics ? 2 : 1}} whileHover={{scale: Basics ? 2: 1.05}} transition={{type: "spring", stiffness: 200, damping: 10 }} onClick={()=> (updatebasics(true))}>
                    <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                    <Plant animate = {true}></Plant>
                    <h2 className="font-semibold text-white">Super Basics</h2>
                </motion.div>

    </div>

    
  );
}
