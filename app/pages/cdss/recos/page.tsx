"use client"
import React from 'react'
import { useState, useEffect } from 'react';

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    sections: [
      {
        title: "A. Oxygen Therapy:",
        items: [""]
      },
      {
        title: "B. Fluid Management",
        items: [""]
      },
      {
        title: "C. Pain Management",
        items: [""]
      },
      {
        title: "D. Fever Management",
        items: [""]
      },
      {
        title: "E. Discharge Criteria",
        items: [""]
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