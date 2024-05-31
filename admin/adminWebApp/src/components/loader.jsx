import React from "react";

export const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#F3A3BF] bg-opacity-75 z-50">
          <img
            src="/loading.gif"
            alt="Loading..."
            className="w-[100px] h-[100px]"
          />
        </div>
      )}
    </>
  );
};
