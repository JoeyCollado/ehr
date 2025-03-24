"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="md:text-7xl h-screen bg-white h-scren text-5xl text-center flex-grow text-[#685442] flex items-center justify-center">
        
      <div className="bg-white shadow-2xl w-[900px] h-[500px] flex ">

        <div className="flex flex-row flex-grow">
        <div className="right bg-red-500 flex-2">
            <div className="image-container justify-center align-middle bg-white w-[80%] h-[80%] ml-[10%] mt-[5%]">
            <Image alt="radio image" src="/skeleton.png" width={50} height={50} className="w-full h-full"></Image>
            </div>
        </div>
        <div className="left bg-blue-500 flex-1">
            
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
