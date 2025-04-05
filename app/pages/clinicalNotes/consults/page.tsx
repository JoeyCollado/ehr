"use client";

import { useState, useEffect } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";


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
    consultReportID: "",
    patientID: "",
    consultingProvider: "",
    findings: "",
    recomendations: "",
    reportDate: "",
    followUpActions: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const pathname = usePathname();

  // Load entries from localStorage on component mount or route change
  useEffect(() => {
    const loadEntries = () => {
      try {
        const storedEntries = localStorage.getItem("consultationEntries");
        console.log("Loading entries from localStorage:", storedEntries);
        
        if (storedEntries) {
          const parsedEntries = JSON.parse(storedEntries);
          const sanitizedEntries = parsedEntries.map((entry: Partial<Entry>) => ({
            ...defaultDetails,
            ...entry
          }));
          setEntries(sanitizedEntries.length > 0 ? sanitizedEntries : [{ ...defaultDetails }]);
        } else {
          setEntries([{ ...defaultDetails }]);
        }
      } catch (error) {
        console.error("Failed to load entries:", error);
        setEntries([{ ...defaultDetails }]);
      } finally {
        setHasHydrated(true);
      }
    };

    loadEntries();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "consultationEntries") {
        console.log("Storage event detected, reloading entries");
        loadEntries();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [pathname]); // Add pathname to dependency array

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (hasHydrated) {
      try {
        console.log("Saving entries to localStorage:", entries);
        localStorage.setItem("consultationEntries", JSON.stringify(entries));
      } catch (error) {
        console.error("Failed to save entries:", error);
      }
    }
  }, [entries, hasHydrated]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const addEntry = () => {
    setEntries([...entries, { ...defaultDetails }]);
  };

  const deleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries.length > 0 ? updatedEntries : [{ ...defaultDetails }]);
  };

  const handleInputChange = (index: number, field: keyof Entry, value: string) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEntries(updatedEntries);
  };

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <motion.div  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className="flex justify-center items-center gap-4 mb-5 mt-[5%]">
        <button
          onClick={handleEdit}
          className="text-1xl cursor-pointer rounded-md px-3 text-white bg-[#007bff] py-1 hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform"
        >
          {isEditing ? "Save & Exit" : "Edit"}
        </button>
        <button
          onClick={addEntry}
          className="text-1xl cursor-pointer rounded-md px-3 text-white bg-green-600 py-1 hover:bg-green-700 hover:scale-105 hover:shadow-lg transition-transform"
        >
          Add Entry
        </button>
      </div>

      <div className="min-h-screen bg-[#faf6f6] text-[#3A2B22] flex flex-col items-center pl-[10%] pr-[10%] shadow-lg">
        <div className={`w-full ${entries.length > 10 ? 'max-h-[500px] overflow-y-auto' : ''}`}>
          <table className="w-full border-collapse border bg-white">
            <thead className="bg-[#00695C] text-white text-[1.1rem] ">
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
                          value={entry[field as keyof Entry] || ""}
                          onChange={(e) => handleInputChange(index, field as keyof Entry, e.target.value)}
                          className="w-full p-1 border"
                          title={field}
                        />
                      ) : (
                        entry[field as keyof Entry] || "-"
                      )}
                    </td>
                  ))}
                  {isEditing && (
                    <td className="border px-2 text-center py-2">
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
      </motion.div>
    </>
  );
};

export default Page;