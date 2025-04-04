"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


interface MedicationRow {
  drugName: string;
  dosage: string;
  route: string;
  frequency: string;
  startDateTime: string;
  duration: string;
  quantity: string;
  prescribingPhysician: string;
}

interface LabTestRow {
  testName: string;
  testCode: string;
  collectionDateTime: string;
  urgency: string;
  orderingPhysician: string;
}

interface ImagingRow {
  imagingType: string;
  bodyPart: string;
  reason: string;
  instructions: string;
  orderingPhysician: string;
}

interface ProcedureRow {
  procedureName: string;
  procedureCode: string;
  scheduledDateTime: string;
  location: string;
  preoperativeInstruction: string;
  orderingPhysician: string;
}

interface ReferralRow {
  orderType: string;
  referralTo: string;
  reason: string;
  primaryDiagnosis: string;
  clinicalSummary: string;
  referralPhysician: string;
}

interface NursingRow {
  orderType: string;
  nursingOrder: string;
}

type TableRow = MedicationRow | LabTestRow | ImagingRow | ProcedureRow | ReferralRow | NursingRow;

interface TableData {
  [key: string]: TableRow[]; // Now correctly enforces an array of known row types
  medication: MedicationRow[];
  labTest: LabTestRow[];
  imaging: ImagingRow[];
  procedure: ProcedureRow[];
  referral: ReferralRow[];
  nursing: NursingRow[];
}


