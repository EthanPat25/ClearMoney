import React from 'react'
import { Dental } from '../AnimationComponents/Dental'

const page = () => {
  return (
    <div className='w-screen h-screen bg-[RGB(250,251,252)] flex flex-col justify-center items-center'>
    <div className="flex flex-col items-center p-14 w-full">
        <div className='flex w-full justify-center items-center mt-28'>
            <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]'>
                <p className="text-sm text-[RGB(251,99,64)] font-semibold">Understand</p>
                <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">Do After-Tax Super Contributions Mean I Pay More Tax?</h2>
            </div>
        </div>

        <div className='mt-32'>
            <h1 className='font-bold text-2xl'>How Superannuation is Taxed: Different Rules Apply</h1>
            <p>How much tax you pay depends on whether your contributions are classified as concessional or non-concessional</p>
        </div>

    
        <div className='flex'>

            <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]'>
            <p className="text-sm text-[RGB(251,99,64)] font-semibold">Understand</p>

                <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">Concessional</h2>

                <ul>
                    <li>Contributions from income you haven’t paid tax on yet</li>
                    <li>Taxed at 15% when deposited into super</li>
                </ul>
            </div>

            <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]'>
                <p className="text-sm text-[RGB(251,99,64)] font-semibold">Understand</p>
                <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">Non-Concessional</h2>

                <ul>
                    <li>Contributions from income you’ve already paid tax on (Your Marginal Rate: 37%) </li>
                    <li>Not taxed again when deposited into super</li>
                </ul>

            </div>

        </div>

        <h1 className='font-bold text-2xl text-center p-4'>Meet Johnny</h1>

        <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem]'>
<Dental></Dental>

    <p>Julia earns $70,000 per year, after tax she takes home $55,000. <br></br> This Year she voluntarily contributed $2,000 to her super.</p>
                

            </div>



            <div className='flex w-full justify-evenly mt-10'>

                <div className='flex flex-col'>

            <h1 className='font-bold text-2xl text-center p-4'>Before Notice of Intent</h1>

            <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem] relative'>
            <div className="bg-white rounded-full h-20 w-20 justify-center items-center flex absolute left-5 top-5">
                <h1 className='text-center text-2xl font-bold text-[RGB(0,181,183)]'>30%</h1>
            </div>
<Dental></Dental>

    <p>Her $2,000 was automically classified as non-concessional, meaning no extra tax, but no tax deduction.</p>
    <p>He had already paid 30% tax on it, so no further tax savings.</p>
                

            </div>

            </div>


            <div className='flex flex-col'>

            <h1 className='font-bold text-2xl text-center p-4'>After Notice of Intent</h1>


            <div className='flex flex-col p-5 justify-center items-center bg-[RGB(242,242,242)] w-[36rem] h-[20rem] rounded-[2rem] relative'>
            <div className="bg-white rounded-full h-20 w-20 justify-center items-center flex absolute left-5 top-5">
                <h1 className='text-center text-2xl font-bold text-[RGB(0,181,183)]'>15%</h1>
            </div>
<Dental></Dental>

    <p>Johnny reclassifies his $2,000 as concessional.
His super fund taxes the contribution at 15% ($300 deducted, leaving $1,700 in super).
</p>
                

            </div>

            </div>

            </div>
    </div>
    </div>
  )
}

export default page