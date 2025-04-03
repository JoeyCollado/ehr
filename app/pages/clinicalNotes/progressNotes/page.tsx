"use client";

import { useState, useEffect } from "react";
import React from "react";

interface Entry {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  roomNumber: string;
  date_Time: string;
  progressNotes: string;
  nurseInfo: string;
}

const Page = () => {
  const defaultDetails: Entry = {
    firstName: "-",
    lastName: "-",
    dateOfBirth: "-",
    roomNumber: "-",
    date_Time: "-",
    progressNotes: "-",
    nurseInfo: "-",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([defaultDetails]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load entries on initial render
  useEffect(() => {
    const loadEntries = () => {
      try {
        const storedEntries = localStorage.getItem("consultationEntries");
        if (storedEntries) {
          const parsedEntries = JSON.parse(storedEntries);
          if (Array.isArray(parsedEntries)) {
            setEntries(parsedEntries.length > 0 ? parsedEntries : [defaultDetails]);
          }
        }
      } catch (error) {
        console.error("Error loading entries from localStorage:", error);
        setEntries([defaultDetails]);
      }
      setHasLoaded(true);
    };

    loadEntries();
    window.addEventListener("focus", loadEntries);
    return () => window.removeEventListener("focus", loadEntries);
  }, []);

  // Save entries when they change (only after initial load)
  useEffect(() => {
    if (hasLoaded) {
      try {
        localStorage.setItem("consultationEntries", JSON.stringify(entries));
      } catch (error) {
        console.error("Error saving entries to localStorage:", error);
      }
    }
  }, [entries, hasLoaded]);

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

  return (
    <>
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

      <div className="min-h-screen bg-[#faf6f6] text-[#3A2B22] flex flex-col items-center p-10 shadow-lg">
        <div className="w-full max-w-5xl border border-black">
          <div className="bg-[#E8A87C] text-center font-bold text-lg p-2 border-b border-black italic">
            NURSING PROGRESS NOTES
          </div>

          <div className="border-b border-black">
            <div className="grid grid-cols-1 border-b border-black">
              <div className="p-2 font-bold border-b border-black">Patient Information</div>
            </div>
            {["firstName", "lastName", "dateOfBirth", "roomNumber"].map((field, index) => (
              <div key={index} className="grid grid-cols-2 border-b border-black">
                <div className="border-r border-black p-2 font-bold">
                  {field.replace(/([A-Z])/g, " $1")}:{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      title="info"
                      value={entries[0]?.[field as keyof Entry] || ""}
                      onChange={(e) => {
                        const newEntries = [...entries];
                        newEntries[0][field as keyof Entry] = e.target.value;
                        setEntries(newEntries);
                      }}
                      className="border p-1 w-full"
                    />
                  ) : (
                    entries[0]?.[field as keyof Entry] || "-"
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 bg-[#E8A87C] border-b border-black text-center font-bold">
            <div className="p-2 border-r border-black">DATE / TIME</div>
            <div className="p-2">PROGRESS NOTES</div>
            <div className="p-2 border-l border-black">Nurse Name with Signature:</div>
          </div>

          {entries.map((entry, index) => (
            <div key={index} className="grid grid-cols-3 border-b border-black relative">
              <div className="p-2 border-r border-black">
                {isEditing ? (
                  <input
                    type="text"
                    title="info"
                    value={entry.date_Time || ""}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].date_Time = e.target.value;
                      setEntries(newEntries);
                    }}
                    className="border p-1 w-full"
                  />
                ) : (
                  entry.date_Time || "-"
                )}
              </div>
              <div className="p-2">
                {isEditing ? (
                  <textarea
                    title="info"
                    value={entry.progressNotes || ""}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].progressNotes = e.target.value;
                      setEntries(newEntries);
                    }}
                    className="border p-1 w-full"
                  />
                ) : (
                  entry.progressNotes || "-"
                )}
              </div>
              <div className="p-2 border-l border-black">
                {isEditing ? (
                  <input
                    type="text"
                    title="info"
                    value={entry.nurseInfo || ""}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].nurseInfo = e.target.value;
                      setEntries(newEntries);
                    }}
                    className="border p-1 w-full"
                  />
                ) : (
                  entry.nurseInfo || "-"
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => deleteEntry(index)}
                  className="absolute right-0 top-0 transform translate-x-full text-white bg-red-600 p-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;