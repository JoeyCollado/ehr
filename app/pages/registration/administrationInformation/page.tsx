"use client";
import React, { useState } from "react";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [physicalData, setPhysicalData] = useState({
    height: "135 cm (45\")",
    weight: "24 kg (52.9 lbs)",
    bmi: "13.2 kg/m²",
    armCircumference: "14 cm"
  });
  const [surveyData, setSurveyData] = useState({
    overallAppearance: "Alert",
    skinCondition: "Pale",
    postureMobility: "Normal"
  });
  const [headToToeData, setHeadToToeData] = useState({
    headNeck: "No visible head trauma or deformities.\nMildly swollen cervical lymph nodes.\nMucous membranes are dry, indicating possible dehydration.\nNo signs of meningeal irritation.",
    chestLungs: "Breathing is labored, respiratory rate 32 breaths per minute (tachypnea).\nIntercostal retractions present, suggesting increased work of breathing.\nWheezes heard in both lower lung fields.\nDiminished breath sounds on the left side, indicating possible consolidation.",
    cardiovascular: "Heart rate 119 bpm (tachycardia). Extremities feel cool to touch.\nCapillary refill is delayed (> 3 seconds), indicating poor perfusion.",
    abdomen: "Soft, non-tender, and no distension. No hepatosplenomegaly.\nBowel sounds present and normal.",
    extremities: "No swelling or joint pain.\nMild weakness in upper and lower extremities due to fatigue.",
    neurological: "Reflexes intact and symmetrical.\nAlert but fatigued."
  });
  const [vitalSigns, setVitalSigns] = useState({
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
  });

  const handleSave = () => setIsEditing(false);

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
          <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5 mb-4 ">
            CHIEF COMPLAINT
          </h2>
          <div className="text-center">
            <h2 className="p-2 ">
              The patient complain that his chest hurts when he breathes or
              cough, has difficulty in breathing, and always feeling really
              tired and weak
            </h2>
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
                      value={headToToeData.headNeck}
                      onChange={(e) => setHeadToToeData({...headToToeData, headNeck: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.headNeck.split('\n').map((line, index) => (
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
                      value={headToToeData.chestLungs}
                      onChange={(e) => setHeadToToeData({...headToToeData, chestLungs: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.chestLungs.split('\n').map((line, index) => (
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
                      value={headToToeData.cardiovascular}
                      onChange={(e) => setHeadToToeData({...headToToeData, cardiovascular: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.cardiovascular.split('\n').map((line, index) => (
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
                      value={headToToeData.abdomen}
                      onChange={(e) => setHeadToToeData({...headToToeData, abdomen: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.abdomen.split('\n').map((line, index) => (
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
                      value={headToToeData.extremities}
                      onChange={(e) => setHeadToToeData({...headToToeData, extremities: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.extremities.split('\n').map((line, index) => (
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
                      value={headToToeData.neurological}
                      onChange={(e) => setHeadToToeData({...headToToeData, neurological: e.target.value})}
                      className="w-full p-1 border"
                    />
                  ) : (
                    headToToeData.neurological.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold bg-[#039383] text-white p-2 text-center mb-4">
              VITAL SIGNS:
            </h3>
            
            <div className="space-y-4 p-4">
              {/* Temperature */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-2  ">
                <div className="font-semibold">Temperature:</div>
                {isEditing ? (
                  <input
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;