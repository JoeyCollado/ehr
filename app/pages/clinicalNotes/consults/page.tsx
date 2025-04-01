import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-[#faf6f6] text-[#3A2B22] flex flex-col items-center p-6 shadow-lg ">
        <table>
          <thead>
            <tr className="border">
              <th className="border px-2">Consult Report ID</th>
              <th className="border px-2">Patient ID</th>
              <th className="border px-2">Consulting Provider</th>
              <th className="border px-2">Findings</th>
              <th className="border px-2">Recomendations</th>
              <th className="border px-2">Report Date</th>
              <th className="border px-2">Follow-Up Actions</th>
            </tr>

            <tr className="border">
                <td className="border">98768</td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
            </tr>

            <tr className="border">
                <td className="border">98768</td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
            </tr>

            <tr className="border">
                <td className="border">98768</td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default page;
