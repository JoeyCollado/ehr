const VitalSheetTable = () => {
    return (
      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-700 text-white text-lg">
              <th colSpan={14} className="p-3 text-center">VITAL SIGNS SHEET</th>
            </tr>
            <tr className="bg-yellow-200 text-gray-900">
              <th className="border border-gray-300 p-2">Date:</th>
              {["2/14/2024", "2/15/2024", "2/16/2024"].map((date, index) => (
                <th key={index} colSpan={4} className="border border-gray-300 p-2">{date}</th>
              ))}
            </tr>
            <tr className="bg-gray-100 text-gray-900">
              <th className="border border-gray-300 p-2">Shift</th>
              {[...Array(3)].map((_, i) => (
                ["AM", "PM", "NIGHT", "PRN"].map((shift, j) => (
                  <th key={`${i}-${j}`} className="border border-gray-300 p-2">{shift}</th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Time Taken", values: [10, "", 2, 6, 10, "", 2, 6, 10, "", 2, 6] },
              { label: "BP", values: ["95/56", "90/60", "90/50", "", "", "", "", "", "", "", "", ""] },
              { label: "Temp", values: [40.7, 38, 37.5, "", "", "", "", "", "", "", "", ""] },
              { label: "Temp route", values: ["Axillary", "Axillary", "Axillary", "", "", "", "", "", "", "", "", ""] },
              { label: "PR", values: [185, 180, 175, "", "", "", "", "", "", "", "", ""] },
              { label: "RR", values: [24, 25, 24, "", "", "", "", "", "", "", "", ""] },
              { label: "SPO2", values: ["99%", "99%", "99%", "", "", "", "", "", "", "", "", ""] },
              { label: "Pain Scale", values: ["", "", "", "", "", "", "", "", "", "", "", ""] },
            ].map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 font-medium">{row.label}</td>
                {row.values.map((value, j) => (
                  <td key={j} className="border border-gray-300 p-2 text-center">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default VitalSheetTable;