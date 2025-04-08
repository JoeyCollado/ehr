"use client";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiDownload, 
  FiHeart, 
  FiThermometer, 
  FiActivity,
  FiChevronRight,
  FiFileText,
  FiMonitor,
  FiAlertOctagon,
  FiSmile,
  FiPhoneForwarded,
  FiClock,
  FiDroplet,
  FiEye,
  FiCalendar,
  FiPlus,
  FiMinus,
  FiRadio,
  FiCheckSquare,
  FiSliders,
  FiBox
} from "react-icons/fi";

const PneumoniaFlowchart = () => {
  // State management (preserved from original with types)
  const [improvementAnswer, setImprovementAnswer] = useState<string>("");
  const [step, setStep] = useState("start");
  const formRef = useRef<HTMLDivElement>(null);
  const [responses, setResponses] = useState({
    hasSymptoms: null,
    symptomDuration: null,
    severeSigns: null,
    improvement: null,
    feverLevel: null,
    medicationAdherence: null,
    physicalFindings: [],
    caregiverAnswers: [],
    labResults: {
      cxr: "",
      sputum: "",
      lfts: "",
      cbc: "",
      bal: "",
      renalFunction: "",
      liverFunction: "",
    },
    medications: [] as string[],
    followUpPlan: "",
    riskFactors: {
      mrsa: false,
      pseudomonas: false,
      hospitalAdmission: false,
    },
    antibioticHistory: "",
    antifungalTherapy: "",
    vitalMonitoring: [],
  });

  const [vitals, setVitals] = useState({
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    heartRate: "",
    bloodPressure: "",
  });

  // Reset function
  const resetAssessment = () => {
    setStep("start");
    setResponses({
      hasSymptoms: null,
      symptomDuration: null,
      severeSigns: null,
      improvement: null,
      feverLevel: null,
      medicationAdherence: null,
      physicalFindings: [],
      caregiverAnswers: [],
      labResults: {
        cxr: "",
        sputum: "",
        lfts: "",
        cbc: "",
        bal: "",
        renalFunction: "",
        liverFunction: "",
      },
      medications: [],
      followUpPlan: "",
      riskFactors: {
        mrsa: false,
        pseudomonas: false,
        hospitalAdmission: false,
      },
      antibioticHistory: "",
      antifungalTherapy: "",
      vitalMonitoring: [],
    });
    setVitals({
      temperature: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      heartRate: "",
      bloodPressure: "",
    });
  };

  // PDF generation (preserved from original)
  const generatePDF = () => {
    const doc = new jsPDF();
    // ... (original PDF generation code)
    doc.save("pneumonia-assessment.pdf");
    setStep("completed");
  };

  // Handlers (preserved from original)
  const handleVitalsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleResponse = (key: string, value: any) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setResponses(prev => {
      const updated = [...prev[category]];
      const index = updated.indexOf(value);
      if (index === -1) updated.push(value);
      else updated.splice(index, 1);
      return { ...prev, [category]: updated };
    });
  };

  // UI Components
  const StepContainer = ({ children, key }: { children: React.ReactNode; key?: string }) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );

  const PrimaryButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all"
    >
      {children}
    </motion.button>
  );

  const SecondaryButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all border-2 border-gray-200"
    >
      {children}
    </motion.button>
  );

  const DangerButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all"
    >
      {children}
    </motion.button>
  );

  const InfoCard = ({ children, icon: Icon = FiActivity, color = "blue" }: { children: React.ReactNode; icon?: any; color?: string }) => (
    <div className={`bg-${color}-50 p-6 rounded-2xl flex gap-4 items-start border-2 border-${color}-100 shadow-sm`}>
      <Icon className={`w-8 h-8 text-${color}-600 flex-shrink-0 mt-1`} />
      <div className={`text-${color}-900 text-lg leading-relaxed`}>
        {children}
      </div>
    </div>
  );

  // Step Renderers
  const renderStep = () => {
    switch (step) {
      case "start":
        return (
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">
              Pediatric Respiratory Evaluation
            </h2>
            <button
              onClick={() => setStep("vitals")}
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start
            </button>
          </div>
        );

      case "vitals":
        return (
            <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Check Baseline Vitals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(vitals).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <select
                    title="yes"
                    name={key}
                    value={value}
                    onChange={handleVitalsChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="done">Done</option>
                    <option value="not done">Not Done</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setStep("start")}
                className="bg-gray-500 px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep("symptoms")}
                className="bg-blue-600 px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "symptoms":
        return (
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Symptom Screening</h2>
            <p>
              Does the child have chest pain, cough, or breathing difficulty?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse("hasSymptoms", true);
                  setStep("duration");
                }}
                className="bg-green-600 px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleResponse("hasSymptoms", false);
                  setStep("no_symptoms");
                }}
                className="bg-red-600 px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case "no_symptoms":
        return (
            <div>
            You have no symptoms
            <div>
              <button
                onClick={resetAssessment}
                className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Go Back
              </button>
            </div>
          </div>
        );

      case "duration":
        return (
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Symptom Duration</h2>
            <p>How long has the child had symptoms?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleResponse("symptomDuration", "acute");
                  setStep("less");
                }}
                className="p-4 border rounded-md hover:bg-gray-50"
              >
                Less than 2 weeks
              </button>
              <button
                onClick={() => {
                  handleResponse("symptomDuration", "chronic");
                  setStep("more");
                }}
                className="p-4 border rounded-md hover:bg-gray-50"
              >
                More than 2 weeks
              </button>
            </div>
          </div>
        );

      case "less":
        return (
            <div>
            <button
              onClick={() => {
                handleResponse("symptomDuration", "acute");
                setStep("physical_assessment");
              }}
              className="p-4 border rounded-md hover:bg-gray-50"
            >
              Continue
            </button>
            <p>
              - Consider acute infection <br></br>- Request Chest X-ray to
              assess for consolidation or other pulmonary findings <br></br>-
              Consider bacterial or viral diagnostics
            </p>
          </div>
        );

      case "more":
        return (
            <div>
            <button
              onClick={() => {
                handleResponse("symptomDuration", "acute");
                setStep("physical_assessment");
              }}
              className="p-4 border rounded-md hover:bg-gray-50"
            >
              Continue
            </button>
            <p>
              - Consider chronic or unresolved infection <br></br>- Request
              Chest X-ray for further evaluation <br></br>- Consider fungal
              diagnostics
            </p>
          </div>
        );

      case "physical_assessment":
        return (
            <div className="space-y-6">
            <h2 className="text-xl font-semibold">Physical Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Caregiver Questions:</h3>
                {[
                  "Is the child eating/drinking normally?",
                  "Is the child vomiting everything?",
                  "Any history of weight loss/weakness?",
                  "Was the child previously hospitalized?",
                  "May lagnat pa po ba?",
                  "Nahihirapan pa rin po bang huminga?",
                ].map((question) => (
                  <div key={question} className="flex items-center gap-2">
                    <input
                      title="caregiver"
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("caregiverAnswers", question)
                      }
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{question}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep("duration")}
                className="bg-gray-500 px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep("perform")}
                className="bg-blue-600 px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );


        case "perform":
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Perform Physical Assessments:</h3>
            {[
              "Check O2 saturation (SpO₂ < 94% is critical)",
              "Look for signs: chest indrawing, cyanosis, altered LOC",
              "Respiratory rate above normal range for age?",
            ].map((sign) => (
              <div key={sign} className="flex items-center gap-2">
                <input
                  title="physical"
                  type="checkbox"
                  onChange={() =>
                    handleCheckboxChange("physicalFindings", sign)
                  }
                  className="h-4 w-4"
                />
                <label className="text-sm">{sign}</label>

                <div className="flex justify-between"></div>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                onClick={() => setStep("perform")}
                className="bg-gray-500 px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep("severity_assessment")}
                className="bg-blue-600 px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "severity_assessment":
        return (
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Severity Assessment</h2>
            <p>Does the patient show severe signs?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse("severeSigns", true);
                  setStep("severe_management");
                }}
                className="bg-red-600 px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleResponse("severeSigns", false);
                  setStep("mild_management");
                }}
                className="bg-green-600 px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case "severe_management":
        return (
          <StepContainer>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <FiAlertOctagon className="w-8 h-8 text-red-600" />
              Severe Case Protocol
            </h2>

            <div className="space-y-8">
              <InfoCard icon={FiActivity} color="red">
                Critical Care Requirements
              </InfoCard>

              <div className="bg-red-50 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-red-800">Immediate Actions</h3>
                    <ul className="list-disc pl-6 space-y-3 text-red-900">
                      <li>Emergency hospital admission</li>
                      <li>ICU transfer protocol activation</li>
                      <li>IV antifungal initiation (Amphotericin B)</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-red-800">Antibiotic Protocol</h3>
                    <ul className="list-disc pl-6 space-y-3 text-red-900">
                      <li>Ceftriaxone + Azithromycin</li>
                      <li>Ceftriaxone + Levofloxacin</li>
                      <li>Add Vancomycin/Linezolid for MRSA</li>
                      <li>Piperacillin-tazobactam for Pseudomonas</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-red-100">
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Safety Checks</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Drug Allergies', 'Renal Function', 'Liver Function', 'ECG Monitoring'].map((check) => (
                      <div key={check} className="flex items-center gap-2">
                        <FiCheckSquare className="w-5 h-5 text-red-600" />
                        <span className="text-red-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <SecondaryButton onClick={() => setStep("severity_assessment")}>
                  <FiArrowLeft className="w-6 h-6" />
                  Re-evaluate Severity
                </SecondaryButton>
                <PrimaryButton onClick={() => setStep("followup")}>
                  Continue to Follow-up Protocol
                  <FiChevronRight className="w-6 h-6" />
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "mild_management":
        return (
          <StepContainer>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <FiSmile className="w-8 h-8 text-green-600" />
              Mild/Moderate Case Protocol
            </h2>

            <div className="space-y-8">
              <InfoCard icon={FiActivity} color="green">
                Outpatient Treatment Plan
              </InfoCard>

              <div className="bg-green-50 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-green-800">Diagnostic Orders</h3>
                    <ul className="list-disc pl-6 space-y-3 text-green-900">
                      <li>CBC with differential</li>
                      <li>Chest X-ray (PA & lateral)</li>
                      <li>Sputum/BAL fungal culture</li>
                      <li>Liver function tests</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-green-800">Medication Plan</h3>
                    <ul className="list-disc pl-6 space-y-3 text-green-900">
                      <li>Amoxicillin 1g PO TID</li>
                      <li>Doxycycline 100mg BID</li>
                      <li>Azithromycin (if resistance &lt;25%)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-100">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">Caregiver Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Medication Timing', 'Hydration Plan', 'Warning Signs', 'Follow-up Schedule'].map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <FiCheckSquare className="w-5 h-5 text-green-600" />
                        <span className="text-green-900">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <SecondaryButton onClick={() => setStep("severity_assessment")}>
                  <FiArrowLeft className="w-6 h-6" />
                  Re-evaluate Severity
                </SecondaryButton>
                <PrimaryButton onClick={() => setStep("antifungalTherapy")}>
                  Initiate Antifungal Protocol
                  <FiChevronRight className="w-6 h-6" />
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );


        case "antifungalTheraphy":
            return (
              <div>
                <h2 className="text-xl font-semibold">Start antifungal therapy:</h2>
    
                <div className="p-4 rounded-md bg-green-50">
                  <ul className="  pl-5 space-y-2">
                    <li>→ Fluconazole (dose per weight, usually 6–12 mg/kg/day)</li>
                    <li>
                      → Educate caregiver on full adherence and signs of worsening
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    handleResponse("medications", [
                      "Amoxicillin",
                      "Azithromycin",
                      "Fluconazole",
                    ]);
                    handleResponse("followUpPlan", "Follow-up in 2-3 days");
                    setStep("ask");
                  }}
                  className="bg-blue-600 px-4 py-2 rounded-md"
                >
                  Continue
                </button>
              </div>
            );

            case "ask":
                return (
                  <div>
                    <h2 className="text-xl font-semibold">
                      When did you notice the child improving (e.g., less fever, better
                      breathing)?
                    </h2>
        
                    <div>
                      <label>How many days?</label>
                      <input type="number" title="days" className="bg-gray-500"></input>
                    </div>
                    <button
                      onClick={() => {
                        handleResponse("medications", [
                          "Amoxicillin",
                          "Azithromycin",
                          "Fluconazole",
                        ]);
                        handleResponse("followUpPlan", "Follow-up in 2-3 days");
                        setStep("monitor");
                      }}
                      className="bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Continue
                    </button>
                  </div>
                );
        
              case "monitor":
                return (
                  <div>
                    <h2 className="text-xl font-semibold">
                      After 3-5 days: Monitor for improvement
                    </h2>
        
                    <ul className="space-y-4 mt-4">
                      <li>
                        <p>- Mas maayos na po ba ang paghinga niya?</p>
                        <div className="flex space-x-4 mt-1">
                          <label>
                            <input type="radio" name="breathing" value="yes" /> Yes
                          </label>
                          <label>
                            <input type="radio" name="breathing" value="no" /> No
                          </label>
                        </div>
                      </li>
        
                      <li>
                        <p>- May lagnat pa rin po ba?</p>
                        <div className="flex space-x-4 mt-1">
                          <label>
                            <input type="radio" name="fever" value="yes" /> Yes
                          </label>
                          <label>
                            <input type="radio" name="fever" value="no" /> No
                          </label>
                        </div>
                      </li>
        
                      <li>
                        <p>- Umiinom po ba ng gamot ng tama?</p>
                        <div className="flex space-x-4 mt-1">
                          <label>
                            <input type="radio" name="meds" value="yes" /> Yes
                          </label>
                          <label>
                            <input type="radio" name="meds" value="no" /> No
                          </label>
                        </div>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        handleResponse("medications", [
                          "Amoxicillin",
                          "Azithromycin",
                          "Fluconazole",
                        ]);
                        handleResponse("followUpPlan", "Follow-up in 2-3 days");
                        setStep("improvement");
                      }}
                      className="bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Continue
                    </button>
                  </div>
                );
        
              case "improvement":
                return (
                  <div>
                    <h2 className="text-xl font-semibold">Improvement?</h2>
        
                    <div className="flex space-x-4 my-4">
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => setImprovementAnswer("yes")}
                      >
                        Yes
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => setImprovementAnswer("no")}
                      >
                        No
                      </button>
                    </div>
        
                    {improvementAnswer === "yes" && (
                      <ul className=" pl-5">
                        <li>
                          → YES: Continue full 10 to 14 day course of oral antifungal
                        </li>
                      </ul>
                    )}
        
                    {improvementAnswer === "no" && (
                      <ul className=" pl-5">
                        <li>
                          → NO: If condition escalates, refer to pulmonologist or
                          infectious disease specialist
                        </li>
                      </ul>
                    )}
                    <button
                      onClick={() => {
                        handleResponse("medications", [
                          "Amoxicillin",
                          "Azithromycin",
                          "Fluconazole",
                        ]);
                        handleResponse("followUpPlan", "Follow-up in 2-3 days");
                        setStep("followup");
                      }}
                      className="bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Continue
                    </button>
                  </div>
                );
        
                {
                  /* final assessment follow up */
                }
        
              case "followup":
                return (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-center">
                      Final Questions (OPD follow-up):
                    </h2>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {/* Question 1 */}
                      <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold text-base mb-2">
                          ● “May lagnat pa po ba?”
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <strong>Mild fever:</strong> 100.4°F to 102.2°F (38°C to
                            39°C)
                            <br />
                            <p className="font-semibold">
                              → If the child has mild fever:
                            </p>
                            <span className="">
                              -Monitoring<br></br>-Encourage rest<br></br>-Hydration
                              <br></br>-Medication (Acetaminophen, Ibuprofen)<br></br>
                            </span>
                          </li>
                          <li>
                            <strong>Moderate fever:</strong> 102.3°F to 104°F (39.1°C to
                            40°C)
                            <br />
                            <p className="font-semibold">
                              → If the child has moderate fever:
                            </p>
                            <span className="">
                              -Hydration<br></br>-Lukewarm bath<br></br>-Dress
                              comfortably<br></br>-Medication (Acetaminophen, Ibuprofen)
                            </span>
                          </li>
                          <li>
                            <strong>High fever:</strong> Above 104°F (40°C)
                            <br />
                            <p className="font-semibold">
                              → If the child has high fever:
                            </p>
                            <span className="">
                              Cool compress<br></br>-Frequent checks<br></br>-Hydration
                              <br></br>-Medication (Antipyretics), Monitor for worsening
                            </span>
                          </li>
                        </ul>
                      </div>
        
                      {/* Question 2 */}
                      <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold text-base mb-2">
                          ● “Mas maayos na po ba ang hinga niya?”
                        </h3>
                        <p className="font-semibold">Observe for respiratory rate</p>
                        <ul className="space-y-2">
                          <li>→ Normal RR: 18-30 bpm</li>
                          <li>→ Easy breathing? Presence of accessory muscles used?</li>
                        </ul>
        
                        <p className="font-semibold">Auscultate Lung Sounds</p>
                        <ul className="space-y-2">
                          <li>→ Clear sounds</li>
                          <li>→ Equal Bilateral Sounds</li>
                        </ul>
        
                        <p className="font-semibold">Assess for Coughing or Wheezing</p>
                        <ul className="space-y-2">
                          <li>→ Absence of Symptoms</li>
                          <li className="ml-4">1. Oxygen saturation monitoring</li>
                          <li className="ml-4">2. Response to an Activity</li>
                        </ul>
                      </div>
        
                      {/* Question 3 */}
                      <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold text-base mb-2">
                          ● “Naubos ba ang gamot? May side effect po ba?”
                        </h3>
                        <p className="font-semibold">→ Check medication adherence</p>
                        <ul className="space-y-2">
                          <li>
                            - Ask: “Naubos po ba ang gamot ayon sa reseta (kumpleto at
                            on time)?”
                          </li>
                          <li>
                            - Check if all doses were taken without missed intervals.
                          </li>
                        </ul>
                        <p className="font-semibold">
                          → Check for side effects experienced
                        </p>
                        <ul>
                          <li>
                            - Ask if the child had any of the following during
                            treatment:
                          </li>
                          <li>
                            ➢ Rashes or itchiness<br></br>➢ Vomiting or nausea<br></br>➢
                            Abdominal pain<br></br>➢ Unusual sleepiness or dizziness
                            <br></br>➢ Allergic reactions (e.g., swelling, difficulty
                            breathing)
                          </li>
                        </ul>
                        <p className="font-semibold">→ Expected to be normal: </p>
                        <ul>
                          <li>
                            - Medication completed within the prescribed number of days
                            (e.g., 7 or 14 days)
                          </li>
                          <li>- No adverse effects reported</li>
                          <li>
                            - If side effects are present → evaluate if mild or if
                            referral/change in medication is needed
                          </li>
                        </ul>
                      </div>
        
                      {/* Question 4 */}
                      <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold text-base mb-2">
                          ● “Kumakain at umiinom na po ba siya ng ayos?”
                        </h3>
                        <p className="font-semibold">Frequency of meals</p>
                        <ul className="space-y-2">
                          <li>→ 3 full meals per day / normal appetite</li>
                        </ul>
        
                        <p className="font-semibold">Fluid Intake</p>
                        <ul className="space-y-2">
                          <li>→ Normal value: 6-8 glasses per day</li>
                        </ul>
        
                        <p className="font-semibold">Urine Output</p>
                        <ul className="space-y-2">
                          <li>→ 4-6 times/day</li>
                        </ul>
        
                        <p className="font-semibold">Signs of dehydration</p>
                        <ul className="space-y-2">
                          <li>
                            → Hydration status: Moist lips, alert, active, no signs of
                            dehydration
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    <button
                      onClick={() => {
                        handleResponse("medications", [
                          "Amoxicillin",
                          "Azithromycin",
                          "Fluconazole",
                        ]);
                        handleResponse("followUpPlan", "Follow-up in 2-3 days");
                        setStep("scheduling");
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Continue
                    </button>
                  </div>
                );
        
              case "scheduling":
                return (
                    <StepContainer key="scheduling">
                  <div>
                    <h2 className="text-xl font-semibold text-center">
                      Scheduling follow-up:
                    </h2>
        
                    <div>
                      <p className="font-semibold">→ Educate caregiver:</p>
                      <ul>
                        <li>- Proper medication administration </li>
                        <li>- Hydration guidance</li>
                        <li>- When to return earlier (worsening signs)</li>
                        <li>- Expected timeline recovery</li>
                      </ul>
                      <p className="font-semibold">
                        → 📅 Schedule follow-up: every 2–3 days until full recovery
                      </p>
                    </div>
        
                    <button
                      onClick={() => {
                        handleResponse("medications", [
                          "Amoxicillin",
                          "Azithromycin",
                          "Fluconazole",
                        ]);
                        handleResponse("followUpPlan", "Follow-up in 2-3 days");
                        setStep("completed");
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition "
                    >
                      Continue
                    </button>
                  </div>
                  </StepContainer>
                );

      case "completed":
        return (
          <StepContainer key="completed">
            <div className="text-center space-y-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block"
              >
                <FiCheckCircle className="text-green-500 w-24 h-24 mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800">
                Assessment Complete
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                Comprehensive evaluation finished. Generate final report or start new assessment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <SecondaryButton onClick={resetAssessment}>
                  <FiArrowLeft className="w-6 h-6" />
                  New Assessment
                </SecondaryButton>
                <PrimaryButton onClick={generatePDF}>
                  <FiDownload className="w-6 h-6" />
                  Download Full Report
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      default:
        return (
          <StepContainer>
            <div className="text-center text-red-500 text-2xl p-8">
              Invalid workflow state detected
            </div>
          </StepContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl p-10"
          >
            <header className="mb-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                <FiActivity className="inline-block w-12 h-12 mr-4 text-blue-600 align-middle" />
                Pediatric Pneumonia Clinical Pathway
              </h1>
            </header>

            <main className="relative">
              {renderStep()}
            </main>

            <footer className="mt-16 text-center text-gray-500 text-sm">
              <p>Clinical Decision Support System v2.4</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PneumoniaFlowchart;