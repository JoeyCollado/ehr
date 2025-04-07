"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Entry = {
  id: number;
  date: string;
  rows: {
    time: string;
    oral: string;
    parenteral: string;
    intakeTotal: string;
    urine: string;
    drainage: string;
    others: string;
    outputTotal: string;
  }[];
};

const defaultRow = (time: string): Entry["rows"][0] => ({
  time,
  oral: "",
  parenteral: "",
  intakeTotal: "",
  urine: "",
  drainage: "",
  others: "",
  outputTotal: "",
});

const Page = () => {
  // Initialize all states with default values

  const [isEditing, setIsEditing] = useState(false);
  const [intakeOutputData, setIntakeOutputData] = useState([
    {
      id: Date.now(),
      date: "",
      time: "",
      shift: "",
      intakeDescription: "",
      intakeVolume: "",
      intakeTotal: "",
      outputDescription: "",
      outputVolume: "",
      outputTotal: "",
    },
  ]);

  const [entries2, setEntries2] = useState<Entry[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("entries2");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [
      {
        id: Date.now(),
        date: "",
        rows: [defaultRow("6-2"), defaultRow("2-10"), defaultRow("10-6")],
      },
    ];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("entries2", JSON.stringify(entries2));
    }
  }, [entries2]);

  const handleCellChange = (
    entryId: number,
    rowIndex: number,
    field: keyof Entry["rows"][0],
    value: string
  ) => {
    setEntries2((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              rows: entry.rows.map((row, i) =>
                i === rowIndex ? { ...row, [field]: value } : row
              ),
            }
          : entry
      )
    );
  };

  const handleDateChange = (entryId: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId ? { ...entry, date: value } : entry
      )
    );
  };

  const addEntry = () => {
    setEntries2((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: "",
        rows: [defaultRow("6-2"), defaultRow("2-10"), defaultRow("10-6")],
      },
    ]);
  };

  const deleteEntry = (entryId: number) => {
    setEntries2((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const [patientOverview, setPatientOverview] = useState({
    familyName: "A",
    firstName: "J.S",
    middleName: "",
    mrNo: "12345",
    age: "10",
    gender: "Male",
    civilStatus: "Single",
    roomNo: "101",
    attendingPhysician: "Dr. Smith",
    admission: "",
    diagnosis: "",
    riskFactors: "",
  });

  const [vitalSigns, setVitalSigns] = useState({
    temperature: "39.2",
    hr: "119",
    rr: "32",
    spO2: "90",
    bp: "120/70",
  });

  // Calculate vital alerts
  const vitalAlerts = [];
  const temp = parseFloat(vitalSigns.temperature);
  const hr = parseInt(vitalSigns.hr, 10);
  const rr = parseInt(vitalSigns.rr, 10);
  const spO2 = parseInt(vitalSigns.spO2, 10);
  const [systolic, diastolic] = vitalSigns.bp.split("/").map(Number);

  // Check temperature
  if (!isNaN(temp) && (temp < 36.1 || temp > 37.2)) {
    vitalAlerts.push(
      `Temperature ${temp}°C is outside normal range (36.1°C - 37.2°C)`
    );
  }

  // Check heart rate
  if (!isNaN(hr) && (hr < 70 || hr > 110)) {
    vitalAlerts.push(
      `Heart rate ${hr} bpm is outside normal range (70-110 bpm)`
    );
  }

  // Check respiratory rate
  if (!isNaN(rr) && (rr < 18 || rr > 30)) {
    vitalAlerts.push(
      `Respiratory rate ${rr} breaths/min is outside normal range (18-30 breaths/min)`
    );
  }

  // Check SpO2
  if (!isNaN(spO2) && spO2 < 95) {
    vitalAlerts.push(`Oxygen saturation ${spO2}% is below normal (95%-100%)`);
  }

  // Check blood pressure
  if (!isNaN(systolic) && !isNaN(diastolic)) {
    if (systolic < 90 || systolic > 120 || diastolic < 60 || diastolic > 80) {
      vitalAlerts.push(
        `Blood pressure ${vitalSigns.bp} mmHg is outside normal range (90/60 - 120/80 mmHg)`
      );
    }
  } else {
    vitalAlerts.push(`Invalid blood pressure format`);
  }

  const [treatmentMedication, setTreatmentMedication] = useState("");
  const [progressTracking, setProgressTracking] = useState("");
  const [outcomePrediction, setOutcomePrediction] = useState("");

  const [labResults, setLabResults] = useState({
    cbc: {
      wbc: "15.2",
      hemoglobin: "11.8",
      hematocrit: "35.50",
      mch: "78",
      mchc: "79",
      neutrophils: "12.1",
    },
    sputumCulture: {
      pathogen: "",
      antibioticSensitivity: "",
    },
    chestXRay: {
      findings: "",
      description: "",
      imagePreview: null,
    },
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIntakeOutput = localStorage.getItem("intakeOutputData");
      if (savedIntakeOutput) setIntakeOutputData(JSON.parse(savedIntakeOutput));

      const savedPatientOverview = localStorage.getItem("patientOverview");
      if (savedPatientOverview)
        setPatientOverview(JSON.parse(savedPatientOverview));

      const savedVitalSigns = localStorage.getItem("vitalSigns");
      if (savedVitalSigns) setVitalSigns(JSON.parse(savedVitalSigns));

      const savedTreatment = localStorage.getItem("treatmentMedication");
      if (savedTreatment) setTreatmentMedication(savedTreatment);

      const savedProgress = localStorage.getItem("progressTracking");
      if (savedProgress) setProgressTracking(savedProgress);

      const savedOutcome = localStorage.getItem("outcomePrediction");
      if (savedOutcome) setOutcomePrediction(savedOutcome);

      const savedLabResults = localStorage.getItem("labResults");
      if (savedLabResults) setLabResults(JSON.parse(savedLabResults));
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("patientOverview", JSON.stringify(patientOverview));
      localStorage.setItem("vitalSigns", JSON.stringify(vitalSigns));
      localStorage.setItem("treatmentMedication", treatmentMedication);
      localStorage.setItem("labResults", JSON.stringify(labResults));
      localStorage.setItem("vitalSignsData", JSON.stringify(vitalSignsData));
      localStorage.setItem("entries2", JSON.stringify(entries2));
      localStorage.setItem(
        "intakeOutputData",
        JSON.stringify(intakeOutputData)
      );
      // Entries are automatically saved in their own useEffect
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVitalSignsData = localStorage.getItem("vitalSignsData");
      if (savedVitalSignsData)
        setVitalSignsData(JSON.parse(savedVitalSignsData));
      // Other initial loads...
    }
  }, []);

  const [entries, setEntries] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("progressTracking");
      try {
        const parsed = JSON.parse(stored || "[]");
        return Array.isArray(parsed)
          ? parsed
          : [{ id: Date.now(), date: "", time: "", notes: "", signature: "" }];
      } catch (error) {
        return [
          { id: Date.now(), date: "", time: "", notes: "", signature: "" },
        ];
      }
    }
    return [{ id: Date.now(), date: "", time: "", notes: "", signature: "" }];
  });

  const handleAddRow = () => {
    setIntakeOutputData([
      ...intakeOutputData,
      {
        id: Date.now(),
        date: "",
        time: "",
        shift: "",
        intakeDescription: "",
        intakeVolume: "",
        intakeTotal: "",
        outputDescription: "",
        outputVolume: "",
        outputTotal: "",
      },
    ]);
  };

  // Vital signs table state
  const [vitalSignsData, setVitalSignsData] = useState([
    {
      id: Date.now(),
      date: "",
      shift: "",
      time: "",
      temp: "",
      prCr: "",
      rr: "",
      bp: "",
      o2Sat: "",
      others: "",
    },
  ]);

  // Handle vital signs input changes
  const handleVitalInputChange = (id, field, value) => {
    setVitalSignsData(
      vitalSignsData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };
  //

  useEffect(() => {
    localStorage.setItem("progressTracking", JSON.stringify(entries));
  }, [entries]);

  const handleProgressChange = (id: number, field: string, value: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleAddProgressEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: "",
      time: "",
      notes: "",
      signature: "",
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleDeleteProgressEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Add new vital signs row
  const handleAddVitalRow = () => {
    setVitalSignsData([
      ...vitalSignsData,
      {
        id: Date.now(),
        date: "",
        shift: "",
        time: "",
        temp: "",
        prCr: "",
        rr: "",
        bp: "",
        o2Sat: "",
        others: "",
      },
    ]);
  };

  // Delete vital signs row
  const handleDeleteVitalRow = (id) => {
    if (vitalSignsData.length > 1) {
      setVitalSignsData(vitalSignsData.filter((row) => row.id !== id));
    }
  };

  // Load data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVitalSigns = localStorage.getItem("vitalSignsData");
      if (savedVitalSigns) setVitalSignsData(JSON.parse(savedVitalSigns));
      // ... other loaders
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEntries = localStorage.getItem("progressTracking");
      if (savedEntries) setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleDeleteRow = (id) => {
    if (intakeOutputData.length > 1) {
      setIntakeOutputData(intakeOutputData.filter((row) => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setIntakeOutputData(
      intakeOutputData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleLabResultsChange = (section, field, value) => {
    setLabResults((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e, section) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLabResults((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            imagePreview: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const rows = Array.from({ length: 7 }, (_, i) => (
    <React.Fragment key={i}>
      <tr className="border">
        <td className="border px-2 py-1" rowSpan={3}></td> {/* Merged DATE */}
        <td className="border px-2 py-1">6-2</td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
      </tr>
      <tr className="border">
        <td className="border px-2 py-1">2-10</td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
      </tr>
      <tr className="border">
        <td className="border px-2 py-1">10-6</td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
      </tr>
      <tr className="border font-semibold">
        <td className="border px-2 py-1 text-center" colSpan={1}>
          TOTAL
        </td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
      </tr>
    </React.Fragment>
  ));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-center mt-[5%]">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer mb-4"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform text-white px-4 py-1 rounded cursor-pointer mb-4"
            >
              Edit
            </button>
          )}
        </div>
      </motion.div>
      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
        <div className="w-full max-w-5xl bg-[#efefef] text-black shadow-lg rounded-lg p-6">
          <h1 className="text-center text-3xl font-bold mb-[3%]">Monitoring</h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Patient Overview */}
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Patient Overview
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>
                  {isEditing ? (
                    <input
                      title="name"
                      value={patientOverview.name}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          name: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-32"
                    />
                  ) : (
                    ` ${patientOverview.name}`
                  )}
                </p>
                <p>
                  <span className="font-medium">Age:</span>
                  {isEditing ? (
                    <input
                      title="age"
                      value={patientOverview.age}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          age: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-12"
                    />
                  ) : (
                    ` ${patientOverview.age}`
                  )}
                  <span className="font-medium ml-2">Gender:</span>
                  {isEditing ? (
                    <input
                      title="gender"
                      value={patientOverview.gender}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          gender: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-20"
                    />
                  ) : (
                    ` ${patientOverview.gender}`
                  )}
                </p>
                <p>
                  <span className="font-medium">Admission:</span>
                  {isEditing ? (
                    <input
                      title="admission"
                      value={patientOverview.admission}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          admission: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-full"
                    />
                  ) : (
                    ` ${patientOverview.admission || "-"}`
                  )}
                </p>
                <p>
                  <span className="font-medium">Diagnosis:</span>
                  {isEditing ? (
                    <input
                      title="diagnosis"
                      value={patientOverview.diagnosis}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          diagnosis: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-full"
                    />
                  ) : (
                    ` ${patientOverview.diagnosis || "-"}`
                  )}
                </p>
                <p>
                  <span className="font-medium">Risk factors:</span>
                  {isEditing ? (
                    <input
                      title="risk factors"
                      value={patientOverview.riskFactors}
                      onChange={(e) =>
                        setPatientOverview({
                          ...patientOverview,
                          riskFactors: e.target.value,
                        })
                      }
                      className="ml-1 border rounded p-1 w-full"
                    />
                  ) : (
                    ` ${patientOverview.riskFactors || "-"}`
                  )}
                </p>
              </div>
            </div>

            {/* Treatment & Medication */}
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Treatment & Medication
              </h2>
              <div className="space-y-2">
                {isEditing ? (
                  <textarea
                    title="medication"
                    value={treatmentMedication}
                    onChange={(e) => setTreatmentMedication(e.target.value)}
                    className="w-full p-1 border rounded h-32"
                  />
                ) : (
                  treatmentMedication || (
                    <p className="text-gray-500">No content</p>
                  )
                )}
              </div>
            </div>

            {/* New Vital Signs Table */}
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Vital Signs
              </h2>

              <table className="w-full border-collapse border border-black mb-4">
                <tbody>
                  <tr>
                    <td className="p-2 border border-black">
                      <span>Family Name: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.familyName}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              familyName: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.familyName
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>First Name: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.firstName}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              firstName: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.firstName
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>Middle Name: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.middleName}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              middleName: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.middleName || "-"
                      )}
                    </td>
                    <td className="p-2 border border-black" colSpan={2}>
                      <span>MR no: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.mrNo}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              mrNo: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.mrNo
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-black">
                      <span>Age: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.age}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              age: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.age
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>Gender: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.gender}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              gender: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.gender
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>Civil Status: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.civilStatus}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              civilStatus: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.civilStatus
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>Room no: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.roomNo}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              roomNo: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.roomNo
                      )}
                    </td>
                    <td className="p-2 border border-black">
                      <span>Attending Physician: </span>
                      {isEditing ? (
                        <input
                          value={patientOverview.attendingPhysician}
                          onChange={(e) =>
                            setPatientOverview((p) => ({
                              ...p,
                              attendingPhysician: e.target.value,
                            }))
                          }
                          className="w-full p-1"
                        />
                      ) : (
                        patientOverview.attendingPhysician
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-collapse border border-black ">
                <thead>
                  <tr className="border-b border-black">
                    <th className="p-2 border border-black">DATE</th>
                    <th className="p-2 border border-black">SHIFT</th>
                    <th className="p-2 border border-black">TIME</th>
                    <th className="p-2 border border-black">TEMP</th>
                    <th className="p-2 border border-black">PR/CR</th>
                    <th className="p-2 border border-black">RR</th>
                    <th className="p-2 border border-black">BP</th>
                    <th className="p-2 border border-black">O2 SAT</th>
                    <th className="p-2 border border-black">OTHERS</th>
                    {isEditing && (
                      <th className="p-2 border border-black">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {vitalSignsData.map((row) => (
                    <tr key={row.id}>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.date}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "date",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.date || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.shift}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "shift",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.shift || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.time}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "time",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.time || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.temp}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "temp",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.temp || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.prCr}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "prCr",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.prCr || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.rr}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "rr",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.rr || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.bp}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "bp",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.bp || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.o2Sat}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "o2Sat",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.o2Sat || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={row.others}
                            onChange={(e) =>
                              handleVitalInputChange(
                                row.id,
                                "others",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.others || "-"
                        )}
                      </td>
                      {isEditing && (
                        <td className="p-2 border border-black">
                          <button
                            onClick={() => handleDeleteVitalRow(row.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            disabled={vitalSignsData.length <= 1}
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
                  onClick={handleAddVitalRow}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer mb-4 mt-4"
                >
                  Add Entry
                </button>
              )}
            </div>

            {/* Progress Tracking */}
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Progress Tracking
              </h2>
              <table className="w-full border-collapse border border-black mb-4">
                <thead>
                  <tr className="border-b border-black">
                    <th className="p-2 border border-black">DATE</th>
                    <th className="p-2 border border-black">TIME</th>
                    <th className="p-2 border border-black">NOTES</th>
                    <th className="p-2 border border-black">SIGNATURE</th>
                    {isEditing && (
                      <th className="p-2 border border-black">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={entry.date}
                            type="date"
                            onChange={(e) =>
                              handleProgressChange(
                                entry.id,
                                "date",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          entry.date || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={entry.time}
                            onChange={(e) =>
                              handleProgressChange(
                                entry.id,
                                "time",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          entry.time || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <textarea
                            value={entry.notes}
                            onChange={(e) =>
                              handleProgressChange(
                                entry.id,
                                "notes",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          entry.notes || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            value={entry.signature}
                            onChange={(e) =>
                              handleProgressChange(
                                entry.id,
                                "signature",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          entry.signature || "-"
                        )}
                      </td>
                      {isEditing && (
                        <td className="p-2 border border-black">
                          <button
                            onClick={() => handleDeleteProgressEntry(entry.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            disabled={entries.length <= 1}
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
                  onClick={handleAddProgressEntry}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                >
                  Add Entry
                </button>
              )}
            </div>

            {/* Outcome Prediction */}
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Outcome Prediction
              </h2>
              <div className="space-y-2">
                {isEditing ? (
                  <textarea
                    title="outcome prediction"
                    value={outcomePrediction}
                    onChange={(e) => setOutcomePrediction(e.target.value)}
                    className="w-full p-1 border rounded h-32"
                  />
                ) : (
                  outcomePrediction || (
                    <p className="text-gray-500">No content</p>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Latest Laboratory and Diagnostic Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-[5%]">
            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Latest Laboratory and Diagnostic Result
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-center">
                    Complete Blood Count Test
                  </h3>
                  <div className="ml-4 space-y-1 ">
                    <p>
                      WBC:
                      {isEditing ? (
                        <input
                          title="wbc"
                          value={labResults.cbc.wbc}
                          onChange={(e) =>
                            handleLabResultsChange("cbc", "wbc", e.target.value)
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.wbc}`
                      )}
                    </p>
                    <p>
                      Hemoglobin:
                      {isEditing ? (
                        <input
                          title="hemoglobin"
                          value={labResults.cbc.hemoglobin}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "cbc",
                              "hemoglobin",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.hemoglobin}`
                      )}
                    </p>
                    <p>
                      Hematocrit:
                      {isEditing ? (
                        <input
                          title="hematocrit"
                          value={labResults.cbc.hematocrit}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "cbc",
                              "hematocrit",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.hematocrit}`
                      )}
                    </p>
                    <p>
                      Mean Corpuscular Hemoglobin:
                      {isEditing ? (
                        <input
                          title="mhc"
                          value={labResults.cbc.hematocrit}
                          onChange={(e) =>
                            handleLabResultsChange("cbc", "mch", e.target.value)
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.hematocrit}`
                      )}
                    </p>
                    <p>
                      Mean Corpuscular Hemoglobin Concentration:
                      {isEditing ? (
                        <input
                          title="mchc"
                          value={labResults.cbc.hematocrit}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "cbc",
                              "mchc",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.hematocrit}`
                      )}
                    </p>
                    <p>
                      Neutrophils:
                      {isEditing ? (
                        <input
                          title="neutrophils"
                          value={labResults.cbc.hematocrit}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "cbc",
                              "neutrophils",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-20"
                        />
                      ) : (
                        ` ${labResults.cbc.hematocrit}`
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-center">Sputum Culture Test</h3>
                  <div className="ml-4 space-y-1">
                    <p>
                      Pathogen Identified:
                      {isEditing ? (
                        <input
                          title="pi"
                          value={labResults.sputumCulture.pathogen}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "sputumCulture",
                              "pathogen",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-40"
                        />
                      ) : (
                        ` ${labResults.sputumCulture.pathogen || "-"}`
                      )}
                    </p>
                    <p>
                      Antibiotic Sensitivity Test:
                      {isEditing ? (
                        <input
                          title="ast"
                          value={labResults.sputumCulture.antibioticSensitivity}
                          onChange={(e) =>
                            handleLabResultsChange(
                              "sputumCulture",
                              "antibioticSensitivity",
                              e.target.value
                            )
                          }
                          className="ml-1 border rounded p-1 w-40"
                        />
                      ) : (
                        ` ${
                          labResults.sputumCulture.antibioticSensitivity || "-"
                        }`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-white bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Laboratory and Diagnostic Result
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-center">
                    Chest X-Ray Findings
                  </h3>
                  <div className="mt-2">
                    {isEditing ? (
                      <>
                        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors block text-center">
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "chestXRay")}
                            className="hidden"
                          />
                        </label>
                        {labResults.chestXRay.imagePreview && (
                          <div className="mt-2">
                            <img
                              src={labResults.chestXRay.imagePreview}
                              alt="X-Ray Preview"
                              className="max-w-full h-auto max-h-64"
                            />
                          </div>
                        )}
                      </>
                    ) : labResults.chestXRay.imagePreview ? (
                      <div className="mt-2">
                        <img
                          src={labResults.chestXRay.imagePreview}
                          alt="X-Ray"
                          className="max-w-full h-auto max-h-48"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">
                        No image uploaded
                      </p>
                    )}
                  </div>
                  <div className="ml-4 space-y-1">
                    <h3 className="font-bold  text-left mt-[10%]">
                      Description
                    </h3>
                    {isEditing ? (
                      <input
                        title="desc"
                        value={labResults.chestXRay.findings}
                        onChange={(e) =>
                          handleLabResultsChange(
                            "chestXRay",
                            "findings",
                            e.target.value
                          )
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      labResults.chestXRay.findings
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intake-Output Chart */}
          <div className="overflow-x-auto p-4">
            <table className="table-auto border-collapse border w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1" rowSpan={2}>
                    DATE
                  </th>
                  <th className="border px-2 py-1" rowSpan={2}>
                    TIME
                  </th>
                  <th className="border px-2 py-1" colSpan={3}>
                    INTAKE
                  </th>
                  <th className="border px-2 py-1" colSpan={3}>
                    OUTPUT
                  </th>
                  <th className="border px-2 py-1" rowSpan={2}>
                    TOTAL
                  </th>
                  <th className="border px-2 py-1" rowSpan={2}>
                    ACTION
                  </th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">ORAL</th>
                  <th className="border px-2 py-1">PARENTERAL</th>
                  <th className="border px-2 py-1">TOTAL</th>
                  <th className="border px-2 py-1">URINE</th>
                  <th className="border px-2 py-1">DRAINAGE</th>
                  <th className="border px-2 py-1">OTHERS</th>
                </tr>
              </thead>
              <tbody>
                {entries2.map((entry) => (
                  <React.Fragment key={entry.id}>
                    {entry.rows.map((row, rowIndex) => (
                      <tr className="border" key={rowIndex}>
                        {rowIndex === 0 && (
                          <td className="border px-2 py-1" rowSpan={4}>
                            <input
                              type="text"
                              value={entry.date}
                              onChange={(e) =>
                                handleDateChange(entry.id, e.target.value)
                              }
                              className="w-full px-1 py-0.5"
                            />
                          </td>
                        )}

                        <td className="border px-2 py-1">{row.time}</td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.oral}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "oral",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.parenteral}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "parenteral",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.intakeTotal}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "intakeTotal",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.urine}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "urine",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.drainage}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "drainage",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.others}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "others",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={row.outputTotal}
                            onChange={(e) =>
                              handleCellChange(
                                entry.id,
                                rowIndex,
                                "outputTotal",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        </td>
                        {rowIndex === 0 && (
                          <td
                            className="border px-2 py-1 text-center"
                            rowSpan={4}
                          >
                            {isEditing && (
                              <button
                                onClick={() => deleteEntry(entry.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                    <tr className="border font-semibold">
                      <td className="border px-2 py-1 text-center" colSpan={1}>
                        TOTAL
                      </td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                      <td className="border px-2 py-1" colSpan={1}></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {isEditing}
            {isEditing && (
              <button
                onClick={addEntry}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer mt-5"
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

export default Page;
