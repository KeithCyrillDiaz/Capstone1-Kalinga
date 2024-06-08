import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

export const VerificationModal = ({userType, name, status, onClose}) => {
  const finalStatus = status === "declined" ? "rejected" : "approved"

  const [rejectionRemark, setRejectionRemark] = useState("");
  const handleRejectionRemarkChange = (event) => {
    setRejectionRemark(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center">
        <div className="items-center justify-center">
          {status === "approved" && <FaCheck size={70} color="#E60965" />}
          {status === "declined" && <RiCloseFill size={70} color="#E60965" />}
        </div>
        <div className="font-open-sans text-lg text-center text-[#E60965]">
          You've <span className="font-bold">{finalStatus}</span> {name} as a {userType}. An email has been sent to notify them of their {finalStatus}. Thank you for your diligence and dedication in the approval process.
        </div>
        <button
          onClick={onClose}
          className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"
        >
          Done
        </button>
      </div>
    </div>
  )  
}

export const Confirmation = ({status, name, userType, onClose, onConfirm}) => {
  const finalStatus = status === "declined" ? "reject" : "approve"
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#f5f5f5] rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center">
        <div className="font-open-sans text-lg text-center text-[#E60965]">
          Are you sure you want to{" "}
          <span className="font-bold">{finalStatus}</span> {name} as {userType}?
        </div>
        <button
          onClick={onConfirm}
          className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4 hover:shadow-md"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="shadow-lg border border-gray-300 px-8 transition duration-300 hover:bg-gray-300 bg-white rounded-lg text-[#E60965] first:px-8 py-2 mt-4 hover:shadow-md"
        >
          No
        </button>
      </div>
    </div>
  )  
}



export const RejectionRemarks = ({ onClose, remark, onCancel}) => {
  const [rejectionRemark, setRejectionRemark] = useState("");
  const [isCustomRemark, setIsCustomRemark] = useState(false);
  const [customRemark, setCustomRemark] = useState("");


  const handleRejectionRemarkChange = (event) => {
    const value = event.target.value;

    if(value === "custom") {
      setIsCustomRemark(true)
    }
      else setIsCustomRemark(false)
    setRejectionRemark(value)
    if(!isCustomRemark)remark(value)
  };

  const handleCustomRemarkChange = (event) => {
    const { value } = event.target;
    console.log("value: ", value)
    setCustomRemark(value);
    remark(value)
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center">
        <h1 className="text-lg text-primary-default font-bold font-sans my-4 mb-2">Choose a Rejection Reason</h1>
            <select
              value={rejectionRemark}
              onChange={handleRejectionRemarkChange}
              className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select rejection remark</option>
              <option value="The Image Requirements are unclear">The Image Requirements are unclear</option>
              <option value="Not valid Requirements">Not valid Requirements</option>
              <option value="custom">Other (please specify)</option>
            </select>
            <input
                type="text"
                placeholder="Enter your reason..."
                value={customRemark}
                onChange={handleCustomRemarkChange}
                className={`mt-4 p-2 border border-gray-300 rounded-md w-full ${isCustomRemark ? 'block' : 'hidden'}`}
              />
              
        <button
          disabled={rejectionRemark === "" || customRemark === "" && isCustomRemark}
          onClick={onClose}
          className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"
        >
          Done
        </button>
        <button
          onClick={onCancel}
          className="transition duration-300 hover:bg-opacity-80 bg-white rounded-lg text-[#E60965] px-6 py-2 mt-4 ml-2 border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};