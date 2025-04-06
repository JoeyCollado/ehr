"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize all states with default values
  const [intakeOutputData, setIntakeOutputData] = useState([{
    id: Date.now(),
    date: "",
    time: "",
    shift: "",
    intakeDescription: "",
    intakeVolume: "",
    intakeTotal: "",
    outputDescription: "",
    outputVolume: "",
    outputTotal: ""
  }]);

  const [patientOverview, setPatientOverview] = useState({
    name: "A.J.S",
    age: "10",
    gender: "Male",
    admission: "",
    diagnosis: "",
    riskFactors: ""
  });

  const [vitalSigns, setVitalSigns] = useState({
    temperature: "39.2",
    hr: "119",
    rr: "32",
    spO2: "90",
    bp: "120/70"
  });

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
      neutrophils: "12.1"
    },
    sputumCulture: {
      pathogen: "",
      antibioticSensitivity: ""
    },
    chestXRay: {
      findings: "",
      description: "",
      imagePreview: null
    }
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedIntakeOutput = localStorage.getItem('intakeOutputData');
      if (savedIntakeOutput) setIntakeOutputData(JSON.parse(savedIntakeOutput));

      const savedPatientOverview = localStorage.getItem('patientOverview');
      if (savedPatientOverview) setPatientOverview(JSON.parse(savedPatientOverview));

      const savedVitalSigns = localStorage.getItem('vitalSigns');
      if (savedVitalSigns) setVitalSigns(JSON.parse(savedVitalSigns));

      const savedTreatment = localStorage.getItem('treatmentMedication');
      if (savedTreatment) setTreatmentMedication(savedTreatment);

      const savedProgress = localStorage.getItem('progressTracking');
      if (savedProgress) setProgressTracking(savedProgress);

      const savedOutcome = localStorage.getItem('outcomePrediction');
      if (savedOutcome) setOutcomePrediction(savedOutcome);

      const savedLabResults = localStorage.getItem('labResults');
      if (savedLabResults) setLabResults(JSON.parse(savedLabResults));
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Save all states to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('patientOverview', JSON.stringify(patientOverview));
      localStorage.setItem('vitalSigns', JSON.stringify(vitalSigns));
      localStorage.setItem('treatmentMedication', treatmentMedication);
      localStorage.setItem('progressTracking', progressTracking);
      localStorage.setItem('outcomePrediction', outcomePrediction);
      localStorage.setItem('labResults', JSON.stringify(labResults));
      localStorage.setItem('intakeOutputData', JSON.stringify(intakeOutputData));
    }
  };


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
        outputTotal: ""
      }
    ]);
  };

  const handleDeleteRow = (id) => {
    if (intakeOutputData.length > 1) {
      setIntakeOutputData(intakeOutputData.filter(row => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setIntakeOutputData(intakeOutputData.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleLabResultsChange = (section, field, value) => {
    setLabResults(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e, section) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLabResults(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            imagePreview: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
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
        <div className="w-full max-w-5xl bg-white text-black shadow-lg rounded-lg p-6">
          <h1 className="text-center text-3xl font-bold mb-[3%]">Monitoring</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Overview */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Patient Overview
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>
                  {isEditing ? (
                    <input
                      value={patientOverview.name}
                      onChange={(e) => setPatientOverview({...patientOverview, name: e.target.value})}
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
                      value={patientOverview.age}
                      onChange={(e) => setPatientOverview({...patientOverview, age: e.target.value})}
                      className="ml-1 border rounded p-1 w-12"
                    />
                  ) : (
                    ` ${patientOverview.age}`
                  )}
                  <span className="font-medium ml-2">Gender:</span>
                  {isEditing ? (
                    <input
                      value={patientOverview.gender}
                      onChange={(e) => setPatientOverview({...patientOverview, gender: e.target.value})}
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
                      value={patientOverview.admission}
                      onChange={(e) => setPatientOverview({...patientOverview, admission: e.target.value})}
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
                      value={patientOverview.diagnosis}
                      onChange={(e) => setPatientOverview({...patientOverview, diagnosis: e.target.value})}
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
                      value={patientOverview.riskFactors}
                      onChange={(e) => setPatientOverview({...patientOverview, riskFactors: e.target.value})}
                      className="ml-1 border rounded p-1 w-full"
                    />
                  ) : (
                    ` ${patientOverview.riskFactors || "-"}`
                  )}
                </p>
              </div>
            </div>

            {/* Treatment & Medication */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Treatment & Medication
              </h2>
              <div className="space-y-2">
                {isEditing ? (
                  <textarea
                    value={treatmentMedication}
                    onChange={(e) => setTreatmentMedication(e.target.value)}
                    className="w-full p-1 border rounded h-32"
                  />
                ) : (
                  treatmentMedication || <p className="text-gray-500">No content</p>
                )}
              </div>
            </div>

            {/* Vital Signs */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Vital Signs
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Temperature:</span>
                  {isEditing ? (
                    <input
                      value={vitalSigns.temperature}
                      onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                      className="ml-1 border rounded p-1 w-16"
                    />
                  ) : (
                    ` ${vitalSigns.temperature}`
                  )}
                </p>
                <p>
                  <span className="font-medium">HR:</span>
                  {isEditing ? (
                    <input
                      value={vitalSigns.hr}
                      onChange={(e) => setVitalSigns({...vitalSigns, hr: e.target.value})}
                      className="ml-1 border rounded p-1 w-16"
                    />
                  ) : (
                    ` ${vitalSigns.hr} bpm`
                  )}
                </p>
                <p>
                  <span className="font-medium">RR:</span>
                  {isEditing ? (
                    <input
                      value={vitalSigns.rr}
                      onChange={(e) => setVitalSigns({...vitalSigns, rr: e.target.value})}
                      className="ml-1 border rounded p-1 w-16"
                    />
                  ) : (
                    ` ${vitalSigns.rr} breaths/min`
                  )}
                </p>
                <p>
                  <span className="font-medium">SpO₂:</span>
                  {isEditing ? (
                    <input
                      value={vitalSigns.spO2}
                      onChange={(e) => setVitalSigns({...vitalSigns, spO2: e.target.value})}
                      className="ml-1 border rounded p-1 w-16"
                    />
                  ) : (
                    ` ${vitalSigns.spO2}%`
                  )}
                </p>
                <p>
                  <span className="font-medium">BP:</span>
                  {isEditing ? (
                    <input
                      value={vitalSigns.bp}
                      onChange={(e) => setVitalSigns({...vitalSigns, bp: e.target.value})}
                      className="ml-1 border rounded p-1 w-24"
                    />
                  ) : (
                    ` ${vitalSigns.bp} mmHg`
                  )}
                </p>
              </div>
            </div>

            {/* Alerts */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">Alerts</h2>
              <div className="space-y-2">
                <p>If SpO₂ &lt; 92%, recommend increasing oxygen therapy</p>
                <p>
                  If RR &gt; 30, risk of respiratory distress—monitor closely
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Progress Tracking
              </h2>
              <div className="space-y-2">
                {isEditing ? (
                  <textarea
                    value={progressTracking}
                    onChange={(e) => setProgressTracking(e.target.value)}
                    className="w-full p-1 border rounded h-32"
                  />
                ) : (
                  progressTracking || <p className="text-gray-500">No content</p>
                )}
              </div>
            </div>

            {/* Outcome Prediction */}
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Outcome Prediction
              </h2>
              <div className="space-y-2">
                {isEditing ? (
                  <textarea
                    value={outcomePrediction}
                    onChange={(e) => setOutcomePrediction(e.target.value)}
                    className="w-full p-1 border rounded h-32"
                  />
                ) : (
                  outcomePrediction || <p className="text-gray-500">No content</p>
                )}
              </div>
            </div>
          </div>

          {/* Latest Laboratory and Diagnostic Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-[5%]">
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Latest Laboratory and Diagnostic Result
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-center">Complete Blood Count Test</h3>
                  <div className="ml-4 space-y-1 ">
                    <p>
                      WBC: 
                      {isEditing ? (
                        <input
                          value={labResults.cbc.wbc}
                          onChange={(e) => handleLabResultsChange("cbc", "wbc", e.target.value)}
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
                          value={labResults.cbc.hemoglobin}
                          onChange={(e) => handleLabResultsChange("cbc", "hemoglobin", e.target.value)}
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
                          value={labResults.cbc.hematocrit}
                          onChange={(e) => handleLabResultsChange("cbc", "hematocrit", e.target.value)}
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
                          value={labResults.cbc.hematocrit}
                          onChange={(e) => handleLabResultsChange("cbc", "mch", e.target.value)}
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
                          value={labResults.cbc.hematocrit}
                          onChange={(e) => handleLabResultsChange("cbc", "mchc", e.target.value)}
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
                          value={labResults.cbc.hematocrit}
                          onChange={(e) => handleLabResultsChange("cbc", "neutrophils", e.target.value)}
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
                          value={labResults.sputumCulture.pathogen}
                          onChange={(e) => handleLabResultsChange("sputumCulture", "pathogen", e.target.value)}
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
                          value={labResults.sputumCulture.antibioticSensitivity}
                          onChange={(e) => handleLabResultsChange("sputumCulture", "antibioticSensitivity", e.target.value)}
                          className="ml-1 border rounded p-1 w-40"
                        />
                      ) : (
                        ` ${labResults.sputumCulture.antibioticSensitivity || "-"}`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-black rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-center">
        Laboratory and Diagnostic Result
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-center">Chest X-Ray Findings</h3>
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
              <p className="text-gray-500 text-center">No image uploaded</p>
            )}
          </div>
          <div className="ml-4 space-y-1">
          <h3 className="font-bold  text-left mt-[10%]">Description</h3>
            {isEditing ? (
              <input
                value={labResults.chestXRay.findings}
                onChange={(e) => handleLabResultsChange("chestXRay", "findings", e.target.value)}
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
          <div className="mt-[5%] w-full overflow-x-auto">
            <div className="border border-black rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-center">Intake-Output Chart</h2>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr className="border-b border-black">
                    <th className="p-2 border border-black text-left">DATE</th>
                    <th className="p-2 border border-black text-left">TIME</th>
                    <th className="p-2 border border-black text-left">SHIFT</th>
                    <th className="p-2 border border-black text-center" colSpan={3}>
                      INTAKE
                    </th>
                    <th className="p-2 border border-black text-center" colSpan={3}>
                      OUTPUT
                    </th>
                   <th className="p-2 border border-black text-center">Action</th>
                
                  </tr>
                  <tr className="border-b border-black">
                    <th className="p-2 border border-black"></th>
                    <th className="p-2 border border-black"></th>
                    <th className="p-2 border border-black"></th>
                    <th className="p-2 border border-black">Description/Type</th>
                    <th className="p-2 border border-black">Volume</th>
                    <th className="p-2 border border-black">Total</th>
                    <th className="p-2 border border-black">Description/Type</th>
                    <th className="p-2 border border-black">Volume</th>
                    <th className="p-2 border border-black">Total</th>
                    <th className="p-2 border border-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {intakeOutputData.map((row) => (
                    <tr key={row.id}>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.date}
                            onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.date || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.time}
                            onChange={(e) => handleInputChange(row.id, 'time', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.time || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.shift}
                            onChange={(e) => handleInputChange(row.id, 'shift', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.shift || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.intakeDescription}
                            onChange={(e) => handleInputChange(row.id, 'intakeDescription', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.intakeDescription || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.intakeVolume}
                            onChange={(e) => handleInputChange(row.id, 'intakeVolume', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.intakeVolume || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.intakeTotal}
                            onChange={(e) => handleInputChange(row.id, 'intakeTotal', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.intakeTotal || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.outputDescription}
                            onChange={(e) => handleInputChange(row.id, 'outputDescription', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.outputDescription || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.outputVolume}
                            onChange={(e) => handleInputChange(row.id, 'outputVolume', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.outputVolume || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.outputTotal}
                            onChange={(e) => handleInputChange(row.id, 'outputTotal', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          row.outputTotal || "-"
                        )}
                      </td>
                      <td className="p-2 border border-black">
                        {isEditing && (
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            disabled={intakeOutputData.length <= 1}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isEditing && (
                <button
                  onClick={handleAddRow}  
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer mb-4 mt-4"
                >
                  Add Entry
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;