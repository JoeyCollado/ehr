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
  FiBox,
  FiHelpCircle,
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
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setResponses((prev) => {
      const updated = [...prev[category]];
      const index = updated.indexOf(value);
      if (index === -1) updated.push(value);
      else updated.splice(index, 1);
      return { ...prev, [category]: updated };
    });
  };

  // UI Components
  const StepContainer = ({
    children,
    key,
  }: {
    children: React.ReactNode;
    key?: string;
  }) => (
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
    icon?: any;
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
          <StepContainer key="start">
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
            <StepContainer key="vitals">
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
                      Does the child have <strong>chest pain</strong>, <strong>cough</strong>, or
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
                        Based on your response, the child currently shows no signs of chest pain, cough, or difficulty breathing.
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
                            <li>Request Chest X-ray to assess for consolidation or other pulmonary findings</li>
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
                              <h3 className="font-medium text-lg mb-2">Caregiver Questions:</h3>
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
                                      onChange={() =>
                                        handleCheckboxChange("caregiverAnswers", question)
                                      }
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label className="text-sm">{question}</label>
                                  </div>
                                ))}
                              </div>
                            </InfoCard>
                    
                            <div className="flex justify-between pt-4">
                              <DangerButton
                                onClick={() => setStep("duration")}
                               
                              >
                                Back
                              </DangerButton>
                              <PrimaryButton onClick={() => setStep("perform")}>
                                Continue
                              </PrimaryButton>
                            </div>
                          </div>
                        </StepContainer>
                      )                    
                    

                      case "perform":
                        return (
                          <StepContainer key="perform">
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
                            <StepContainer key="severity_assessment">
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
          <StepContainer>
            <div className="space-y-4 text-black">
              <h2 className="text-xl font-semibold text-center">
                IF SEVERE SIGNS IS PRESENT :
              </h2>
              <div className="p-4 rounded-md bg-red-50">
                <ul className=" pl-5 space-y-2">
                  <li>→ Refer to immediate hospital admission</li>
                  <li>→ Admit to hospital or ICU</li>
                  <li>
                    → Initiate IV antifungal (e.g., Amphotericin B if systemic)
                  </li>
                  <li>
                    → Ceftriaxone PLUS Azithromycin OR Ceftriaxone PLUS
                    Levofloxacin
                    <br></br>- Before administering medication, check for drug
                    allergies, especially to beta-lactams or fluoroquinolones.
                    Review renal and liver function, ECG and electrolytes due to
                    QT prolongation risk. Watch for drug interactions, recent
                    antibiotic use, and local resistance patterns.
                  </li>
                  <li>
                    → Add Vancomycin/Linezolid IF is MRSA. Can be seen through a
                    sputum culture test or PCR.<br></br>- MRSA is a type of
                    bacteria that&apos;s resistant to many common antibiotics,
                    including methicillin and other beta-lactams.
                  </li>
                  <li>
                    - MRSA positive results:<br></br>➢ Skin infections <br></br>
                    ➢ Wound infections <br></br>➢ Systemic infections
                    (Bacteremia and Septicemia) <br></br>➢ Endocarditis{" "}
                    <br></br>➢ Meningitis
                  </li>
                  <li>
                    → Add Piperacillin-tazobactam/Cefepime IF pseudomonas risk{" "}
                    <br></br>- This includes patients who: <br></br>● Are very
                    sick or in the ICU <br></br>● Were recently in the hospital
                    or took antibiotics in the past 3 months <br></br>● Have
                    lung problems like bronchiectasis or cystic fibrosis{" "}
                    <br></br>● Had Pseudomonas before <br></br>● Got pneumonia
                    while already in the hospital for several days
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  const meds = [
                    "Ceftriaxone",
                    "Azithromycin", // Default; add logic for Levofloxacin if needed
                    ...(responses.riskFactors.mrsa
                      ? ["Vancomycin", "Linezolid"]
                      : []), // Include both options
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
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
              >
                Continue
              </button>
            </div>
          </StepContainer>
        );

      case "mild_management":
        return (
          <StepContainer>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 ">
              <FiSmile className="w-8 h-8 text-green-600" />
              Mild/Moderate Case Protocol
            </h2>

            <div className="space-y-8">
              <InfoCard icon={FiActivity} color="green">
                Treat as Outpatient
              </InfoCard>

              <div className="bg-green-50 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-green-800">
                      Order:
                    </h3>
                    <ul className="list-disc pl-6 space-y-3 text-green-900">
                      <li>CBC, CXR</li>
                      <li>Sputum/BAL for fungal stain/culture</li>
                      <li>LFTs (for antifungal safety)</li>
                      <li>Baseline liver function tests</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-green-800">
                      Medication Plan
                    </h3>
                    <ul className="list-disc pl-6 space-y-3 text-green-900">
                      <li>Amoxicillin 1g PO TID</li>
                      <li>Doxycycline 100mg BID</li>
                      <li>Azithromycin (if resistance &lt;25%)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-100">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">
                    Caregiver Education
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Medication Timing",
                      "Hydration Plan",
                      "Warning Signs",
                      "Follow-up Schedule",
                    ].map((topic) => (
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
          <div className="space-y-6 text-black">
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
                Comprehensive evaluation finished. Generate final report or
                start new assessment.
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
              <p>Clinical Decision Support System v2.4</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PneumoniaFlowchart;
