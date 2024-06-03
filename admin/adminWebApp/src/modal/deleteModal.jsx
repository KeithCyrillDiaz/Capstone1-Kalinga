import React, { useState, useEffect  } from "react";

const DeleteModal = ({ isOpen, message, onConfirm, onCancel }) => {
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(isOpen);
  
    useEffect(() => {
      setIsFirstModalOpen(isOpen);
    }, [isOpen]);
  
    const handleConfirm = () => {
      setIsSecondModalOpen(true);
      onConfirm();
    };
  
    const handleSecondModalConfirm = () => {
      setIsSecondModalOpen(false);
      setIsFirstModalOpen(false);
      onConfirm();
    };
  
    const handleCancel = () => {
      setIsSecondModalOpen(false);
      setIsFirstModalOpen(false);
      onCancel();
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
          <p className="text-xl">{message}</p>
          <div className="mt-8 flex justify-end">
            <button
              className="px-4 py-2 mr-4 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                <p className="text-xl">
                The appointment has been successfully deleted
                </p>
                <div className="mt-8 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={onCancel} 
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

export default DeleteModal;
