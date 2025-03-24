"use client";
import React from "react";
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
              <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
              <li><a href="#" className="hover:text-gray-900">Guides</a></li>
              <li><a href="#" className="hover:text-gray-900">Community Forum</a></li>
              <li><a href="#" className="hover:text-gray-900">Tutorials</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Press</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-900">Report an Issue</a></li>
              <li><a href="#" className="hover:text-gray-900">Status</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-3">
              <a href="#" className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
                <FiTwitter className="text-gray-700 text-lg" />
              </a>
              <a href="#" className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
                <FiFacebook className="text-gray-700 text-lg" />
              </a>
              <a href="#" className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
                <FiInstagram className="text-gray-700 text-lg" />
              </a>
              <a href="#" className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
                <FiLinkedin className="text-gray-700 text-lg" />
              </a>
              <a href="#" className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
                <FiYoutube className="text-gray-700 text-lg" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-10 text-center text-sm text-gray-600">
          Copyright © {new Date().getFullYear()} by YourCompany. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
