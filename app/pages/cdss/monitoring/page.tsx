"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);

  //disable the editing mode
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-center mt-[5%] ">
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
      </motion.div>
      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
        <div className="w-full max-w-5xl bg-white text-black shadow-lg rounded-lg p-6">
          <h1 className="text-center text-3xl font-bold mb-[3%]">Monitoring</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Overview */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Patient Overview
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> A.J.S
                </p>
                <p>
                  <span className="font-medium">Age:</span> 10{" "}
                  <span className="font-medium ml-2">Gender:</span> Male
                </p>
                <p>
                  <span className="font-medium">Admission:</span>
                </p>
                <p>
                  <span className="font-medium">Diagnosis:</span>
                </p>
                <p>
                  <span className="font-medium">Risk factors:</span>
                </p>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Vital Signs
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Temperature:</span> 39.2°C
                </p>
                <p>
                  <span className="font-medium">HR:</span> 119 bpm
                </p>
                <p>
                  <span className="font-medium">RR:</span> 32 breaths/min
                </p>
                <p>
                  <span className="font-medium">SpO₂:</span> 90%
                </p>
                <p>
                  <span className="font-medium">BP:</span> 120/70 mmHg
                </p>
              </div>
            </div>

            {/* Alerts */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">Alerts</h2>
              <div className="space-y-2">
                <p>If SpO₂ &lt; 92%, recommend increasing oxygen therapy</p>
                <p>
                  If RR &gt; 30, risk of respiratory distress—monitor closely
                </p>
              </div>
            </div>

            {/* Treatment & Medication */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Treatment & Medication
              </h2>
              <div className="space-y-2">
                {/* Empty content as per your example */}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Progress Tracking
              </h2>
              <div className="space-y-2">
                {/* Empty content as per your example */}
              </div>
            </div>

            {/* Outcome Prediction */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Outcome Prediction
              </h2>
              <div className="space-y-2"></div>
            </div>
          </div>
          {/* Latest Laboratory and Diagnostic Result & Laboratory and Diagnostic Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-[5%]">
            <div className="border border-black rounded-lg p-4 ">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Latest Laboratory and Diagnostic Result
              </h2>
            </div>
            <div className="border border-black rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Laboratory and Diagnostic Result
              </h2>
            </div>
          </div>

          {/* Intake-Output Chart */}
          <div className="mt-[5%] w-full overflow-x-auto">
  <div className="border border-black rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-3 text-center">Intake-Output Chart</h2>
    <table className="w-full border-collapse border border-black">
      <thead>
        <tr className="border-b border-black">
          <th className="p-2 border border-black text-left" >DATE</th>
          <th className="p-2 border border-black text-left">TIME</th>
          <th className="p-2 border border-black text-left" >SHIFT</th>
          <th className="p-2 border border-black text-center" colSpan={3}>
            INTAKE
          </th>
          <th className="p-2 border border-black text-center" colSpan={3}>
            OUTPUT
          </th>
        </tr>
        <tr className="border-b border-black">
          <th className="p-2 border border-black"></th>
          <th className="p-2 border border-black"></th>
          <th className="p-2 border border-black"></th>
          <th className="p-2 border border-black">Description/Type</th>
          <th className="p-2 border border-black">Volume</th>
          <th className="p-2 border border-black">Total</th>
          <th className="p-2 border border-black">Description/Type</th>
          <th className="p-2 border border-black">Volume</th>
          <th className="p-2 border border-black">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
        </tr>
        <tr>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
          <td className="p-2 border border-black"></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default page;