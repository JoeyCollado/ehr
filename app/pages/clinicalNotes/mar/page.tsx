"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  const defaultMedications = [
    {
      name: "Amoxicillin",
      additionalNotes: "Monitor temperature every 4 hours.",
      times: [
        { time: "8:00 AM", dose: "250 mg", route: "Oral (PO)", frequency: "Every 8 hours", comments: "First dose", status: "", adm: "", signature: "" },
        { time: "4:00 PM", dose: "250 mg", route: "Oral (PO)", frequency: "Every 8 hours", comments: "", status: "", adm: "", signature: "" },
        { time: "12:00 NN", dose: "250 mg", route: "Oral (PO)", frequency: "Every 8 hours", comments: "", status: "", adm: "", signature: "" },
        { time: "8:00 AM", dose: "250 mg", route: "Oral (PO)", frequency: "Every 8 hours", comments: "", status: "", adm: "", signature: "" },
      ]
    },
    {
      name: "Acetaminophen",
      additionalNotes: "Monitor for pain relief effectiveness.",
      times: [
        { time: "8:00 AM", dose: "10 mg/kg", route: "Oral (PO)", frequency: "Every 4 hours", comments: "For fever (if needed)", status: "", adm: "", signature: "" },
        { time: "12:00 PM", dose: "10 mg/kg", route: "Oral (PO)", frequency: "Every 4 hours", comments: "", status: "", adm: "", signature: "" },
        { time: "4:00 PM", dose: "10 mg/kg", route: "Oral (PO)", frequency: "Every 4 hours", comments: "", status: "", adm: "", signature: "" },
        { time: "8:00 PM", dose: "10 mg/kg", route: "Oral (PO)", frequency: "Every 4 hours", comments: "", status: "", adm: "", signature: "" },
      ]
    }
  ];

  const [details, setDetails] = useState(defaultDetails);
  const [medications, setMedications] = useState(defaultMedications);
  const [physicianOrders, setPhysicianOrders] = useState([
    "Monitor vital every 4 hours",
    "Nebulizer treatment as ordered"
  ]);

  

  useEffect(() => {
    setHasMounted(true);
    const savedDetails = localStorage.getItem("details");
    const savedMeds = localStorage.getItem("medications");
    const savedOrders = localStorage.getItem("physicianOrders");

    if (savedDetails) setDetails(JSON.parse(savedDetails));
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedOrders) setPhysicianOrders(JSON.parse(savedOrders));
  }, []);

  const handleEdit = () => {
    if (isEditing) {
      localStorage.setItem("details", JSON.stringify(details));
      localStorage.setItem("medications", JSON.stringify(medications));
      localStorage.setItem("physicianOrders", JSON.stringify(physicianOrders));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setDetails({ ...details, [key]: e.target.value });
  };

  const handleMedicationChange = (
    medIndex: number,
    timeIndex: number,
    field: string,
    value: string,
  ) => {
    // Define valid field types explicitly
    type MedicationTimeField = 'time' | 'dose' | 'route' | 'frequency';
    const validFields: MedicationTimeField[] = ['time', 'dose', 'route', 'frequency'];
  
    // Narrow down the type with type guard
    if (!validFields.includes(field as MedicationTimeField)) return;
  
    const updatedMeds = [...medications];
    updatedMeds[medIndex].times[timeIndex][field as MedicationTimeField] = value;
    setMedications(updatedMeds);
  };
  
  const handleAdditionalNotesChange = (medIndex: number, value: string) => {
    const updatedMeds = [...medications];
    updatedMeds[medIndex].additionalNotes = value;
    setMedications(updatedMeds);
  };

  const handlePhysicianOrderChange = (index: number, value: string) => {
    const updatedOrders = [...physicianOrders];
    updatedOrders[index] = value;
    setPhysicianOrders(updatedOrders);
  };

  const handleStatusChange = (medIndex: number, timeIndex: number, color: string) => {
    const updatedMeds = [...medications];
    updatedMeds[medIndex].times[timeIndex].status = color;
    setMedications(updatedMeds);
  };

  const handleDeleteMedication = (medIndex: number) => {
    const updatedMeds = medications.filter((_, index) => index !== medIndex);
    setMedications(updatedMeds);
  };

  const handleAddMedication = () => {
    const newMedication = {
      name: "New Medication",
      additionalNotes: "",
      times: [
        { time: "", dose: "", route: "", frequency: "", comments: "", status: "", adm: "", signature: "" }
      ]
    };
    setMedications([...medications, newMedication]);
  };

  const handleDeleteOrder = (index: number) => {
    const updatedOrders = physicianOrders.filter((_, i) => i !== index);
    setPhysicianOrders(updatedOrders);
  };

  if (!hasMounted) return null;
  return (
    <>
      <motion.div  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <button
        onClick={handleEdit}
        className="text-center text-1xl cursor-pointer rounded-md px-3 text-white bg-[#007bff] py-1 hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform mb-[2%] justify-center ml-[50%] mt-[5%]"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="max-w-5xl mx-auto p-4 text-black bg-white rounded-t-lg mb-[5%] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center bg-[#00695C] text-white p-2 border border-black">
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

        <div className="max-h-96 overflow-y-auto scrollbar-hidden">
          <table className="w-full border-collapse border border-black mt-2 ">
            <thead className="bg-[#00695C] text-white">
              <tr>
                <th className="border border-black p-2">Medication</th>
                <th className="border border-black p-2">Time</th>
                <th className="border border-black p-2">Dose</th>
                <th className="border border-black p-2">Route</th>
                <th className="border border-black p-2">Frequency</th>
                <th className="border border-black p-2">Adm</th>
                <th className="border border-black p-2">Signature</th>
                <th className="border border-black p-2">Comments</th>
                <th className="border border-black p-2 px-8">Status</th>
                <th className="border border-black p-2">Additional Notes</th>
                {!isEditing && <th className="border border-black p-2">Actions</th>}
                {isEditing && <th className="border border-black p-2">Actions</th>}
                </tr>
            </thead>
            <tbody>
              {medications.map((med, medIndex) => (
                <React.Fragment key={medIndex}>
                  {med.times.map((time, timeIndex) => (
                    <tr key={`${medIndex}-${timeIndex}`}>
                      {timeIndex === 0 && (
                        <td className="border border-black p-2" rowSpan={med.times.length}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={med.name}
                              onChange={(e) => {
                                const updatedMeds = [...medications];
                                updatedMeds[medIndex].name = e.target.value;
                                setMedications(updatedMeds);
                              }}
                              className="border p-1 w-full"
                            />
                          ) : (
                            med.name
                          )}
                        </td>
                      )}
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.time}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'time', e.target.value)}
                            className="border p-1 w-full"
                            title="time"
                          />
                        ) : (
                          time.time
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.dose}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'dose', e.target.value)}
                            className="border p-1 w-full"
                            title="dose"
                          />
                        ) : (
                          time.dose
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.route}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'route', e.target.value)}
                            className="border p-1 w-full"
                            title="route"
                          />
                        ) : (
                          time.route
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.frequency}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'frequency', e.target.value)}
                            className="border p-1 w-full"
                            title="frequency"
                          />
                        ) : (
                          time.frequency
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.adm}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'adm', e.target.value)}
                            className="border p-1 w-full"
                            title="adm"
                          />
                        ) : (
                          time.adm
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.signature}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'signature', e.target.value)}
                            className="border p-1 w-full"
                            title="signature"
                          />
                        ) : (
                          time.signature
                        )}
                      </td>
                      <td className="border border-black p-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={time.comments}
                            onChange={(e) => handleMedicationChange(medIndex, timeIndex, 'comments', e.target.value)}
                            className="border p-1 w-full"
                            title="comments"
                          />
                        ) : (
                          time.comments
                        )}
                      </td>
                      <td className="border border-black p-2" style={{ backgroundColor: time.status }}>
                        {isEditing && (
                          <select
                            value={time.status}
                            onChange={(e) => handleStatusChange(medIndex, timeIndex, e.target.value)}
                            className="w-full"
                            title="status"
                          >
                            <option value="">Select Status</option>
                            <option value="#4CAF50">Given</option>
                            <option value="#F44336">Not Given</option>
                            <option value="#FF9800">Delayed</option>
                            <option value="#2196F3">Discontinued</option>
                          </select>
                        )}
                      </td>
                      {timeIndex === 0 && (
                        <>
                          <td className="border border-black p-2 text-center" rowSpan={med.times.length}>
                            {isEditing ? (
                              <textarea
                                value={med.additionalNotes}
                                onChange={(e) => handleAdditionalNotesChange(medIndex, e.target.value)}
                                className="border p-1 w-full h-full"
                                placeholder="notes"
                              />
                            ) : (
                              med.additionalNotes
                            )}
                          </td>
                          <td className="border border-black p-2 text-center" rowSpan={med.times.length}>
                            {isEditing && (
                              <button
                                onClick={() => handleDeleteMedication(medIndex)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <button
            onClick={handleAddMedication}
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
          >
            Add Medication
          </button>
        )}

        <div className="mt-4 border pl-2 py-2 ">
          <h3 className="font-bold">Physician’s Orders:</h3>
          {isEditing ? (
            <div>
              {physicianOrders.map((order, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <input
                    type="text"
                    value={order}
                    onChange={(e) => handlePhysicianOrderChange(index, e.target.value)}
                    className="border p-1 flex-1"
                    title="order"
                  />
                  <button
                    onClick={() => handleDeleteOrder(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() => setPhysicianOrders([...physicianOrders, ""])}
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              >
                Add Order
              </button>
            </div>
          ) : (
            <ul className="list-disc pl-5">
              {physicianOrders.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

<div className="max-w-5xl mx-auto p-4 text-black bg-white rounded-t-lg mb-[5%] rounded-lg shadow-lg">
      <div className="overflow-x-auto ">
      <table className="border-collapse border border-gray-800 text-[14px] text-center ">
        <thead>
          <tr className="bg-[#00695C] text-white">
            <th className="border border-gray-800 p-2 pb-10">Codes to be used:</th>
            <th className="border border-gray-800 p-2 pb-10">(R) <br></br> Refused</th>
            <th className="border border-gray-800 p-2 pb-5">(E)<br></br> Refused and destroyed</th>
            <th className="border border-gray-800 p-2 pb-10">(T)<br></br> Taken</th>
            <th className="border border-gray-800 p-2 pb-10">(P)<br></br>Prompt</th>
            <th className="border border-gray-800 p-2 pb-5">(NT)<br></br> Not taken</th>
            <th className="border border-gray-800 p-2 pb-5">(NR)<br></br>Not required</th>
            <th className="border border-gray-800 p-2 pb-5">(Adm)<br></br> Administered by</th>
            <th className="border border-gray-800 p-2 pb-5">(M)<br></br>Made available</th>
            <th className="border border-gray-800 p-2 pb-5">(WT)<br></br>Witnessed by</th>
            <th className="border border-gray-800 p-2 pb-10">(C)<br></br> Hospitalised</th>
            <th className="border border-gray-800 p-2 pb-5">(D)<br></br> Social leave</th>
          </tr>
        </thead>
      </table>
      <table className="w-full">
        <tbody>
          <tr className="flex flex-row text-center w-full">
            <td className="border border-gray-800 p-2 font-bold w-[20%]">Legend:</td>
            <td className="border border-gray-800 p-2 bg-green-500 text-white w-[20%]">Given</td>
            <td className="border border-gray-800 p-2 bg-red-500 text-white w-[20%]">Not given</td>
            <td className="border border-gray-800 p-2 bg-orange-500 text-white w-[20%]">Delayed</td>
            <td className="border border-gray-800 p-2 bg-blue-700 text-white w-[20%]">Discontinued</td>
          </tr>
        </tbody>
        </table>
    </div>
  
    </div>
    </motion.div>
    </>
  );
};

export default Page;