"use client";
import React, { useEffect, useState } from "react";

//form control = readOnly = text inputs
//             = disable  = radio buttons

const Page = () => {

  //Initialization:

  //Single boolean state controls edit mode
  const [isEditing, setIsEditing] = useState(false);

  //Checks for existing data in localStorage on initial load
  //Returns parsed data or empty object if none exists
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("patientFormData");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  //Automatically saves to localStorage whenever formData changes
  //Uses useEffect with formData as dependency
  useEffect(() => {
    localStorage.setItem("patientFormData", JSON.stringify(formData));
  }, [formData]);

  {/* Handles all input types (text, radio)
      Uses name attributes to target form fields
      Special handling for radio buttons */}
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? (checked ? value : prev[name]) : value
    }));
  };

  //disable the editing mode
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
     <div className="flex justify-center mt-[5%] ">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer"
            >
              Save 
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
    <div className="min-h-screen bg-white flex items-center justify-center pb-4">
      <div className="w-full max-w-4xl bg-white text-black shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 text-center">PATIENT INFORMATION</h2>
        {/* First part */}
        <div className="grid grid-cols-6 gap-4 border-b p-2">
          <h2 className="p-2">Last Name:</h2>
          <input className="border p-1" placeholder="Last Name" name="lastName" 
                 value={formData.lastName || ''} onChange={handleInputChange} readOnly={!isEditing} />
          <h2 className="p-2">First Name:</h2>
          <input className="border p-1" placeholder="First Name" name="firstName" 
                 value={formData.firstName || ''} onChange={handleInputChange} readOnly={!isEditing} />
          <h2 className="p-2">Middle Initial:</h2>
          <input className="border p-1" placeholder="Middle Initial" name="middleInitial" 
                 value={formData.middleInitial || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-4 gap-4 border-b p-2">
        <h2 className="p-2">Date of Birth:</h2>
          <input className="border p-1" placeholder="(mm/dd/yr)" name="dob" 
                 value={formData.dob || ''} onChange={handleInputChange} readOnly={!isEditing} />
         <h2 className="p-2">Social Security #:</h2>        
          <input className="border p-1" placeholder="Social Security #" name="ssn" 
                 value={formData.ssn || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-3 gap-4 border-b p-1 my-2 pb-1">
          <h2 className="pl-3">Gender :</h2>
          <label>
            <input type="radio" name="gender" value="male" 
                   checked={formData.gender === 'male'} onChange={handleInputChange} disabled={!isEditing} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" 
                   checked={formData.gender === 'female'} onChange={handleInputChange} disabled={!isEditing} /> Female
          </label>
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2 className="pl-3">Marital Status :</h2>
          <label>
            <input type="radio" name="maritalStatus" value="married" 
                   checked={formData.maritalStatus === 'married'} onChange={handleInputChange} disabled={!isEditing} /> Married
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="single" 
                   checked={formData.maritalStatus === 'single'} onChange={handleInputChange} disabled={!isEditing} /> Single
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="widowed" 
                   checked={formData.maritalStatus === 'widowed'} onChange={handleInputChange} disabled={!isEditing} /> Widowed
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="other" 
                   checked={formData.maritalStatus === 'other'} onChange={handleInputChange} disabled={!isEditing} /> Other
          </label>
        </div>

        {/* Race Section */}
        <div className="grid grid-cols-3 gap-4 border-b p-2">
          <h2 className="p-2">Race (Optional) :</h2>
          <label className="pt-2">
            <input type="radio" name="race" value="asian" 
                   checked={formData.race === 'asian'} onChange={handleInputChange} disabled={!isEditing} /> Asian
          </label>
          <label className="pt-2">
            <input type="radio" name="race" value="others" 
                   checked={formData.race === 'others'} onChange={handleInputChange} disabled={!isEditing} /> Others
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b p-3">
  <h2 className="col-span-2 p-1 font-semibold">Home Address</h2>

  <label className="flex items-center p-1">Apt #:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Apt. #" name="apt"
         value={formData.apt || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">City:</label>
  <input className="border p-2 w-full rounded-md" placeholder="City" name="city"
         value={formData.city || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">State:</label>
  <input className="border p-2 w-full rounded-md" placeholder="State" name="state"
         value={formData.state || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">Zip Code:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Zip Code" name="zip"
         value={formData.zip || ''} onChange={handleInputChange} readOnly={!isEditing} />
</div>


        <div className="grid grid-cols-6 gap-4 border-b p-2">
              <h2 className="p-1">Home Phone : </h2>
          <input className="border p-1" placeholder="Home Phone" name="homePhone" 
                 value={formData.homePhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
              <h2 className="p-1">Work Phone : </h2>
          <input className="border p-1" placeholder="Work Phone" name="workPhone" 
                 value={formData.workPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
              <h2 className="p-1">Other Phone : </h2>
          <input className="border p-1" placeholder="Other Phone" name="otherPhone" 
                 value={formData.otherPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <h2 className="p-1">Email Address :</h2>
          <input className="border p-1" placeholder="@akosijoeyaibertcollado@gmail.com" name="email" 
                 value={formData.email || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>

        {/* Employment Status */}
        <div className="grid grid-cols-5 gap-4 border-b p-2">
          <h2 className="pl-1">Employment Status :</h2>
          <label className="">
            <input type="radio" name="employment" value="employed" 
                   checked={formData.employment === 'employed'} onChange={handleInputChange} disabled={!isEditing} /> Employed
          </label>
          <label>
            <input type="radio" name="employment" value="unemployed" 
                   checked={formData.employment === 'unemployed'} onChange={handleInputChange} disabled={!isEditing} /> Unemployed
          </label>
          <label>
            <input type="radio" name="employment" value="child" 
                   checked={formData.employment === 'child'} onChange={handleInputChange} disabled={!isEditing} /> Child
          </label>
          <label>
            <input type="radio" name="employment" value="homemaker" 
                   checked={formData.employment === 'homemaker'} onChange={handleInputChange} disabled={!isEditing} /> Homemaker
          </label>
        </div>

        <div className="grid grid-cols-4 gap-4 border-b p-2">
        <h2 className="p-1">Employer:</h2>

          <input className="border p-1" placeholder="Employer" name="employer" 
                 value={formData.employer || ''} onChange={handleInputChange} readOnly={!isEditing} />
        <h2 className="p-1">Employer Phone:</h2>
          <input className="border p-1" placeholder="Employer Phone" name="employerPhone" 
                 value={formData.employerPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        
        {/* Second part */}
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center ">PHYSICIAN REFERRAL INFORMATION</h2>
        <div className="grid grid-cols-4 gap-4 border-b p-2">
              <h2 className="pl-1 pt-1">Primary Care Physician</h2>
          <input className="border p-1 " placeholder="Primary Care Physician" name="primaryPhysician" 
                 value={formData.primaryPhysician || ''} onChange={handleInputChange} readOnly={!isEditing} />
              <h2 className="pl-1 pt-1">Reffering Physician</h2>
          <input className="border p-1" placeholder="Referring Physician" name="referringPhysician" 
                 value={formData.referringPhysician || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2 className="pl-2">How did you hear about us? :</h2>
          <label>
            <input type="radio" name="referral" value="family" 
                   checked={formData.referral === 'family'} onChange={handleInputChange} disabled={!isEditing} /> Family Member
          </label>
          <label>
            <input type="radio" name="referral" value="friend" 
                   checked={formData.referral === 'friend'} onChange={handleInputChange} disabled={!isEditing} /> Friend
          </label>
          <label>
            <input type="radio" name="referral" value="news" 
                   checked={formData.referral === 'news'} onChange={handleInputChange} disabled={!isEditing} /> News
          </label>
          <label>
            <input type="radio" name="referral" value="other" 
                   checked={formData.referral === 'other'} onChange={handleInputChange} disabled={!isEditing} /> Other
          </label>
        </div>

       {/* Third part */}       
       <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">RESPONSIBLE PARTY (GUARANTOR) INFORMATION</h2>
       <div className="grid grid-cols-5 gap-4 border-b p-1">
          <h2>Relationship to patient :</h2>
          <label>
            <input type="radio" name="relationship" value="self" 
                   checked={formData.relationship === 'self'} onChange={handleInputChange} disabled={!isEditing} /> Self
          </label>
          <label>
            <input type="radio" name="relationship" value="spouse" 
                   checked={formData.relationship === 'spouse'} onChange={handleInputChange} disabled={!isEditing} /> Spouse
          </label>
          <label>
            <input type="radio" name="relationship" value="parent" 
                   checked={formData.relationship === 'parent'} onChange={handleInputChange} disabled={!isEditing} /> Parent
          </label>
          <label>
            <input type="radio" name="relationship" value="other" 
                   checked={formData.relationship === 'other'} onChange={handleInputChange} disabled={!isEditing} /> Other
          </label>
        </div>
        <div className="grid grid-cols-6 gap-4 border-b p-2">
        <h2>Last Name :</h2>
          <input className="border p-1" placeholder="Last Name" name="guarantorLastName" 
                 value={formData.guarantorLastName || ''} onChange={handleInputChange} readOnly={!isEditing} />
         <h2>First Name :</h2>
          <input className="border p-1" placeholder="First Name" name="guarantorFirstName" 
                 value={formData.guarantorFirstName || ''} onChange={handleInputChange} readOnly={!isEditing} />
        <h2>Middle Initial :</h2>
          <input className="border p-1" placeholder="Middle Initial" name="guarantorMiddleInitial" 
                 value={formData.guarantorMiddleInitial || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-4 gap-4 border-b p-2">
        <h2>Date of Birth :</h2>
          <input className="border p-1" placeholder="Date of Birth" name="guarantorDob" 
                 value={formData.guarantorDob || ''} onChange={handleInputChange} readOnly={!isEditing} />
        <h2>Social Security # :</h2>
          <input className="border p-1" placeholder="Social Security #" name="guarantorSsn" 
                 value={formData.guarantorSsn || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>

        <div className="grid grid-cols-2 gap-2 border-b p-3">
  <h2 className="col-span-2 p-1 font-semibold">Home Address</h2>

  <label className="flex items-center p-1">Apt #:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Apt. #" name="guarantorApt"
         value={formData.apt || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">City:</label>
  <input className="border p-2 w-full rounded-md" placeholder="City" name="guarantorCity"
         value={formData.city || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">State:</label>
  <input className="border p-2 w-full rounded-md" placeholder="State" name="guarantorState"
         value={formData.state || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">Zip Code:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Zip Code" name="guarantorZip"
         value={formData.zip || ''} onChange={handleInputChange} readOnly={!isEditing} />
</div>

        <div className="grid grid-cols-2 gap-4 border-b p-2">
          <h2>Email Address :</h2>
          <input className="border p-1" placeholder="@akosijoeyaibertcollado@gmail.com" name="guarantorEmail" 
                 value={formData.guarantorEmail || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        <div className="grid grid-cols-4 gap-4 border-b p-2">
        <h2>Employer :</h2>
          <input className="border p-1" placeholder="Employer" name="guarantorEmployer" 
                 value={formData.guarantorEmployer || ''} onChange={handleInputChange} readOnly={!isEditing} />
        <h2>Employer Phone :</h2>
          <input className="border p-1" placeholder="Employer Phone" name="guarantorEmployerPhone" 
                 value={formData.guarantorEmployerPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        
        {/* Fourth part */}
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h2>
        <div className="grid grid-cols-6 gap-4 border-b p-2">
              <h2>Last Name :</h2>
          <input className="border p-1" placeholder="Last Name" name="emergencyLastName" 
                 value={formData.emergencyLastName || ''} onChange={handleInputChange}  disabled={!isEditing} />
              <h2>First Name :</h2>
          <input className="border p-1" placeholder="First Name" name="emergencyFirstName" 
                 value={formData.emergencyFirstName || ''} onChange={handleInputChange} disabled={!isEditing} />
              <h2>Middle Initial :</h2>
          <input className="border p-1" placeholder="Relationship to Patient" name="emergencyRelationship" 
                 value={formData.emergencyRelationship || ''} onChange={handleInputChange} disabled={!isEditing} />
        </div>
        <div className="grid grid-cols-2 gap-2 border-b p-3">
  <h2 className="col-span-2 p-1 font-semibold">Address</h2>

  <label className="flex items-center p-1">Apt #:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Apt. #" name="emergencyApt"
         value={formData.emergencyApt || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">City:</label>
  <input className="border p-2 w-full rounded-md" placeholder="City" name="emergencyCity"
         value={formData.emergencyCity || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">State:</label>
  <input className="border p-2 w-full rounded-md" placeholder="State" name="emergencyState"
         value={formData.emergencyState || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">Zip Code:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Zip Code" name="emergencyZip"
         value={formData.emergencyZip || ''} onChange={handleInputChange} readOnly={!isEditing} />
</div>
        <div className="grid grid-cols-6 gap-4 border-b p-2">
         <h2>Home Phone :</h2>
          <input className="border p-1" placeholder="Home Phone" name="emergencyHomePhone" 
                 value={formData.emergencyHomePhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
         <h2>Work Phone :</h2>
          <input className="border p-1" placeholder="Work Phone" name="emergencyWorkPhone" 
                 value={formData.emergencyWorkPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
         <h2>Other Phone :</h2>
          <input className="border p-1" placeholder="Other Phone" name="emergencyOtherPhone" 
                 value={formData.emergencyOtherPhone || ''} onChange={handleInputChange} readOnly={!isEditing} />
        </div>
        
        {/* Fifth part */}
        <h2 className="text-lg font-bold bg-[#00695C] text-white p-2 mt-4 text-center">OTHER CONTACT INFORMATION - NOT LIVING WITH PATIENT</h2>
        <div className="grid grid-cols-6 gap-4 border-b p-2">
              <h2>Last Name :</h2>
              <input className="border p-1" placeholder="Last Name" name="otherLastName" 
                 value={formData.otherLastName || ''} onChange={handleInputChange} disabled={!isEditing} />
              <h2>First Name :</h2>
          <input className="border p-1" placeholder="First Name" name="otherFirstName" 
                 value={formData.otherFirstName || ''} onChange={handleInputChange} disabled={!isEditing} />
              <h2>Relationship to Patient :</h2>
          <input className="border p-1" placeholder="" name="otherRelationship" 
                 value={formData.otherRelationship || ''} onChange={handleInputChange} disabled={!isEditing} />
        </div>
        <div className="grid grid-cols-2 gap-2 border-b p-3">
  <h2 className="col-span-2 p-1 font-semibold">Home Address</h2>

  <label className="flex items-center p-1">Apt #:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Apt. #" name="otherApt"
         value={formData.otherApt || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">City:</label>
  <input className="border p-2 w-full rounded-md" placeholder="City" name="otherCity"
         value={formData.otherCity || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">State:</label>
  <input className="border p-2 w-full rounded-md" placeholder="State" name="otherState"
         value={formData.otherState || ''} onChange={handleInputChange} readOnly={!isEditing} />

  <label className="flex items-center p-1">Zip Code:</label>
  <input className="border p-2 w-full rounded-md" placeholder="Zip Code" name="otherZip"
         value={formData.otherZip || ''} onChange={handleInputChange} readOnly={!isEditing} />
</div>
        <div className="grid grid-cols-6 gap-4  p-2">
        <h2>Home Phone :</h2>
          <input className="border p-1" placeholder="Home Phone" name="otherHomePhone" 
                 value={formData.otherHomePhone || ''} onChange={handleInputChange} readOnly={!isEditing}/>
        <h2>Work Phone :</h2>
          <input className="border p-1" placeholder="Work Phone" name="otherWorkPhone" 
                 value={formData.otherWorkPhone || ''} onChange={handleInputChange} readOnly={!isEditing}/>
        <h2>Other Phone :</h2>
          <input className="border p-1" placeholder="Other Phone" name="otherOtherPhone" 
                 value={formData.otherOtherPhone || ''} onChange={handleInputChange} readOnly={!isEditing}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;