"use client";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-[#3A2B22] flex flex-col items-center p-6">
      <div className="flex gap-10 text-white mt-[5%]">
        <button className="bg-orange-400 px-4 py-1 rounded-md cursor-pointer">Add Date</button>
        <button className="bg-blue-400 px-4 py-1 rounded-md cursor-pointer">Edit</button>
      </div>
      <div className="border border-gray-400 rounded-lg overflow-hidden w-full max-w-6xl mt-[1%]">
        <h2 className="text-xl font-bold text-center p-4 border-b bg-gray-100">
          PATIENT DOCUMENT MANAGEMENT
        </h2>
        <div className="">
          <div className="flex border border-gray-400">
            <div className="flex-1 flex items-center justify-center border-r border-gray-400 p-4">
              <span className="font-semibold">PATIENT NAME:</span>
            </div>
            <div className="flex-1 flex items-center justify-center border-r border-gray-400 p-4">
              <span className="font-semibold">DOCTOR:</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <span className="font-semibold">DATE:</span>
            </div>
          </div>

          <p className="p-4 font-semibold">ALL</p>
        </div>
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-3 py-2">#</th>
              <th className="border border-gray-400 px-3 py-2">CATEGORY</th>
              <th className="border border-gray-400 px-3 py-2">DATE ENTERED</th>
              <th className="border border-gray-400 px-3 py-2">DATE VISITED</th>
              <th className="border border-gray-400 px-3 py-2">DESCRIPTION</th>
              <th className="border border-gray-400 px-3 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                category: "Medical Administration Record",
                dateEntered: "3/10/2025",
                description: "Medication Record",
              },
              { id: 2, category: "Visit Note", dateEntered: "3/10/2025" },
              {
                id: 3,
                category: "Consent Form",
                dateEntered: "3/10/2025",
                description: "Agreement/Consent Form",
              },
              { id: 4, category: "Consult", dateEntered: "3/10/2025" },
              {
                id: 5,
                category: "Appointment Letter",
                dateEntered: "3/10/2025",
                description: "Referral Form",
              },
              {
                id: 6,
                category: "Registration (BILLING)",
                dateEntered: "3/10/2025",
                description: "Patient Registration Form",
              },
              { id: 7 },
              { id: 8 },
              { id: 9 },
              { id: 10 },
            ].map((row) => (
              <tr key={row.id} className="text-center">
                <td className="border border-gray-400 px-3 py-2">{row.id}</td>
                <td className="border border-gray-400 px-3 py-2 text-left">
                  {row.category || ""}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {row.dateEntered || ""}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {row.dateVisited || ""}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-left">
                  {row.description || ""}
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  {row.status || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
