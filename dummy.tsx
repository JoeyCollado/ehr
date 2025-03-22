"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState(() => {
    // Load from localStorage only once during initialization
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("patientInfo");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem("patientInfo", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? (checked ? value : prevData[name]) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white text-black shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 text-center">
          PATIENT INFORMATION
        </h2>

        {/* First part */}
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" name="lastName" placeholder="Last Name" value={formData.lastName || ""} onChange={handleChange} />
          <input className="border p-1" name="firstName" placeholder="First Name" value={formData.firstName || ""} onChange={handleChange} />
          <input className="border p-1" name="middleInitial" placeholder="Middle Initial" value={formData.middleInitial || ""} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" name="dob" placeholder="Date of Birth (mm/dd/yr)" value={formData.dob || ""} onChange={handleChange} />
          <input className="border p-1" name="ssn" placeholder="Social Security #" value={formData.ssn || ""} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-3 gap-4 border-b p-1">
          <h2>Gender :</h2>
          <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female</label>
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>Marital Status :</h2>
          <label><input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === "Married"} onChange={handleChange} /> Married</label>
          <label><input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === "Single"} onChange={handleChange} /> Single</label>
          <label><input type="radio" name="maritalStatus" value="Widowed" checked={formData.maritalStatus === "Widowed"} onChange={handleChange} /> Widowed</label>
          <label><input type="radio" name="maritalStatus" value="Other" checked={formData.maritalStatus === "Other"} onChange={handleChange} /> Other</label>
        </div>

        {/* Second part */}
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">
          PHYSICIAN REFERRAL INFORMATION
        </h2>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <input className="border p-1" name="primaryPhysician" placeholder="Primary Care Physician" value={formData.primaryPhysician || ""} onChange={handleChange} />
          <input className="border p-1" name="referringPhysician" placeholder="Referring Physician" value={formData.referringPhysician || ""} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>How did you hear about us? :</h2>
          <label><input type="radio" name="referralSource" value="Family Member" checked={formData.referralSource === "Family Member"} onChange={handleChange} /> Family Member</label>
          <label><input type="radio" name="referralSource" value="Friend" checked={formData.referralSource === "Friend"} onChange={handleChange} /> Friend</label>
          <label><input type="radio" name="referralSource" value="News" checked={formData.referralSource === "News"} onChange={handleChange} /> News</label>
          <label><input type="radio" name="referralSource" value="Other" checked={formData.referralSource === "Other"} onChange={handleChange} /> Other</label>
        </div>
     
       {/* Third part */}       
       <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">RESPONSIBLE PARTY (GUARANTOR) INFORMATION</h2>
       <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>Relationship to patient :</h2>
          <label><input type="radio" name="status" /> Self</label>
          <label><input type="radio" name="status" /> Spouse</label>
          <label><input type="radio" name="status" /> Parent</label>
          <label><input type="radio" name="status" /> Other</label>
        </div>
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
        <h2 className=" p-1">Home Address</h2>
        <input className="border p-1" placeholder="Apt. #" />
          <input className="border p-1" placeholder="City" />
          <input className="border p-1" placeholder="State" />
          <input className="border p-1" placeholder="Zip Code" />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
        <h2>Email Address :</h2>
          <input className="border p-1" placeholder="@akosijoeyaibertcollado@gmail.com" />
          
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
        <input className="border p-1" placeholder="Employer" />
          <input className="border p-1" placeholder="Employer Phone" />
        </div>
        
        {/* Fourth part */}
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-2">
        <h2 className=" p-1">Address</h2>
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
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">OTHER CONTACT INFORMATION - NOT LIVING WITH PATIENT</h2>
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <input className="border p-1" placeholder="Last Name" />
          <input className="border p-1" placeholder="First Name" />
          <input className="border p-1" placeholder="Relationship to Patient" />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-2">
        <h2 className=" p-1">Address</h2>
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