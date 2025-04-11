"use client";


type Responses = {
  hasSymptoms: boolean | null;
  symptomDuration: string | null;
  severeSigns: boolean | null;
  improvement: string | null;
  feverLevel: string | null;
  medicationAdherence: string | null;
  physicalFindings: string[];
  caregiverAnswers: string[];
  labResults: {
    cxr: string;
    sputum: string;
    lfts: string;
    cbc: string;
    bal: string;
    renalFunction: string;
    liverFunction: string;
  };
  medications: string[];
  followUpPlan: string;
  riskFactors: {
    mrsa: boolean;
    pseudomonas: boolean;
    hospitalAdmission: boolean;
  };
  antibioticHistory: string;
  antifungalTherapy: string;
  vitalMonitoring: string[];
};


import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowLeft,
  FiActivity,
  FiChevronRight,
  FiMonitor,
  FiAlertOctagon,
  FiSmile,
  FiClock,
  FiCalendar,
  FiHelpCircle,
} from "react-icons/fi";

const PneumoniaFlowchart = () => {
  // State management (preserved from original with types)
  const [improvementAnswer, setImprovementAnswer] = useState<string>("");
  const [step, setStep] = useState("start");
  const [caregiverAnswers, setCaregiverAnswers] = useState<string[]>([]);


  const [responses, setResponses] = useState<Responses>({
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

  // Handlers (preserved from original)
  const handleVitalsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleResponse = <K extends keyof Responses>(key: K, value: Responses[K]) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };
  

  const handleCheckboxChange2 = (group: string, question: string) => {
    setCaregiverAnswers((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };
  
  

  // UI Components
  const StepContainer = ({
    children,
    stepKey, // Changed from 'key' to 'stepKey'
  }: {
    children: React.ReactNode;
    stepKey?: string; 
  }) => (
    <motion.div
      key={stepKey} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );

  const PrimaryButton = ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-blue-600 cursor-pointer text-white px-8 py-4 rounded-xl hover:bg-blue-700 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all"
    >
      {children}
    </motion.button>
  );

  const SecondaryButton = ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gray-100 cursor-pointer text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all border-2 border-gray-200"
    >
      {children}
    </motion.button>
  );

  const DangerButton = ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-red-600 cursor-pointer text-white px-8 py-4 rounded-xl hover:bg-red-700 flex items-center gap-3 justify-center text-lg font-medium shadow-lg transition-all"
    >
      {children}
    </motion.button>
  );

  const InfoCard = ({
    children,
    icon: Icon = FiActivity,
    color = "blue",
  }: {
    children: React.ReactNode;
    icon?: React.ElementType;
    color?: string;
  }) => (
    <div
      className={`bg-${color}-50 p-6 rounded-2xl flex gap-4 items-start border-2 border-${color}-100 shadow-sm`}
    >
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
          <StepContainer stepKey="start">
            <div className="text-center text-black bg-blue-50/30 p-10 rounded-2xl shadow-xl border border-blue-100 max-w-xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <FiMonitor className="w-12 h-12 text-blue-600" />
                <h2 className="text-3xl font-extrabold text-blue-800">
                  Pediatric Respiratory Evaluation
                </h2>
                <p className="text-blue-700 text-base max-w-md">
                  Begin to assess pediatric patients with respiratory symptoms.
                </p>
                <div className="mt-8">
                  <PrimaryButton onClick={() => setStep("vitals")}>
                    <FiChevronRight className="w-5 h-5" />
                    Start Evaluation
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </StepContainer>
        );

      case "vitals":
        return (
          <StepContainer stepKey="vitals">
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-xl max-w-3xl mx-auto text-black">
              <div className="text-center mb-8">
                <FiActivity className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-blue-800">
                  Check Baseline Vitals
                </h2>
                <p className="text-blue-700 mt-1 text-sm">
                  Please indicate whether each vital sign has been checked.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(vitals).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <select
                      title="vitals"
                      name={key}
                      value={value}
                      onChange={handleVitalsChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                      <option value="">Select</option>
                      <option value="done">Done</option>
                      <option value="not done">Not Done</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-between">
                <SecondaryButton onClick={() => setStep("start")}>
                  <FiArrowLeft className="w-5 h-5" />
                  Back
                </SecondaryButton>

                <PrimaryButton onClick={() => setStep("symptoms")}>
                  Continue
                  <FiChevronRight className="w-5 h-5" />
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "symptoms":
        return (
          <StepContainer key="symptoms">
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <FiAlertOctagon className="w-10 h-10 text-red-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-blue-800">
                  Symptom Screening
                </h2>
                <p className="text-gray-700 mt-2 text-base">
                  Does the child have <strong>chest pain</strong>,{" "}
                  <strong>cough</strong>, or
                  <strong> breathing difficulty</strong>?
                </p>
              </div>

              <div className="flex gap-6 justify-center mt-8">
                <PrimaryButton
                  onClick={() => {
                    handleResponse("hasSymptoms", true);
                    setStep("duration");
                  }}
                >
                  <FiCheckCircle className="w-5 h-5" />
                  Yes
                </PrimaryButton>

                <DangerButton
                  onClick={() => {
                    handleResponse("hasSymptoms", false);
                    setStep("no_symptoms");
                  }}
                >
                  <FiAlertTriangle className="w-5 h-5" />
                  No
                </DangerButton>
              </div>
            </div>
          </StepContainer>
        );

      case "no_symptoms":
        return (
          <StepContainer key="no_symptoms">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg max-w-xl mx-auto text-center space-y-6">
              <div>
                <FiSmile className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-green-700">
                  No Symptoms Detected
                </h2>
                <p className="text-gray-700 mt-2">
                  Based on your response, the child currently shows no signs of
                  chest pain, cough, or difficulty breathing.
                </p>
              </div>
              <div className="flex justify-center">
                <PrimaryButton onClick={resetAssessment}>
                  <FiArrowLeft className="w-5 h-5" />
                  Go Back
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "duration":
        return (
          <StepContainer key="duration">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto text-center space-y-6">
              <div>
                <FiClock className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Symptom Duration
                </h2>
                <p className="text-gray-600">
                  How long has the child been experiencing symptoms?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <PrimaryButton
                  onClick={() => {
                    handleResponse("symptomDuration", "acute");
                    setStep("less");
                  }}
                >
                  <FiCalendar className="w-5 h-5" />
                  Less than 2 weeks
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => {
                    handleResponse("symptomDuration", "chronic");
                    setStep("more");
                  }}
                >
                  <FiCalendar className="w-5 h-5" />
                  More than 2 weeks
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "less":
        return (
          <StepContainer key="less">
            <div className="bg-white border border-blue-100 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-black space-y-6">
              <InfoCard icon={FiAlertOctagon} color="blue">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Consider acute infection</li>
                  <li>
                    Request Chest X-ray to assess for consolidation or other
                    pulmonary findings
                  </li>
                  <li>Consider bacterial or viral diagnostics</li>
                </ul>
              </InfoCard>

              <div className="flex justify-center">
                <PrimaryButton
                  onClick={() => {
                    handleResponse("symptomDuration", "acute");
                    setStep("physical_assessment");
                  }}
                >
                  Continue
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "more":
        return (
          <StepContainer key="more">
            <div className="bg-white border border-purple-100 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-black space-y-6">
              <InfoCard icon={FiActivity} color="purple">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Consider chronic or unresolved infection</li>
                  <li>Request Chest X-ray for further evaluation</li>
                  <li>Consider fungal diagnostics</li>
                </ul>
              </InfoCard>

              <div className="flex justify-center">
                <PrimaryButton
                  onClick={() => {
                    handleResponse("symptomDuration", "acute");
                    setStep("physical_assessment");
                  }}
                >
                  Continue
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "physical_assessment":
        return (
          <StepContainer key="physical_assessment">
            <div className="bg-white border border-amber-100 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto text-black space-y-6">
              <h2 className="text-2xl font-bold text-center text-amber-800">
                Physical Assessment
              </h2>

              <InfoCard icon={FiHelpCircle} color="amber">
                <h3 className="font-medium text-lg mb-2">
                  Caregiver Questions:
                </h3>
                <div className="space-y-3">
                  {[
                    "Is the child eating/drinking normally?",
                    "Is the child vomiting everything?",
                    "Any history of weight loss/weakness?",
                    "Was the child previously hospitalized?",
                    "May lagnat pa po ba?",
                    "Nahihirapan pa rin po bang huminga?",
                  ].map((question) => (
                    <div key={question} className="flex items-center gap-3">
                     <input
  title="caregiver"
  type="checkbox"
  checked={caregiverAnswers.includes(question)}
  onChange={() => handleCheckboxChange2("caregiverAnswers", question)}
  className="h-4 w-4 rounded border-gray-300"
/>

                      <label className="text-sm">{question}</label>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <div className="flex justify-between pt-4">
                <DangerButton onClick={() => setStep("duration")}>
                  Back
                </DangerButton>
                <PrimaryButton onClick={() => setStep("perform")}>
                  Continue
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "perform":
        return (
          <StepContainer stepKey="perform">
            <div className="bg-white border border-amber-100 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-black space-y-6">
              <h2 className="text-xl font-bold text-center text-amber-800">
                Perform Physical Assessments
              </h2>

              <InfoCard icon={FiActivity} color="amber">
                <div className="space-y-5">
                  {[
                    "Check O2 saturation (SpO₂ < 94% is critical)",
                    "Look for signs: chest indrawing, cyanosis, altered LOC",
                    "Respiratory rate above normal range for age?",
                  ].map((sign) => (
                    <div key={sign} className="flex items-center gap-3">
                      <label className="text-sm">{sign}</label>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <div className="flex justify-between pt-4">
                <DangerButton onClick={() => setStep("physical_assessment")}>
                  Back
                </DangerButton>
                <PrimaryButton onClick={() => setStep("severity_assessment")}>
                  Continue
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "severity_assessment":
        return (
          <StepContainer stepKey="severity_assessment">
            <div className="bg-white border border-red-100 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto text-black space-y-6">
              <h2 className="text-xl font-bold text-center text-red-700">
                Severity Assessment
              </h2>

              <InfoCard icon={FiAlertTriangle} color="red">
                <p className="text-center">
                  Does the patient show any of the following severe signs?
                </p>
                <ul className="list-disc list-inside text-sm mt-2 text-gray-700">
                  <li>Unable to drink or breastfeed</li>
                  <li>Convulsions or lethargy</li>
                  <li>Severe chest indrawing or cyanosis</li>
                  <li>SpO₂ &lt; 90%</li>
                </ul>
              </InfoCard>

              <div className="flex justify-center gap-4 pt-4">
                <DangerButton
                  onClick={() => {
                    handleResponse("severeSigns", true);
                    setStep("severe_management");
                  }}
                >
                  Yes
                </DangerButton>
                <PrimaryButton
                  onClick={() => {
                    handleResponse("severeSigns", false);
                    setStep("mild_management");
                  }}
                >
                  No
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "severe_management":
        return (
          <StepContainer stepKey="severe_management">
            <div className="space-y-6 text-black">
              <h2 className="text-2xl font-bold text-center text-red-700">
                🚨 IF SEVERE SIGNS ARE PRESENT:
              </h2>

              <div className="p-6 rounded-lg bg-red-100 border border-red-300 space-y-4">
                <ul className="space-y-4 list-none text-sm sm:text-base">
                  <li className="flex gap-2">
                    <span>➡️</span>
                    <span>Refer for immediate hospital admission</span>
                  </li>

                  <li className="flex gap-2">
                    <span>➡️</span>
                    <span>Admit to hospital or ICU</span>
                  </li>

                  <li className="flex gap-2">
                    <span>💉</span>
                    <span>
                      Initiate IV antifungal (e.g., Amphotericin B if systemic)
                    </span>
                  </li>

                  <li>
                    <div className="flex gap-2">
                      <span>💊</span>
                      <span>
                        Ceftriaxone + Azithromycin <strong>OR</strong>{" "}
                        Ceftriaxone + Levofloxacin
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 ml-6">
                      • Check for allergies (especially beta-lactams,
                      fluoroquinolones)
                      <br />
                      • Review renal/liver function, ECG, electrolytes (QT risk)
                      <br />• Consider recent antibiotic use & resistance
                      patterns
                    </p>
                  </li>

                  <li>
                    <div className="flex gap-2">
                      <span>🧪</span>
                      <span>
                        Add Vancomycin/Linezolid if <strong>MRSA</strong> (via
                        culture or PCR)
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 ml-6">
                      MRSA is resistant to many common antibiotics, including
                      methicillin.
                    </p>
                    <ul className="list-disc ml-10 mt-2 text-xs text-gray-700">
                      <li>Skin & wound infections</li>
                      <li>Systemic infections (bacteremia, septicemia)</li>
                      <li>Endocarditis</li>
                      <li>Meningitis</li>
                    </ul>
                  </li>

                  <li>
                    <div className="flex gap-2">
                      <span>🧫</span>
                      <span>
                        Add Piperacillin-tazobactam / Cefepime if{" "}
                        <strong>Pseudomonas</strong> risk
                      </span>
                    </div>
                    <ul className="list-disc ml-10 mt-2 text-xs text-gray-700">
                      <li>ICU patients or very ill</li>
                      <li>Hospitalized recently or recent antibiotic use</li>
                      <li>Lung issues: bronchiectasis, cystic fibrosis</li>
                      <li>Previous Pseudomonas infection</li>
                      <li>Hospital-acquired pneumonia</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    const meds = [
                      "Ceftriaxone",
                      "Azithromycin", // or add Levofloxacin dynamically
                      ...(responses.riskFactors.mrsa
                        ? ["Vancomycin", "Linezolid"]
                        : []),
                      ...(responses.riskFactors.pseudomonas
                        ? ["Piperacillin-tazobactam", "Cefepime"]
                        : []),
                    ];
                    handleResponse("medications", meds);
                    handleResponse(
                      "followUpPlan",
                      "Hospital or ICU admission, daily monitoring"
                    );
                    setStep("followup");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium rounded-lg shadow-md transition duration-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </StepContainer>
        );

      case "mild_management":
        return (
          <StepContainer stepKey="mild_management">
            <div className="space-y-6 text-black">
              <h2 className="text-2xl font-bold text-center text-green-700">
                🌿 IF MILD TO MODERATE SYMPTOMS:
              </h2>

              <div className="p-6 bg-green-100 rounded-lg border border-green-300 space-y-4">
                <h3 className="text-center font-semibold text-lg text-green-800">
                  ✅ Treat as Outpatient
                </h3>

                <ul className="space-y-4 list-none text-sm sm:text-base">
                  <li>
                    <div className="flex gap-2">
                      <span>🧪</span>
                      <span>
                        <strong>Order:</strong>
                        <ul className="list-disc ml-6 mt-1 text-gray-700 text-xs">
                          <li>CBC, Chest X-Ray (CXR)</li>
                          <li>Sputum/BAL for fungal stain/culture</li>
                          <li>LFTs for antifungal safety</li>
                          <li>Baseline liver function tests</li>
                        </ul>
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-2">
                    <span>💊</span>
                    <span>
                      Treat with <strong>Amoxicillin 1g PO TID</strong> or{" "}
                      <strong>Doxycycline 100mg PO BID</strong>
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span>📉</span>
                    <span>
                      <strong>Azithromycin</strong> (if local resistance &lt;
                      25%)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-center ">
                <PrimaryButton
                  onClick={() => {
                    handleResponse("medications", [
                      "Amoxicillin",
                      "Azithromycin",
                      "Fluconazole",
                    ]);
                    handleResponse("followUpPlan", "Follow-up in 2-3 days");
                    setStep("antifungalTheraphy");
                  }}
                >
                  Start Antifungal Therapy
                </PrimaryButton>
              </div>
            </div>
          </StepContainer>
        );

      case "antifungalTheraphy":
        return (
          <div className="space-y-6 text-black">
            <h2 className="text-2xl font-bold text-center text-purple-700">
              🧴 Start Antifungal Therapy
            </h2>

            <div className="p-6 bg-purple-50 rounded-lg border border-purple-300 space-y-4">
              <ul className="space-y-4 list-none text-sm sm:text-base">
                <li className="flex gap-2">
                  <span>💊</span>
                  <span>
                    <strong>Fluconazole:</strong> Dose per weight (typically
                    6–12 mg/kg/day)
                  </span>
                </li>

                <li className="flex gap-2">
                  <span>👩‍⚕️</span>
                  <span>
                    <strong>Educate caregiver:</strong> Ensure full adherence
                    and monitor for any signs of worsening
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-center flex justify-center">
              <PrimaryButton
                onClick={() => {
                  handleResponse("medications", [
                    "Amoxicillin",
                    "Azithromycin",
                    "Fluconazole",
                  ]);
                  handleResponse("followUpPlan", "Follow-up in 2-3 days");
                  setStep("ask");
                }}
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        );

      case "ask":
        return (
          <div className="space-y-6 text-black px-6 py-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              When did you notice the child improving? (e.g., less fever, better
              breathing)
            </h2>

            <div className="space-y-4">
              <label className="block text-3xl font-bold text-center  text-gray-700">
                How many days?
              </label>
              <input
                type="number"
                title="days"
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter number of days"
              />
            </div>

            <div className="text-center flex justify-center">
              <PrimaryButton
                onClick={() => {
                  handleResponse("medications", [
                    "Amoxicillin",
                    "Azithromycin",
                    "Fluconazole",
                  ]);
                  handleResponse("followUpPlan", "Follow-up in 2-3 days");
                  setStep("monitor");
                }}
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        );

      case "monitor":
        return (
          <div className="space-y-6 text-black px-6 py-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              After 3-5 days: Monitor for improvement
            </h2>

            <ul className="space-y-6 mt-6 text-center">
              <li>
                <p className="text-lg font-medium ">
                  - Mas maayos na po ba ang paghinga niya?
                </p>
                <div className="flex space-x-6 mt-2 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="breathing"
                      value="yes"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="flex items-center ">
                    <input
                      type="radio"
                      name="breathing"
                      value="no"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </li>

              <li>
                <p className="text-lg font-medium">
                  - May lagnat pa rin po ba?
                </p>
                <div className="flex space-x-6 mt-2 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="fever"
                      value="yes"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="fever"
                      value="no"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </li>

              <li>
                <p className="text-lg font-medium">
                  - Umiinom po ba ng gamot ng tama?
                </p>
                <div className="flex space-x-6 mt-2 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="meds"
                      value="yes"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="meds"
                      value="no"
                      className="h-4 w-4"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </li>
            </ul>

            <div className="text-center">
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg shadow-md transition duration-200 cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "improvement":
        return (
          <div className="space-y-6 text-black px-6 py-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Improvement?
            </h2>

            <div className="flex justify-center space-x-6 my-6">
              <button
                className="px-6 py-3 bg-green-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                onClick={() => setImprovementAnswer("yes")}
              >
                Yes
              </button>
              <button
                className="px-6 py-3 bg-red-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                onClick={() => setImprovementAnswer("no")}
              >
                No
              </button>
            </div>

            {improvementAnswer === "yes" && (
              <div className="pl-6">
                <ul className="list-disc space-y-2">
                  <li>
                    <strong>YES:</strong> Continue full 10 to 14 day course of
                    oral antifungal
                  </li>
                </ul>
              </div>
            )}

            {improvementAnswer === "no" && (
              <div className="pl-6">
                <ul className="list-disc space-y-2">
                  <li>
                    <strong>NO:</strong> If condition escalates, refer to
                    pulmonologist or infectious disease specialist
                  </li>
                </ul>
              </div>
            )}

            <div className="text-center">
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
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg shadow-md transition duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        );

        {
          /* final assessment follow up */
        }

      case "followup":
        return (
          <div className="space-y-8 text-black">
            <h2 className="text-2xl font-bold text-center text-blue-800">
              📋 Final Questions (OPD Follow-up)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Cards */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
                <h3 className="text-lg font-semibold text-gray-800">
                  ● “May lagnat pa po ba?”
                </h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <strong>Mild fever:</strong> 100.4°F – 102.2°F (38°C – 39°C)
                    <p className="text-blue-700 font-medium mt-1">→ If mild:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Monitoring</li>
                      <li>Encourage rest</li>
                      <li>Hydration</li>
                      <li>Medication (Acetaminophen, Ibuprofen)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Moderate fever:</strong> 102.3°F – 104°F (39.1°C –
                    40°C)
                    <p className="text-blue-700 font-medium mt-1">
                      → If moderate:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Hydration</li>
                      <li>Lukewarm bath</li>
                      <li>Dress comfortably</li>
                      <li>Medication (Acetaminophen, Ibuprofen)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>High fever:</strong> Above 104°F (40°C)
                    <p className="text-blue-700 font-medium mt-1">→ If high:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Cool compress</li>
                      <li>Frequent checks</li>
                      <li>Hydration</li>
                      <li>Antipyretics</li>
                      <li>Monitor for worsening</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
                <h3 className="text-lg font-semibold text-gray-800">
                  ● “Mas maayos na po ba ang hinga niya?”
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Respiratory Rate:</strong> Normal RR: 18–30 bpm
                  </li>
                  <li>→ Easy breathing? Accessory muscles used?</li>
                </ul>
                <p className="font-semibold">Auscultation:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Clear sounds</li>
                  <li>Equal bilateral sounds</li>
                </ul>
                <p className="font-semibold">Cough/Wheezing:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Absence of symptoms</li>
                  <li>Oxygen saturation monitoring</li>
                  <li>Response to activity</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
                <h3 className="text-lg font-semibold text-gray-800">
                  ● “Naubos ba ang gamot? May side effect po ba?”
                </h3>
                <p className="font-semibold"> Check medication adherence: </p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Ask: “Naubos po ba ang gamot ayon sa reseta?”</li>
                  <li>Check for missed intervals or incomplete doses</li>
                </ul>
                <p className="font-semibold">Check for Side Effects:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Rashes or itchiness</li>
                  <li>Vomiting or nausea</li>
                  <li>Abdominal pain</li>
                  <li>Unusual sleepiness or dizziness</li>
                  <li>
                    Allergic reactions (e.g., swelling, difficulty breathing)
                  </li>
                </ul>
                <p className="font-semibold">Expected Normal:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Medication completed in prescribed time</li>
                  <li>No adverse effects reported</li>
                  <li>Refer if side effects are present</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
                <h3 className="text-lg font-semibold text-gray-800">
                  ● “Kumakain at umiinom na po ba siya ng ayos?”
                </h3>
                <p className="font-semibold">Nutrition:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>3 full meals/day or normal appetite for age</li>
                </ul>
                <p className="font-semibold">Fluid Intake:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>Normal value: 6-8 glasses per day</li>
                </ul>
                <p className="font-semibold">Urine Output:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>4–6 times/day</li>
                </ul>
                <p className="font-semibold">Signs of dehydration</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>
                    Hydration status: Moist lips, alert, active, no signs of
                    dehydration
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
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
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition "
              >
                Continue
              </button>
            </div>
          </div>
        );

      case "scheduling":
        return (
          <StepContainer stepKey="scheduling">
            <div className="text-black">
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

<div className="flex justify-center">
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-5 flex cursor-pointer"
              >
                Continue
              </button>
              </div>
            </div>
          </StepContainer>
        );

      case "completed":
        return (
          <StepContainer stepKey="completed">
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
                Comprehensive evaluation finished. Generate final report or
                start new assessment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-8">
                <SecondaryButton onClick={resetAssessment}>
                  <FiArrowLeft className="w-6 h-6" />
                  New Assessment
                </SecondaryButton>
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
      <div className="max-w-6xl mx-auto">
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

            <main className="relative">{renderStep()}</main>

            <footer className="mt-16 text-center text-gray-500 text-sm">
              <p>Clinical Decision Support System</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PneumoniaFlowchart;
