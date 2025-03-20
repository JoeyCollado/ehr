import { useState, useEffect } from "react";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const STORAGE_KEY = "vitalSignsData";

const defaultDates = ["2/14/2024", "2/15/2024", "2/16/2024"];

const defaultData = [
  { label: "Time Taken", values: [10, "", 2, 6, 10, "", 2, 6, 10, "", 2, 6] },
  {
    label: "BP",
    values: ["95/56", "90/60", "90/50", "", "", "", "", "", "", "", "", ""],
  },
  {
    label: "Temp",
    values: [40.7, 38, 37.5, "", "", "", "", "", "", "", "", ""],
  },
  {
    label: "Temp route",
    values: [
      "Axillary",
      "Axillary",
      "Axillary",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  { label: "PR", values: [185, 180, 175, "", "", "", "", "", "", "", "", ""] },
  { label: "RR", values: [24, 25, 24, "", "", "", "", "", "", "", "", ""] },
  {
    label: "SPO2",
    values: ["99%", "99%", "99%", "", "", "", "", "", "", "", "", ""],
  },
  {
    label: "Pain Scale",
    values: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
];

const VitalSheetTable = () => {
  const [dates, setDates] = useState(defaultDates);
  const [data, setData] = useState(defaultData);
  const [editedData, setEditedData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedDates = localStorage.getItem("vitalSignsDates");

      if (savedData) {
        setData(JSON.parse(savedData));
        setEditedData(JSON.parse(savedData));
      }

      if (savedDates) {
        setDates(JSON.parse(savedDates));
      }
    }
  }, []);

  const deleteDate = (index: number) => {
    if (!window.confirm(`Are you sure you want to delete ${dates[index]}?`))
      return;

    const updatedDates = [...dates];
    updatedDates.splice(index, 1);

    const updatedData = editedData.map((row) => {
      const newValues = [...row.values];
      newValues.splice(index * 4, 4); // Remove 4 shift values (AM, PM, NIGHT, PRN)
      return { ...row, values: newValues };
    });

    setDates(updatedDates);
    setEditedData(updatedData);

    localStorage.setItem("vitalSignsDates", JSON.stringify(updatedDates));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const handleChange = (
    rowIndex: number,
    colIndex: number,
    value: string | number
  ) => {
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        values: [...newData[rowIndex].values],
      };
      newData[rowIndex].values[colIndex] = value;
      return newData;
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      setData([...editedData]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editedData));
      localStorage.setItem("vitalSignsDates", JSON.stringify(dates));
    } else {
      setEditedData([...data]);
    }
    setIsEditing(!isEditing);
  };

  const addDate = () => {
    const newDate = prompt("Enter new date (MM/DD/YYYY):");
    if (newDate) {
      const updatedDates = [...dates, newDate];
      setDates(updatedDates);
      localStorage.setItem("vitalSignsDates", JSON.stringify(updatedDates));

      const updatedData = editedData.map((row) => ({
        ...row,
        values: [...row.values, "", "", "", ""], // 4 new empty values per shift (AM, PM, NIGHT, PRN)
      }));

      setData(updatedData);
      setEditedData(updatedData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    }
  };

  if (!data) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="w-full overflow-x-auto p-4">
      {/* Edit/Add Buttons */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={toggleEdit}
          className="cursor-pointer flex items-center bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          <PencilSquareIcon className="h-5 w-5 mr-1" />{" "}
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <button
          onClick={addDate}
          className="cursor-pointer flex items-center bg-green-500 text-white px-3 py-1 rounded-md"
        >
          <PlusCircleIcon className="h-5 w-5 mr-1" /> Add Date
        </button>
      </div>

      {/* Title - Fixed Above Table */}
      <div className="w-full bg-green-700 text-white text-4xl font-bold text-center p-4">
        VITAL SIGNS SHEET
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full min-w-max border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-white shadow-md z-10">
            {/* Date Row */}
            <tr className="bg-yellow-200 text-gray-900 z-0">
              <th className="border border-gray-300 p-2 text-start">Date:</th>
              {dates.map((date, index) => (
                <th
                  key={index}
                  colSpan={4}
                  className="border border-gray-300 p-2 relative"
                >
                  {date}
                  {isEditing && (
                    <button
                      onClick={() => deleteDate(index)}
                      className="text-red-600 text-xs ml-2"
                    >
                      ❌
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 font-bold">
                  {row.label}
                </td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-2 text-center"
                  >
                    {isEditing ? (
                      <input
                        alt="input"
                        placeholder="null"
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleChange(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full text-center bg-transparent border border-gray-300 focus:ring-0 outline-none"
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Changes Button */}
      {isEditing && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={toggleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default VitalSheetTable;
