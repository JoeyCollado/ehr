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
  total: {
    oral: string;
    parenteral: string;
    intakeTotal: string;
    urine: string;
    drainage: string;
    others: string;
    outputTotal: string;
  };
};

const defaultTotal = (): Entry["total"] => ({
  oral: "",
  parenteral: "",
  intakeTotal: "",
  urine: "",
  drainage: "",
  others: "",
  outputTotal: "",
});

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

interface IntakeOutputEntry {
  id: number;
  date: string;
  time: string;
  // ... other fields
}

interface VitalSignsEntry {
  id: number;
  date: string;
  shift: string;
  time: string;
  temp: string;
  prCr: string;
  rr: string;
  bp: string;
  others: string;
  o2Sat: string;

  // ... other fields
}

interface Entry2 {
  id: number;
  date: string;
  shift: string;
  signature: string;
  time: number;
  notes: string;
  // ... other fields
}

interface LabResults {
  cbc: {
    wbc: string;
    hemoglobin: string;
    hematocrit: string;
    mch: string;
    mchc: string;
    neutrophils: string;
  };
  sputumCulture: {
    pathogen: string;
    antibioticSensitivity: string;
  };
  chestXRay: {
    findings: string;
    description: string;
    imagePreview: string | null;
  };
  [key: string]: {
    [key: string]: string | null;
  };
}

