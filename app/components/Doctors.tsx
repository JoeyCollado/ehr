import React from "react";
import { motion } from "framer-motion";

interface DoctorProps {
  photo: string;
  firstName: string;
  lastName: string;
  role: string;
  roomNo: string;
  time: string;
  day: string;
  officeNumber: string;
  phoneNumber: string;
}

const Doctors = ({
  photo,
  firstName,
  lastName,
  role,
  roomNo,
  time,
  day,
  officeNumber,
  phoneNumber,
}: DoctorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative p-6 font-sans bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-8 pb-12">
        {/* Left Section - Image and Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-48 h-48 bg-gray-100 rounded-xl shadow-sm overflow-hidden hover:scale-105 duration-300 ease-in-out">
            <img
              src={photo}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="text-center md:text-left mt-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {firstName}{" "}
              <span className="text-[#00695C]">{lastName}</span>
            </h1>
            <p className="text-lg font-medium text-gray-600 mt-2">{role}</p>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className="md:ml-auto text-right self-end">
          <div className="text-sm space-y-3 text-gray-700">
            <div>
              <p className="font-bold text-lg">{roomNo}</p>
            </div>
            <div>
              <p className="font-semibold">{time}</p>
              <p>{day}</p>
            </div>
            <div>
              <p className="font-semibold">{officeNumber}</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Green Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#00695C] rounded-b-xl"></div>
    </motion.div>
  );
};

export default Doctors;
