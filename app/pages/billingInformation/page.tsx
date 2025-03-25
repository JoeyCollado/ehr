"use client";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#ffffff] text-[#3A2B22]">
            <button className="bg-blue-500 rounded-md text-white text-center justify-center px-2 py-1 absolute top-10 cursor-pointer">Edit</button>
      <div className="border-2 border-[#3A2B22] p-6 w-[80%] max-w-4xl bg-[#ffffff]">
        <h1 className="text-2xl font-bold text-center mb-6">Medical Billing Invoice</h1>
        
        <div className="grid grid-cols-2 gap-6 border-b-2 border-[#3A2B22] pb-4 mb-4">
          <div>
            <h2 className="font-semibold">Patient Information</h2>
            <p className="italic font-bold">A.J.S.</p> {/* has data to be input */}
            <p className="italic font-bold">Contact Number</p> {/* has data to be input */}
            <p className="italic font-bold">Address</p> {/* has data to be input */}
          </div>
          <div>
            <h2 className="font-semibold">Prescribing Physician Information</h2>
            <p className="italic font-bold">Name</p> {/* has data to be input */}
            <p className="italic font-bold">Contact Number</p> {/* has data to be input */}
            <p className="italic font-bold">Address</p> {/* has data to be input */}
          </div>
        </div>
        
        <div className="grid grid-cols-4 text-center font-semibold border-b-2 border-[#3A2B22] pb-2 mb-4">
          <div>INVOICE NUMBER</div> {/* has data to be input */}
          <div>DATE</div> {/* has data to be input */}
          <div>INVOICE DUE DATE</div> {/* has data to be input */}
          <div>AMOUNT DUE</div> {/* has data to be input */}
          <div className="italic col-span-1">INV12245</div>
          <div className="italic col-span-1">21/03/2025</div>
          <div className="italic col-span-1">20/04/2025</div>
          <div className="italic col-span-1">Info</div>
        </div>

        <div className="border-2 border-[#3A2B22] mb-4">
          <div className="grid grid-cols-3 text-center font-semibold border-b-2 border-[#3A2B22] p-2">
            <div>ITEM</div> {/* has data to be input */}
            <div>DESCRIPTION</div> {/* has data to be input */}
            <div>AMOUNT</div> {/* has data to be input */}
          </div>
          <div className="grid grid-cols-3 text-center italic p-2">
            <div>Info</div>
            <div>Info</div>
            <div>Info</div>
          </div>
          <div className="grid grid-cols-3 text-center italic p-2">
            <div>Info</div>
            <div>Info</div>
            <div>Info</div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h2 className="font-semibold">Notes</h2> {/* has data to be input */}
            <p className="italic">Info</p>
          </div>
          <div className="text-right">
            <h2 className="font-semibold">Total</h2> {/* has data to be input */}
            <p className="italic">Info</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
