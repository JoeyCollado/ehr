"use client"
import React from 'react'
import { useState } from 'react';

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
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
        <h1 className="font-bold text-4xl  mb-10 bg-white rounded-md w-full py-2 text-center mt-5">Diagnostic Recommendations</h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-bold text-2xl mb-3 ml-4">A. Physical Examination:</h2>
            <ul className="list-disc pl-6 space-y-2 bg-white rounded-md py-5">
              <li><strong>Auscultation:</strong> Listen for crackles, rales, or wheezing, which can indicate consolidation or fluid in the lungs.</li>
              <li><strong>Percussion:</strong> Check for dullness (may indicate consolidation).</li>
              <li><strong>Oxygen saturation:</strong> Measure oxygen levels (SpO2) with a pulse oximeter. In pneumonia, SpO2 might be slightly decreased, indicating the need for oxygen supplementation.</li>
              <li><strong>Vitals:</strong> Measure heart rate, respiratory rate, blood pressure, and temperature.</li>
            </ul>
          </section>

          <hr className="my-4 border-gray-300" />
          <h2 className="font-bold text-2xl mb-3 ml-4">B. Appropriate Testing: Serum Fungal Antigen Testing</h2>
          <section className='list-disc pl-6 space-y-2 bg-white rounded-md py-5'>
         
            <p className="mb-3"><strong>Histoplasma Antigen (Urine or Serum):</strong> A positive result indicates an active infection, though false positives may occur in people with other infections.</p>
            <p className="mb-3"><strong>Coccidiolase Antigen (Urine or Serum):</strong> A positive result is diagnostic of Coccidioidomycosis.</p>
            <p className="mb-3"><strong>Blastomyces Antigen (Urine or Serum):</strong> Positive results indicate an active infection.</p>
            
            <p className="font-bold mt-4">Complete Blood Count (CRG) and inflammatory Markers:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Elevated WBC count may indicate an inflammatory response to the fungal infection.</li>
              <li>CRP and ESR: These markers can help assess the degree of inflammation, though they are nonspecific.</li>
            </ul>
          </section>

          <hr className="my-4 border-gray-300" />
          <h2 className="font-bold text-2xl mb-3 ml-4">C. Imaging</h2>
          <section className='list-disc pl-6 space-y-2 bg-white rounded-md py-5 mb-5'>
       
            <p className="mb-3">Imaging Follow-up: Repeat chest X-ray or CT scan after 7-10 days of antifungal therapy to assess for improvement in lung findings, particularly if there are concerns about complications like lung abscess or pleural effusion. Provide recommendations for imaging based on patient symptoms, such as chest X-ray or CT scan for patients with suspected severe pneumonia.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nodular infiltrates or cavitary lesions (especially with Histoplasma, Blastomyces, or Coccidioides).</li>
              <li>Lobar consolidation or interstitial infiltrates.</li>
              <li>In advanced cases, there may be pleural effusion or lung abscess.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}

export default page