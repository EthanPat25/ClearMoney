"use client";

import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import Info from "../FHSS/Info";
import { Plant } from "../AnimationComponents/Plant";
import { House } from "../AnimationComponents/House";
import { Calculator } from "../AnimationComponents/Calculator";
import { motion } from "motion/react";

const Page = () => {
  const [Basics, updatebasics] = React.useState(false);

  return (
    <div className="w-screen h-screen bg-[RGB(250,251,252)] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center p-14 w-full">
        <div className="flex w-full justify-center items-center mt-28">
          <div className="flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">
              Understand
            </p>
            <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">
              Superannuation?
            </h2>
            <Superannuation></Superannuation>
          </div>
        </div>

        <div className="flex justify-evenly mt-20 w-full">
          <motion.div
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-72 h-72 flex flex-col justify-center items-center"
            animate={{ scale: Basics ? 2 : 1 }}
            whileHover={{ scale: Basics ? 2 : 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            onClick={() => updatebasics(true)}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <Plant></Plant>
            <h2 className="font-semibold text-white">Super Basics</h2>
          </motion.div>
          <motion.div
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-72 h-72 flex flex-col justify-center items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <h2 className="font-semibold text-white">Super and Tax</h2>
          </motion.div>
          <motion.div
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-72 h-72 flex flex-col justify-center items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <House></House>
            <h2 className="font-semibold text-white">
              First Home Super Saver (FHSS)
            </h2>
          </motion.div>
          <motion.div
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-72 h-72 flex flex-col justify-center items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <Calculator></Calculator>
            <h2 className="font-semibold text-white text-center">
              Tools for Super
            </h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
