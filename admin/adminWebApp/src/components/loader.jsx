import { ClipLoader } from "react-spinners";
export const Loader = ({isLoading}) => {
    console.log("isLoading: ", isLoading)
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
}