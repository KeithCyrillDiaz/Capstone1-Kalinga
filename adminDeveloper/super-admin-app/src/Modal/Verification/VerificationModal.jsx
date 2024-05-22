import React from "react"
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

export const VerificationModal = ({userType, name, status, onClose}) => {
  const finalStatus = status === "declined" ? "rejected" : "approved"
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center">
        <div className="items-center justify-center">
          {status === "approved" && <FaCheck size={70} color="#E60965" />}
          {status === "declined" && <RiCloseFill size={70} color="#E60965" />}
        </div>
        <div className="font-open-sans text-lg text-center text-[#E60965]">
          You've <span className="font-bold">{finalStatus}</span> {name} as a {userType}. An email has been sent to notify them of their approval. Thank you for your diligence and dedication in the approval process.
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
      <div className="bg-white rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center">
        <div className="font-open-sans text-lg text-center text-[#E60965]">
          Are you sure you want to{" "}
          <span className="font-bold">{finalStatus}</span> {name} as {userType}?
        </div>
        <button
          onClick={onConfirm}
          className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="border-[#E60965] border-2 px-8 transition duration-300 hover:bg-opacity-80 bg-white rounded-lg text-[#E60965] first:px-8 py-2 mt-4"
        >
          No
        </button>
      </div>
    </div>
  )  
}
