import React, { useState } from "react";

export const AddMilkAmountOption = ({ isOpen, onConfirm, onCancel }) => {

  const [amount, setAmount] = useState(0);

  const handleAction = (actionType) => {

    console.log("amount: ", amount.toString())
    const stringAmount = amount.toString() + "ml"
    console.log("stringAmount : ", stringAmount )
    onConfirm("options", stringAmount, actionType);
    onCancel()
    setAmount(""); 
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg">
          <div className="border-2 border-pink-800 p-12 rounded-lg">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter milk amount"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="mt-8 flex justify-end">
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Add")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove")}
              >
                Remove
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

