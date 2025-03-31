
"use client";
import VitalSheetTable from "@/app/components/VitalSheetTable";
import React from "react";
import Subnav from "../Subnav";

const Page = () => {
  return (
    <>
    <div className="min-h-screen w-full mt-[5%] bg-[#faf6f6] text-[#3A2B22] flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <VitalSheetTable />
        <Subnav/>
      </div>

    </div>
    </>
  );
};

export default Page;
