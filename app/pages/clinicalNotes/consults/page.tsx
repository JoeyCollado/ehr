"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Entry {
  consultReportID: string;
  patientID: string;
  consultingProvider: string;
  findings: string;
  recomendations: string;
  reportDate: string;
  followUpActions: string;
}

const Page = () => {
  const defaultDetails: Entry = {
    consultReportID: "-",
    patientID: "-",
    consultingProvider: "-",
    findings: "-",
    recomendations: "-",
    reportDate: "-",
    followUpActions: "-",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    } else {
      setEntries([defaultDetails]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const addEntry = () => {
    setEntries([...entries, defaultDetails]);
  };

  const deleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries.length > 0 ? updatedEntries : [defaultDetails]);
  };

  const handleInputChange = (index: number, field: keyof Entry, value: string) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEntries(updatedEntries);
  };

  return (
    <>
     <div className="flex justify-center items-center gap-4 mt-5 mb-2 mt-[5%]">
  <button
    onClick={handleEdit}
    className="text-1xl cursor-pointer rounded-md px-3 text-white bg-[#007bff] py-1 hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform"
  >
    {isEditing ? "Save" : "Edit"}
  </button>
  <button
    onClick={addEntry}
    className="text-1xl cursor-pointer rounded-md px-3 text-white bg-green-600 py-1 hover:bg-green-700 hover:scale-105 hover:shadow-lg transition-transform"
  >
    Add Entry
  </button>
</div>

      <div className="min-h-screen bg-[#faf6f6] text-[#3A2B22] flex flex-col items-center pl-[10%] pr-[10%] shadow-lg ">
        <div className={`w-full ${entries.length > 10 ? 'max-h-[500px] overflow-y-auto' : ''}`}>
            
          <table className="w-full border-collapse border ">
            <thead>
              <tr className="border">
                <th className="border px-2">Consult Report ID</th>
                <th className="border px-2">Patient ID</th>
                <th className="border px-2">Consulting Provider</th>
                <th className="border px-2">Findings</th>
                <th className="border px-2">Recomendations</th>
                <th className="border px-2">Report Date</th>
                <th className="border px-2">Follow-Up Actions</th>
                {isEditing && <th className="border px-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="border">
                  {Object.keys(defaultDetails).map((field) => (
                    <td key={field} className="border px-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={entry[field as keyof Entry] === "-" ? "" : entry[field as keyof Entry]}
                          onChange={(e) => handleInputChange(index, field as keyof Entry, e.target.value)}
                          className="w-full p-1 border"
                          title="field"
                        />
                      ) : (
                        entry[field as keyof Entry]
                      )}
                    </td>
                  ))}
                  {isEditing && (
                    <td className="border px-2 text-center">
                      <button
                        onClick={() => deleteEntry(index)}
                        className="text-white bg-red-600 px-2 py-1 rounded-md hover:bg-red-700"
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
    </>
  );
};

export default Page;