const Page = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [intakeOutputData, setIntakeOutputData] = useState<IntakeOutputEntry[]>(
    []
  );
  const [entries2, setEntries2] = useState<Entry[]>([]);
  const [entries, setEntries] = useState<Entry2[]>([]);
  const [vitalSignsData, setVitalSignsData] = useState<VitalSignsEntry[]>([]);

  const [patientOverview, setPatientOverview] = useState({
    name: "",
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

  const [treatmentMedication, setTreatmentMedication] = useState("");
  const [outcomePrediction, setOutcomePrediction] = useState("");

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLabResults((prev: LabResults) => ({
          ...prev,
          [section]: {
            ...prev[section],
            imagePreview:
              typeof reader.result === "string" ? reader.result : null,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [labResults, setLabResults] = useState<LabResults>({
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

  const vitalAlerts: string[] = [];
  const temp = parseFloat(vitalSigns.temperature);
  const hr = parseInt(vitalSigns.hr, 10);
  const rr = parseInt(vitalSigns.rr, 10);
  const spO2 = parseInt(vitalSigns.spO2, 10);
  const [systolic, diastolic] = vitalSigns.bp.split("/").map(Number);

  if (!isNaN(temp) && (temp < 36.1 || temp > 37.2)) {
    vitalAlerts.push(
      `Temperature ${temp}°C is outside normal range (36.1°C - 37.2°C)`
    );
  }

  if (!isNaN(hr) && (hr < 70 || hr > 110)) {
    vitalAlerts.push(
      `Heart rate ${hr} bpm is outside normal range (70-110 bpm)`
    );
  }

  if (!isNaN(rr) && (rr < 18 || rr > 30)) {
    vitalAlerts.push(
      `Respiratory rate ${rr} breaths/min is outside normal range (18-30 breaths/min)`
    );
  }

  if (!isNaN(spO2) && spO2 < 95) {
    vitalAlerts.push(`Oxygen saturation ${spO2}% is below normal (95%-100%)`);
  }

  if (!isNaN(systolic) && !isNaN(diastolic)) {
    if (systolic < 90 || systolic > 120 || diastolic < 60 || diastolic > 80) {
      vitalAlerts.push(
        `Blood pressure ${vitalSigns.bp} mmHg is outside normal range (90/60 - 120/80 mmHg)`
      );
    }
  } else {
    vitalAlerts.push(`Invalid blood pressure format`);
  }

  // Load all from localStorage once on mount
  useEffect(() => {
    const load = () => {
      const get = (key: string) => localStorage.getItem(key);

      const storedIntakeOutput = get("intakeOutputData");
      if (storedIntakeOutput)
        setIntakeOutputData(JSON.parse(storedIntakeOutput));

      const storedEntries2 = get("entries2");
      if (storedEntries2) {
        const parsed = JSON.parse(storedEntries2);
        setEntries2(
          parsed.map((entry: Entry) => ({
            ...entry,
            total: entry.total || defaultTotal(),
          }))
        );
      } else {
        setEntries2([
          {
            id: Date.now(),
            date: "",
            rows: [defaultRow("6-2"), defaultRow("2-10"), defaultRow("10-6")],
            total: defaultTotal(),
          },
        ]);
      }

      const storedOverview = get("patientOverview");
      if (storedOverview) setPatientOverview(JSON.parse(storedOverview));

      const storedVitals = get("vitalSigns");
      if (storedVitals) setVitalSigns(JSON.parse(storedVitals));

      const storedTreatment = get("treatmentMedication");
      if (storedTreatment) setTreatmentMedication(storedTreatment);

      const storedProgress = get("progressTracking");
      if (storedProgress) setEntries(JSON.parse(storedProgress));

      const storedOutcome = get("outcomePrediction");
      if (storedOutcome) setOutcomePrediction(storedOutcome);

      const storedLab = get("labResults");
      if (storedLab) setLabResults(JSON.parse(storedLab));

      const storedVitalsData = get("vitalSignsData");
      if (storedVitalsData) setVitalSignsData(JSON.parse(storedVitalsData));
    };

    if (typeof window !== "undefined") load();
  }, []);

  const handleTotalChange = (
    entryId: number,
    field: keyof Entry["total"],
    value: string
  ) => {
    setEntries2((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, total: { ...entry.total, [field]: value } }
          : entry
      )
    );
  };

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
        total: defaultTotal(),
      },
    ]);
  };

  const deleteEntry = (entryId: number) => {
    setEntries2((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("outcomePrediction", outcomePrediction);
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
      localStorage.setItem("progressTracking", JSON.stringify(entries)); // Corrected line
    }
  };

  const handleAddVitalRow = () => {
    setVitalSignsData((prev) => [
      ...prev,
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

  useEffect(() => {
    const load = () => {
      // Existing load logic...
    };
    if (typeof window !== "undefined") load();
  }, []);

  const handleDeleteVitalRow = (id: number) => {
    setVitalSignsData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleVitalInputChange = (id: number, field: string, value: string) => {
    setVitalSignsData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleProgressChange = (
    id: number,
    field: keyof Entry2,
    value: string
  ) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const parsedValue =
            field === "time" ? parseInt(value, 10) || 0 : value;
          return { ...entry, [field]: parsedValue };
        }
        return entry;
      })
    );
  };

  const handleAddProgressEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: "",
        time: 0, // Changed from "" to 0
        notes: "",
        signature: "",
        shift: "",
      },
    ]);
  };

  const handleDeleteProgressEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleLabResultsChange = (
    section: string,
    field: string,
    value: string
  ) => {
    setLabResults((prev: LabResults) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

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
                          title="family name"
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
                          title="firstname"
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
                          title="middle name"
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
                          title="age"
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
                          title="gender"
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
                          title="civil status"
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
                          title="room no"
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
                          title="physician"
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
                            title="date"
                            type="date"
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
                            title="shift"
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
                            title="time"
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
                            title="temp"
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
                            title="prcr"
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
                            title="rr"
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
                            title="bp"
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
                            title="date"
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
                            title="others"
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
                            title="date"
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
                            title="time"
                            type="number"
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
                            title="notes"
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
                            title="signature"
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
                          <div className="mt-2 flex justify-center items-center h-64">
                            <img
                              src={labResults.chestXRay.imagePreview}
                              alt="X-Ray Preview"
                              className="max-w-full h-auto max-h-64"
                            />
                          </div>
                        )}
                      </>
                    ) : labResults.chestXRay.imagePreview ? (
                      <div className="mt-2 flex justify-center items-center h-64">
                        <img
                          src={labResults.chestXRay.imagePreview}
                          alt="X-Ray Preview"
                          className="max-w-full h-auto max-h-64"
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
          <div className="overflow-x-auto p-4 bg-white rounded-lg mt-10 mb-10">
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
                              title="entries"
                              type="text"
                              value={entry.date}
                              onChange={(e) =>
                                handleDateChange(entry.id, e.target.value)
                              }
                              className="w-full px-1 py-0.5"
                            />
                          </td>
                        )}

                        <td className="border px-2 py-1">
                          {isEditing ? (
                            <input
                              title="time"
                              value={row.time}
                              onChange={(e) =>
                                handleCellChange(
                                  entry.id,
                                  rowIndex,
                                  "time",
                                  e.target.value
                                )
                              }
                              className="w-full px-1 py-0.5"
                            />
                          ) : (
                            row.time
                          )}
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            title="oral"
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
                            title="parenteral"
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
                            title="intaketotal"
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
                            title="urine"
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
                            title="drainage"
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
                            title="others"
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
                            title="outputtotal"
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
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="oral"
                            value={entry.total.oral}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "oral",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.oral
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="parenteral"
                            value={entry.total.parenteral}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "parenteral",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.parenteral
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="intaketotal"
                            value={entry.total.intakeTotal}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "intakeTotal",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.intakeTotal
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="urine"
                            value={entry.total.urine}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "urine",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.urine
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="drainage"
                            value={entry.total.drainage}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "drainage",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.drainage
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="others"
                            value={entry.total.others}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "others",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.others
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {isEditing ? (
                          <input
                            title="outputtotal"
                            value={entry.total.outputTotal}
                            onChange={(e) =>
                              handleTotalChange(
                                entry.id,
                                "outputTotal",
                                e.target.value
                              )
                            }
                            className="w-full px-1 py-0.5"
                          />
                        ) : (
                          entry.total.outputTotal
                        )}
                      </td>
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
