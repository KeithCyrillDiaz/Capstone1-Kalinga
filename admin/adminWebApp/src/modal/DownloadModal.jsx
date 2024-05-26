// DownloadModal.js
import React, { useState } from "react";

export default function DownloadModal({ isOpen, onClose, onStartEndSelect, months }) {
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleStartEndSelect = () => {
    onStartEndSelect(startMonth, startYear, endMonth, endYear); // Pass selected date range to parent
    onClose(); // Close the modal after handling the selection
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="bg-gray-100 rounded-md px-2 py-1"
                >
                  <option value="">Select Start Month</option>
                  {months.map((month) => (
                    <option key={month.id} value={month.name}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="bg-gray-100 rounded-md px-2 py-1"
                >
                  <option value="">Select Start Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  {/* Add more years as needed */}
                </select>
              </div>
              <div className="flex gap-x-2">
                <select
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="bg-gray-100 rounded-md px-2 py-1"
                >
                  <option value="">Select End Month</option>
                  {months.map((month) => (
                    <option key={month.id} value={month.name}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="bg-gray-100 rounded-md px-2 py-1"
                >
                  <option value="">Select End Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  {/* Add more years as needed */}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleStartEndSelect}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
