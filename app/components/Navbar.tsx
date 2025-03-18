  "use client";

  import Link from "next/link";
  import { useState } from "react";
  import {
    FaHome,
    FaHeartbeat,
    FaFileMedical,
    FaVials,
    FaCapsules,
    FaNotesMedical,
    FaBars,
  } from "react-icons/fa";

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div
        className={`bg-[#685442] text-[#EAE0D5] h-screen fixed p-4 flex flex-col justify-between transition-all duration-300 ${
          isOpen ? "w-60" : "w-20"
        }`}
      >
        <div className="flex flex-col items-center w-full">
          <span
            className={`font-bold text-2xl mt-5 transition-all duration-300 mb-12 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Tamaraw Services
          </span>
          <span
            className={`font-bold text-3xl mt-5 transition-all duration-300 mb-12 ${
              isOpen ? "hidden" : "block"
            }`}
          >
            TS
          </span>
          <ul className={`${!isOpen ? "space-y-8" : "space-y-6"} w-full flex flex-col text-center`}><hr></hr>
            <li>
              <Link
                href="/pages/home"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaHome />}
                {isOpen && "Home"}
              </Link>
            </li>
            <li>
              <Link
                href="/pages/medicalHistory"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaFileMedical />}
                {isOpen && "Medical History"}
              </Link>
            </li>
            <li>
              <Link
                href="/pages/healthAssessment"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaHeartbeat />}
                {isOpen && "Health Assessment"}
              </Link>
            </li>
            <li>
              <Link
                href="/pages/vitalSheet"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaVials />}
                {isOpen && "Vital Sheet"}
              </Link>
            </li>
            <li>
              <Link
                href="/pages/laboratoryResults"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaCapsules />}
                {isOpen && "Laboratory Results"}
              </Link>
            </li>
            <li>
              <Link
                href="/pages/medicalAdministrationRecord"
                className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
              >
                {!isOpen && <FaNotesMedical />}
                {isOpen && "Medical Administration Record"}
              </Link>
            </li>
          </ul>
        </div><hr></hr>
        <button
          className="text-xl p-2 hover:bg-[#ab886a] w-full rounded-md flex justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars /> 
        </button>
      </div>
    );
  };
  export default Navbar;
