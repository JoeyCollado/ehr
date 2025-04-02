"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tables, setTables] = useState({
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
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log("Saved data:", tables);
  };

  const handleInputChange = (tableName, rowIndex, field, value) => {
    const updatedTables = { ...tables };
    updatedTables[tableName][rowIndex][field] = value;
    setTables(updatedTables);
  };

  const addRow = (tableName) => {
    const updatedTables = { ...tables };
    const emptyRow = {};
    
    // Create an empty row based on the table structure
    switch (tableName) {
      case "medication":
        emptyRow.drugName = "";
        emptyRow.dosage = "";
        emptyRow.route = "";
        emptyRow.frequency = "";
        emptyRow.startDateTime = "";
        emptyRow.duration = "";
        emptyRow.quantity = "";
        emptyRow.prescribingPhysician = "";
        break;
      case "labTest":
        emptyRow.testName = "";
        emptyRow.testCode = "";
        emptyRow.collectionDateTime = "";
        emptyRow.urgency = "";
        emptyRow.orderingPhysician = "";
        break;
      case "imaging":
        emptyRow.imagingType = "";
        emptyRow.bodyPart = "";
        emptyRow.reason = "";
        emptyRow.instructions = "";
        emptyRow.orderingPhysician = "";
        break;
      case "procedure":
        emptyRow.procedureName = "";
        emptyRow.procedureCode = "";
        emptyRow.scheduledDateTime = "";
        emptyRow.location = "";
        emptyRow.preoperativeInstruction = "";
        emptyRow.orderingPhysician = "";
        break;
      case "referral":
        emptyRow.orderType = "";
        emptyRow.referralTo = "";
        emptyRow.reason = "";
        emptyRow.primaryDiagnosis = "";
        emptyRow.clinicalSummary = "";
        emptyRow.referralPhysician = "";
        break;
      case "nursing":
        emptyRow.orderType = "";
        emptyRow.nursingOrder = "";
        break;
      default:
        break;
    }
    
    updatedTables[tableName].push(emptyRow);
    setTables(updatedTables);
  };

  const deleteRow = (tableName, rowIndex) => {
    const updatedTables = { ...tables };
    updatedTables[tableName].splice(rowIndex, 1);
    setTables(updatedTables);
  };

  return (
    <>
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            MEDICATION ORDER
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Drug Name</th>
                  <th className="py-2 px-4 border-b text-left">Dosage</th>
                  <th className="py-2 px-4 border-b text-left">Route</th>
                  <th className="py-2 px-4 border-b text-left">Frequency</th>
                  <th className="py-2 px-4 border-b text-left">
                    Start Date/Time
                  </th>
                  <th className="py-2 px-4 border-b text-left">Duration</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">
                    Prescribing Physician
                  </th>
                  {isEditing && (
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tables.medication.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        row.startDateTime
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">LAB TEST ORDER</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                      <td className="py-2 px-4 border-b">
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">IMAGING ORDER</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                      <td className="py-2 px-4 border-b">
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            PROCEDURE ORDER
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
          <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4">
            REFERRAL ORDER
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <textarea
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                      <td className="py-2 px-4 border-b">
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
          <h2 className="text-xl font-bold mb-4 text-gray-800 mt-4">
            NURSING ORDER
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <input
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
                    <td className="py-2 px-4 border-b">
                      {isEditing ? (
                        <textarea
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
                      <td className="py-2 px-4 border-b">
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
    </>
  );
};

export default page;