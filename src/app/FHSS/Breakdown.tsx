import React from 'react'
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import Info from "./Info";
import { motion } from "motion/react"
import TheDifference from './TheDifference';
import SideBySide from './SideBySide';
import BarGraph from './BarGraph';



const Breakdown = () => {
  return (
    <div className="flex flex-col items-center  w-full">

      <div className='w-full flex justify-center'>
        <TheDifference></TheDifference>
      </div>
      <div className="flex justify-center">
      <div className="w-[37rem] h-[27rem] mt-6 bg-gray-100 p-4 rounded-lg flex justify-center">
        <BarGraph></BarGraph>
        </div>
      </div>


</div>
  )
}

export default Breakdown