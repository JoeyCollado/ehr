"use client";
import React, { useState, useEffect } from "react";

type ImmunizationType = {
  MMR: boolean[];
  TDap: boolean[];
  Varicella: boolean[];
  FluVaccine: boolean[];
  HepatitisB: boolean[];
  HepatitisA: boolean[];
  COVID19: boolean[];
};

type AllergiesType = {
  drugAllergies: string;
  foodAllergies: string;
  environmentalAllergies: string;
};



const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Initialize all state with localStorage or default values
  const [physicalData, setPhysicalData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('physicalData');
      return saved ? JSON.parse(saved) : {
        height: "135 cm (45\")",
        weight: "24 kg (52.9 lbs)",
        bmi: "13.2 kg/m²",
        armCircumference: "14 cm"
      };
    }
    return {
      height: "135 cm (45\")",
      weight: "24 kg (52.9 lbs)",
      bmi: "13.2 kg/m²",
      armCircumference: "14 cm"
    };
  });

  const [surveyData, setSurveyData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surveyData');
      return saved ? JSON.parse(saved) : {
        overallAppearance: "Alert",
        skinCondition: "Pale",
        postureMobility: "Normal"
      };
    }
    return {
      overallAppearance: "Alert",
      skinCondition: "Pale",
      postureMobility: "Normal"
    };
  });

  const [headToToeData, setHeadToToeData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('headToToeData');
      return saved ? JSON.parse(saved) : {
        headNeck: "No visible head trauma or deformities.\nMildly swollen cervical lymph nodes.\nMucous membranes are dry, indicating possible dehydration.\nNo signs of meningeal irritation.",
        chestLungs: "Breathing is labored, respiratory rate 32 breaths per minute (tachypnea).\nIntercostal retractions present, suggesting increased work of breathing.\nWheezes heard in both lower lung fields.\nDiminished breath sounds on the left side, indicating possible consolidation.",
        cardiovascular: "Heart rate 119 bpm (tachycardia). Extremities feel cool to touch.\nCapillary refill is delayed (> 3 seconds), indicating poor perfusion.",
        abdomen: "Soft, non-tender, and no distension. No hepatosplenomegaly.\nBowel sounds present and normal.",
        extremities: "No swelling or joint pain.\nMild weakness in upper and lower extremities due to fatigue.",
        neurological: "Reflexes intact and symmetrical.\nAlert but fatigued."
      };
    }
    return {
      headNeck: "No visible head trauma or deformities.\nMildly swollen cervical lymph nodes.\nMucous membranes are dry, indicating possible dehydration.\nNo signs of meningeal irritation.",
      chestLungs: "Breathing is labored, respiratory rate 32 breaths per minute (tachypnea).\nIntercostal retractions present, suggesting increased work of breathing.\nWheezes heard in both lower lung fields.\nDiminished breath sounds on the left side, indicating possible consolidation.",
      cardiovascular: "Heart rate 119 bpm (tachycardia). Extremities feel cool to touch.\nCapillary refill is delayed (> 3 seconds), indicating poor perfusion.",
      abdomen: "Soft, non-tender, and no distension. No hepatosplenomegaly.\nBowel sounds present and normal.",
      extremities: "No swelling or joint pain.\nMild weakness in upper and lower extremities due to fatigue.",
      neurological: "Reflexes intact and symmetrical.\nAlert but fatigued."
    };
  });

  const [vitalSigns, setVitalSigns] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitalSigns');
      return saved ? JSON.parse(saved) : {
        temperature: "39.2 °C",
        temperatureRoute: "Axilla",
        temperatureTime: "7:30am",
        temperatureDate: "",
        temperatureStatus: "Hypertermia",
        bloodPressure: "120/70 mmHg",
        bloodPressureRoute: "Brachial",
        bloodPressureTime: "7:45am",
        bloodPressureDate: "",
        bloodPressureStatus: "Normal",
        respiratoryRate: "32 breaths per minute",
        respiratoryRateTime: "7:48am",
        respiratoryRateDate: "",
        respiratoryRateStatus: "Tachypnea",
        heartRate: "119 beats per minute",
        heartRateRoute: "Radial",
        heartRateTime: "7:46am",
        heartRateDate: "",
        heartRateStatus: "Tachycardia",
        oxygenSaturation: "90%",
        oxygenSaturationTime: "7:48am",
        oxygenSaturationDate: "",
        oxygenSaturationStatus: "Hypoxemia"
      };
    }
    return {
      temperature: "39.2 °C",
      temperatureRoute: "Axilla",
      temperatureTime: "7:30am",
      temperatureDate: "",
      temperatureStatus: "Hypertermia",
      bloodPressure: "120/70 mmHg",
      bloodPressureRoute: "Brachial",
      bloodPressureTime: "7:45am",
      bloodPressureDate: "",
      bloodPressureStatus: "Normal",
      respiratoryRate: "32 breaths per minute",
      respiratoryRateTime: "7:48am",
      respiratoryRateDate: "",
      respiratoryRateStatus: "Tachypnea",
      heartRate: "119 beats per minute",
      heartRateRoute: "Radial",
      heartRateTime: "7:46am",
      heartRateDate: "",
      heartRateStatus: "Tachycardia",
      oxygenSaturation: "90%",
      oxygenSaturationTime: "7:48am",
      oxygenSaturationDate: "",
      oxygenSaturationStatus: "Hypoxemia"
    };
  });

  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('historyOfPresentIllness');
      return saved ? JSON.parse(saved) : {
        onset: "Symptoms started 5 days ago with mild coughing and nasal congestion.",
        location: "Chest pain is central and worsens with deep breathing or coughing.",
        duration: "Symptoms have progressively worsened over the past few days.",
        character: "Cough: Initially dry, now productive with yellowish sputum. Fever: Persistent, highest recorded at 39.2°C. Fatigue: Patient appears weak, sleeps more than usual, and has reduced appetite. Shortness of Breath: Occurs even at rest, worsens with physical activity",
        aggravatingFactors: "Cold air exposure Physical exertion",
        associatedSymptoms: "Nasal congestion Mid headache Poor appetite"
      };
    }
    return {
      onset: "Symptoms started 5 days ago with mild coughing and nasal congestion.",
      location: "Chest pain is central and worsens with deep breathing or coughing.",
      duration: "Symptoms have progressively worsened over the past few days.",
      character: "Cough: Initially dry, now productive with yellowish sputum. Fever: Persistent, highest recorded at 39.2°C. Fatigue: Patient appears weak, sleeps more than usual, and has reduced appetite. Shortness of Breath: Occurs even at rest, worsens with physical activity",
      aggravatingFactors: "Cold air exposure Physical exertion",
      associatedSymptoms: "Nasal congestion Mid headache Poor appetite"
    };
  });

  const [pastMedicalHistory, setPastMedicalHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pastMedicalHistory');
      return saved ? JSON.parse(saved) : {
        chronicIllnesses: "Diagnosed with asthma at age 6, managed with Salbutamol PRN.",
        hospitalizations: "No previous hospitalizations for pneumonia or any major surgeries",
        infections: "Frequent respiratory infections in early childhood (history of bronchiolitis at age 2)."
      };
    }
    return {
      chronicIllnesses: "Diagnosed with asthma at age 6, managed with Salbutamol PRN.",
      hospitalizations: "No previous hospitalizations for pneumonia or any major surgeries",
      infections: "Frequent respiratory infections in early childhood (history of bronchiolitis at age 2)."
    };
  });

  const [familyHealthHistory, setFamilyHealthHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('familyHealthHistory');
      return saved ? saved : "Father: History of asthma as a child. Mother: No known chronic illnesses.\nSiblings: No reported respiratory illnesses. No family history of tuberculosis, heart disease, or genetic disorders.";
    }
    return "Father: History of asthma as a child. Mother: No known chronic illnesses. Siblings: No reported respiratory illnesses. No family history of tuberculosis, heart disease, or genetic disorders.";
  });

  const [immunization, setImmunization] = useState<ImmunizationType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('immunization');
      return saved ? JSON.parse(saved) : {
        MMR: [false, false, false, false],
        TDap: [false, false, false, false],
        Varicella: [false, false, false, false],
        FluVaccine: [false, false, false, false],
        HepatitisB: [false, false, false, false],
        HepatitisA: [false, false, false, false],
        COVID19: [false, false, false, false]
      };
    }
    return {
      MMR: [false, false, false, false],
      TDap: [false, false, false, false],
      Varicella: [false, false, false, false],
      FluVaccine: [false, false, false, false],
      HepatitisB: [false, false, false, false],
      HepatitisA: [false, false, false, false],
      COVID19: [false, false, false, false]
    };
  });

  const [allergies, setAllergies] = useState<AllergiesType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('allergies');
      return saved ? JSON.parse(saved) : {
        drugAllergies: "None known.",
        foodAllergies: "None reported.",
        environmentalAllergies: ""
      };
    }
    return {
      drugAllergies: "None known.",
      foodAllergies: "None reported.",
      environmentalAllergies: ""
    };
  });

  const [chiefComplaint, setChiefComplaint] = useState(
    "The patient complains that his chest hurts when he breathes or cough, has difficulty in breathing, and always feeling really tired and weak"
  );

  // Load data from localStorage after component mounts
  useEffect(() => {
    setHasMounted(true);
    
    const loadFromLocalStorage = () => {
      const savedChiefComplaint = localStorage.getItem('chiefComplaint');
      if (savedChiefComplaint) setChiefComplaint(savedChiefComplaint);
      
      const savedPhysicalData = localStorage.getItem('physicalData');
      if (savedPhysicalData) setPhysicalData(JSON.parse(savedPhysicalData));
      
      const savedSurveyData = localStorage.getItem('surveyData');
      if (savedSurveyData) setSurveyData(JSON.parse(savedSurveyData));
      
      const savedHeadToToeData = localStorage.getItem('headToToeData');
      if (savedHeadToToeData) setHeadToToeData(JSON.parse(savedHeadToToeData));
      
      const savedVitalSigns = localStorage.getItem('vitalSigns');
      if (savedVitalSigns) setVitalSigns(JSON.parse(savedVitalSigns));
      
      const savedHistoryOfPresentIllness = localStorage.getItem('historyOfPresentIllness');
      if (savedHistoryOfPresentIllness) setHistoryOfPresentIllness(JSON.parse(savedHistoryOfPresentIllness));
      
      const savedPastMedicalHistory = localStorage.getItem('pastMedicalHistory');
      if (savedPastMedicalHistory) setPastMedicalHistory(JSON.parse(savedPastMedicalHistory));
      
      const savedFamilyHealthHistory = localStorage.getItem('familyHealthHistory');
      if (savedFamilyHealthHistory) setFamilyHealthHistory(savedFamilyHealthHistory);
      
      const savedImmunization = localStorage.getItem('immunization');
      if (savedImmunization) setImmunization(JSON.parse(savedImmunization));
      
      const savedAllergies = localStorage.getItem('allergies');
      if (savedAllergies) setAllergies(JSON.parse(savedAllergies));
    };

    loadFromLocalStorage();
  }, []);

  // Save chief complaint to localStorage
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('chiefComplaint', chiefComplaint);
    }
  }, [chiefComplaint, hasMounted]);

  // Save all data to localStorage whenever any state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('physicalData', JSON.stringify(physicalData));
    }
  }, [physicalData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
    }
  }, [surveyData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('headToToeData', JSON.stringify(headToToeData));
    }
  }, [headToToeData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vitalSigns', JSON.stringify(vitalSigns));
    }
  }, [vitalSigns]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('historyOfPresentIllness', JSON.stringify(historyOfPresentIllness));
    }
  }, [historyOfPresentIllness]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pastMedicalHistory', JSON.stringify(pastMedicalHistory));
    }
  }, [pastMedicalHistory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('familyHealthHistory', familyHealthHistory);
    }
  }, [familyHealthHistory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('immunization', JSON.stringify(immunization));
    }
  }, [immunization]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('allergies', JSON.stringify(allergies));
    }
  }, [allergies]);

  // Handle immunization change
  const handleImmunizationChange = (vaccine: keyof ImmunizationType, doseIndex: number) => {
    const updatedImmunization = {...immunization};
    updatedImmunization[vaccine][doseIndex] = !updatedImmunization[vaccine][doseIndex];
    setImmunization(updatedImmunization);
  };

  // Handle allergies change
  const handleAllergiesChange = (field: keyof AllergiesType, value: string) => {
    setAllergies({...allergies, [field]: value});
  };

  const handleSave = () => setIsEditing(false);

  // Only render the component after mounting (client-side)
  if (!hasMounted) {
    return null; // or a loading spinner
  }

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

      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%] ">
        <div className="w-full max-w-4xl bg-white text-black shadow-lg rounded-lg p-6 ">
        <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5 mb-4">
            CHIEF COMPLAINT
          </h2>
          <div className="text-center">
            {isEditing ? (
              <textarea
                title="complaint"
                className="w-full p-2 border rounded"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                rows={4}
              />
            ) : (
              <h2 className="p-2">{chiefComplaint}</h2>
            )}
          </div>

          <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5">
            HEALTH ASSESSMENT
          </h2>

          <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
            Physical Measurements:
          </h3>

          <div className="grid grid-cols-4 gap-4 mb-6 p-2 border-b">
            <div className="font-semibold">Height:</div>
            {isEditing ? (
              <input
                className="border p-1"
                value={physicalData.height}
                title="height"
                onChange={(e) =>
                  setPhysicalData({ ...physicalData, height: e.target.value })
                }
              />
            ) : (
              <div>{physicalData.height}</div>
            )}

            <div className="font-semibold">Weight:</div>
            {isEditing ? (
              <input
                className="border p-1"
                value={physicalData.weight}
                title="weight"
                onChange={(e) =>
                  setPhysicalData({ ...physicalData, weight: e.target.value })
                }
              />
            ) : (
              <div>{physicalData.weight}</div>
            )}

            <div className="font-semibold">BMI:</div>
            {isEditing ? (
              <input
                className="border p-1"
                value={physicalData.bmi}
                title="BMI"
                onChange={(e) =>
                  setPhysicalData({ ...physicalData, bmi: e.target.value })
                }
              />
            ) : (
              <div>{physicalData.bmi}</div>
            )}

            <div className="font-semibold">Arm Circumference:</div>
            {isEditing ? (
              <input
                className="border p-1"
                value={physicalData.armCircumference}
                title="Arm Circumference"
                onChange={(e) =>
                  setPhysicalData({
                    ...physicalData,
                    armCircumference: e.target.value,
                  })
                }
              />
            ) : (
              <div>{physicalData.armCircumference}</div>
            )}
          </div>

          {/* Weight Category Radio Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2">
            {["Underweight", "Normal", "Overweight"].map((category) => (
              <label
                key={category}
                className="flex items-center justify-center gap-2"
              >
                <input
                  type="radio"
                  name="weightCategory"
                  value={category}
                  checked={physicalData.weightCategory === category}
                  onChange={(e) =>
                    setPhysicalData({
                      ...physicalData,
                      weightCategory: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="form-radio h-4 w-4"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>

          <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
            General Survey:
          </h3>

          <div className="space-y-6 p-4">
            <div className="">
              <h4 className="font-bold mb-2">Overall Appearance:</h4>
              {["Alert", "Lethargic", "In Distress"].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="appearance"
                    value={option}
                    checked={surveyData.overallAppearance === option}
                    onChange={(e) =>
                      setSurveyData({
                        ...surveyData,
                        overallAppearance: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mr-1"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div>
              <h4 className="font-bold mb-2">Skin Condition:</h4>
              {["Pale", "Flushed", "Cyanotic", "Jaundice"].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="skin"
                    value={option}
                    checked={surveyData.skinCondition === option}
                    onChange={(e) =>
                      setSurveyData({
                        ...surveyData,
                        skinCondition: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mr-1"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div>
              <h4 className="font-bold mb-2">Posture and Mobility:</h4>
              {["Normal", "Need support"].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="posture"
                    value={option}
                    checked={surveyData.postureMobility === option}
                    onChange={(e) =>
                      setSurveyData({
                        ...surveyData,
                        postureMobility: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mr-1"
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
              Head to Toe Assessment:
            </h3>
            <div className="space-y-4 p-4">
              {/* Head and Neck */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Head and Neck:</div>
                <div>
                  {isEditing ? (
                    <textarea
                      title="head and neck"
                      value={headToToeData.headNeck}
                      onChange={(e) => setHeadToToeData({...headToToeData, headNeck: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.headNeck.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Chest and Lungs */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Chest and Lungs:</div>
                <div>
                  {isEditing ? (
                    <textarea
                    title="chest and lungs"
                      value={headToToeData.chestLungs}
                      onChange={(e) => setHeadToToeData({...headToToeData, chestLungs: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.chestLungs.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Cardiovascular */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Cardiovascular:</div>
                <div>
                  {isEditing ? (
                    <textarea
                      title="cardiovascular"
                      value={headToToeData.cardiovascular}
                      onChange={(e) => setHeadToToeData({...headToToeData, cardiovascular: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.cardiovascular.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Abdomen */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Abdomen:</div>
                <div>
                  {isEditing ? (
                    <textarea
                    title="abdomen"
                      value={headToToeData.abdomen}
                      onChange={(e) => setHeadToToeData({...headToToeData, abdomen: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.abdomen.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Extremities */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Extremities:</div>
                <div>
                  {isEditing ? (
                    <textarea
                    title="extremities"
                      value={headToToeData.extremities}
                      onChange={(e) => setHeadToToeData({...headToToeData, extremities: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.extremities.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Neurological */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
                <div className="font-semibold border-r">Neurological:</div>
                <div>
                  {isEditing ? (
                    <textarea
                    title="neuro"
                      value={headToToeData.neurological}
                      onChange={(e) => setHeadToToeData({...headToToeData, neurological: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.neurological.split('\n').map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5">
            VITAL SIGNS
          </h2>
            
            <div className="space-y-4 p-4">
              {/* Temperature */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2  ">
                <div className="font-semibold">Temperature:</div>
                {isEditing ? (
                  <input
                  title="temp"
                    className="border p-1 "
                    value={vitalSigns.temperature}
                    onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.temperature}</div>
                )}
                <div className="font-semibold">Route:</div>
                {isEditing ? (
                  <input
                  title="route"
                    className="border p-1"
                    value={vitalSigns.temperatureRoute}
                    onChange={(e) => setVitalSigns({...vitalSigns, temperatureRoute: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.temperatureRoute}</div>
                )}
                <div className="font-semibold">Time Taken:</div>
                {isEditing ? (
                  <input
                  title="time"
                    className="border p-1"
                    value={vitalSigns.temperatureTime}
                    onChange={(e) => setVitalSigns({...vitalSigns, temperatureTime: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.temperatureTime}</div>
                )}
                <div className="font-semibold">Date Taken:</div>
                {isEditing ? (
                  <input
                  title="date"
                    type="date"
                    className="border p-1"
                    value={vitalSigns.temperatureDate}
                    onChange={(e) => setVitalSigns({...vitalSigns, temperatureDate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.temperatureDate}</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2 border-b">
                {["Hypothermia", "Normal", "Hypertermia"].map((status) => (
                  <label key={status} className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="temperatureStatus"
                      value={status}
                      checked={vitalSigns.temperatureStatus === status}
                      onChange={(e) => setVitalSigns({...vitalSigns, temperatureStatus: e.target.value})}
                      disabled={!isEditing}
                      className="form-radio h-4 w-4"
                    />
                    <span className="text-gray-700">{status}</span>
                  </label>
                ))}
              </div>

              {/* Blood Pressure */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2">
                <div className="font-semibold">Blood Pressure:</div>
                {isEditing ? (
                  <input
                  title="blood"
                    className="border p-1"
                    value={vitalSigns.bloodPressure}
                    onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.bloodPressure}</div>
                )}
                <div className="font-semibold">Route:</div>
                {isEditing ? (
                  <input
                  title="route"
                    className="border p-1"
                    value={vitalSigns.bloodPressureRoute}
                    onChange={(e) => setVitalSigns({...vitalSigns, bloodPressureRoute: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.bloodPressureRoute}</div>
                )}
                <div className="font-semibold">Time Taken:</div>
                {isEditing ? (
                  <input
                  title="time"
                    className="border p-1"
                    value={vitalSigns.bloodPressureTime}
                    onChange={(e) => setVitalSigns({...vitalSigns, bloodPressureTime: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.bloodPressureTime}</div>
                )}
                <div className="font-semibold">Date Taken:</div>
                {isEditing ? (
                  <input
                    title="date"
                    type="date"
                    className="border p-1"
                    value={vitalSigns.bloodPressureDate}
                    onChange={(e) => setVitalSigns({...vitalSigns, bloodPressureDate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.bloodPressureDate}</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2 border-b">
                {["Hypotension", "Normal", "Hypertension"].map((status) => (
                  <label key={status} className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="bloodPressureStatus"
                      value={status}
                      checked={vitalSigns.bloodPressureStatus === status}
                      onChange={(e) => setVitalSigns({...vitalSigns, bloodPressureStatus: e.target.value})}
                      disabled={!isEditing}
                      className="form-radio h-4 w-4"
                    />
                    <span className="text-gray-700">{status}</span>
                  </label>
                ))}
              </div>

              {/* Respiratory Rate */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2 ">
                <div className="font-semibold">Respiratory Rate:</div>
                {isEditing ? (
                  <input
                  title="respiratory"
                    className="border p-1"
                    value={vitalSigns.respiratoryRate}
                    onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.respiratoryRate}</div>
                )}
                <div className="font-semibold">Route:</div>
                {isEditing ? (
                  <input
                  title="route"
                    className="border p-1"
                    value={vitalSigns.respiratoryRateRoute}
                    onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRateRoute: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.respiratoryRateRoute}</div>
                )}
                <div className="font-semibold">Time Taken:</div>
                {isEditing ? (
                  <input
                  title="time taken"
                    className="border p-1"
                    value={vitalSigns.respiratoryRateTime}
                    onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRateTime: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.respiratoryRateTime}</div>
                )}
                <div className="font-semibold">Date Taken:</div>
                {isEditing ? (
                  <input
                  title="date taken"
                    type="date"
                    className="border p-1"
                    value={vitalSigns.respiratoryRateDate}
                    onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRateDate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.respiratoryRateDate}</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2 border-b">
                {["Bradypnea", "Normal", "Tachypnea"].map((status) => (
                  <label key={status} className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="respiratoryRateStatus"
                      value={status}
                      checked={vitalSigns.respiratoryRateStatus === status}
                      onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRateStatus: e.target.value})}
                      disabled={!isEditing}
                      className="form-radio h-4 w-4"
                    />
                    <span className="text-gray-700">{status}</span>
                  </label>
                ))}
              </div>

              {/* Heart Rate */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2 ">
                <div className="font-semibold">Heart Rate:</div>
                {isEditing ? (
                  <input
                  title="heart rate"
                    className="border p-1"
                    value={vitalSigns.heartRate}
                    onChange={(e) => setVitalSigns({...vitalSigns, heartRate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.heartRate}</div>
                )}
                <div className="font-semibold">Route:</div>
                {isEditing ? (
                  <input
                  title="route"
                    className="border p-1"
                    value={vitalSigns.heartRateRoute}
                    onChange={(e) => setVitalSigns({...vitalSigns, heartRateRoute: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.heartRateRoute}</div>
                )}
                <div className="font-semibold">Time Taken:</div>
                {isEditing ? (
                  <input
                  title="time"
                    className="border p-1"
                    value={vitalSigns.heartRateTime}
                    onChange={(e) => setVitalSigns({...vitalSigns, heartRateTime: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.heartRateTime}</div>
                )}
                <div className="font-semibold">Date Taken:</div>
                {isEditing ? (
                  <input
                  title="date"
                    type="date"
                    className="border p-1"
                    value={vitalSigns.heartRateDate}
                    onChange={(e) => setVitalSigns({...vitalSigns, heartRateDate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.heartRateDate}</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2 border-b">
                {["Bradycardia", "Normal", "Tachycardia"].map((status) => (
                  <label key={status} className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="heartRateStatus"
                      value={status}
                      checked={vitalSigns.heartRateStatus === status}
                      onChange={(e) => setVitalSigns({...vitalSigns, heartRateStatus: e.target.value})}
                      disabled={!isEditing}
                      className="form-radio h-4 w-4"
                    />
                    <span className="text-gray-700">{status}</span>
                  </label>
                ))}
              </div>

              {/* Oxygen Saturation */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2 ">
                <div className="font-semibold">Oxygen Saturation:</div>
                {isEditing ? (
                  <input
                  title="oxygen"
                    className="border p-1"
                    value={vitalSigns.oxygenSaturation}
                    onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturation: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.oxygenSaturation}</div>
                )}
                <div className="font-semibold">Route:</div>
                {isEditing ? (
                  <input
                  title="route"
                    className="border p-1"
                    value={vitalSigns.oxygenSaturationRoute}
                    onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturationRoute: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.oxygenSaturationRoute}</div>
                )}
                <div className="font-semibold">Time Taken:</div>
                {isEditing ? (
                  <input
                  title="time taken"
                    className="border p-1"
                    value={vitalSigns.oxygenSaturationTime}
                    onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturationTime: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.oxygenSaturationTime}</div>
                )}
                <div className="font-semibold">Date Taken:</div>
                {isEditing ? (
                  <input
                  title="date taken"
                    type="date"
                    className="border p-1"
                    value={vitalSigns.oxygenSaturationDate}
                    onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturationDate: e.target.value})}
                  />
                ) : (
                  <div>{vitalSigns.oxygenSaturationDate}</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2 border-b">
                {["Hypoxemia", "Normal", "Hyperoxemia"].map((status) => (
                  <label key={status} className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="oxygenSaturationStatus"
                      value={status}
                      checked={vitalSigns.oxygenSaturationStatus === status}
                      onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturationStatus: e.target.value})}
                      disabled={!isEditing}
                      className="form-radio h-4 w-4"
                    />
                    <span className="text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5">
        MEDICAL HISTORY
      </h2>

      {/* History of Present Illness */}
      <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
        History of Present Illness
      </h3>
      <div className="space-y-4 p-4">
        {Object.entries(historyOfPresentIllness).map(([key, value]) => (
          <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b" key={key}>
            <div className="font-semibold">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            </div>
            {isEditing ? (
              <input
              title="history"
                className="border p-1"
                value={value as string}
                onChange={(e) => setHistoryOfPresentIllness({
                  ...historyOfPresentIllness,
                  [key]: e.target.value
                })}
              />
            ) : (
              <div>{value as string}</div>
            )}
          </div>
        ))}
      </div>

      {/* Past Medical History */}
      <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
        Past Medical History
      </h3>
      <div className="space-y-4 p-4">
        {Object.entries(pastMedicalHistory).map(([key, value]) => (
          <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b" key={key}>
            <div className="font-semibold">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            </div>
            {isEditing ? (
              <input
                title="history"
                className="border p-1"
                value={value as string}
                onChange={(e) => setPastMedicalHistory({
                  ...pastMedicalHistory,
                  [key]: e.target.value
                })}
              />
            ) : (
              <div>{value as string}</div>
            )}
          </div>
        ))}
      </div>

      {/* Family Health History */}
      <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
        Family Health History
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
        <div className="font-semibold border-r">Family History:</div>
        <div>
          {isEditing ? (
            <textarea
            title="family history"
              value={familyHealthHistory}
              onChange={(e) => setFamilyHealthHistory(e.target.value)}
              className="w-full p-1 border"
            />
          ) : (
            familyHealthHistory.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))
          )}
        </div>
      </div>
      <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5">
        IMMUNIZATION
      </h2>
      
      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 font-semibold">Vaccine</th>
              <th className="border border-gray-300 p-2 font-semibold">1st Dose</th>
              <th className="border border-gray-300 p-2 font-semibold">2nd Dose</th>
              <th className="border border-gray-300 p-2 font-semibold">3rd Dose</th>
              <th className="border border-gray-300 p-2 font-semibold">Booster</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(immunization).map(([vaccine, doses]) => (
              <tr key={vaccine} className="border border-gray-300">
                <td className="border border-gray-300 p-2 font-semibold">
                  {vaccine.replace(/([A-Z])/g, ' $1').replace('COVID19', 'COVID-19')}
                </td>
                {doses.map((dose, index) => (
                  <td key={index} className="border border-gray-300 p-2 text-center">
                    {isEditing ? (
                      <input
                      title="checkbox"
                        type="checkbox"
                        checked={dose}
                        onChange={() => handleImmunizationChange(vaccine as keyof ImmunizationType, index)}
                        className="h-5 w-5"
                      />
                    ) : (
                      <span>{dose ? "✓" : "☐"}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5">
        ALLERGIES
      </h2>
      
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
          <div className="font-semibold">Drug Allergies:</div>
          {isEditing ? (
            <input
            title="drug allergies"
              className="border p-1"
              value={allergies.drugAllergies}
              onChange={(e) => handleAllergiesChange('drugAllergies', e.target.value)}
            />
          ) : (
            <div>{allergies.drugAllergies}</div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
          <div className="font-semibold">Food Allergies:</div>
          {isEditing ? (
            <input
              title="food allergies"
              className="border p-1"
              value={allergies.foodAllergies}
              onChange={(e) => handleAllergiesChange('foodAllergies', e.target.value)}
            />
          ) : (
            <div>{allergies.foodAllergies}</div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 p-2 border-b">
          <div className="font-semibold">Environmental Allergies:</div>
          {isEditing ? (
            <textarea
            title="environmental allergies"
              className="border p-1 w-full"
              value={allergies.environmentalAllergies}
              onChange={(e) => handleAllergiesChange('environmentalAllergies', e.target.value)}
            />
          ) : (
            <div>{allergies.environmentalAllergies || "None reported."}</div>
          )}
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;