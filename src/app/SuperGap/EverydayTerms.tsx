import React from 'react'
import { Coffee } from "../AnimationComponents/Coffee";
import { Passport } from "../AnimationComponents/Passport";
import { Dinner } from "../AnimationComponents/Dinner";
import { Dental } from "../AnimationComponents/Dental";
import { Iphone } from "../AnimationComponents/Iphone";
import { Hotelbed } from "../AnimationComponents/Hotelbed";
import Info from '../FHSS/Info';

const EverydayTerms = () => {
  return (
    <div className=" bg-gray-100 h-[39rem] w-full rounded-[5rem]">
        <div className="flex flex-col items-center p-10 w-full">
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">Understand Your Gap</p>
            <h2 className="font-bold xs:text-[1rem] sm:text-[1.7rem] md:text-[2.3rem]">In Everyday Terms.</h2>
        </div>
    
        <div className="flex flex-wrap justify-center gap-8 ">

            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
                <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                <div className="flex justify-center mb-4">
                    <Coffee></Coffee>
                </div>
                <h2 className="font-semibold">3750 Coffees</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
                <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                <div className="flex justify-center mb-4">
                    <Passport></Passport>
                </div>
                <h2 className="font-semibold">2 International Trips</h2>
            </div>
    
            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
                <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                <div className="flex justify-center mb-4">
                    <Dinner></Dinner>
                </div>
                <h2 className="font-semibold">214 Dinners Out</h2>
            </div>
    
            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
                <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                <div className="flex justify-center mb-4">
                    <Dental></Dental>
                </div>
                <h2 className="font-semibold">100 Dental Check-Ups</h2>
            </div>
    
            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
            <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
            <div className="flex justify-center mb-2">
                    <Iphone></Iphone>
                </div>
                <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[17rem] lg:w-[17rem] sm:h-[13rem] lg:h-[13rem] relative">
                <Info className = {"absolute top-4 right-4 w-8 h-8 flex justify-center items-center"}></Info>
                <div className="flex justify-center mb-4">
                    <Hotelbed></Hotelbed>
                </div>
                <h2 className="font-semibold">100 Nights Away</h2>
            </div>
        </div>
    </div>
  )
}

export default EverydayTerms