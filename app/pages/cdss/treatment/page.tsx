"use client"

import React, { useState } from 'react';

const PneumoniaFlowchart = () => {
  const [step, setStep] = useState('start');
  const [responses, setResponses] = useState({
    hasSymptoms: null,
    symptomDuration: null,
    severeSigns: null,
    improvement: null,
    feverLevel: null,
    medicationAdherence: null,
  });

  const [vitals, setVitals] = useState({
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    heartRate: '',
    bloodPressure: ''
  });

  const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVitals(prev => ({ ...prev, [name]: value }));
  };

  const handleResponse = (key: string, value: any) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 'start':
        return (
          <div className="text-center text-black ">
            <h2 className="text-2xl font-bold mb-6">Pediatric Respiratory Evaluation</h2>
            <button 
              onClick={() => setStep('vitals')}
              className="bg-blue-600 text-black px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Begin Assessment
            </button>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-semibold mb-4 text-black">Initial Vitals Assessment</h2>
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
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep('symptoms')}
              className="mt-4 bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        );

      case 'symptoms':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-semibold">Symptom Screening</h2>
            <p className="text-black">Does the child have chest pain, cough, or breathing difficulty?</p>
            <div className="flex gap-4 justify-center">
              {[['Yes', 'green'], ['No', 'red']].map(([label, color]) => (
                <button
                  key={label}
                  onClick={() => {
                    handleResponse('hasSymptoms', label === 'Yes');
                    setStep(label === 'Yes' ? 'duration' : 'no_symptoms');
                  }}
                  className={`bg-${color}-600 text-black px-6 py-2 rounded-md hover:bg-${color}-700`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'duration':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-semibold">Symptom Duration</h2>
            <p className="text-black">How long has the child had symptoms?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Less than 2 weeks', 'acute'],
                ['More than 2 weeks', 'chronic']
              ].map(([label, key]) => (
                <button
                  key={key}
                  onClick={() => {
                    handleResponse('symptomDuration', key);
                    setStep('physical_assessment');
                  }}
                  className="p-4 border rounded-md hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'physical_assessment':
        return (
          <div className="space-y-6 text-black">
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
                    <input type="checkbox" id={question} className="h-4 w-4" />
                    <label htmlFor={question} className="text-sm">{question}</label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 text-black">
                <h3 className="font-medium">Clinical Signs:</h3>
                {[
                  'SpO₂ < 94%',
                  'Chest indrawing',
                  'Cyanosis',
                  'Altered LOC',
                  'Respiratory rate above normal'
                ].map((sign) => (
                  <div key={sign} className="flex items-center gap-2">
                    <input type="checkbox" id={sign} className="h-4 w-4" />
                    <label htmlFor={sign} className="text-sm">{sign}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setStep('severity_assessment')}
              className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 "
            >
              Continue
            </button>
          </div>
        );

      case 'severity_assessment':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-semibold">Severity Assessment</h2>
            <p className="text-black">Does the patient show severe signs?</p>
            <div className="flex gap-4 justify-center">
              {[['Yes', 'red'], ['No', 'green']].map(([label, color]) => (
                <button
                  key={label}
                  onClick={() => {
                    handleResponse('severeSigns', label === 'Yes');
                    setStep(label === 'Yes' ? 'severe_management' : 'mild_management');
                  }}
                  className={`bg-${color}-600 text-black px-6 py-2 rounded-md hover:bg-${color}-700`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'severe_management':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black">Severe Case Management</h2>
            <div className=" p-4 rounded-md text-black">
              <ul className="list-disc pl-5 space-y-2">
                <li>Immediate hospital admission</li>
                <li>Initiate IV fluids and oxygen therapy</li>
                <li>Antibiotic therapy: Ceftriaxone + Azithromycin</li>
                <li>Consider antifungal if systemic infection</li>
                <li>Monitor vital signs continuously</li>
              </ul>
            </div>
            <button
              onClick={() => setStep('followup')}
              className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Continue to Follow-up
            </button>
          </div>
        );

      case 'mild_management':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-semibold text-black">Outpatient Management</h2>
            <div className=" p-4 rounded-md">
              <ul className="list-disc pl-5 space-y-2">
                <li>Amoxicillin 1g PO TID or Doxycycline 100mg BID</li>
                <li>Azithromycin if resistance 25&gt;</li>
                <li>Fluconazole 6-12 mg/kg/day</li>
                <li>Educate caregiver on medication adherence</li>
                <li>Schedule follow-up in 2-3 days</li>
              </ul>
            </div>
            <button
              onClick={() => setStep('followup')}
              className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Continue to Follow-up
            </button>
          </div>
        );

      case 'followup':
        return (
          <div className="space-y-6 text-black">
            <h2 className="text-xl font-semibold">Follow-up Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
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
            <button
              onClick={() => setStep('final')}
              className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Complete Assessment
            </button>
          </div>
        );

      case 'final':
        return (
          <div className="text-center space-y-4 text-black">
            <h2 className="text-xl font-semibold text-black">Assessment Complete</h2>
            <p className="text-black">Recommendations have been provided</p>
            <div className=" p-4 rounded-md">
              <h3 className="font-medium mb-2">Next Steps:</h3>
              <ul className="list-disc pl-5 space-y-1 text-left">
                <li>Schedule follow-up in 2-3 days</li>
                <li>Monitor for worsening symptoms</li>
                <li>Ensure medication adherence</li>
                <li>Maintain hydration and nutrition</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setStep('start');
                setResponses({
                  hasSymptoms: null,
                  symptomDuration: null,
                  severeSigns: null,
                  improvement: null,
                  feverLevel: null,
                  medicationAdherence: null,
                });
                setVitals({
                  temperature: '',
                  respiratoryRate: '',
                  oxygenSaturation: '',
                  heartRate: '',
                  bloodPressure: ''
                });
              }}
              className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Pediatric Pneumonia Management Protocol
        </h1>
        {renderStep()}
      </div>
    </div>
  );
};

export default PneumoniaFlowchart;