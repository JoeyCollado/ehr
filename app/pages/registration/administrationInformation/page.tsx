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

  const handleSave = () => setIsEditing(false);

  return (
    <>
      <div className="flex justify-center mt-[5%]">
        {isEditing ? (
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer mb-4">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform text-white px-4 py-1 rounded cursor-pointer mb-4">
            Edit
          </button>
        )}
      </div>

      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
        <div className="w-full max-w-4xl bg-white text-black shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold bg-[#00695C] text-white p-2 text-center py-5 mb-4">
            CHIEF COMPLAINT
          </h2>
          <div className="text-center">
            <h2 className="p-2">
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
              <input className="border p-1" value={physicalData.height} 
              title="height"
                onChange={(e) => setPhysicalData({...physicalData, height: e.target.value})} />
            ) : (
              <div>{physicalData.height}</div>
            )}
            
            <div className="font-semibold">Weight:</div>
            {isEditing ? (
              <input className="border p-1" value={physicalData.weight} 
              title="weight"
                onChange={(e) => setPhysicalData({...physicalData, weight: e.target.value})} />
            ) : (
              <div>{physicalData.weight}</div>
            )}

            <div className="font-semibold">BMI:</div>
            {isEditing ? (
              <input className="border p-1" value={physicalData.bmi} 
              title="BMI"
                onChange={(e) => setPhysicalData({...physicalData, bmi: e.target.value})} />
            ) : (
              <div>{physicalData.bmi}</div>
            )}

            <div className="font-semibold">Arm Circumference:</div>
            {isEditing ? (
              <input className="border p-1" value={physicalData.armCircumference}
              title="Arm Circumference" 
                onChange={(e) => setPhysicalData({...physicalData, armCircumference: e.target.value})} />
            ) : (
              <div>{physicalData.armCircumference}</div>
            )}
          </div>

             {/* Weight Category Radio Buttons */}
             <div className="grid grid-cols-3 gap-4 mb-6 text-center p-2">
            {["Underweight", "Normal", "Overweight"].map((category) => (
              <label key={category} className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  name="weightCategory"
                  value={category}
                  checked={physicalData.weightCategory === category}
                  onChange={(e) => setPhysicalData({...physicalData, weightCategory: e.target.value})}
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
                    onChange={(e) => setSurveyData({...surveyData, overallAppearance: e.target.value})}
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
                    onChange={(e) => setSurveyData({...surveyData, skinCondition: e.target.value})}
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
                    onChange={(e) => setSurveyData({...surveyData, postureMobility: e.target.value})}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;