import { ClipLoader } from "react-spinners";
export const Loader = ({isLoading}) => {
    return (
        <>
            {/* Loader */}
            {isLoading && (
            <div className="absolute z-10 left-1/2 bottom-1/2 bg-[#F3A3BF] w-[50px] h-[50px] rounded-full p-2">
                <ClipLoader color={"white"} loading={true} />
            </div>
            )}
        </>
   
    )  
};
// }import React from 'react';
// import React, { useState, useEffect } from 'react';
// import Runningheart from '../assets/Runningheart.gif'; // Adjust the path as needed

// export const Loader = () => {
//     const [showLoader, setShowLoader] = useState(true);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setShowLoader(false); // Hide the loader after 10 seconds
//         }, 10000); // 10 seconds in milliseconds

//         return () => {
//             clearTimeout(timeout); // Clear the timeout when component unmounts or re-renders
//         };
//     }, []);

//     return showLoader ? <img src={Runningheart} alt="Loading..." /> : null;
// };





