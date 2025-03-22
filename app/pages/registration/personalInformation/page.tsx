"use client";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-500 text-black shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 text-center">PATIENT INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Middle Initial" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2 ">
          <input className="border p-1" placeholder="Date of Birth" />
          <input className="border p-1" placeholder="Social Security #" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border p-1">
          <h2>Gender :</h2>
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
        </div>
        <div className="grid grid-cols-5 gap-4 border-b border p-1">
          <h2>Marital Status :</h2>
          <label><input type="radio" name="status" /> Married</label>
          <label><input type="radio" name="status" /> Single</label>
          <label><input type="radio" name="status" /> Widowed</label>
          <label><input type="radio" name="status" /> Other</label>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b p-2 ">
          <h2>Home Phone :</h2>
          <input className="border p-1" placeholder="Work Phone" />
          <input className="border p-1" placeholder="other Phone" />
        </div>

        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4">PHYSICIAN REFERRAL INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Primary Care Physician" />
          <input className="border p-1" placeholder="Referring Physician" />
        </div>
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4">RESPONSIBLE PARTY (GUARANTOR) INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Middle Initial" />
        </div>
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4">EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4">OTHER CONTACT INFORMATION - NOT LIVING WITH PATIENT</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
      </div>
    </div>
  );
};

export default Page;