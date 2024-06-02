import React from 'react'


export const AlertModal = ({NoInputs, NoUsernameInputs, NoPasswordInput, InvalidCredentials, message, onClose}) => {

    return (
        <div className=" z-50 absolute left-[33%] top-[42%]">
            <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
                <div className="font-open-sans text-lg text-center text-[#E60965]">
                    {NoInputs && message ==="" && <div>Please fill in all required fields.</div>}
                    {NoUsernameInputs && message ===""  && <div>Please enter a username.</div>}
                    {NoPasswordInput &&  message ===""  && <div>Please enter a password.</div>}
                    {InvalidCredentials &&  message !==""  && <div>{message}</div>}
                    {message && <div>{message}</div>}
                </div>
                <button
                onClick = {onClose}
                className=" transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"> 
                Okay
                </button>
            </div>
        </div>
    )
}


export const CustomModal = ({onClose, message }) => {
    if(!message) return
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white">
          <div className="font-open-sans text-lg text-center text-[#E60965]">
            {message && <div>{message}</div>}
          </div>
          <button
            onClick={onClose}
            className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"
          >
            Okay
          </button>
        </div>
    </div>
    );
  };