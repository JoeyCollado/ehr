"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaHome,
  FaUserPlus,
  FaChartBar,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaFolderOpen,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    {
      name: "Registration",
      icon: <FaUserPlus />,
      link: "/pages/registration",
      subItems: [
        { name: "Personal Information", link: "/pages/registration/personalInformation" },
        { name: "Administration Information", link: "/pages/registration/administrationInformation" },
      ],
    },
    {
      name: "Results",
      icon: <FaChartBar />,
      link: "/pages/results",
      subItems: [
        { name: "Lab Values", link: "/pages/results/lab-values" },
        { name: "Radiology", link: "/pages/results/radiology" },
      ],
    },
    {
      name: "Clinical Notes",
      icon: <FaClipboardList />,
      link: "/pages/clinicalNotes",
      subItems: [
        { name: "MAR", link: "/pages/clinicalNotes/mar" },
        { name: "Progress Notes", link: "/pages/clinicalNotes/progress-notes" },
        { name: "Consults", link: "/pages/clinicalNotes/consults" },
        { name: "Order Management", link: "/pages/clinicalNotes/order-management" },
      ],
    },
    { name: "Billing Information", icon: <FaFileInvoiceDollar />, link: "/pages/billingInformation" },
    { name: "Document Management", icon: <FaFolderOpen />, link: "/pages/documentManagement" },
  ];

  return (
    <div
      className={`bg-[#00695C]
 font-sans	text-white z-50 h-screen fixed p-4 flex flex-col justify-between transition-all duration-300 ${
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/20 transition-all"
            >
              <FaHome className="text-lg" />
              {isOpen && <span>Home</span>}
            </Link>
          </li>

          {menuItems.map((item) => (
  <li
    key={item.name}
    className="relative group hover:bg-white/20 rounded-lg cursor-pointer "
    onMouseEnter={() => setHoveredItem(item.name)}
    onMouseLeave={() => setHoveredItem(null)}
  >
    {/* Main Link (Separated from Dropdown) */}
    <Link
      href={item.link}
      className="flex items-center gap-3 px-4 py-3 w-full"
    >
      {item.icon}
      {isOpen && <span>{item.name}</span>}
    </Link>

    {/* Dropdown (Separate Clickable Area) */}
    {item.subItems && hoveredItem === item.name && (
      <div className="absolute left-full top-0 flex items-center ml-2">
        {/* Invisible hover area to prevent accidental exit */}
        <div className="absolute left-[-250px] w-[300px] h-full bg-transparent"></div>

        {/* Dropdown Menu */}
        <div
          className="ml-5 flex flex-col bg-[#00695C] shadow-lg rounded-lg w-52 px-2 py-2"
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.link}
              className="block px-5 py-3 text-sm font-medium hover:bg-white/20 transition-all rounded-lg"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      </div>
    )}
  </li>
))}
        </ul>
      </div>

      <hr />

      {/* Sidebar Toggle Button */}
      <button
        className="text-xl p-2 hover:bg-white/20 w-full rounded-lg flex justify-center cursor-pointer transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;