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

  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem("patientDocuments");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData([
        { id: 1, category: "Medical Administration Record", dateEntered: "3/10/2025", dateVisited: "", description: "Medication Record", status: "" },
        { id: 2, category: "Visit Note", dateEntered: "3/10/2025", dateVisited: "", description: "", status: "" },
        { id: 3, category: "Consent Form", dateEntered: "3/10/2025", dateVisited: "", description: "Agreement/Consent Form", status: "" },
        { id: 4, category: "Consult", dateEntered: "3/10/2025", dateVisited: "", description: "", status: "" },
        { id: 5, category: "Appointment Letter", dateEntered: "3/10/2025", dateVisited: "", description: "Referral Form", status: "" },
        { id: 6, category: "Registration (BILLING)", dateEntered: "3/10/2025", dateVisited: "", description: "Patient Registration Form", status: "" },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("patientDocuments", JSON.stringify(data));
    }
  }, [data, isMounted]);

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
    <div className="min-h-screen bg-white text-[#3A2B22] flex flex-col items-center p-6">
      <div className="flex gap-10 text-white mt-[5%]">
        <button onClick={addDateEntry} className="bg-orange-400 px-4 py-1 rounded-md cursor-pointer">Add Date</button>
        <button onClick={handleEdit} className="bg-blue-400 px-4 py-1 rounded-md cursor-pointer">{isEditing ? "Save" : "Edit"}</button>
      </div>
      <div className="border border-gray-400 rounded-lg overflow-hidden w-full max-w-6xl mt-[1%]">
        <h2 className="text-xl font-bold text-center p-4 border-b bg-gray-100">PATIENT DOCUMENT MANAGEMENT</h2>
        <div className="border border-gray-400 flex">
          <div className="flex-1 flex items-center justify-center border-r p-4 font-semibold">PATIENT NAME:</div>
          <div className="flex-1 flex items-center justify-center border-r p-4 font-semibold">DOCTOR:</div>
          <div className="flex-1 flex items-center justify-center p-4 font-semibold">DATE:</div>
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
                {isEditing && <th className="border  px-3 py-2"></th>}
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
