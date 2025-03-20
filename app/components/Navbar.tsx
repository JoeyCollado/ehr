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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    {
      name: "Registration",
      icon: <FaFileMedical />,
      link: "/pages/registration",
      subItems: [
        { name: "Personal Information", link: "/pages/registration/personal-info" },
        { name: "Administration Information", link: "/pages/registration/admin-info" },
      ],
    },
    {
      name: "Results",
      icon: <FaHeartbeat />,
      link: "/pages/results",
      subItems: [
        { name: "Lab Values", link: "/pages/results/lab-values" },
        { name: "Radiology", link: "/pages/results/radiology" },
      ],
    },
    {
      name: "Clinical Notes",
      icon: <FaVials />,
      link: "/pages/clinicalNotes",
      subItems: [
        { name: "MAR", link: "/pages/clinicalNotes/mar" },
        { name: "Progress Notes", link: "/pages/clinicalNotes/progress-notes" },
        { name: "Consults", link: "/pages/clinicalNotes/consults" },
        { name: "Order Management", link: "/pages/clinicalNotes/order-management" },
      ],
    },
    { name: "Billing Information", icon: <FaCapsules />, link: "/pages/billingInformation" },
    { name: "Document Management", icon: <FaNotesMedical />, link: "/pages/documentManagement" },
  ];

  return (
    <div
      className={`bg-[#4B382A] text-[#F5E8DD] h-screen fixed p-4 flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo / Title */}
      <div className="flex flex-col items-center w-full">
        <span className={`font-bold text-2xl mt-5 transition-all duration-300 mb-12 ${isOpen ? "block" : "hidden"}`}>
          Tamaraw Services
        </span>
        <span className={`font-bold text-3xl mt-5 transition-all duration-300 mb-12 ${isOpen ? "hidden" : "block"}`}>
          TS
        </span>

        {/* Menu Items */}
        <ul className={`${!isOpen ? "space-y-8" : "space-y-4"} w-full flex flex-col`}>
          <hr />
          <li>
            <Link
              href="/pages/home"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#8E6C50] transition-all"
            >
              <FaHome className="text-lg" />
              {isOpen && <span>Home</span>}
            </Link>
          </li>

          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.link}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#8E6C50] transition-all"
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>

              {/* Dropdown */}
              {item.subItems && hoveredItem === item.name && (
                <ul className="absolute left-full top-0 mt-1 bg-[#3A2B1F] text-white shadow-lg rounded-lg w-52 z-50">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.link}
                        className="block px-5 py-3 text-sm font-medium hover:bg-[#8E6C50] transition-all rounded-lg"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Sidebar Toggle Button */}
      <button
        className="text-xl p-2 hover:bg-[#8E6C50] w-full rounded-lg flex justify-center cursor-pointer transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
