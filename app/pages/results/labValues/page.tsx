"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Default patient details
  const defaultPatientDetails = {
    name: "Joey Aibert U. Collado",
    roomNo: "42",
    specimenDate: "01/31/2005",
    specimenSource: "blank",
    physician: "blank",
    admissionDate: "blank",
  };

  // Default table data (now without color in array)
  const defaultData = [
    ["White Blood Cells", "15.2", "x10^9/L", "4.0 - 12.0", "High"],
    ["Red Blood Cells", "4.5", "x10^12/L", "4.1 - 5.2", "Normal"],
    ["Hemoglobin", "11.8", "g/dL", "12.0 - 16.0", "Low"],
    ["Hematocrit", "35.5", "%", "36 - 46", "Low"],
    ["Platelet Count", "310", "x10^9/L", "150 - 450", "Normal"],
    ["Mean Corpuscular Volume", "78", "fL", "80 - 100", "Low"],
    ["Mean Corpuscular Hemoglobin", "26.2", "pg", "27 - 33", "Low"],
    ["Mean Corpuscular Hemoglobin Concentration", "34.0", "g/dL", "32 - 36", "Normal"],
    ["Neutrophils", "12.1", "x10^9/L", "1.5 - 8.0", "High"],
    ["Lymphocytes", "2.8", "x10^9/L", "1.0 - 4.0", "Normal"],
    ["Monocytes", "0.9", "x10^9/L", "0.1 - 1.0", "Normal"],
    ["Eosinophils", "0.3", "x10^9/L", "0.0 - 0.5", "Normal"],
    ["Basophils", "0.1", "x10^9/L", "0.0 - 0.2", "Normal"],
  ];

  // State initialization
  const [patientDetails, setPatientDetails] = useState(defaultPatientDetails);
  const [data, setData] = useState(defaultData);

  // Hydration fix
  useEffect(() => {
    setHasMounted(true);
    const savedPatient = localStorage.getItem('patientDetails');
    const savedData = localStorage.getItem('data');
    
    if (savedPatient) setPatientDetails(JSON.parse(savedPatient));
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  // Get color based on flag value
  const getFlagColor = (flag: string) => {
    switch (flag.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  // Handle flag changes
  const handleFlagChange = (e: React.ChangeEvent<HTMLSelectElement>, rowIndex: number) => {
    const newData = [...data];
    newData[rowIndex][4] = e.target.value;
    setData(newData);
  };

  // Toggle edit mode
  const handleEdit = () => {
    if (isEditing) {
      localStorage.setItem('patientDetails', JSON.stringify(patientDetails));
      localStorage.setItem('data', JSON.stringify(data));
    }
    setIsEditing(!isEditing);
  };

  // Handle table changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = e.target.value;
    setData(newData);
  };

  // Handle patient details change
  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setPatientDetails({ ...patientDetails, [key]: e.target.value });
  };

  if (!hasMounted) return null;

  return (
    <>
      <button
        onClick={handleEdit}
        className="text-center text-1xl cursor-pointer rounded-md px-3 text-white bg-blue-500 justify-center ml-[50%] mt-[5%]"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="min-h-screen bg-white text-[#685442] flex justify-center">
        <div className="w-[80%] h-[90%] mt-[1%] bg-white shadow-2xl p-4 mb-[5%]">
          <h1 className="text-3xl font-bold text-center bg-[#00695C] text-white py-4">
            LABORATORY RESULTS
          </h1>

          {/* Patient Details Table */}
          <table className="w-full border border-black mt-4 text-xs">
            <thead>
              <tr className="bg-[#00695C] text-white py-2">
                <th className="border border-black px-4 py-2 text-left">Patient Name:</th>
                <th className="border border-black px-4 py-2 text-left">Room No:</th>
                <th className="border border-black px-4 py-2 text-left">Date and Time of Specimen Collection:</th>
                <th className="border border-black px-4 py-2 text-left">Specimen Source:</th>
                <th className="border border-black px-4 py-2 text-left">Attending Physician:</th>
                <th className="border border-black px-4 py-2 text-left">Date of Admission:</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-black">
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.name}
                      onChange={(e) => handlePatientChange(e, "name")}
                      className="w-full border p-1"
                    />
                  ) : (
                    <strong>{patientDetails.name}</strong>
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.roomNo}
                      onChange={(e) => handlePatientChange(e, "roomNo")}
                      className="w-full border p-1"
                    />
                  ) : (
                    patientDetails.roomNo
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.specimenDate}
                      onChange={(e) => handlePatientChange(e, "specimenDate")}
                      className="w-full border p-1"
                    />
                  ) : (
                    patientDetails.specimenDate
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.specimenSource}
                      onChange={(e) => handlePatientChange(e, "specimenSource")}
                      className="w-full border p-1"
                    />
                  ) : (
                    patientDetails.specimenSource
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.physician}
                      onChange={(e) => handlePatientChange(e, "physician")}
                      className="w-full border p-1"
                    />
                  ) : (
                    patientDetails.physician
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patientDetails.admissionDate}
                      onChange={(e) => handlePatientChange(e, "admissionDate")}
                      className="w-full border p-1"
                    />
                  ) : (
                    patientDetails.admissionDate
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Laboratory Results Table */}
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
              {data.map(([test, result, unit, range, flag], rowIndex) => (
                <tr key={rowIndex} className="border border-black">
                  <td className="border border-black px-4 py-2">{test}</td>
                  <td className="border border-black px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={result}
                        onChange={(e) => handleChange(e, rowIndex, 1)}
                        className="w-full border p-1"
                      />
                    ) : (
                      result
                    )}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={unit}
                        onChange={(e) => handleChange(e, rowIndex, 2)}
                        className="w-full border p-1"
                      />
                    ) : (
                      unit
                    )}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={range}
                        onChange={(e) => handleChange(e, rowIndex, 3)}
                        className="w-full border p-1"
                      />
                    ) : (
                      range
                    )}
                  </td>
                  <td className={`border border-black px-4 py-2 text-white ${getFlagColor(flag)}`}>
                    {isEditing ? (
                      <select
                        value={flag}
                        onChange={(e) => handleFlagChange(e, rowIndex)}
                        className="w-full border p-1 text-black"
                      >
                        <option value="High" className="bg-red-500">High</option>
                        <option value="Normal" className="bg-green-500">Normal</option>
                        <option value="Low" className="bg-yellow-500">Low</option>
                      </select>
                    ) : (
                      flag
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;