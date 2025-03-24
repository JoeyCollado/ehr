"use client";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-[#685442] flex justify-center">
      <div className="w-[80%] h-[90%] mt-[5%] bg-white shadow-2xl p-4 mb-[5%]">
        <h1 className="text-3xl font-bold text-center bg-[#00695C] text-white py-4">LABORATORY RESULTS</h1>
        <table className="w-full border border-black ">
          <thead>
            <tr className="text-sm">
              <th className="border border-black px-4 py-2 text-left">Patient Name:<br></br>Joey Aibert U. Collado</th>
              <th className="border border-black px-4 py-2 text-left">Room No: <br></br>42</th>
              <th className="border border-black px-4 py-2 text-left">Date and Time of Specimen Collection: <br></br>01/31/2005</th>
              <th className="border border-black px-4 py-2 text-left">Specimen Source: <br></br>blank</th>
              <th className="border border-black px-4 py-2 text-left">Attending Physician: <br></br>blank</th>
              <th className="border border-black px-4 py-2 text-left">Date of Admission: <br></br>blank</th>
            </tr>
          </thead>
        </table>

        <table className="w-full border border-black mt-4 text-xs">
          <thead>
            <tr className="bg-[#00695C] text-white py-2">
              <th className="border border-black px-4 py-2 text-left">Test Name</th>
              <th className="border border-black px-4 py-2 text-left">Result</th>
              <th className="border border-black px-4 py-2 text-left">Units</th>
              <th className="border border-black px-4 py-2 text-left">Reference Range</th>
              <th className="border border-black px-4 py-2 text-left">Flag</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["White Blood Cells", "15.2", "x10^9/L", "4.0 - 12.0", "High", "bg-red-500"],
              ["Red Blood Cells", "4.5", "x10^12/L", "4.1 - 5.2", "Normal", "bg-green-500"],
              ["Hemoglobin", "11.8", "g/dL", "12.0 - 16.0", "Low", "bg-yellow-500"],
              ["Hematocrit", "35.5", "%", "36 - 46", "Low", "bg-yellow-500"],
              ["Platelet Count", "310", "x10^9/L", "150 - 450", "Normal", "bg-green-500"],
              ["Mean Corpuscular Volume", "78", "fL", "80 - 100", "Low", "bg-yellow-500"],
              ["Mean Corpuscular Hemoglobin", "26.2", "pg", "27 - 33", "Low", "bg-yellow-500"],
              ["Mean Corpuscular Hemoglobin Concentration", "34.0", "g/dL", "32 - 36", "Normal", "bg-green-500"],
              ["Neutrophils", "12.1", "x10^9/L", "1.5 - 8.0", "High", "bg-red-500"],
              ["Lymphocytes", "2.8", "x10^9/L", "1.0 - 4.0", "Normal", "bg-green-500"],
              ["Monocytes", "0.9", "x10^9/L", "0.1 - 1.0", "Normal", "bg-green-500"],
              ["Eosinophils", "0.3", "x10^9/L", "0.0 - 0.5", "Normal", "bg-green-500"],
              ["Basophils", "0.1", "x10^9/L", "0.0 - 0.2", "Normal", "bg-green-500"],
            ].map(([test, result, unit, range, flag, color], i) => (
              <tr key={i} className="border border-black">
                <td className="border border-black px-4 py-2">{test}</td>
                <td className="border border-black px-4 py-2">{result}</td>
                <td className="border border-black px-4 py-2">{unit}</td>
                <td className="border border-black px-4 py-2">{range}</td>
                <td className={`border border-black px-4 py-2 text-white ${color}`}>{flag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
