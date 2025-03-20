
"use client";
import VitalSheetTable from "@/app/components/VitalSheetTable";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FEC5BB] via-[#FAE1DD] to-[#D8E2DC] text-[#3A2B22] flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <VitalSheetTable />
      </div>
    </div>
  );
};

export default Page;
