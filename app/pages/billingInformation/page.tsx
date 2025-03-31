"use client";
import React, { useState, useEffect } from "react";

interface Item {
  id: string;
  item: string;
  description: string;
  amount: string;
}

interface FormData {
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
  items: Item[];
  notes: string;
  total: string;
}

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type FormDataStringKeys = StringKeys<FormData>;

const Page = () => {
  const initialData: FormData = {
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
    items: [
      { id: "1", item: "Info", description: "Info", amount: "0" },
      { id: "2", item: "Info", description: "Info", amount: "0" }
    ],
    notes: "Info",
    total: "0",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      // Merge with initial data to ensure all fields exist
      setFormData({ ...initialData, ...JSON.parse(savedData) });
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isEditing) {
      localStorage.setItem("invoiceData", JSON.stringify(formData));
    }
  }, [isEditing, formData, hasMounted]);

  useEffect(() => {
    const total = formData.items.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0;
      return acc + amount;
    }, 0);
    setFormData(prev => ({ ...prev, total: total.toFixed(2) }));
  }, [formData.items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as FormDataStringKeys]: value,
    }));
  };

  const handleItemChange = (id: string, field: keyof Item, value: string) => {
    const newItems = formData.items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      item: "",
      description: "",
      amount: "0"
    };
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const deleteItem = (id: string) => {
    const newItems = formData.items.filter(item => item.id !== id);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f6] text-[#3A2B22] mb-[10%]">
      <button
        className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform rounded-md text-white px-4 py-1 absolute top-10 cursor-pointer mt-[5%]"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="rounded-lg p-6 w-[80%] max-w-[60rem] bg-[#ffffff] mt-[15%] shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Medical Billing Invoice</h1>

        <div className="grid grid-cols-2 gap-6 border-b-2 border-[#3A2B22] pb-4 relative">
          <div className="ml-[5%]">
            <h2 className="font-semibold">Patient Information</h2>
            {["patientName", "patientContact", "patientAddress"].map((field) => (
              <div key={field}>
                <p className="italic font-bold">{field.replace("patient", "").trim()}</p>
                {isEditing ? (
                  <input
                    className="border w-full p-1"
                    name={field}
                    value={formData[field as FormDataStringKeys]}
                    onChange={handleChange}
                    title="patient"
                  />
                ) : (
                  <p className="italic">{formData[field as FormDataStringKeys]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="ml-[5%]">
            <h2 className="font-semibold">Prescribing Physician Information</h2>
            {["physicianName", "physicianContact", "physicianAddress"].map((field) => (
              <div key={field}>
                <p className="italic font-bold">{field.replace("physician", "").trim()}</p>
                {isEditing ? (
                  <input
                    className="border w-full p-1"
                    name={field}
                    value={formData[field as FormDataStringKeys]}
                    onChange={handleChange}
                    title="physician"
                  />
                ) : (
                  <p className="italic">{formData[field as FormDataStringKeys]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 text-center font-semibold border-b-2 border-[#3A2B22] pb-2 mb-4">
          {["INVOICE NUMBER", "DATE", "INVOICE DUE DATE", "AMOUNT DUE"].map((label) => (
            <div key={label}>{label}</div>
          ))}
          {["invoiceNumber", "date", "dueDate", "amountDue"].map((field) => (
            isEditing ? (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field as FormDataStringKeys]}
                onChange={handleChange}
                className="italic border p-1 w-full text-center"
                title="date"
              />
            ) : (
              <div key={field} className="italic">{formData[field as FormDataStringKeys]}</div>
            )
          ))}
        </div>

        <div className="border-2 border-[#3A2B22] mb-4">
          <div className="grid grid-cols-3 text-center font-semibold border-b-2 border-[#3A2B22] p-2">
            {["ITEM", "DESCRIPTION", "AMOUNT"].map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>
          {formData.items?.map((item) => (
            <div key={item.id} className="grid grid-cols-3 text-center italic p-2 relative group">
              {isEditing && (
                <button
                  className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 text-red-500 hover:text-red-700"
                  onClick={() => deleteItem(item.id)}
                >
                  ×
                </button>
              )}
              {(["item", "description", "amount"] as const).map((field) => (
                isEditing ? (
                  <input
                    key={field}
                    type={field === 'amount' ? 'number' : 'text'}
                    value={item[field]}
                    onChange={(e) => handleItemChange(item.id, field, e.target.value)}
                    className="italic border p-1 w-full text-center"
                    title="amount"
                  />
                ) : (
                  <div key={field}>{item[field]}</div>
                )
              ))}
            </div>
          ))}
          {isEditing && (
            <button
              className="w-full p-2 text-blue-500 hover:text-blue-700"
              onClick={addItem}
            >
              + Add Item
            </button>
          )}
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
                title="notes"
              />
            ) : (
              <p className="italic">{formData.notes}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="font-semibold">Total</h2>
            <p className="italic">₱{formData.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;