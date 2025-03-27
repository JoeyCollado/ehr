"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const defaultDetails = {
    name: "",
    birthDate: "",
    startDate: "",
    endDate: "",
    doctor: "",
    knownAllergies: "",
    Address: "",
  };

  const [details, setDetails] = useState(defaultDetails);

  useEffect(() => {
    setHasMounted(true);
    const savedDetails = localStorage.getItem("details");

    if (savedDetails) setDetails(JSON.parse(savedDetails));
  }, []);

  const handleEdit = () => {
    if (isEditing) {
      localStorage.setItem("details", JSON.stringify(details));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setDetails({ ...details, [key]: e.target.value });
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
      <div className="max-w-6xl mx-auto p-4 text-black">
        <h2 className="text-2xl font-bold text-center bg-[#f8e6db] p-2 border border-black">
          Medication Administration Record (MAR)
        </h2>

        <table className="w-full border-collapse border border-black mt-2">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-bold">
                <span>Name: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.name
                )}
              </td>
              <td className="border border-black p-2 font-bold">
                <span>Start Date: </span>
                {isEditing ? (
                  <input
                    type="date"
                    value={details.startDate}
                    onChange={(e) => handleChange(e, "startDate")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.startDate
                )}
              </td>
              <td className="border border-black p-2 font-bold">
                <span>End Date: </span>
                {isEditing ? (
                  <input
                    type="date"
                    value={details.endDate}
                    onChange={(e) => handleChange(e, "endDate")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.endDate
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold">
                <span>Date of Birth: </span>
                {isEditing ? (
                  <input
                    type="date"
                    value={details.birthDate}
                    onChange={(e) => handleChange(e, "birthDate")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.birthDate
                )}
              </td>
              <td className="border border-black p-2 font-bold" colSpan={2}>
                <span>Doctor: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={details.doctor}
                    onChange={(e) => handleChange(e, "doctor")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.doctor
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold" colSpan={3}>
                <span>Known Allergies: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={details.knownAllergies}
                    onChange={(e) => handleChange(e, "knownAllergies")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.knownAllergies
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold" colSpan={3}>
                <span>Address: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={details.Address}
                    onChange={(e) => handleChange(e, "Address")}
                    className="border p-1 w-full"
                  />
                ) : (
                  details.Address
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
