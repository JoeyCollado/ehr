"use client"
import React from 'react'
import { useState, useEffect } from 'react';

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    sections: [
      {
        title: "A. Physical Examination:",
        items: [
          "**Auscultation**: Listen for crackles, rales, or wheezing, which can indicate consolidation or fluid in the lungs.",
          "**Percussion**: Check for dullness (may indicate consolidation).",
          "**Oxygen saturation**: Measure oxygen levels (SpO2) with a pulse oximeter. In pneumonia, SpO2 might be slightly decreased, indicating the need for oxygen supplementation.",
          "**Vitals**: Measure heart rate, respiratory rate, blood pressure, and temperature."
        ]
      },
      {
        title: "B. Appropriate Testing: Serum Fungal Antigen Testing",
        items: [
          "**Histoplasma Antigen (Urine or Serum)**: A positive result indicates an active infection, though false positives may occur in people with other infections.",
          "**Coccidioides Antigen (Urine or Serum)**: A positive result is diagnostic of Coccidioidomycosis.",
          "**Blastomyces Antigen (Urine or Serum)**: Positive results indicate an active infection.",
          "**Complete Blood Count (CBC) and Inflammatory Markers**:",
          "- Elevated WBC count may indicate an inflammatory response to the fungal infection.",
          "- CRP and ESR: These markers can help assess the degree of inflammation, though they are nonspecific."
        ]
      },
      {
        title: "C. Imaging",
        items: [
          "**Imaging Follow-up**: Repeat chest X-ray or CT scan after 7-10 days of antifungal therapy to assess for improvement in lung findings, particularly if there are concerns about complications like lung abscess or pleural effusion. Provide recommendations for imaging based on patient symptoms, such as chest X-ray or CT scan for patients with suspected severe pneumonia.",
          "- Nodular infiltrates or cavitary lesions (especially with Histoplasma, Blastomyces, or Coccidioides).",
          "- Lobar consolidation or interstitial infiltrates.",
          "- In advanced cases, there may be pleural effusion or lung abscess."
        ]
      }
    ]
  });

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('diagnosticRecommendations');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('diagnosticRecommendations', JSON.stringify(content));
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
            Diagnostic Recommendations
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
                          title='secition'
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
    </>
  )
}

export default Page