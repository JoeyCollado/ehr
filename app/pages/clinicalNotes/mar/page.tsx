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
        className="text-center text-1xl cursor-pointer rounded-md px-3 text-white bg-[#007bff] py-1 hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform mb-[2%] justify-center ml-[50%] mt-[5%]"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="max-w-5xl mx-auto p-4 text-black bg-white rounded-t-lg mb-[5%] rounded-lg">
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
<table className="w-full border-collapse border border-black mt-2">
  <thead>
    <tr>
      <th className="border border-black p-2">Medication</th>
      <th className="border border-black p-2">Time</th>
      <th className="border border-black p-2">Dose</th>
      <th className="border border-black p-2">Route</th>
      <th className="border border-black p-2">Frequency</th>
      <th className="border border-black p-2">Adm</th>
      <th className="border border-black p-2">Signature</th>
      <th className="border border-black p-2">Comments</th>
      <th className="border border-black p-2">Status</th>
      

    </tr>
  </thead>
  <tbody>
    {/* Amoxicillin */}
    <tr>
      <td className="border border-black p-2" rowSpan={4}>Amoxicillin</td>
      <td className="border border-black p-2">8:00 AM</td>
      <td className="border border-black p-2">250 mg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 8 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2">First dose</td>
      <td className="border border-black p-2"></td>
      <th className="border border-black p-2" rowSpan={4}>Additional Notes: - Monitor temperature every 4 hours.</th>
    </tr>
    <tr>
      <td className="border border-black p-2">4:00 PM</td>
      <td className="border border-black p-2">250 mg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 8 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>
    <tr>
      <td className="border border-black p-2">12:00 NN</td>
      <td className="border border-black p-2">250 mg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 8 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>
    <tr>
      <td className="border border-black p-2">8:00 AM</td>
      <td className="border border-black p-2">250 mg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 8 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>

    {/* Acetaminophen */}
    <tr>
      <td className="border border-black p-2" rowSpan={4}>Acetaminophen</td>
      <td className="border border-black p-2">8:00 AM</td>
      <td className="border border-black p-2">10 mg/kg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 4 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2">For fever (if needed)</td>
      <td className="border border-black p-2"></td>
      <th className="border border-black p-2" rowSpan={4}>Additional Notes: - Monitor temperature every 4 hours.</th>
    </tr>
    <tr>
      <td className="border border-black p-2">12:00 PM</td>
      <td className="border border-black p-2">10 mg/kg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 4 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>
    <tr>
      <td className="border border-black p-2">4:00 PM</td>
      <td className="border border-black p-2">10 mg/kg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 4 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>
    <tr>
      <td className="border border-black p-2">8:00 PM</td>
      <td className="border border-black p-2">10 mg/kg</td>
      <td className="border border-black p-2">Oral (PO)</td>
      <td className="border border-black p-2">Every 4 hours</td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
      <td className="border border-black p-2"></td>
    </tr>
  </tbody>
</table>

<div className="mt-4 ">
  <table className="border w-full text-start">
  <h3 className="font-bold pl-[5%] mt-[2.5%]">Physician’s Orders:</h3>
  <ul className="list-disc pl-[5%] mb-[2.5%]">
    <li>Monitor vital every 4 hours</li>
    <li>Nebulizer treatment as ordered</li>
  </ul>
  </table>
</div>
  



      </div>
    </>
  );
};

export default Page;
