import React, { useState } from "react";

const RemarksModal = ({ isOpen, onCancel, message }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-lg relative">
          <div className="shadow-lg p-12 rounded-xl">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={onCancel}
              role="button"
              tabIndex={0}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#E60965"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <span className="text-2xl text-primary-default font-bold font-sans">
                Remarks
              </span>
              <p className="text-xl font-sans text-primary-default m-4">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarksModal;
