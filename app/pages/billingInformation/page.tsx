"use client";
import React from "react";

const Page = () => {
  return (
    <div className="h-scren text-center flex-grow bg-white text-[#3A2B22] flex items-center justify-center">
      <div className="bg-red-500 h-[80vh] w-[60%] mt-[10%] mb-[10%] flex flex-col">
      <div className="bg-red-300 flex-[0.5]">Medical Billing Invoice</div>

        <div className="flex-2 flex">      
         <div className="bg-red-500 flex-1">
          Patient Information<br></br>

         </div>
          <div className="bg-red-400 flex-1">
          Prescribing Physician Information<br></br>
          </div>
        </div>
        <div className="flex-1 bg-blue-500"></div>
        <div className="flex-2 bg-blue-400"></div>
        <div className="flex-[1] bg-blue-300"></div>

      </div>
    </div>
  );
};

export default Page;
