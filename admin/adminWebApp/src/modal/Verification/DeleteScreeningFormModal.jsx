import React from 'react'

export const DeleteScreeningFormModal = ({
confirm,
onClose,
openModal
}) => {
    return (
        <>
        {openModal === true && (
            <div className=" z-10 absolute left-[40%] top-[30%]  2xl:left-[45%] 2xl:top-[30%]">
                <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
                <div className="font-open-sans text-lg text-center text-[#E60965]">
                    Are you sure you want to delete this applicant form?
                </div>
                <button
                    onClick = {confirm}
                className=" transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4"> 
                    Yes
                </button>
                <button
                    onClick = {onClose}
                className=" transition duration-300 hover:bg-opacity-80 bg-gray-300 rounded-lg text-[#E60965] px-8 py-2 mt-4"> 
                    No
                </button>
                </div>
            </div>
        )}
        
        </>
    )
}