"use client"
import React, { useState, useEffect } from "react";

const Page = () => {
    // Initialize state with default values first
    const [isHydrated, setIsHydrated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("ALL");
    const [ageGroup, setAgeGroup] = useState("");
    const [gender, setGender] = useState("");
    const [toggles, setToggles] = useState({
        Fever: false,
        Chills: false,
        Cough: false,
        "Thick colored plegm": false,
        "Difficulty breathing": false,
        Nausea: false,
        "Shortness of breath": false,
    });
    const [optionalSymptoms, setOptionalSymptoms] = useState([
        { id: 1, name: "Mental confusion", value: "" },
        { id: 2, name: "Pale-colored skin", value: "" },
        { id: 3, name: "Grunts or rattles while breathing", value: "" },
        { id: 4, name: "Limp appearance", value: "" },
        { id: 5, name: "Less urine production", value: "" },
        { id: 6, name: "Fussiness", value: "" },
    ]);
    const [diagnosisData, setDiagnosisData] = useState([
        {
            id: 1,
            cues: "",
            diagnosis: "",
            analysis: "",
            goals: "",
            implementation: "",
            rationale: "",
            evaluation: ""
        }
    ]);
    const [diagnoses, setDiagnoses] = useState([
        {
            id: 1,
            name: "FUNGAL PNEUMONIA",
            description: "Fungal pneumonia is a non-contagious lung infection caused by fungal spores. It happens when the spores mix with the air and are inhaled, or when an inactive infection is reactivated.",
            category: "COMMON"
        },
        {
            id: 2,
            name: "ASTHMA",
            description: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath.",
            category: "COMMON"
        },
        {
            id: 3,
            name: "BRONCHITIS",
            description: "Bronchitis is an inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
            category: "COMMON"
        },
        {
            id: 4,
            name: "PULMONARY EMBOLISM",
            description: "A pulmonary embolism is a sudden blockage in a lung artery, usually due to a blood clot that traveled to the lung from a vein in the leg.",
            category: "RARE"
        }
    ]);
    const [newEntry, setNewEntry] = useState("");
    const [newDiagnosisName, setNewDiagnosisName] = useState('');
    const [newDiagnosisDescription, setNewDiagnosisDescription] = useState('');
    const [newDiagnosisCategory, setNewDiagnosisCategory] = useState('COMMON');

    // Load data from localStorage after component mounts
    useEffect(() => {
        setIsHydrated(true);
        const loadState = (key, defaultValue) => {
            try {
                const saved = localStorage.getItem(key);
                return saved ? JSON.parse(saved) : defaultValue;
            } catch (error) {
                console.error("Error loading from localStorage:", error);
                return defaultValue;
            }
        };

        setIsEditing(loadState('isEditing', false));
        setActiveTab(loadState('activeTab', "ALL"));
        setAgeGroup(loadState('ageGroup', ""));
        setGender(loadState('gender', ""));
        setToggles(loadState('toggles', {
            Fever: false,
            Chills: false,
            Cough: false,
            "Thick colored plegm": false,
            "Difficulty breathing": false,
            Nausea: false,
            "Shortness of breath": false,
        }));
        setOptionalSymptoms(loadState('optionalSymptoms', [
            { id: 1, name: "Mental confusion", value: "" },
            { id: 2, name: "Pale-colored skin", value: "" },
            { id: 3, name: "Grunts or rattles while breathing", value: "" },
            { id: 4, name: "Limp appearance", value: "" },
            { id: 5, name: "Less urine production", value: "" },
            { id: 6, name: "Fussiness", value: "" },
        ]));
        setDiagnosisData(loadState('diagnosisData', [
            {
                id: 1,
                cues: "",
                diagnosis: "",
                analysis: "",
                goals: "",
                implementation: "",
                rationale: "",
                evaluation: ""
            }
        ]));
        setDiagnoses(loadState('diagnoses', [
            {
                id: 1,
                name: "FUNGAL PNEUMONIA",
                description: "Fungal pneumonia is a non-contagious lung infection caused by fungal spores. It happens when the spores mix with the air and are inhaled, or when an inactive infection is reactivated.",
                category: "COMMON"
            },
            {
                id: 2,
                name: "ASTHMA",
                description: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath.",
                category: "COMMON"
            },
            {
                id: 3,
                name: "BRONCHITIS",
                description: "Bronchitis is an inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
                category: "COMMON"
            },
            {
                id: 4,
                name: "PULMONARY EMBOLISM",
                description: "A pulmonary embolism is a sudden blockage in a lung artery, usually due to a blood clot that traveled to the lung from a vein in the leg.",
                category: "RARE"
            }
        ]));
    }, []);

    // Save states to localStorage whenever they change
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('isEditing', JSON.stringify(isEditing));
    }, [isEditing, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('activeTab', JSON.stringify(activeTab));
    }, [activeTab, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('ageGroup', JSON.stringify(ageGroup));
    }, [ageGroup, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('gender', JSON.stringify(gender));
    }, [gender, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('toggles', JSON.stringify(toggles));
    }, [toggles, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('optionalSymptoms', JSON.stringify(optionalSymptoms));
    }, [optionalSymptoms, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('diagnosisData', JSON.stringify(diagnosisData));
    }, [diagnosisData, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
    }, [diagnoses, isHydrated]);

    const toggleValue = (symptom) => {
        const updatedToggles = {
            ...toggles,
            [symptom]: !toggles[symptom]
        };
        setToggles(updatedToggles);
    };

    const handleInputChange = (id, value) => {
        const updatedSymptoms = optionalSymptoms.map(item =>
            item.id === id ? { ...item, value } : item
        );
        setOptionalSymptoms(updatedSymptoms);
    };

    const handleDiagnosisChange = (id, field, value) => {
        const updatedData = diagnosisData.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setDiagnosisData(updatedData);
    };

    const addNewEntry = () => {
        if (newEntry.trim()) {
            const updatedSymptoms = [
                ...optionalSymptoms,
                {
                    id: Date.now(),
                    name: newEntry,
                    value: ""
                }
            ];
            setOptionalSymptoms(updatedSymptoms);
            setNewEntry("");
        }
    };

    const addNewDiagnosisRow = () => {
        const updatedData = [
            ...diagnosisData,
            {
                id: Date.now(),
                cues: "",
                diagnosis: "",
                analysis: "",
                goals: "",
                implementation: "",
                rationale: "",
                evaluation: ""
            }
        ];
        setDiagnosisData(updatedData);
    };

    const handleAddDiagnosis = () => {
        if (newDiagnosisName.trim() && newDiagnosisDescription.trim()) {
            const newDiagnosis = {
                id: Date.now(),
                name: newDiagnosisName,
                description: newDiagnosisDescription,
                category: newDiagnosisCategory
            };
            const updatedDiagnoses = [...diagnoses, newDiagnosis];
            setDiagnoses(updatedDiagnoses);
            setNewDiagnosisName('');
            setNewDiagnosisDescription('');
            setNewDiagnosisCategory('COMMON');
        }
    };

    const handleDeleteDiagnosis = (id) => {
        const updatedDiagnoses = diagnoses.filter(d => d.id !== id);
        setDiagnoses(updatedDiagnoses);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Data saved:", { toggles, optionalSymptoms, diagnosisData });
    };

    const filteredDiagnoses = activeTab === "ALL" 
        ? diagnoses 
        : diagnoses.filter(d => d.category === activeTab);

    const symptoms = [
        "Fever",
        "Chills",
        "Cough",
        "Thick colored plegm",
        "Difficulty breathing",
        "Nausea",
        "Shortness of breath"
    ];

    if (!isHydrated) {
        return <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <div className="flex justify-center mt-[5%]">
                {isEditing ? (
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer mb-4"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer mb-4"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#007bff] hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform text-white px-4 py-2 rounded cursor-pointer mb-4"
                    >
                        Edit
                    </button>
                )}
            </div>
    
            <div className="min-h-screen bg-[#faf6f6] flex items-center justify-center pb-4 mb-[5%]">
                <div className="w-full max-w-5xl bg-white text-black shadow-lg rounded-lg p-6">
                    <h1 className="font-bold text-3xl text-center mb-5">Diagnosis</h1>
                    
                    {/* Main Symptoms Table */}
                    <div className="mb-6 flex justify-between">
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">ENTER FINDING:</span>
                            <input 
                            title="enter finding"
                                type="text" 
                                className="border border-gray-300 rounded px-4 py-2 w-64" 
                                disabled={!isEditing}
                            />
                        </div>
                        <button 
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                            disabled={!isEditing}
                        >
                            START OVER
                        </button>
                    </div>

                    <div className="flex mb-6">
                        <div className="w-1/2 pr-2">
                            <label className="block font-semibold mb-1">AGE GROUP:</label>
                            <select 
                            title="age group"
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                disabled={!isEditing}
                                value={ageGroup}
                                onChange={(e) => setAgeGroup(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="child">Child</option>
                                <option value="adult">Adult</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block font-semibold mb-1">GENDER:</label>
                            <select 
                            title="gender"
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                disabled={!isEditing}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        {symptoms.map((symptom) => (
                            <div key={symptom} className="flex items-center justify-between border border-gray-300 rounded p-4">
                                <span className="font-medium">{symptom}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                    title="symptom"
                                        type="checkbox" 
                                        checked={toggles[symptom]} 
                                        onChange={() => toggleValue(symptom)}
                                        className="sr-only peer" 
                                        disabled={!isEditing}
                                    />
                                    <div className={`w-11 h-6 rounded-full peer ${isEditing ? 'bg-gray-200 peer-checked:bg-blue-500' : 'bg-gray-100 peer-checked:bg-gray-400'} peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Optional Symptoms Table */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Are these present? <span className="text-gray-500">*Optional</span></h3>
                        <div className="space-y-4">
                            {optionalSymptoms.map((symptom) => (
                                <div key={symptom.id} className="flex items-center justify-between border border-gray-300 rounded p-4">
                                    <span className="font-medium">{symptom.name}</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={symptom.value}
                                            onChange={(e) => handleInputChange(symptom.id, e.target.value)}
                                            className="border border-gray-300 rounded px-4 py-2 w-48"
                                            placeholder="Enter details"
                                        />
                                    ) : (
                                        <span className="px-4 py-2 w-48 text-gray-700">
                                            {symptom.value || "Not specified"}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {isEditing && (
                            <div className="flex items-center mt-6">
                                <input
                                    type="text"
                                    value={newEntry}
                                    onChange={(e) => setNewEntry(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 flex-grow mr-4"
                                    placeholder="Enter new symptom name"
                                />
                                <button
                                    onClick={addNewEntry}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                                >
                                    Add Entry
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Diagnosis Finder Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">FIND DIAGNOSIS</h3>
                        <div className="flex space-x-2 mb-4">
                            <button
                                onClick={() => setActiveTab("ALL")}
                                className={`px-4 py-2 rounded ${activeTab === "ALL" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                ALL
                            </button>
                            <button
                                onClick={() => setActiveTab("COMMON")}
                                className={`px-4 py-2 rounded ${activeTab === "COMMON" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                COMMON
                            </button>
                            <button
                                onClick={() => setActiveTab("RARE")}
                                className={`px-4 py-2 rounded ${activeTab === "RARE" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                RARE
                            </button>
                        </div>

                        {/* Add Diagnosis Form (only in edit mode) */}
                        {isEditing && (
                            <div className="mb-6 space-y-4 p-4 border rounded-lg">
                                <h4 className="font-semibold">Add New Diagnosis</h4>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newDiagnosisName}
                                        onChange={(e) => setNewDiagnosisName(e.target.value)}
                                        placeholder="Diagnosis Name"
                                        className="border rounded px-2 py-1 flex-1"
                                    />
                                    <select
                                    title="category"
                                        value={newDiagnosisCategory}
                                        onChange={(e) => setNewDiagnosisCategory(e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="COMMON">Common</option>
                                        <option value="RARE">Rare</option>
                                    </select>
                                </div>
                                <textarea
                                    value={newDiagnosisDescription}
                                    onChange={(e) => setNewDiagnosisDescription(e.target.value)}
                                    placeholder="Description"
                                    className="border rounded px-2 py-1 w-full"
                                />
                                <button
                                    onClick={handleAddDiagnosis}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Diagnosis
                                </button>
                            </div>
                        )}

                        {/* Diagnoses List */}
                        <div className="space-y-4">
                            {filteredDiagnoses.map((diagnosis) => (
                                <div key={diagnosis.id} className="border border-gray-300 rounded p-4 relative">
                                    {isEditing && (
                                        <button
                                            onClick={() => handleDeleteDiagnosis(diagnosis.id)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <h4 className="font-bold text-lg mb-2">{diagnosis.name}</h4>
                                    <p className="text-gray-700">{diagnosis.description}</p>
                                    <span className={`text-sm ${diagnosis.category === 'COMMON' ? 'text-green-600' : 'text-blue-600'}`}>
                                        {diagnosis.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comprehensive Diagnosis Table */}
                    <div className="mt-12">
                        <h3 className="text-lg font-semibold mb-4">Nursing Care Plan</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">Cues</th>
                                        <th className="border border-gray-300 px-4 py-2">Diagnosis</th>
                                        <th className="border border-gray-300 px-4 py-2">Analysis</th>
                                        <th className="border border-gray-300 px-4 py-2">Goals and Objectives</th>
                                        <th className="border border-gray-300 px-4 py-2">Implementation</th>
                                        <th className="border border-gray-300 px-4 py-2">Rationale</th>
                                        <th className="border border-gray-300 px-4 py-2">Evaluation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diagnosisData.map((row) => (
                                        <tr key={row.id}>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="cues"
                                                        type="text"
                                                        value={row.cues}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'cues', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.cues || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="diagnosis"
                                                        type="text"
                                                        value={row.diagnosis}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'diagnosis', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.diagnosis || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="analysis"
                                                        type="text"
                                                        value={row.analysis}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'analysis', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.analysis || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="goals"
                                                        type="text"
                                                        value={row.goals}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'goals', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.goals || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="implementation"
                                                        type="text"
                                                        value={row.implementation}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'implementation', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.implementation || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="rationale"
                                                        type="text"
                                                        value={row.rationale}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'rationale', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.rationale || "-"}</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                    title="evaluation"
                                                        type="text"
                                                        value={row.evaluation}
                                                        onChange={(e) => handleDiagnosisChange(row.id, 'evaluation', e.target.value)}
                                                        className="w-full border-none focus:ring-0 px-2 py-1"
                                                    />
                                                ) : (
                                                    <span>{row.evaluation || "-"}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {isEditing && (
                            <button
                                onClick={addNewDiagnosisRow}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Add New Row
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;