import React from "react"
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

export const VerificationModal = ({userType, name, status, onClose}) => {

  return (
    <div className=" z-10 absolute left-[40%] top-[30%]  2xl:left-[45%] 2xl:top-[30%]">
      <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
        <div className="items-center justify-center">
          {status === "approved" && (<FaCheck size = {70} color= "#E60965"/>)}
          {status === "declined" && (<RiCloseFill size = {70} color= "#E60965"/>)}
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
  )  
}
