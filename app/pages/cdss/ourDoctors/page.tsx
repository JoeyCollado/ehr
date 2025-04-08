"use client"
import Doctors from "@/app/components/Doctors";
import React from "react";
import doctorsData from "@/app/data/doctors.json";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <>
      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%] mt-[10%]">
        <div className="w-full max-w-6xl bg-white text-black shadow-lg rounded-lg p-6">
          {/* Title for the doctors section */}

          <h1 className="text-5xl font-bold mb-8 text-[#00695C] text-center">
            Our Doctors
          </h1>

          {/* Doctors list with spacing between each doctor card */}
          <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
          <div className="space-y-8">
     
            {doctorsData.map((doctor, index) => (
              <Doctors
                key={index}
                photo={doctor.photo}
                firstName={doctor.firstName}
                lastName={doctor.lastName}
                role={doctor.role}
                roomNo={doctor.roomNo}
                time={doctor.time}
                day={doctor.day}
                officeNumber={doctor.officeNumber}
                phoneNumber={doctor.phoneNumber}
              />
            ))}
              
          </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Page;
