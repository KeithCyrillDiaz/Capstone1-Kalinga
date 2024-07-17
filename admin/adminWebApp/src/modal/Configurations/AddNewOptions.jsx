import React, { useState } from "react";
import { CustomModal } from "../logIn/AlertModal";

export const AddMilkAmountOption = ({ isOpen, onConfirm, onCancel }) => {

  const [amount, setAmount] = useState(0);

  const handleAction = (actionType, subName) => {

    console.log("amount: ", amount.toString())
    const stringAmount = amount.toString() + "ml"
    console.log("stringAmount : ", stringAmount )
    onConfirm("options", stringAmount, actionType, subName);
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
                onClick={() => handleAction("Add", "milkAmount")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove", "milkAmount")}
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


export const AddBabyCategoryOption = ({ isOpen, onConfirm, onCancel }) => {

  const [category, setCategory] = useState("");

  const handleAction = (actionType, subName) => {
    console.log("new Category: ", category)
    onConfirm("options", category, actionType, subName);
    onCancel()
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
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter new baby category"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="mt-8 flex justify-end">
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Add", "BabyCategory")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove", "BabyCategory")}
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


export const AddMethodCategoryOption = ({ isOpen, onConfirm, onCancel }) => {

  const [category, setCategory] = useState({
    title: "",
    Authorized_ID: false
  });

  const handleChange = (name, value) => {
    setCategory({
      ...category,
      [name]: value
    })
  }
  const handleAction = (actionType, subName) => {
    console.log("new Category: ", category)
    onConfirm("options", category, actionType, subName);
    onCancel()
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
              type="text"
              value={category.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter new method of obtaining"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex flex-row gap-2 justify-center items-center">
              <input
                type="checkbox"
                checked={category.Authorized_ID}
                onChange={(e) => handleChange('Authorized_ID',  e.target.checked)}
                className="mr-2 h-5 w-5"
              />
              Required an Authorized ID?
            </div>
           
            <div className="mt-8 flex justify-end">
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Add", "method")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove", "method")}
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


export const AddNewPersonalInfoField = ({ isOpen, onConfirm, onCancel }) => {

  const [alertModal, setAlertModal] = useState(false)
  const [category, setCategory] = useState({
    name: "",
    placeHolder: "",
    fieldBoolean: false
  });

  const handleChange = (name, value) => {
    setCategory({
      ...category,
      [name]: value
    })
  }
  const handleAction = (actionType) => {
    if (!category.name.trim() || !category.placeHolder.trim()) {
      onCancel()
      setAlertModal(true)
      return;
    }
    console.log("new Category: ", category)
    onConfirm("fields", category, actionType, "personalInformation");
    onCancel()
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {alertModal && (
        <CustomModal 
        onClose={() => setAlertModal(false)}
        message={"Please fill in all fields"}
        />
      )}
      <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg">
          <div className="border-2 border-pink-800 p-12 rounded-lg items-center">
            <input
              type="text"
              value={category.title}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter new field"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
             <input
              type="text"
              value={category.placeHolder}
              onChange={(e) => handleChange('placeHolder', e.target.value)}
              placeholder="Enter the field placeholder"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="mt-8 flex justify-center">
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Add", "fields")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove", "fields")}
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


export const AddNewInfantInfoField = ({ isOpen, onConfirm, onCancel }) => {

  const [category, setCategory] = useState({
    name: "",
    placeHolder: "",
    fieldBoolean: false
  });

  const handleChange = (name, value) => {
    setCategory({
      ...category,
      [name]: value
    })
  }
  const handleAction = (actionType) => {
    console.log("new Category: ", category)
    onConfirm("fields", category, actionType, "infantInformation");
    onCancel()
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
          <div className="border-2 border-pink-800 p-12 rounded-lg items-center">
            <input
              type="text"
              value={category.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter new field"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
             <input
              type="text"
              value={category.placeHolder}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              placeholder="Enter the field placeholder"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="mt-8 flex justify-center">
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Add", "fields")}
              >
                Add
              </button>
              <button
                className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAction("Remove", "fields")}
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
