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
          className={`font-bold text-5xl transition-all duration-300 mb-16 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Logo
        </span>
        <span
          className={`font-bold text-5xl transition-all duration-300 mb-16 ${
            isOpen ? "hidden" : "block"
          }`}
        >
          L
        </span>
        <ul className={`${!isOpen ? "space-y-8" : "space-y-6"} w-full flex flex-col text-center`}>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaHome />}
              {isOpen && "Home"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaFileMedical />}
              {isOpen && "Medical History"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaHeartbeat />}
              {isOpen && "Health Assessment"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaVials />}
              {isOpen && "Vital Sheet"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaCapsules />}
              {isOpen && "Laboratory Results"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-full hover:bg-[#ab886a] p-3 rounded-md"
            >
              {!isOpen && <FaNotesMedical />}
              {isOpen && "Medical Administration Record"}
            </Link>
          </li>
        </ul>
      </div>
      <button
        className="text-xl p-2 hover:bg-[#ab886a] w-full rounded-md flex justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
