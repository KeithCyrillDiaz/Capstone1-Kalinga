import React, { useState } from "react";

const ConfirmationModal = ({
  isOpen,
  confirmMessage,
  onConfirm,
  onCancel,
  isApproved,
}) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsSecondModalOpen(true); // Open the second modal
  };

  const handleSecondModalConfirm = (isApproved) => {
    setIsSecondModalOpen(isApproved); // Close the second modal
    onConfirm(); // Call the original onConfirm function
  };

  const handleCancel = () => {
    setIsSecondModalOpen(false); // Close the second modal
    onCancel(); // Call the original onCancel function
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
          <div className="border-2 border-pink-800 p-12 rounded-xl">
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
            <div className="border-2 border-pink-800 bg-white p-12 rounded-lg shadow-lg max-w-lg">
              <div className="flex justify-center items-center"></div>
              <p className="text-xl font-sans text-primary-default flex text-center items-center">
                {isApproved
                  ? "The appointment has been successfully approved, and the user will receive a notification about its status."
                  : "The appointment has been rejected."}
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  className="px-6 py-2 bg-pink-500 text-white text-xl font-sans rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSecondModalConfirm}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
