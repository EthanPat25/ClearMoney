import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16">
      <div className="mt-24 flex flex-col items-center p-10">
        <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
          <Superannuation />
        </div>

        <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem]">
          What Your Super Owns
        </h2>

        <h3 className="text-center text-[rgb(255,255,255)] xs:text-sm sm:text-lg md:text-xl max-w-xl mx-auto mt-3 leading-snug">
          See how your super is invested. Enter your balance to view your share
          of the companies, property, and assets it owns.
        </h3>
      </div>

      <div className="flex justify-center mb-5">
        <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] w-[15rem] h-12 text-[0.9rem] font-bold text-white">
          Enter Your Details
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
  );
};

export default HeroSection;
