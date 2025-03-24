"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white text-[#685442]">
      
      {/* Main Container */}
      <div className="bg-[#FAD2A5] shadow-2xl w-[900px] h-[500px] flex border-[0.1px] border-gray-500">
        
        {/* Left Side - Image */}
        <div className="w-[60%] flex items-center justify-center bg-white ">
          <div className="w-[90%] h-[60%] bg-white shadow-lg flex items-center justify-center">
            <Image alt="X-ray Image" src="/skeleton.png" width={400} height={300} className="w-full h-auto" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-[40%] bg-[#00695C] p-6 flex flex-col justify-between border-[0.1px] border-black ">
          
          <div className="space-y-4 ">
            {/* Name Field */}
            <div>
              <label className="block font-semibold text-white">Name:</label>
              <input type="text" className="w-full border border-gray-500 p-2 bg-white  outline-none" />
            </div>

            {/* Description Field */}
            <div>
              <label className="block font-semibold text-white">Description:</label>
              <textarea className="w-full border border-gray-500 p-2 bg-white outline-none"></textarea>
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block font-semibold text-white">Type:</label>
              <select className="w-full border border-gray-500 p-2 bg-white  outline-none ">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center text-white font-semibold">
            <button className="mx-2 ">Save</button> /
            <button className="mx-2 ">Delete</button> /
            <button className="mx-2 ">Cancel</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Page;
