"use client";
import Footer from "@/app/components/Footer";
import React from "react";


const Page = () => {


  return (
    <>
    <div className="h-screen font-sans bg-white  text-[#3A2B22] flex flex-col items-center text-center p-6">
      {/* Welcome Message */}
      <h1 className="text-6xl md:text-7xl font-bold mt-[15%]">Welcome Back!</h1>
      <p className="text-xl mt-4">Manage your health records with ease</p>

  
    </div>
    <Footer/>
       </>
  );
};

export default Page;