const defaultTables: TableData = {
  medication: [
    {
      drugName: "Amoxicillin",
      dosage: "250mg",
      route: "Oral",
      frequency: "Every 8 hours",
      startDateTime: "2025-03-24",
      duration: "7 days",
      quantity: "21 capsules",
      prescribingPhysician: "Dr. Michael Reyes",
    },
  ],
  labTest: [
    {
      testName: "Complete Blood Count (CBC)",
      testCode: "CBC01",
      collectionDateTime: "3/24/2025",
      urgency: "STAT",
      orderingPhysician: "Dr. Michael Reyes",
    },
    {
      testName: "Sputum Culture",
      testCode: "SPC01",
      collectionDateTime: "3/24/2025",
      urgency: "Routine",
      orderingPhysician: "Dr. Michael Reyes",
    },
  ],
  imaging: [
    {
      imagingType: "Chest X-Ray",
      bodyPart: "Lungs",
      reason: "Suspected Pneumonia",
      instructions: "PA and Lateral views",
      orderingPhysician: "Dr. Michael Reyes",
    },
  ],
  procedure: [
    {
      procedureName: "Chest X-Ray, Two Views (PA & Lateral)",
      procedureCode: "7046",
      scheduledDateTime: "3/24/2025",
      location: "Radiology Department",
      preoperativeInstruction: "Remove any metal objects",
      orderingPhysician: "Dr. Michael Reyes",
    },
  ],
  referral: [
    {
      orderType: "Referral Order",
      referralTo: "Pulmonology, Primary Care, Infectious Disease",
      reason: "Evaluation and Management for Pneumonia",
      primaryDiagnosis: "J18.9 (Pneumonia, unspecified organism)",
      clinicalSummary:
        "Symptoms: Fever, cough, dyspnea, fatigue Dr. Michael Reyes Diagnostics: Chest Xray shows infiltrates Treatment: Antibiotics, oxygen therapy (if applicable) Response: [Stable/Improving/Worsening]",
      referralPhysician: "Dr. Michael Reyes",
    },
  ],
  nursing: [
    { orderType: "Patient Name", nursingOrder: "Patient's Name" },
    { orderType: "Date of Birth", nursingOrder: "Patient's Date of Birth" },
    {
      orderType: "Medication Administration",
      nursingOrder:
        "Administer prescribed antibiotics and antipyretics, Provide nebulizer treatments as needed",
    },
    {
      orderType: "Diagnosis (ICD-10)",
      nursingOrder: "J18.9 (Pneumonia, unspecified organism)",
    },
    {
      orderType: "Vital Signs Monitoring",
      nursingOrder:
        "Monitor temperature, HR, RR, BP, SpO₂ q4h , Notify provider if SpO₂ > 92% or RR > 30/min",
    },
    {
      orderType: "Respiratory Care",
      nursingOrder: "Administer oxygen therapy as ordered",
    },
    {
      orderType: "Nutritional Support",
      nursingOrder: "Assess nutritional status and encourage high-protein diet",
    },
    {
      orderType: "Patient Education",
      nursingOrder:
        "Educate patient on pneumonia, medication adherence, and symptoms to report, Provide smoking cessation counseling if applicable",
    },
  ],
};

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tables, setTables] = useState<TableData>(defaultTables);
  const [hasMounted, setHasMounted] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("medicalOrdersData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTables(parsedData);
      } catch (error) {
        console.error("Failed to parse saved data", error);
      }
    }
    setHasMounted(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("medicalOrdersData", JSON.stringify(tables));
    }
  }, [tables, hasMounted]);

  const handleSave = () => {
    setIsEditing(false);
    // Data is already being saved to localStorage via useEffect
    console.log("Saved data:", tables);
  };

  const handleInputChange = (
    tableName: keyof TableData,
    rowIndex: number,
    field: string,
    value: string
  ) => {
    const updatedTables = { ...tables };
    updatedTables[tableName] = [...updatedTables[tableName]];
    updatedTables[tableName][rowIndex] = {
      ...updatedTables[tableName][rowIndex],
      [field]: value,
    };
    setTables(updatedTables);
  };
  

  const addRow = (tableName: keyof TableData) => {
    const updatedTables = { ...tables };
    
    // Create an empty row based on the table structure
    switch (tableName) {
      case "medication":
        updatedTables[tableName].push({
          drugName: "",
          dosage: "",
          route: "",
          frequency: "",
          startDateTime: "",
          duration: "",
          quantity: "",
          prescribingPhysician: ""
        });
        break;
      case "labTest":
        updatedTables[tableName].push({
          testName: "",
          testCode: "",
          collectionDateTime: "",
          urgency: "",
          orderingPhysician: ""
        });
        break;
      case "imaging":
        updatedTables[tableName].push({
          imagingType: "",
          bodyPart: "",
          reason: "",
          instructions: "",
          orderingPhysician: ""
        });
        break;
      case "procedure":
        updatedTables[tableName].push({
          procedureName: "",
          procedureCode: "",
          scheduledDateTime: "",
          location: "",
          preoperativeInstruction: "",
          orderingPhysician: ""
        });
        break;
      case "referral":
        updatedTables[tableName].push({
          orderType: "",
          referralTo: "",
          reason: "",
          primaryDiagnosis: "",
          clinicalSummary: "",
          referralPhysician: ""
        });
        break;
      case "nursing":
        updatedTables[tableName].push({
          orderType: "",
          nursingOrder: ""
        });
        break;
      default:
        throw new Error(`Unknown table name: ${tableName}`);
    }
    
    setTables(updatedTables);
  };

  const deleteRow = (tableName: keyof TableData, rowIndex: number) => {
    const updatedTables = { ...tables };
    updatedTables[tableName].splice(rowIndex, 1);
    setTables(updatedTables);
  };

  if (!hasMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
     <motion.div  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className="flex justify-center mt-[5%]">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer mb-4"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform text-white px-4 py-1 rounded cursor-pointer mb-4"
          >
            Edit
          </button>
        )}
      </div>

      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%] text-black">
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
          {/* MEDICATION ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            MEDICATION ORDER
          </h2>
          <div className="overflow-x-auto mb-8  border border-[#00695C]">
            <table className="min-w-full border border-gray-200 ">
              <thead className="bg-[#00695C] text-white ">
                <tr>
                  <th className="py-2 px-4 border-b text-left ">Drug Name</th>
                  <th className="py-2 px-4 border-b text-left ">Dosage</th>
                  <th className="py-2 px-4 border-b text-left ">Route</th>
                  <th className="py-2 px-4 border-b text-left ">Frequency</th>
                  <th className="py-2 px-4 border-b text-left ">
                    Start Date/Time
                  </th>
                  <th className="py-2 px-4 border-b text-left ">Duration</th>
                  <th className="py-2 px-4 border-b text-left ">Quantity</th>
                  <th className="py-2 px-4 border-b text-left ">
                    Prescribing Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left border">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.medication.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="medication"
                          type="text"
                          value={row.drugName}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "drugName",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.drugName
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="dosage"
                          type="text"
                          value={row.dosage}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "dosage",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.dosage
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="route"
                          type="text"
                          value={row.route}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "route",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.route
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="frequency"
                          type="text"
                          value={row.frequency}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "frequency",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.frequency
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="date"
                          type="text"
                          value={row.startDateTime}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "startDateTime",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded "
                        />
                      ) : (
                        row.startDateTime
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="duration"
                          type="text"
                          value={row.duration}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.duration
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="quantity"
                          type="text"
                          value={row.quantity}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.quantity
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="physician"
                          type="text"
                          value={row.prescribingPhysician}
                          onChange={(e) =>
                            handleInputChange(
                              "medication",
                              index,
                              "prescribingPhysician",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.prescribingPhysician
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => deleteRow("medication", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("medication")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>

          {/* LAB TEST ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">LAB TEST ORDER</h2>
          <div className="overflow-x-auto mb-8  border border-[#00695C]">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#00695C] text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Test Name</th>
                  <th className="py-2 px-4 border-b text-left">Test Code</th>
                  <th className="py-2 px-4 border-b text-left">
                    Collection Date/Time
                  </th>
                  <th className="py-2 px-4 border-b text-left">Urgency</th>
                  <th className="py-2 px-4 border-b text-left">
                    Ordering Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.labTest.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="test"
                          type="text"
                          value={row.testName}
                          onChange={(e) =>
                            handleInputChange(
                              "labTest",
                              index,
                              "testName",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.testName
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="textcode"
                          type="text"
                          value={row.testCode}
                          onChange={(e) =>
                            handleInputChange(
                              "labTest",
                              index,
                              "testCode",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.testCode
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="collection"
                          type="text"
                          value={row.collectionDateTime}
                          onChange={(e) =>
                            handleInputChange(
                              "labTest",
                              index,
                              "collectionDateTime",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.collectionDateTime
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="urgency"
                          type="text"
                          value={row.urgency}
                          onChange={(e) =>
                            handleInputChange(
                              "labTest",
                              index,
                              "urgency",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.urgency
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="order"
                          type="text"
                          value={row.orderingPhysician}
                          onChange={(e) =>
                            handleInputChange(
                              "labTest",
                              index,
                              "orderingPhysician",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.orderingPhysician
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b border">
                        <button
                          onClick={() => deleteRow("labTest", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("labTest")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>

          {/* IMAGING ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">IMAGING ORDER</h2>
          <div className="overflow-x-auto mb-8 border border-[#00695C]">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#00695C] text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Imaging Type</th>
                  <th className="py-2 px-4 border-b text-left">
                    Body Part to be Imaged
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Reason for Imaging
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Special Instructions
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Ordering Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.imaging.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="imaging"
                          type="text"
                          value={row.imagingType}
                          onChange={(e) =>
                            handleInputChange(
                              "imaging",
                              index,
                              "imagingType",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.imagingType
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="bodypart"
                          type="text"
                          value={row.bodyPart}
                          onChange={(e) =>
                            handleInputChange(
                              "imaging",
                              index,
                              "bodyPart",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.bodyPart
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="reason"
                          type="text"
                          value={row.reason}
                          onChange={(e) =>
                            handleInputChange(
                              "imaging",
                              index,
                              "reason",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.reason
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="instructions"
                          type="text"
                          value={row.instructions}
                          onChange={(e) =>
                            handleInputChange(
                              "imaging",
                              index,
                              "instructions",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.instructions
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="order"
                          type="text"
                          value={row.orderingPhysician}
                          onChange={(e) =>
                            handleInputChange(
                              "imaging",
                              index,
                              "orderingPhysician",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.orderingPhysician
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b border">
                        <button
                          onClick={() => deleteRow("imaging", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("imaging")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>

          {/* PROCEDURE ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            PROCEDURE ORDER
          </h2>
          <div className="overflow-x-auto  border border-[#00695C]">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#00695C] text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Procedure Name</th>
                  <th className="py-2 px-4 border-b text-left">Procedure Code</th>
                  <th className="py-2 px-4 border-b text-left">
                    Scheduled Date/Time
                  </th>
                  <th className="py-2 px-4 border-b text-left">Location</th>
                  <th className="py-2 px-4 border-b text-left">
                    Preoperative Instruction
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Ordering Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.procedure.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="procedure"
                          type="text"
                          value={row.procedureName}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "procedureName",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.procedureName
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="procedure"
                          type="text"
                          value={row.procedureCode}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "procedureCode",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.procedureCode
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="schedule"
                          type="text"
                          value={row.scheduledDateTime}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "scheduledDateTime",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.scheduledDateTime
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="location"
                          type="text"
                          value={row.location}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "location",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.location
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="preoperative"
                          type="text"
                          value={row.preoperativeInstruction}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "preoperativeInstruction",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.preoperativeInstruction
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="order"
                          type="text"
                          value={row.orderingPhysician}
                          onChange={(e) =>
                            handleInputChange(
                              "procedure",
                              index,
                              "orderingPhysician",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.orderingPhysician
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => deleteRow("procedure", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("procedure")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>

          {/* REFERRAL ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4 text-center">
            REFERRAL ORDER
          </h2>
          <div className="overflow-x-auto  border border-[#00695C]">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#00695C] text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Order Type</th>
                  <th className="py-2 px-4 border-b text-left">Referral To</th>
                  <th className="py-2 px-4 border-b text-left">
                    Reason for Referral
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Primary Diagnosis (ICD10){" "}
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Clinical Summary
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Referral Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.referral.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="order"
                          type="text"
                          value={row.orderType}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "orderType",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.orderType
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="referral"
                          type="text"
                          value={row.referralTo}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "referralTo",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.referralTo
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="reason"
                          type="text"
                          value={row.reason}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "reason",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.reason
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="diagnosis"
                          type="text"
                          value={row.primaryDiagnosis}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "primaryDiagnosis",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.primaryDiagnosis
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <textarea
                        title="clinical"
                          value={row.clinicalSummary}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "clinicalSummary",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.clinicalSummary
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="referral"
                          type="text"
                          value={row.referralPhysician}
                          onChange={(e) =>
                            handleInputChange(
                              "referral",
                              index,
                              "referralPhysician",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.referralPhysician
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b border">
                        <button
                          onClick={() => deleteRow("referral", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("referral")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>

          {/* NURSING ORDER */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4 text-center">
            NURSING ORDER
          </h2>
          <div className="overflow-x-auto  border border-[#00695C]">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#00695C] text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Order Type</th>
                  <th className="py-2 px-4 border-b text-left">Nursing Order</th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.nursing.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <input
                        title="order"
                          type="text"
                          value={row.orderType}
                          onChange={(e) =>
                            handleInputChange(
                              "nursing",
                              index,
                              "orderType",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.orderType
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border">
                      {isEditing ? (
                        <textarea
                        title="nursing"
                          value={row.nursingOrder}
                          onChange={(e) =>
                            handleInputChange(
                              "nursing",
                              index,
                              "nursingOrder",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.nursingOrder
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-2 px-4 border-b border">
                        <button
                          onClick={() => deleteRow("nursing", index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <button
                onClick={() => addRow("nursing")}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Add Entry
              </button>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default Page;