"use client";
import React, { useState, useEffect } from "react";

interface FormData { //safety measure
  patientName: string;
  patientContact: string;
  patientAddress: string;
  physicianName: string;
  physicianContact: string;
  physicianAddress: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amountDue: string;
  item1: string;
  description1: string;
  amount1: string;
  item2: string;
  description2: string;
  amount2: string;
  notes: string;
  total: string;
}

const Page = () => {
  const initialData: FormData = { //localstorage (1)
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
  const [formData, setFormData] = useState<FormData>(initialData); //localstorage(2)
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { //localstorage(3)
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setHasMounted(true);
  }, []);

  useEffect(() => { //localstorage(4)
    if (hasMounted && !isEditing) {
      localStorage.setItem("invoiceData", JSON.stringify(formData));
    }
  }, [isEditing, formData, hasMounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof FormData]: value,
    }));
  };

  if (!hasMounted) return null; //localstorage(5)

  return (
<div className="h-screen flex items-center justify-center bg-[#ffffff] text-[#3A2B22]  mb-[10%]">
      <button
        className="bg-blue-500 rounded-md text-white px-2 py-1 absolute top-10 cursor-pointer mt-[5%] "
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="border-2 border-[#3A2B22] p-6 max-w-5xl bg-[#ffffff] mt-[15%] shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Medical Billing Invoice</h1>
        <div className="grid grid-cols-2 gap-6 border-b-2 border-[#3A2B22] pb-4 relative">
        <div className="absolute h-[90%] border-l-2 border-[#3A2B22] "></div>        
  <div className="ml-[5%]">
    <h2 className="font-semibold">Patient Information</h2>
    <p className="italic font-bold">Name</p>
    {isEditing ? (    
      <input
        className="border w-full p-1" 
        name="patientName"
        value={formData.patientName}
        onChange={handleChange}
        aria-label="Patient Name"
      />
    ) : (
      <p className="italic">{formData.patientName}</p>
    )}
    <p className="italic font-bold">Contact Number</p>
    {isEditing ? (
      <input
        className="border w-full p-1"
        name="patientContact"
        value={formData.patientContact}
        onChange={handleChange}
        aria-label="Patient Contact"
      />
    ) : (
      <p className="italic">{formData.patientContact}</p>
    )}
    <p className="italic font-bold">Address</p>
    {isEditing ? (
      <input
        className="border w-full p-1"
        name="patientAddress"
        value={formData.patientAddress}
        onChange={handleChange}
        aria-label="Patient Address"
      />
    ) : (
      <p className="italic">{formData.patientAddress}</p>
    )}
  </div>

  {/* Vertical Divider */}
  <div className="absolute left-1/2 top-0 h-[90%] border-l-2 border-[#3A2B22] transform -translate-x-1/2"></div>

  <div className="ml-[5%]">
    <h2 className="font-semibold">Prescribing Physician Information</h2>
    <p className="italic font-bold">Name</p>
    {isEditing ? (
      <input
        className="border w-full p-1"
        name="physicianName"
        value={formData.physicianName}
        onChange={handleChange}
        aria-label="Physician Name"
      />
    ) : (
      <p className="italic">{formData.physicianName}</p>
    )}
    <p className="italic font-bold">Contact Number</p>
    {isEditing ? (
      <input
        className="border w-full p-1"
        name="physicianContact"
        value={formData.physicianContact}
        onChange={handleChange}
        aria-label="Physician Contact"
      />
    ) : (
      <p className="italic">{formData.physicianContact}</p>
    )}
    <p className="italic font-bold">Address</p>
    {isEditing ? (
      <input
        className="border w-full p-1"
        name="physicianAddress"
        value={formData.physicianAddress}
        onChange={handleChange}
        aria-label="Physician Address"
      />
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
              <input
                key={index}
                type="text"
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="italic col-span-1 border p-1 w-full text-center"
                aria-label={field.replace(/([A-Z])/g, ' $1').trim()}
                
              />
            ) : (
              <div key={index} className="italic col-span-1">{formData[field as keyof FormData]}</div>
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
                  <input
                    key={idx}
                    type="text"
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    className="italic border p-1 w-full text-center"
                    aria-label={`${field.replace(/(\d)/, ' $1')}`}
                  />
                ) : (
                  <div key={idx}>{formData[field as keyof FormData]}</div>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h2 className="font-semibold">Notes</h2>
            {isEditing ? (
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="italic border p-1 w-full"
                aria-label="Notes"
              />
            ) : (
              <p className="italic">{formData.notes}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="font-semibold">Total</h2>
            {isEditing ? (
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className="italic border p-1 w-full"
                aria-label="Total"
              />
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