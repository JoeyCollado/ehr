"use client";
import React from "react";
import { useState } from "react";

const page = () => {

  const [isEditing, setIsEditing] = useState(false);
  

  return (
    <>
        <div className="flex justify-center mt-[5%]">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer mb-4"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform text-white px-4 py-1 rounded cursor-pointer mb-4"
          >
            Edit
          </button>
        )}
      </div>

    <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%] text-black">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        {/* MEDICATION ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          MEDICATION ORDER
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Drug Name</th>
                <th className="py-2 px-4 border-b text-left">Dosage</th>
                <th className="py-2 px-4 border-b text-left">Route</th>
                <th className="py-2 px-4 border-b text-left">Frequency</th>
                <th className="py-2 px-4 border-b text-left">
                  Start Date/Time
                </th>
                <th className="py-2 px-4 border-b text-left">Duration</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">
                  Prescribing Physician
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Amoxicillin</td>
                <td className="py-2 px-4 border-b">250mg</td>
                <td className="py-2 px-4 border-b">Oral</td>
                <td className="py-2 px-4 border-b">Every 8 hours</td>
                <td className="py-2 px-4 border-b">2025-03-24</td>
                <td className="py-2 px-4 border-b">7 days</td>
                <td className="py-2 px-4 border-b">21 capsules</td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* LAB TEST ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">LAB TEST ORDER</h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Test Name</th>
                <th className="py-2 px-4 border-b text-left">Test Code</th>
                <th className="py-2 px-4 border-b text-left">
                  Collection Date/Time
                </th>
                <th className="py-2 px-4 border-b text-left">Urgency</th>
                <th className="py-2 px-4 border-b text-left">
                  Ordering Physician
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">
                  Complete Blood Count (CBC)
                </td>
                <td className="py-2 px-4 border-b">CBC01</td>
                <td className="py-2 px-4 border-b">3/24/2025</td>
                <td className="py-2 px-4 border-b">STAT</td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Sputum Culture</td>
                <td className="py-2 px-4 border-b">SPC01</td>
                <td className="py-2 px-4 border-b">3/24/2025</td>
                <td className="py-2 px-4 border-b">Routine</td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* IMAGING ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">IMAGING ORDER</h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Imaging Type</th>
                <th className="py-2 px-4 border-b text-left">
                  Body Part to be Imaged
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Reason for Imaging
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Special Instructions
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Ordering Physician
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Chest X-Ray</td>
                <td className="py-2 px-4 border-b">Lungs</td>
                <td className="py-2 px-4 border-b">Suspected Pneumonia</td>
                <td className="py-2 px-4 border-b">PA and Lateral views</td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* PROCEDURE ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          PROCEDURE ORDER
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Procedure Name</th>
                <th className="py-2 px-4 border-b text-left">Procedure Code</th>
                <th className="py-2 px-4 border-b text-left">
                  Scheduled Date/Time
                </th>
                <th className="py-2 px-4 border-b text-left">Location</th>
                <th className="py-2 px-4 border-b text-left">
                  Preoperative Instruction
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Ordering Physician
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">
                  Chest X-Ray, Two Views (PA & Lateral)
                </td>
                <td className="py-2 px-4 border-b">7046</td>
                <td className="py-2 px-4 border-b">3/24/2025</td>
                <td className="py-2 px-4 border-b">Radiology Department</td>
                <td className="py-2 px-4 border-b">Remove any metal objects</td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* REFERRAL ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4">
          REFERRAL ORDER
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Order Type</th>
                <th className="py-2 px-4 border-b text-left">Referral To</th>
                <th className="py-2 px-4 border-b text-left">
                  Reason for Referral
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Primary Diagnosis (ICD10){" "}
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Clinical Summary
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Referral Physician
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Referral Order</td>
                <td className="py-2 px-4 border-b">
                  Pulmonology, Primary Care, Infectious Disease
                </td>
                <td className="py-2 px-4 border-b">
                  Evaluation and Management for Pneumonia
                </td>
                <td className="py-2 px-4 border-b">
                  J18.9 (Pneumonia, unspecified organism)
                </td>
                <td className="py-2 px-4 border-b">
                  Symptoms: Fever, cough, dyspnea, fatigue Dr. Michael Reyes
                  Diagnostics: Chest Xray shows infiltrates Treatment:
                  Antibiotics, oxygen therapy (if applicable) Response:
                  [Stable/Improving/Wo rsening]
                </td>
                <td className="py-2 px-4 border-b">Dr. Michael Reyes</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* REFERRAL ORDER */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4">
          NURSING ORDER
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Order Type</th>
                <th className="py-2 px-4 border-b text-left">Nursing Order</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Patient Name</td>
                <td className="py-2 px-4 border-b">Patient&apos;s Name </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Date of Birth</td>
                <td className="py-2 px-4 border-b">
                  Patient&apos;s Date of Birth
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  Medication Administartion
                </td>
                <td className="py-2 px-4 border-b">
                  Administer prescribed antibiotics and antipyretics, Provide
                  nebulizer treatments as needed
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Diagnosis (ICD-10) </td>
                <td className="py-2 px-4 border-b">
                  J18.9 (Pneumonia, unspecified organism)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Vital Signs Monitoring </td>
                <td className="py-2 px-4 border-b">
                  Monitor temperature, HR, RR, BP, SpO₂ q4h , Notify provider if
                  SpO₂ &gt; 92% or RR &gt; 30/min
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Respiratory Care </td>
                <td className="py-2 px-4 border-b">
                  Administer oxygen therapy as ordered
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Nutritional Support </td>
                <td className="py-2 px-4 border-b">
                  Assess nutritional status and encourage high-protein diet
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Patient Education</td>
                <td className="py-2 px-4 border-b">
                  Educate patient on pneumonia, medication adherence, and
                  symptoms to report, Provide smoking cessation counseling if
                  applicable
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default page;
