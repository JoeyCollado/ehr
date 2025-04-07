'use client'

import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';

const PneumoniaFlowchart = () => {
  const [step, setStep] = useState('start');
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
      cxr: '',
      sputum: '',
      lfts: '',
      cbc: '',
      bal: '',
      renalFunction: '',
      liverFunction: ''
    },
    medications: [] as string[],
    followUpPlan: '',
    riskFactors: {
      mrsa: false,
      pseudomonas: false,
      hospitalAdmission: false
    },
    antibioticHistory: '',
    antifungalTherapy: '',
    vitalMonitoring: []
  });

  const [vitals, setVitals] = useState({
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    heartRate: '',
    bloodPressure: ''
  });

  const ageBasedRR = {
    infant: '30-60',
    toddler: '24-40',
    child: '18-30',
    adolescent: '12-16'
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();
    
    // Header
    doc.setFontSize(18);
    doc.text('Pediatric Pneumonia Assessment Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 30);

    // Vitals
    doc.setFontSize(14);
    doc.text('Initial Vitals:', 20, 40);
    doc.text(`Temperature: ${vitals.temperature}°C`, 20, 50);
    doc.text(`Respiratory Rate: ${vitals.respiratoryRate} bpm`, 20, 60);
    doc.text(`SpO2: ${vitals.oxygenSaturation}%`, 20, 70);
    doc.text(`Heart Rate: ${vitals.heartRate} bpm`, 20, 80);
    doc.text(`BP: ${vitals.bloodPressure} mmHg`, 20, 90);

    // Clinical Findings
    let yPos = 100;
    doc.setFontSize(14);
    doc.text('Clinical Findings:', 20, yPos);
    yPos += 10;
    
    responses.physicalFindings.forEach((finding: string) => {
      doc.text(`- ${finding}`, 20, yPos);
      yPos += 10;
    });

    // Lab Results
    doc.setFontSize(14);
    doc.text('Lab Results:', 20, yPos);
    yPos += 10;
    Object.entries(responses.labResults).forEach(([key, value]) => {
      if (value) {
        doc.text(`${key.toUpperCase()}: ${value}`, 20, yPos);
        yPos += 10;
      }
    });

    // Medications
    doc.setFontSize(14);
    doc.text('Medications:', 20, yPos);
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
    doc.text('Caregiver Education:', 20, yPos);
    yPos += 10;
    [
      'Proper medication administration',
      'Hydration guidance',
      'Warning signs to watch for',
      'Follow-up schedule'
    ].forEach(point => {
      doc.text(`- ${point}`, 20, yPos);
      yPos += 10;
    });

    doc.save('pneumonia-assessment.pdf');
  };

  const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVitals(prev => ({ ...prev, [name]: value }));
  };

  const handleResponse = (key: string, value: any) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setResponses(prev => {
      const updated = [...prev[category as keyof typeof responses]] as string[];
      const index = updated.indexOf(value);
      if (index === -1) {
        updated.push(value);
      } else {
        updated.splice(index, 1);
      }
      return { ...prev, [category]: updated };
    });
  };

  const handleRiskFactors = (factor: string, value: boolean) => {
    setResponses(prev => ({
      ...prev,
      riskFactors: { ...prev.riskFactors, [factor]: value }
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 'start':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Pediatric Respiratory Evaluation</h2>
            <button 
              onClick={() => setStep('vitals')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Begin Assessment
            </button>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Initial Vitals Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(vitals).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </label>
                  <input
                    name={key}
                    value={value}
                    onChange={handleVitalsChange}
                    className="w-full p-2 border rounded-md"
                    type={key === 'temperature' ? 'number' : 'text'}
                    step={key === 'temperature' ? 0.1 : undefined}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setStep('start')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep('symptoms')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'symptoms':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Symptom Screening</h2>
            <p>Does the child have chest pain, cough, or breathing difficulty?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse('hasSymptoms', true);
                  setStep('duration');
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleResponse('hasSymptoms', false);
                  setStep('no_symptoms');
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case 'duration':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Symptom Duration</h2>
            <p>How long has the child had symptoms?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleResponse('symptomDuration', 'acute');
                  setStep('physical_assessment');
                }}
                className="p-4 border rounded-md hover:bg-gray-50"
              >
                Less than 2 weeks
              </button>
              <button
                onClick={() => {
                  handleResponse('symptomDuration', 'chronic');
                  setStep('physical_assessment');
                }}
                className="p-4 border rounded-md hover:bg-gray-50"
              >
                More than 2 weeks
              </button>
            </div>
          </div>
        );

      case 'physical_assessment':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Physical Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Caregiver Questions:</h3>
                {[
                  'Is the child eating/drinking normally?',
                  'Is the child vomiting everything?',
                  'Any history of weight loss/weakness?',
                  'Was the child previously hospitalized?',
                  'May lagnat pa po ba?',
                  'Nahihirapan pa rin po bang huminga?'
                ].map((question) => (
                  <div key={question} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      onChange={() => handleCheckboxChange('caregiverAnswers', question)}
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{question}</label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Clinical Signs:</h3>
                {[
                  'SpO₂ < 94%',
                  'Chest indrawing',
                  'Cyanosis',
                  'Altered LOC',
                  'Respiratory rate above normal',
                  'Accessory muscle use',
                  'Wheezing'
                ].map((sign) => (
                  <div key={sign} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      onChange={() => handleCheckboxChange('physicalFindings', sign)}
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{sign}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep('duration')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep('severity_assessment')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'severity_assessment':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Severity Assessment</h2>
            <p>Does the patient show severe signs?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse('severeSigns', true);
                  setStep('risk_factors');
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleResponse('severeSigns', false);
                  setStep('mild_management');
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case 'risk_factors':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Risk Factor Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">MRSA Risk Factors:</h3>
                {[
                  'Recent hospitalization',
                  'Antibiotic use in past 3 months',
                  'Previous MRSA infection',
                  'Skin/wound infection'
                ].map(factor => (
                  <div key={factor} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleRiskFactors('mrsa', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{factor}</label>
                  </div>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Pseudomonas Risk Factors:</h3>
                {[
                  'ICU admission',
                  'Bronchiectasis/Cystic fibrosis',
                  'Recent antibiotics',
                  'Hospital-acquired pneumonia'
                ].map(factor => (
                  <div key={factor} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleRiskFactors('pseudomonas', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{factor}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('severity_assessment')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep('severe_management')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'severe_management':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Severe Case Management</h2>
            <div className="p-4 rounded-md bg-red-50">
              <ul className="list-disc pl-5 space-y-2">
                <li>Immediate hospital admission</li>
                <li>IV Ceftriaxone + Azithromycin</li>
                {responses.riskFactors.mrsa && <li>Add Vancomycin/Linezolid</li>}
                {responses.riskFactors.pseudomonas && <li>Add Piperacillin-tazobactam/Cefepime</li>}
                <li>Consider Amphotericin B for fungal infection</li>
                <li>Continuous vital monitoring</li>
                <li>Chest X-ray and blood cultures</li>
                <li>Monitor ECG and electrolytes</li>
              </ul>
            </div>
            <button
              onClick={() => {
                const meds = [
                  'Ceftriaxone',
                  'Azithromycin',
                  ...(responses.riskFactors.mrsa ? ['Vancomycin'] : []),
                  ...(responses.riskFactors.pseudomonas ? ['Piperacillin-tazobactam'] : [])
                ];
                handleResponse('medications', meds);
                handleResponse('followUpPlan', 'ICU admission, daily monitoring');
                setStep('antifungal_check');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        );

      case 'antifungal_check':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Antifungal Therapy</h2>
            <p>Does the patient require systemic antifungal therapy?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  handleResponse('antifungalTherapy', 'Amphotericin B');
                  setStep('lab_orders_severe');
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setStep('lab_orders_severe')}
                className="bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );

      case 'lab_orders_severe':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Lab Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Chest X-ray', key: 'cxr' },
                { label: 'Sputum Culture', key: 'sputum' },
                { label: 'Blood Culture', key: 'cbc' },
                { label: 'Renal Function', key: 'renalFunction' },
                { label: 'Liver Function', key: 'liverFunction' },
                { label: 'BAL Analysis', key: 'bal' }
              ].map((test) => (
                <div key={test.key} className="space-y-1">
                  <label className="block text-sm font-medium">{test.label}:</label>
                  <input
                    value={responses.labResults[test.key as keyof typeof responses.labResults]}
                    onChange={(e) => setResponses(prev => ({
                      ...prev,
                      labResults: { ...prev.labResults, [test.key]: e.target.value }
                    }))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep('severe_management')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep('followup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'mild_management':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Outpatient Management</h2>
            <div className="p-4 rounded-md bg-green-50">
              <ul className="list-disc pl-5 space-y-2">
                <li>Amoxicillin 1g PO TID</li>
                <li>Azithromycin (if resistance &lt;25%)</li>
                <li>Fluconazole 6-12 mg/kg/day</li>
                <li>Chest X-ray and CBC</li>
                <li>Sputum/BAL for fungal culture</li>
                <li>Liver function tests</li>
                <li>Follow-up in 48 hours</li>
              </ul>
            </div>
            <button
              onClick={() => {
                handleResponse('medications', ['Amoxicillin', 'Azithromycin', 'Fluconazole']);
                handleResponse('followUpPlan', 'Follow-up in 2-3 days');
                setStep('lab_orders_mild');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        );

      case 'lab_orders_mild':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Lab Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Chest X-ray', key: 'cxr' },
                { label: 'CBC', key: 'cbc' },
                { label: 'Sputum Culture', key: 'sputum' },
                { label: 'Liver Function', key: 'liverFunction' }
              ].map((test) => (
                <div key={test.key} className="space-y-1">
                  <label className="block text-sm font-medium">{test.label}:</label>
                  <input
                    value={responses.labResults[test.key as keyof typeof responses.labResults]}
                    onChange={(e) => setResponses(prev => ({
                      ...prev,
                      labResults: { ...prev.labResults, [test.key]: e.target.value }
                    }))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep('mild_management')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep('followup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'followup':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Follow-up Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  question: 'Improvement observed?',
                  options: ['Yes', 'No'],
                  key: 'improvement'
                },
                {
                  question: 'Fever level?',
                  options: ['Mild', 'Moderate', 'High'],
                  key: 'feverLevel'
                },
                {
                  question: 'Medication adherence?',
                  options: ['Full', 'Partial', 'None'],
                  key: 'medicationAdherence'
                },
                {
                  question: 'Hydration status?',
                  options: ['Adequate', 'Borderline', 'Dehydrated'],
                  key: 'hydrationStatus'
                }
              ].map((section) => (
                <div key={section.key} className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">{section.question}</h3>
                  <div className="flex flex-wrap gap-2">
                    {section.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleResponse(section.key, option.toLowerCase())}
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
                  <label className="block text-sm font-medium mb-2">Respiratory Rate:</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals(prev => ({ ...prev, respiratoryRate: e.target.value }))}
                  />
                </div>
                <div className="p-4 border rounded-md">
                  <label className="block text-sm font-medium mb-2">Oxygen Saturation:</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => setVitals(prev => ({ ...prev, oxygenSaturation: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
            >
              Generate Final Report
            </button>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" ref={formRef}>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pediatric Pneumonia Management Protocol
        </h1>
        {renderStep()}
      </div>
    </div>
  );
};

export default PneumoniaFlowchart;