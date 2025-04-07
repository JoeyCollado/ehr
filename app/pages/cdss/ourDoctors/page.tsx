import Doctors from "@/app/components/Doctors";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
      <div className="w-full max-w-6xl bg-white text-black shadow-lg rounded-lg p-6">
       <Doctors/>
      </div>
    </div>
  );
};

export default page;