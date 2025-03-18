"use client"

import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaHeartbeat, FaFileMedical, FaVials, FaCapsules, FaNotesMedical, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white h-screen fixed p-4 flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-60' : 'w-20'}`}>
      <div>
        <span className={`font-bold text-5xl ml-2 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Logo</span>
        <span className={`font-bold text-5xl ml-2 transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}>L</span>
        <ul className="space-y-10 mt-[30%]">
          <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
            <FaHome />
            {isOpen && <Link href="/">Home</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md">
            <FaFileMedical />
            {isOpen && <Link href="/">Medical History</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md">
            <FaHeartbeat />
            {isOpen && <Link href="/">Health Assessment</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md">
            <FaVials />
            {isOpen && <Link href="/">Vital Sheet</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md">
            <FaCapsules />
            {isOpen && <Link href="/">Laboratory Results</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md">
            <FaNotesMedical />
            {isOpen && <Link href="/">Medical Administration Record</Link>}
          </li>
        </ul>
      </div>
      <button className="text-xl p-2 hover:bg-gray-700 rounded-md" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
