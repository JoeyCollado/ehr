"use client";
import React from "react";
import { FiHeart, FiShield, FiHelpCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full h-[30vh] bg-white text-black py-4  shadow-lg absolute">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-black">
        
        {/* Left Section - Copyright */}
        <div className="flex items-center gap-2">
          <FiHeart className="text-black text-lg" />
          <p className="font-medium">
            © {new Date().getFullYear()} <span className="font-semibold">EHR System</span>. All rights reserved.
          </p>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="/privacy" className="flex items-center gap-1 text-black  transition">
            <FiShield className="text-red-400 text-md" />
            <span>Privacy Policy</span>
          </a>
          <a href="/terms" className="flex items-center gap-1 text-black  transition">
            <FiShield className="text-red-400 text-md" />
            <span>Terms of Service</span>
          </a>
          <a href="/help" className="flex items-center gap-1 text-black  transition">
            <FiHelpCircle className="text-red-400 text-md" />
            <span>Help Center</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
