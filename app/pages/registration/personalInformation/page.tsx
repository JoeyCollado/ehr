"use client";
import React from "react";

const Page = () => {
  return  (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-500 text-black shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 text-center">PATIENT INFORMATION</h2>

        {/* First part */}
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Middle Initial" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Date of Birth" />
          <input className="border p-1" placeholder="Social Security #" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-b p-1">
          <h2>Gender :</h2>
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>Marital Status :</h2>
          <label><input type="radio" name="status" /> Married</label>
          <label><input type="radio" name="status" /> Single</label>
          <label><input type="radio" name="status" /> Widowed</label>
          <label><input type="radio" name="status" /> Other</label>
        </div>

        {/* Race Section */}
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <h2>Race (Optional) :</h2>
          <label><input type="radio" name="race" /> Asian</label>
          <label><input type="radio" name="race" /> Others</label>
        </div>

        <div className="grid grid-cols-5 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Home Address" />
          <input className="border p-1" placeholder="Apt. #" />
          <input className="border p-1" placeholder="City" />
          <input className="border p-1" placeholder="State" />
          <input className="border p-1" placeholder="Zip Code" />
        </div>

        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Home Phone" />
          <input className="border p-1" placeholder="Work Phone" />
          <input className="border p-1" placeholder="Other Phone" />
        </div>
        <div className="grid grid-cols-1 gap-4 border-b p-2">
          <h2>Email Address :</h2>
          <input className="border p-1" placeholder="Email Address" />
        </div>

        {/* Employment Status */}
        <div className="grid grid-cols-5 gap-4 border-b p-2">
          <h2>Employment Status :</h2>
          <label><input type="radio" name="employment" /> Employed</label>
          <label><input type="radio" name="employment" /> Unemployed</label>
          <label><input type="radio" name="employment" /> Child</label>
          <label><input type="radio" name="employment" /> Homemaker</label>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Employer" />
          <input className="border p-1" placeholder="Employer Phone" />
        </div>
        
        {/* Second part */}
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4 text-center ">PHYSICIAN REFERRAL INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Primary Care Physician" />
          <input className="border p-1" placeholder="Referring Physician" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>How did you hear about us? :</h2>
          <label><input type="radio" name="referral" /> Family Member</label>
          <label><input type="radio" name="referral" /> Friend</label>
          <label><input type="radio" name="referral" /> News</label>
          <label><input type="radio" name="referral" /> Other</label>
        </div>

       {/* Third part */}       
       <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4 text-center">RESPONSIBLE PARTY (GUARANTOR) INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Middle Initial" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Date of Birth" />
          <input className="border p-1" placeholder="Social Security #" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-2">
        <input className="border p-1" placeholder="Home Address" />
        <input className="border p-1" placeholder="Apt. #" />
          <input className="border p-1" placeholder="City" />
          <input className="border p-1" placeholder="State" />
          <input className="border p-1" placeholder="Zip Code" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Email Address" />
          <input className="border p-1" placeholder="Employer" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Employer Phone" />
        </div>
        
        {/* Fourth part */}
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4 text-center">EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-2">
        <input className="border p-1" placeholder="Home Address" />
        <input className="border p-1" placeholder="Apt. #" />
          <input className="border p-1" placeholder="City" />
          <input className="border p-1" placeholder="State" />
          <input className="border p-1" placeholder="Zip Code" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Home Phone" />
          <input className="border p-1" placeholder="Work Phone" />
          <input className="border p-1" placeholder="Other Phone" />
        </div>
        
        {/* Fifth part */}
        <h2 className="text-lg font-bold bg-blue-900 text-white p-2 mt-4 text-center">OTHER CONTACT INFORMATION - NOT LIVING WITH PATIENT</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-2">
        <input className="border p-1" placeholder="Home Address" />
          <input className="border p-1" placeholder="Apt. #" />
          <input className="border p-1" placeholder="City" />
          <input className="border p-1" placeholder="State" />
          <input className="border p-1" placeholder="Zip Code" />
        </div>
        <div className="grid grid-cols-3 gap-4  p-2">
          <input className="border p-1" placeholder="Home Phone" />
          <input className="border p-1" placeholder="Work Phone" />
          <input className="border p-1" placeholder="Other Phone" />
        </div>
      </div>
    </div>
  );
};

export default Page;