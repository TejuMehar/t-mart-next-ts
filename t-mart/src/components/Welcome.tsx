"use client";
import React from "react";
import { animate, motion } from "motion/react";
import { ArrowRight, BikeIcon, ShoppingBasket } from "lucide-react";

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-5"
      >
        <ShoppingBasket className="w-15 h-15 text-green-600" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          T-Mart
        </h1>
      </motion.div>
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg "
      >
        Your One Stop Destination For Fresh groceries,organic produce, and daily
        essentails delivered right to your doorstep.
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center mt-10 gap-10"
      >
        <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32  text-green-600" />
        <BikeIcon className="w-24 h-24 md:w-32 md:h-32  text-orange-600" />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="inline-flex item-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semiblod py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-10"
      >
        Next <ArrowRight />
      </motion.button>
    </div>
  );
}

export default Welcome;
