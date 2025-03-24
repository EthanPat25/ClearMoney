import React from 'react'
import Info from './Info'
import { motion } from "motion/react"

const SideBySide = () => {
  return (
    <div className="flex w-full justify-evenly">


        <motion.div className='bg-white rounded-3xl shadow-md w-[45%] text-center mt-5 h-[27rem]' initial = {{opacity: 0, x: -200}} whileInView = {{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 100, damping: 14, ease: "easeInOut"}} viewport={{ once: true }}>
        <div className="p-6 pb-0 w-full border-solid border-[RGB(246,246,249)] border-b">
    <h1 className="mb-4 text-left text-lg font-bold">FHSS</h1>
    </div>
    <div className="p-6 pt-0">
    <div className="mt-4 flex justify-between">
    <h2 className="text-left">Voluntary Contribution</h2>
    <h2 className="text-left">+ $35,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Tax Refunded</h2>
    <h2 className="text-left">+ $11,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Interest Earnt</h2>
    <h2 className="text-left">+ $4,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
      <div className="flex justify-center items-center">
    <h2 className="text-left font-bold">Total Eligible
    </h2>
    <Info className = {"ml-1 w-4 h-4 flex justify-center items-center"}></Info>
    </div>
    <h2 className="text-left font-bold">$50,000
    </h2>
    </div>
    <hr className="w-full border-[RGB(246,246,249)]"></hr>
    <div className="mt-4 flex justify-between">
    <h2 className="text-left">Widthdrawal Tax</h2>
    <h2 className="text-left">- $10,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Tax Offset
    </h2>
    <h2 className="text-left">+ $10,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
      <div className="flex justify-center items-center">
    <h2 className="text-left font-bold">Total Tax
    </h2>
    <Info className = {"ml-1 w-4 h-4 flex justify-center items-center"}></Info>
    </div>
    <h2 className="text-left font-bold">$0
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">Widthdrawable
    </h2>
    <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">$50,000
    </h2>
    </div>
    
    </div>
    
    
    
    
    </motion.div>

    <motion.div className='bg-white rounded-3xl shadow-md w-[45%] text-center mt-5 h-[27rem]' initial = {{opacity: 0, x: 200}} whileInView = {{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 100, damping: 14, ease: "easeInOut", delay: 0.3}} viewport={{ once: true }}>

    
    <div className="p-6 pb-0 w-full border-solid border-[RGB(246,246,249)] border-b">
    <h1 className="mb-4 text-left text-lg font-bold">Bank Account</h1>
    </div>
    <div className="p-6 pt-0">
    <div className="mt-4 flex justify-between">
    <h2 className="text-left">Voluntary Contribution</h2>
    <h2 className="text-left">+ $35,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Tax Refunded</h2>
    <h2 className="text-left">N/A
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Interest Earnt</h2>
    <h2 className="text-left">+ $4,000
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left font-bold">Total Eligible</h2>
    <h2 className="text-left font-bold">$39,000
    </h2>
    </div>
    <hr className="w-full border-[RGB(246,246,249)]"></hr>
    <div className="mt-4 flex justify-between">
    <h2 className="text-left">Widthdrawal Tax</h2>
    <h2 className="text-left">N/A
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left">Tax Offset
    </h2>
    <h2 className="text-left">N/A
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left font-bold">Total Tax
    </h2>
    <h2 className="text-left font-bold">$0
    </h2>
    </div>
    <div className="mt-4 mb-4 flex justify-between">
    <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">Withdrawable
    </h2>
    <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">$39,000
    </h2>
    </div>
    
    </div>

    </motion.div>

    
    </div>
  )
}

export default SideBySide