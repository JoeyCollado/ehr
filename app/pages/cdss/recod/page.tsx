"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  };

  const buttonTap = {
    scale: 0.95
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen"
    >
      <div className="flex justify-center mt-8">
        {isEditing ? (
          <motion.div className="flex gap-4">
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 cursor-pointer shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Changes
            </motion.button>
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 cursor-pointer shadow-md"
            >
              Cancel
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 cursor-pointer shadow-lg font-medium text-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Recommendations
          </motion.button>
        )}
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center py-12">
        <div className="w-full max-w-5xl bg-white text-gray-800 shadow-xl rounded-xl p-8 mx-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-4xl mb-12 text-center text-blue-600 drop-shadow-md"
          >
            Diagnostic Recommendations
          </motion.h1>

          <AnimatePresence>
            <div className="space-y-12">
              {content.sections.map((section, sectionIndex) => (
                <motion.section
                  key={sectionIndex}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="font-bold text-2xl mb-4 text-gray-700 border-l-4 border-blue-500 pl-4">
                    {section.title}
                  </h2>
                  
                  <ul className="space-y-3">
                    <AnimatePresence>
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="group relative px-4 py-3 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex gap-3 items-start">
                            {isEditing ? (
                              <>
                                <textarea
                                  value={item}
                                  onChange={(e) => handleContentChange(sectionIndex, itemIndex, e.target.value)}
                                  className="w-full border-2 border-blue-200 rounded-lg p-3 min-h-[80px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  placeholder="Enter recommendation..."
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteItem(sectionIndex, itemIndex)}
                                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 cursor-pointer"
                                  disabled={section.items.length <= 1}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </motion.button>
                              </>
                            ) : (
                              <div 
                                className="prose max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{ __html: item || "&nbsp;" }} 
                              />
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>

                    {isEditing && (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 pt-4"
                      >
                        <motion.button
                          whileHover={buttonHover}
                          whileTap={buttonTap}
                          onClick={() => addNewItem(sectionIndex)}
                          className="w-full bg-blue-100 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-200 font-medium flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Add New Recommendation
                        </motion.button>
                      </motion.li>
                    )}
                  </ul>
                </motion.section>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default Page