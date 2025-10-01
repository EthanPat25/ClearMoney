import React from "react";
import { Coffee } from "../AnimationComponents/Coffee";
import { Passport } from "../AnimationComponents/Passport";
import { Dinner } from "../AnimationComponents/Dinner";
import { Dental } from "../AnimationComponents/Dental";
import { Iphone } from "../AnimationComponents/Iphone";
import { Hotelbed } from "../AnimationComponents/Hotelbed";
import Info from "./Info";
import { motion } from "motion/react";

const EverydayTerms = () => {
  return (
    <div className=" bg-gray-100 w-full pb-16">
      <div className="flex flex-col items-center p-14 w-full">
        <p className="text-sm text-[RGB(251,99,64)] font-semibold">
          Understand The Difference
        </p>
        <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">
          In Everyday Terms?
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Coffee initialSize={230}></Coffee>
          </div>
          <h2 className="font-semibold">3750 Coffees</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Passport initialSize={230}></Passport>
          </div>
          <h2 className="font-semibold">2 International Trips</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Dinner initialSize={230}></Dinner>
          </div>
          <h2 className="font-semibold">214 Dinners Out</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Dental initialSize={230}></Dental>
          </div>
          <h2 className="font-semibold">100 Dental Check-Ups</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-2">
            <Iphone initialSize={230}></Iphone>
          </div>
          <h2 className="font-semibold">10 iPhones</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-6 shadow-md text-center md:w-1/3 lg:w-1/4 sm:h-[18rem] lg:h-[22rem] relative"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            ease: "easeInOut",
          }}
        >
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Hotelbed initialSize={230}></Hotelbed>
          </div>
          <h2 className="font-semibold">100 Nights Away</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default EverydayTerms;
