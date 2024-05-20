import React, { useState, useEffect } from "react";
import { WebHost } from "../../MyConstantSuperAdmin";
import axios from "axios";



const AppointmentRequestDeclineModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  remarks,
  RequestID
  
}) => {
    if (!RequestID) {
    return null; // or handle the case where AppointmentDonorID is null
  }
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [RequestRemark, setRequestRemark] = useState(""); // State to store the selected remark

  useEffect(() => {
    if (isOpen) {
      setIsSecondModalOpen(false);
      setIsThirdModalOpen(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onCancel(); // Close the first modal
    setIsSecondModalOpen(true); // Open the second modal
  };

  const handleSecondModalConfirm = () => {
    console.log('Selected DonorRemark:', RequestRemark); // Add this line for debugging
    if (RequestRemark) {
      // Send the selected DonorRemark to the server
      putRequestRemarkToServer(RequestRemark);
      setIsSecondModalOpen(false); // Close the second modal
      setIsThirdModalOpen(true); // Open the third modal
      setSelectedReason(RequestRemark); // Update the selected reason in the parent component
    } else {
      alert("Please select a reason for declining.");
    }
  };

  const putRequestRemarkToServer = async (remark) => {
    try {
      const requestBody = {
        RequestRemark: remark,
        RequestID: RequestID,
      };
  
      console.log('Sending PUT request to:', `${WebHost}/kalinga/updateRequestRemark/${RequestID}`);
      console.log('Request Body:', requestBody);
  
      const response = await axios.put(`${WebHost}/kalinga/updateRequestRemark/${RequestID}`, requestBody);
  
      console.log("Remark posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting remark:", error);
    }
  };
  const handleThirdModalConfirm = () => {
    setIsThirdModalOpen(false); // Close the third modal
    onConfirm(); // Call the original onConfirm function
  };

  const handleCancel = () => {
    setIsSecondModalOpen(false); // Close the second modal if open
    setIsThirdModalOpen(false); // Close the third modal if open
    onCancel(); // Call the original onCancel function
  };


  return (
    <>
      {/* First Modal */}
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
      </div>

      {/* Second Modal */}
      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="border-2 border-pink-800 bg-white p-12 rounded-lg shadow-lg max-w-lg">
              <p className="text-xl">Kindly state the reason for decline:</p>
              <select
                className="mt-4 w-full p-2 border rounded-lg"
                value={RequestRemark}
                onChange={(e) => setRequestRemark(e.target.value)}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Insufficient Supply">Insufficient Supply</option>
                <option value="Prioritization of Recipients">Prioritization of Recipients</option>
                <option value="Non-Compliance with Policies">Non-Compliance with Policies</option>
                <option value="Incomplete or Incorrect Information">
                Incomplete or Incorrect Information
                </option>
              </select>
              <div className="mt-8 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSecondModalConfirm}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third Modal */}
      {isThirdModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="border-2 border-pink-800 bg-white p-12 rounded-lg shadow-lg max-w-lg">
              <p className="text-xl">
                The request has been successfully declined, and the user
                will receive a notification about its status.
              </p>
              <div className="mt-8 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleThirdModalConfirm}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentRequestDeclineModal;