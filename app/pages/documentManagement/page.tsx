"use client";
import React, { useState, useEffect } from "react";

interface PatientDocument {
  id: number;
  category: string;
  dateEntered: string;
  dateVisited: string;
  description: string;
  status: string;
}

const Page = () => {
  const [data, setData] = useState<PatientDocument[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // State for Patient Name, Doctor, and Date (with LocalStorage)
  const [patientName, setPatientName] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);

    // Retrieve saved data from localStorage
    const savedData = localStorage.getItem("patientDocuments");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    // Retrieve saved patient info from localStorage
    setPatientName(localStorage.getItem("patientName") || "John Doe");
    setDoctor(localStorage.getItem("doctor") || "Dr. Smith");
    setDate(localStorage.getItem("date") || "3/10/2025");

  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("patientDocuments", JSON.stringify(data));
    }
  }, [data, isMounted]);

  // Save Patient Details to LocalStorage on Change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("patientName", patientName);
      localStorage.setItem("doctor", doctor);
      localStorage.setItem("date", date);
    }
  }, [patientName, doctor, date, isMounted]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (id: number, field: keyof PatientDocument, value: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addDateEntry = () => {
    const newEntry: PatientDocument = {
      id: data.length + 1,
      category: "",
      dateEntered: "",
      dateVisited: "",
      description: "",
      status: ""
    };
    setData([...data, newEntry]);
  };

  const deleteEntry = (id: number) => {
    setData(data.filter((row) => row.id !== id));
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#e3e3e3] text-[#3A2B22] flex flex-col items-center p-6 shadow-lg ">
      <div className="flex gap-10 text-white mt-[5%]">
        <button onClick={addDateEntry} className="bg-orange-500 hover:bg-orange-700 hover:scale-105 hover:shadow-lg transition-transform px-4 py-1 rounded-md cursor-pointer">Add Date</button>
        <button onClick={handleEdit} className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform px-4 py-1 rounded-md cursor-pointer">{isEditing ? "Save" : "Edit"}</button>
      </div>

      <div className="border border-gray-400 rounded-lg overflow-hidden w-full max-w-5xl mt-[1%] shadow-lg mb-[5%] ">
        <h2 className="text-xl font-bold text-center p-4 border-b bg-[#00695C] text-white">PATIENT DOCUMENT MANAGEMENT</h2>
        
        {/* Editable Patient Information Header */}
        <div className="border border-gray-400 flex">
          <div className="flex-1 flex items-center justify-center border-r p-4 font-semibold">
            PATIENT NAME: {isEditing ? (
              <input 
                type="text" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                className="ml-2 border border-gray-300 px-2 py-1 rounded-md"
                placeholder="null"
              />
            ) : (
              <span className="ml-2">{patientName}</span>
            )}
          </div>
          
          <div className="flex-1 flex items-center justify-center border-r p-4 font-semibold">
            DOCTOR: {isEditing ? (
              <input 
                type="text" 
                value={doctor} 
                onChange={(e) => setDoctor(e.target.value)} 
                className="ml-2 border border-gray-300 px-2 py-1 rounded-md"
                placeholder="null"
              />
            ) : (
              <span className="ml-2">{doctor}</span>
            )}
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4 font-semibold">
            DATE: {isEditing ? (
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="ml-2 border border-gray-300 px-2 py-1 rounded-md"
                placeholder="null"
              />
            ) : (
              <span className="ml-2">{date}</span>
            )}
          </div>
        </div>
        
        <p className="p-3 font-semibold">ALL</p>

        <div className="overflow-y-auto max-h-96">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-3 py-2">#</th>
                <th className="border border-gray-400 px-3 py-2">CATEGORY</th>
                <th className="border border-gray-400 px-3 py-2">DATE ENTERED</th>
                <th className="border border-gray-400 px-3 py-2">DATE VISITED</th>
                <th className="border border-gray-400 px-3 py-2">DESCRIPTION</th>
                <th className="border border-gray-400 px-3 py-2">STATUS</th>
                {isEditing && <th className="border px-3 py-2"></th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="text-center">
                  <td className="border border-gray-400 px-3 py-2">{row.id}</td>
                  {Object.keys(row).slice(1).map((field) => (
                    <td key={field} className="border border-gray-400 px-3 py-2 text-left">
                      {isEditing ? (
                        <input
                          type="text"
                          value={row[field as keyof PatientDocument]}
                          onChange={(e) => handleChange(row.id, field as keyof PatientDocument, e.target.value)}
                          className="w-full border-none focus:outline-none"
                          placeholder="null"
                        />
                      ) : (
                        row[field as keyof PatientDocument]
                      )}
                    </td>
                  ))}
                  {isEditing && (
                    <td className="border border-gray-400 px-3 py-2">
                      <button
                        onClick={() => deleteEntry(row.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
