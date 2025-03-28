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
      <div className="max-w-5xl mx-auto p-4 text-black">
        <h2 className="text-2xl font-bold text-center bg-[#f8e6db] p-2 border border-black">
          Medication Administration Record (MAR)
        </h2>

        <table className="w-full border-collapse border border-black mt-2">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-bold">
              <label htmlFor="Name" className="mr-2">
                  Name:
                </label>
                {isEditing ? (
                  <input
                  id="Name"
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
                <label htmlFor="startDate" className="mr-2">
                  Start Date:
                </label>
                {isEditing ? (
                  <input
                    id="startDate"
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
              <label htmlFor="endDate" className="mr-2">
                  End Date:
                </label>
                {isEditing ? (
                  <input
                    id="endDate"
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
              <label htmlFor="dateBirth" className="mr-2">
                  Date of Birth:
                </label>
                {isEditing ? (
                  <input
                  id="dateBirth"
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
              <label htmlFor="doctor" className="mr-2">
                  Doctor:
                </label>
                {isEditing ? (
                  <input
                  id="doctor"
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
              <label htmlFor="allergies" className="mr-2">
                  Known Allergies:
                </label>
                {isEditing ? (
                  <input
                  id="allergies"
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
                <label htmlFor="address" className="mr-2">Address: </label>
                {isEditing ? (
                  <input
                    id="address"
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

        {/* second part */}
        <table className="border-collapse border border-black w-full text-sm">
  <thead>
    <tr>
      <td className="border border-black px-4 py-2 font-bold text-left" rowSpan={3}>
        Medication Details
      </td>
      <td className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
        Week commencing
      </td>
      <td className="border border-black px-4 py-2 font-bold text-center" colSpan={9}>
       
      </td>
    </tr>
    <tr>
      <th className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
        DATE
      </th>
      <th className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
    
      </th>
      <th className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
    
      </th>
      <th className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
      
      </th>
      <th className="border border-black px-4 py-2 font-bold text-center" colSpan={2}>
     
      </th>
    </tr>
    <tr>
      <th className="border border-black px-4 py-2 font-bold">TIME</th>
      <th className="border border-black px-4 py-2 font-bold">DOSE</th>
      <th className="border border-black px-4 py-2 font-bold">Adm</th>
      <th className="border border-black px-4 py-2 font-bold">WT</th>
      <th className="border border-black px-4 py-2 font-bold">Adm</th>
      <th className="border border-black px-4 py-2 font-bold">WT</th>
      <th className="border border-black px-4 py-2 font-bold">Adm</th>
      <th className="border border-black px-4 py-2 font-bold">WT</th>
      <th className="border border-black px-4 py-2 font-bold">Adm</th>
      <th className="border border-black px-4 py-2 font-bold">WT</th>
    </tr>
  </thead>
</table>


      </div>
    </>
  );
};

export default Page;
