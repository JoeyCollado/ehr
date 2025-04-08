"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    sections: [
      {
        title: "A. Oxygen Therapy",
        items: [
          "If the child's oxygen saturation is below 92%, oxygen therapy should be started to **maintain SpO2 ≤ 92%**. Supplemental oxygen via nasal cannula or mask is usually sufficient, but if the child becomes severely hypoxic, consider non-invasive ventilation (e.g., CPAP/BPAP)."
        ]
      },
      {
        title: "B. Fluid Management",
        items: [
          "**Hydration:** Ensure the child is adequately hydrated, particularly if they have fever and increased respiratory effort.",
          "Oral fluids are generally adequate unless the child is unable to drink due to fatigue or respiratory distress.",
          "IV fluids may be required if dehydration is noted, especially in children who have significant respiratory distress or fever."
        ]
      },
      {
        title: "C. Pain Management",
        items: [
          "**Analgesics:** For pleuritic chest pain, acetaminophen or ibuprofen can be used to reduce fever and provide comfort.",
          "For severe pain, especially if there is lung involvement or pleural effusion, stronger analgesics (e.g., opioids) may be considered."
        ]
      },
      {
        title: "D. Fever Management",
        items: [
          "**Antipyretics:** If the **fever is high (above 102°F or 38.9°C)** and causing discomfort, acetaminophen or ibuprofen should be administered.",
          "Close monitoring for fever-related dehydration is essential."
        ]
      },
      {
        title: "E. Discharge Criteria",
        items: [
          "The child may be discharged once they are **afebrile for 48-72 hours**, show clinical improvement, and can maintain oxygen saturation on room air.",
          "Follow-up should include a visit with a pediatric infectious disease specialist for long-term management and to discuss further antifungal treatment for more severe infections.",
          "Avoid Exposure: Advise the child's caregivers to limit exposure to areas where fungal infections are endemic (e.g., bat caves, bird droppings).",
          "Vaccination: Make sure the child is up-to-date with all routine vaccinations, though vaccines are not available for most fungi."
        ]
      }
    ]
  });

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('scRecommendations');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('scRecommendations', JSON.stringify(content));
    setIsEditing(false);
  };

  const handleContentChange = (sectionIndex, itemIndex, newValue) => {
    const updatedContent = { ...content };
    updatedContent.sections[sectionIndex].items[itemIndex] = newValue;
    setContent(updatedContent);
  };

  const addNewItem = (sectionIndex) => {
    const updatedContent = { ...content };
    updatedContent.sections[sectionIndex].items.push("");
    setContent(updatedContent);
  };

  const deleteItem = (sectionIndex, itemIndex) => {
    const updatedContent = { ...content };
    updatedContent.sections[sectionIndex].items.splice(itemIndex, 1);
    setContent(updatedContent);
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
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 cursor-pointer mb-4"
            >
              Cancel
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
      <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
        <div className="w-full max-w-5xl bg-[#efefef] text-black shadow-lg rounded-lg p-6">
          <h1 className="font-bold text-4xl mb-10 bg-white rounded-md w-full py-2 text-center mt-5">
          Supportive Care Recommendations
          </h1>

          <div className="space-y-10">
            {content.sections.map((section, sectionIndex) => (
              <section key={sectionIndex}>
                <h2 className="font-bold text-2xl mb-3 ml-4">{section.title}</h2>
                <ul className="list-disc pl-6 space-y-2 bg-white rounded-md py-5">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="px-4 py-1 flex gap-2 items-start">
                      {isEditing ? (
                        <>
                          <textarea
                          title='section'
                            value={item}
                            onChange={(e) => handleContentChange(sectionIndex, itemIndex, e.target.value)}
                            className="w-full border border-blue-500 rounded p-2 min-h-[50px]"
                          />
                          <button
                            onClick={() => deleteItem(sectionIndex, itemIndex)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer ml-2"
                            disabled={section.items.length <= 1}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: item || "&nbsp;" }} />
                      )}
                    </li>
                  ))}
                  {isEditing && (
                    <li className="px-4 py-1">
                      <button
                        onClick={() => addNewItem(sectionIndex)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                      >
                        Add New Item
                      </button>
                    </li>
                  )}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
    </>
  )
}

export default Page