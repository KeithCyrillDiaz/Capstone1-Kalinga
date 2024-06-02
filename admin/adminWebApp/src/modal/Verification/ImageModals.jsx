import React from 'react'

export const NoUploadedRequirementModal = ({userName, onClose}) => {
    
    if(!userName) userName = "the user"
    return (
        <div className=" z-10 absolute left-[40%] top-[30%]  2xl:left-[45%] 2xl:top-[30%]">
          <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
            <div className="font-open-sans text-lg text-center text-[#E60965]">
            {`Sorry, it appears that ${userName} has not uploaded an image or file for this requirement.`}
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

export const MissingRequirements = ({onClose}) => {
  return (
    <div className=" z-10 absolute left-[40%] top-[30%]  2xl:left-[45%] 2xl:top-[30%]">
      <div className="  rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white ">
        <div className="font-open-sans text-lg text-center text-[#E60965]">
        {`It seems like the user's requirements are missing. Please consider sending a report to our help and support team for assistance.`}
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


export const ShowImage = ({link, onClose, fileName}) => {
  console.log("link: ", link)
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      {/* Overlay */}
      {/* Modal */}
      <div className="rounded-xl border-2 border-[#E60965] max-w-[400px] p-7 flex flex-col justify-center items-center bg-white">
        <div className="font-open-sans text-lg text-center text-[#E60965]">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              className='h-[400px] w-auto'
              src={link}
              alt={`${fileName} results`}
            />
            <span>{fileName}</span>
          </a>
        </div>
        <button
          onClick={onClose}
          className="transition duration-300 hover:bg-opacity-80 bg-[#E60965] rounded-lg text-white px-8 py-2 mt-4">
          Okay
        </button>
      </div>
    </div>
  )
}