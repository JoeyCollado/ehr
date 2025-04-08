"use client";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

const PneumoniaFlowchart = () => {
  const [improvementAnswer, setImprovementAnswer] = useState<string>(String);
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

  const [vitals, setVitals] = useState({
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    heartRate: "",
    bloodPressure: "",
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    // Header
    doc.setFontSize(18);
    doc.text("Pediatric Pneumonia Assessment Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 30);

    // Vitals
    doc.setFontSize(14);
    doc.text("Initial Vitals:", 20, 40);
    doc.text(`Temperature: ${vitals.temperature}°C`, 20, 50);
    doc.text(`Respiratory Rate: ${vitals.respiratoryRate} bpm`, 20, 60);
    doc.text(`SpO2: ${vitals.oxygenSaturation}%`, 20, 70);
    doc.text(`Heart Rate: ${vitals.heartRate} bpm`, 20, 80);
    doc.text(`BP: ${vitals.bloodPressure} mmHg`, 20, 90);

    // Clinical Findings
    let yPos = 100;
    doc.setFontSize(14);
    doc.text("Clinical Findings:", 20, yPos);
    yPos += 10;

    responses.physicalFindings.forEach((finding: string) => {
      doc.text(`- ${finding}`, 20, yPos);
      yPos += 10;
    });

    // Lab Results
    doc.setFontSize(14);
    doc.text("Lab Results:", 20, yPos);
    yPos += 10;
    Object.entries(responses.labResults).forEach(([key, value]) => {
      if (value) {
        doc.text(`${key.toUpperCase()}: ${value}`, 20, yPos);
        yPos += 10;
      }
    });

    // Medications
    doc.setFontSize(14);
    doc.text("Medications:", 20, yPos);
    yPos += 10;
    responses.medications.forEach((med: string) => {
      doc.text(`- ${med}`, 20, yPos);
      yPos += 10;
    });

    // Follow-up
    doc.text(`Follow-up: ${responses.followUpPlan}`, 20, yPos);
    yPos += 10;

    // Caregiver Education
    doc.setFontSize(14);
    doc.text("Caregiver Education:", 20, yPos);
    yPos += 10;
    [
      "Proper medication administration",
      "Hydration guidance",
      "Warning signs to watch for",
      "Follow-up schedule",
    ].forEach((point) => {
      doc.text(`- ${point}`, 20, yPos);
      yPos += 10;
    });

    doc.save("pneumonia-assessment.pdf");
    setStep("completed");
  };

  const handleVitalsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleResponse(e.target.name, e.target.value);
  };

  const handleResponse = (
    key: string,
    value: string | number | boolean | string[]
  ) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setResponses((prev) => {
      const updated = [
        ...(prev[category as keyof typeof responses] as string[]),
      ];
      const index = updated.indexOf(value);
      if (index === -1) {
        updated.push(value);
      } else {
        updated.splice(index, 1);
      }
      return { ...prev, [category]: updated };
    });
  };

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

      //continue everything from here, we have severe case which is risk_Factors, and mild to moderate which is mild_management case, but have their own flowchart to follow but both will lead to final questions which is the (OPD follow-up)

      //severe case
      case "severe_management":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              IF SEVERE SIGNS IS PRESENT :
            </h2>
            <div className="p-4 rounded-md bg-red-50">
              <ul className="list-disc pl-5 space-y-2">
                <li>Refer to immediate hospital admission</li>
                <li>Admit to hospital or ICU</li>
                <li>
                  Initiate IV antifungal (e.g., Amphotericin B if systemic)
                </li>
                <li>
                  Ceftriaxone PLUS Azithromycin OR Ceftriaxone PLUS Levofloxacin
                  <br></br>- Before administering medication, check for drug
                  allergies, especially to beta-lactams or fluoroquinolones.
                  Review renal and liver function, ECG and electrolytes due to
                  QT prolongation risk. Watch for drug interactions, recent
                  antibiotic use, and local resistance patterns.
                </li>
                <li>
                  Add Vancomycin/Linezolid IF is MRSA. Can be seen through a
                  sputum culture test or PCR.<br></br>- MRSA is a type of
                  bacteria that&apos;s resistant to many common antibiotics,
                  including methicillin and other beta-lactams.
                </li>
                <li>
                  MRSA positive results:<br></br>➢ Skin infections <br></br>➢
                  Wound infections <br></br>➢ Systemic infections (Bacteremia
                  and Septicemia) <br></br>➢ Endocarditis <br></br>➢ Meningitis
                </li>
                <li>
                  → Add Piperacillin-tazobactam/Cefepime IF pseudomonas risk{" "}
                  <br></br>- This includes patients who: <br></br>● Are very
                  sick or in the ICU <br></br>● Were recently in the hospital or
                  took antibiotics in the past 3 months <br></br>● Have lung
                  problems like bronchiectasis or cystic fibrosis <br></br>● Had
                  Pseudomonas before <br></br>● Got pneumonia while already in
                  the hospital for several days
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
                setStep("antifungal_check");
              }}
              className="bg-blue-600 px-4 py-2 rounded-md text-white"
            >
              Continue
            </button>
          </div>
        );

      case "antifungal_check":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Antifungal Therapy</h2>
            <p>Does the patient require systemic antifungal therapy?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse("antifungalTherapy", "Amphotericin B");
                  setStep("lab_orders_severe");
                }}
                className="bg-green-600 px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setStep("lab_orders_severe")}
                className="bg-gray-500 px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case "lab_orders_severe":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Lab Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Chest X-ray", key: "cxr" },
                { label: "Sputum Culture", key: "sputum" },
                { label: "Blood Culture", key: "cbc" },
                { label: "Renal Function", key: "renalFunction" },
                { label: "Liver Function", key: "liverFunction" },
                { label: "BAL Analysis", key: "bal" },
              ].map((test) => (
                <div key={test.key} className="space-y-1">
                  <label className="block text-sm font-medium">
                    {test.label}:
                  </label>
                  <input
                    title="test"
                    value={
                      responses.labResults[
                        test.key as keyof typeof responses.labResults
                      ]
                    }
                    onChange={(e) =>
                      setResponses((prev) => ({
                        ...prev,
                        labResults: {
                          ...prev.labResults,
                          [test.key]: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep("severe_management")}
                className="bg-gray-500 px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep("followup")}
                className="bg-blue-600 px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      //case mild to moderate

      case "mild_management":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              IF MILD TO MODERATE SYMPTOMS:
            </h2>
            <div className="p-4 rounded-md bg-green-50">
              <h3 className="text-center font-bold">Treat as Outpatient</h3>
              <ul className="  pl-5 space-y-2">
                <li>
                  Order: <br></br>- CBC, CXR <br></br>- Sputum/BAL for fungal
                  stain/culture <br></br>- LFTs (for antifungal safety){" "}
                  <br></br>- Baseline liver function tests
                </li>
                <li>
                  → Treat w/ Amoxicillin 1 g PO TID or Doxycycline 100 mg PO BID
                </li>
                <li>→ Azithromycin(if local resistance &lt; 25%)</li>
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
                setStep("antifungalTheraphy");
              }}
              className="bg-blue-600 px-4 py-2 rounded-md"
            >
              Start antifungal therapy:
            </button>
          </div>
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
            <h2 className="text-xl font-semibold">Follow-up Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  question: "Improvement observed?",
                  options: ["Yes", "No"],
                  key: "improvement",
                },
                {
                  question: "Fever level?",
                  options: ["Mild", "Moderate", "High"],
                  key: "feverLevel",
                },
                {
                  question: "Medication adherence?",
                  options: ["Full", "Partial", "None"],
                  key: "medicationAdherence",
                },
                {
                  question: "Hydration status?",
                  options: ["Adequate", "Borderline", "Dehydrated"],
                  key: "hydrationStatus",
                },
              ].map((section) => (
                <div key={section.key} className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">{section.question}</h3>
                  <div className="flex flex-wrap gap-2">
                    {section.options.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          handleResponse(section.key, option.toLowerCase())
                        }
                        className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Final Assessment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <label className="block text-sm font-medium mb-2">
                    Respiratory Rate:
                  </label>
                  <input
                    title="respiratory"
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={vitals.respiratoryRate}
                    onChange={(e) =>
                      setVitals((prev) => ({
                        ...prev,
                        respiratoryRate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="p-4 border rounded-md">
                  <label className="block text-sm font-medium mb-2">
                    Oxygen Saturation:
                  </label>
                  <input
                    title="oxygen"
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={vitals.oxygenSaturation}
                    onChange={(e) =>
                      setVitals((prev) => ({
                        ...prev,
                        oxygenSaturation: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              className="bg-green-600 px-4 py-2 rounded-md w-full"
            >
              Generate Final Report
            </button>
          </div>
        );

      case "completed":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Assessment Complete</h2>
            <p>Report generated successfully!</p>
            <button
              onClick={resetAssessment}
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start New Assessment
            </button>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="min-h-screen bg-gray-50 py-12 px-4" ref={formRef}>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 text-black">
            <h1 className="text-3xl font-bold text-center mb-8">
              Pediatric Pneumonia Management Protocol
            </h1>
            {renderStep()}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PneumoniaFlowchart;
