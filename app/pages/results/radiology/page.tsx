"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Option 1");
  const [imageSrc, setImageSrc] = useState("");
  const [tempData, setTempData] = useState({ name: "", description: "", type: "", imageSrc: "" });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("name") || "";
    const savedDescription = localStorage.getItem("description") || "";
    const savedType = localStorage.getItem("type") || "Option 1";
    const savedImage = localStorage.getItem("imageSrc") || "/skeleton.png";

    setName(savedName);
    setDescription(savedDescription);
    setType(savedType);
    setImageSrc(savedImage);
    setTempData({ name: savedName, description: savedDescription, type: savedType, imageSrc: savedImage });
  }, []);

  // Handles entering edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ name, description, type, imageSrc });
  };

  // Handles canceling edits
  const handleCancel = () => {
    setIsEditing(false);
    setName(tempData.name);
    setDescription(tempData.description);
    setType(tempData.type);
    setImageSrc(tempData.imageSrc);
  };

  // Handles saving changes
  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("type", type);
    localStorage.setItem("imageSrc", imageSrc);
    setIsEditing(false);
  };

  // Handles deleting the image
  const handleDelete = () => {
    setImageSrc("");
    localStorage.setItem("imageSrc", "");
  };

  // Handles image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string; // The base64 string of the image
        setImageSrc(base64Image);
        localStorage.setItem("imageSrc", base64Image); // Save base64 image to localStorage
      };

      reader.readAsDataURL(file); // Convert image file to base64 string
    }
  };

  return (
    <>
      <motion.div  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
    <div className="h-screen flex items-center justify-center bg-[#faf6f6] text-[#685442] ">
      {/* Main Container */}
      <div className=" shadow-lg w-[900px] h-[500px] flex ">
        
        {/* Left Side - Image */}
        <div className="w-[60%] flex flex-col items-center justify-center bg-white rounded-l-lg">
          <div className="w-[90%] h-[60%] bg-white shadow-lg flex items-center justify-center">
            {imageSrc ? (
              <Image alt="Uploaded Image" src={imageSrc} width={400} height={300} className="w-full h-auto border-1 rounded-md" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">No Image</div>
            )}
          </div>
          {isEditing && (
            <label className="mt-4 bg-[#00695C] text-white px-4 py-2 cursor-pointer">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        {/* Right Side - Form */}
        <div className="w-[40%] bg-[#00695C] p-6 flex flex-col justify-between rounded-r-lg">
          
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block font-semibold text-white">Name:</label>
              <input 
                type="text"
                className="w-full border border-gray-500 p-2 bg-white outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="null"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block font-semibold text-white">Description:</label>
              <textarea
                className="w-full border border-gray-500 p-2 bg-white outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isEditing}
                title="Description"
              />
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block font-semibold text-white">Type:</label>
              <select
                className="w-full border border-gray-500 p-2 bg-white outline-none"
                value={type}
                title="Type"
                disabled={!isEditing}
              >
                <option>MRI</option>
                <option>CT scan</option>
                <option>Chest X ray</option>
                <option>Chest x ray (lateral view)</option>
                <option>Chest x-ray (PA)</option>
                <option>CT scan - Chest</option>
                <option>Lung ultrasound</option>
                <option>Fluoroscopy</option>
                <option>Mammography</option>
                <option>Ultrasound</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center text-white font-semibold">
            {!isEditing ? (
              <button className="bg-white text-[#00695C] px-4 py-2 font-bold" onClick={handleEdit}>
                Edit
              </button>
            ) : (
              <>
                <button className="mx-2 hover:underline" onClick={handleSave}>Save</button> /
                <button className="mx-2 hover:underline" onClick={handleDelete}>Delete</button> /
                <button className="mx-2 hover:underline" onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default Page;
