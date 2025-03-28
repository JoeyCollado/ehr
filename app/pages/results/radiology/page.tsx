"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Option 1");
  const [imageSrc, setImageSrc] = useState("/skeleton.png");
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
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white text-[#685442]">
      {/* Main Container */}
      <div className="bg-[#FAD2A5] shadow-lg w-[900px] h-[500px] flex border border-gray-500">
        
        {/* Left Side - Image */}
        <div className="w-[60%] flex flex-col items-center justify-center bg-white">
          <div className="w-[90%] h-[60%] bg-white shadow-lg flex items-center justify-center">
            {imageSrc ? (
              <Image alt="X-ray Image" src={imageSrc} width={400} height={300} className="w-full h-auto" />
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
        <div className="w-[40%] bg-[#00695C] p-6 flex flex-col justify-between border-l border-gray-500">
          
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
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
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
  );
};

export default Page;
