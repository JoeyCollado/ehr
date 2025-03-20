"use client";
import React from "react";
import { FiHeart, FiShield, FiHelpCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full h-[20vh] bg-gradient-to-b from-[#FEC5BB] via-[#FAE1DD] to-[#F8D7DA] text-[#3A2B22] py-4 mt-12 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm">
        
        {/* Left Section - Copyright */}
        <div className="flex items-center gap-2">
          <FiHeart className="text-red-500 text-lg" />
          <p className="font-medium">
            © {new Date().getFullYear()} <span className="font-semibold">EHR System</span>. All rights reserved.
          </p>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="/privacy" className="flex items-center gap-1 text-[#3A2B22] hover:text-red-600 transition">
            <FiShield className="text-red-400 text-md" />
            <span>Privacy Policy</span>
          </a>
          <a href="/terms" className="flex items-center gap-1 text-[#3A2B22] hover:text-red-600 transition">
            <FiShield className="text-red-400 text-md" />
            <span>Terms of Service</span>
          </a>
          <a href="/help" className="flex items-center gap-1 text-[#3A2B22] hover:text-red-600 transition">
            <FiHelpCircle className="text-red-400 text-md" />
            <span>Help Center</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
