import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
const ConfirmationModal = ({
  isOpen,
  confirmMessage,
  onCancel,
  status,
  userType,
  onClose,
  name
}) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsSecondModalOpen(true); // Open the second modal
  };

  return (
    
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-lg">
          <div className="border-2 border-pink-800 p-12 px-8 rounded-xl">
            <p className="text-xl font-sans text-primary-default">
              {confirmMessage()}
            </p>
            <div className="mt-8 flex justify-end">
              <button
                className="px-6 py-2 mr-4 bg-pink-500 text-white font-sans rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 font-sans rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={onCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Modal */}
      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
              <div className="items-center justify-center mb-7">
                {status === "approved" && (<FaCheck size = {100} color= "#E60965"/>)}
                {status === "declined" && (<RiCloseFill size = {100} color= "#E60965"/>)}
              </div>
              <div className="font-open-sans text-lg text-center text-[#E60965]">
                You've <span className="font-bold">{status}</span> {name} as a {userType}. An email has been sent to notify them of their approval. Thank you for your diligence and dedication in the approval process.
              </div>
              <button
                onClick = {onClose}
              className=" transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"> 
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
