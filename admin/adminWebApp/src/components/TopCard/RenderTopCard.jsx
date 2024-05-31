import React from 'react'


export const TopCard = ({ title, download, data, barangay, userType}) => {
    console.log("Data: ", data)
    const user = userType === "Donor" ? "donors" : "requestors"
    return (
        <div className="flex flex-col p-4 rounded-2xl shadow-lg relative min-h-[17rem] w-[25rem]">
                <h1 className="text-2xl w-[90%] self-center text-primary-default font-sans font-semibold text-center pb-4 h-20">
                    {title}
                  </h1>
                  {data && data.length === 0 && (
                        <h1 className="text-lg w-[70%] self-center text-primary-default font-sans font-light mt-1 text-center">
                            {`No top ${user} for ${barangay} at the moment`} 
                        </h1>
                  )}
                  {data && data.length !== 0 && (
                    <>
                <div className="flex justify-end mb-4"> {/* Updated className */}
                <button
                    onClick={download}
                    className="bg-pink-500 text-white py-2 px-4 self-end rounded-xl focus:outline-none hover:bg-pink-600"
                >
                    Export as PDF
                </button>
                  </div>
                      {data && data.map((user, index) => (
                        <div key={index} className="flex flex-row items-center gap-7 w-[100%] self-center justify-between">
                            <div className='flex flex-row items-center gap-2'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    className="cursor-pointer"
                                >
                                    <path
                                    fill="#E60965"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    fillRule="evenodd"
                                    d="M12 20a7.97 7.97 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.97 7.97 0 0 1 12 20M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12m10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7"
                                    clipRule="evenodd"
                                    ></path>
                                </svg>
                                <h1 className="text-md text-primary-default font-sans mt-1 text-start">
                                    {user.fullName}
                                </h1>
                            </div>
                        
                            <h1 className="text-md text-primary-default font-sans font-light ">
                                {user.milkAmount} ml
                            </h1>
                           
                        </div>
                      ))}
                    </>
                  )}
                </div>
    )
}