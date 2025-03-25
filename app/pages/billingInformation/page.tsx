"use client";
import React, { useState, useEffect } from "react";

const Page = () => {

  const initialData = { //localstorage
    patientName: "",
    patientContact: "",
    patientAddress: "",
    physicianName: "",
    physicianContact: "",
    physicianAddress: "",
    invoiceNumber: "INV12245",
    date: "21/03/2025",
    dueDate: "20/04/2025",
    amountDue: "Info",
    item1: "Info",
    description1: "Info",
    amount1: "Info",
    item2: "Info",
    description2: "Info",
    amount2: "Info",
    notes: "Info",
    total: "Info",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData) //localstorage(1)
  const [hasMounted, setHasMounted] = useState(false);

  // Load data from localStorage after mount 
  useEffect(() => { //localstorage(2)
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setHasMounted(true);
  }, []);

    // Save data to localStorage
    useEffect(() => { //localstorage(3)
      if (hasMounted && !isEditing) {
        localStorage.setItem("invoiceData", JSON.stringify(formData));
      }
    }, [isEditing, formData, hasMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //localstorage (4)
  if (!hasMounted) return null;

  return (
    <div className="h-screen flex items-center justify-center bg-[#ffffff] text-[#3A2B22]">
      <button
        className="bg-blue-500 rounded-md text-white px-2 py-1 absolute top-10 cursor-pointer"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="border-2 border-[#3A2B22] p-6 w-[80%] max-w-4xl bg-[#ffffff]">
        <h1 className="text-2xl font-bold text-center mb-6">Medical Billing Invoice</h1>

        <div className="grid grid-cols-2 gap-6 border-b-2 border-[#3A2B22] pb-4 mb-4">
          <div className="">
            <h2 className="font-semibold ">Patient Information</h2>
            <p className="italic font-bold">A.J.S</p>
            {isEditing ? (
              <input
                className="border w-full p-1"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
              
              />
            ) : (
              <p className="italic">{formData.patientName}</p>
            )}
            <p className="italic font-bold">Contact Number</p>
            {isEditing ? (
              <input className="border w-full p-1" name="patientContact" value={formData.patientContact} onChange={handleChange} />
            ) : (
              <p className="italic">{formData.patientContact}</p>
            )}
            <p className="italic font-bold">Address</p>
            {isEditing ? (
              <input className="border w-full p-1" name="patientAddress" value={formData.patientAddress} onChange={handleChange} />
            ) : (
              <p className="italic">{formData.patientAddress}</p>
            )}
          </div>

          <div>
            <h2 className="font-semibold">Prescribing Physician Information</h2>
            <p className="italic font-bold">Name</p>
            {isEditing ? (
              <input className="border w-full p-1" name="physicianName" value={formData.physicianName} onChange={handleChange} />
            ) : (
              <p className="italic">{formData.physicianName}</p>
            )}
            <p className="italic font-bold">Contact Number</p>
            {isEditing ? (
              <input className="border w-full p-1" name="physicianContact" value={formData.physicianContact} onChange={handleChange} />
            ) : (
              <p className="italic">{formData.physicianContact}</p>
            )}
            <p className="italic font-bold">Address</p>
            {isEditing ? (
              <input className="border w-full p-1" name="physicianAddress" value={formData.physicianAddress} onChange={handleChange} />
            ) : (
              <p className="italic">{formData.physicianAddress}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 text-center font-semibold border-b-2 border-[#3A2B22] pb-2 mb-4">
          <div>INVOICE NUMBER</div>
          <div>DATE</div>
          <div>INVOICE DUE DATE</div>
          <div>AMOUNT DUE</div>
          {["invoiceNumber", "date", "dueDate", "amountDue"].map((field, index) => (
            isEditing ? (
              <input key={index} type="text" name={field} value={formData[field]} onChange={handleChange} className="italic col-span-1 border p-1 w-full text-center" />
            ) : (
              <div key={index} className="italic col-span-1">{formData[field]}</div>
            )
          ))}
        </div>

        <div className="border-2 border-[#3A2B22] mb-4">
          <div className="grid grid-cols-3 text-center font-semibold border-b-2 border-[#3A2B22] p-2">
            <div>ITEM</div>
            <div>DESCRIPTION</div>
            <div>AMOUNT</div>
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="grid grid-cols-3 text-center italic p-2">
              {[`item${i}`, `description${i}`, `amount${i}`].map((field, idx) => (
                isEditing ? (
                  <input key={idx} type="text" name={field} value={formData[field]} onChange={handleChange} className="italic border p-1 w-full text-center" />
                ) : (
                  <div key={idx}>{formData[field]}</div>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h2 className="font-semibold">Notes</h2>
            {isEditing ? (
              <input type="text" name="notes" value={formData.notes} onChange={handleChange} className="italic border p-1 w-full" />
            ) : (
              <p className="italic">{formData.notes}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="font-semibold">Total</h2>
            {isEditing ? (
              <input  type="text" name="total" value={formData.total} onChange={handleChange} className="italic border p-1 w-full" />
            ) : (
              <p className="italic">{formData.total}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
