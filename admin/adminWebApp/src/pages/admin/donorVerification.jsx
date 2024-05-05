import React, { useState } from "react";
import DonorPages from "./donorpages";

export default function () {
  const [activeTab, setActiveTab] = useState("screening");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  return (
    <>
      <section className="w-full min-h-screen bg-neutral-variant">
        <div>
          <div className="flex justify-center m-6">
            <button
              onClick={() => handleTabChange("screening")}
              className={`${
                activeTab === "screening"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Screening Form
            </button>
            <button
              onClick={() => handleTabChange("medical")}
              className={`${
                activeTab === "medical"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Medical Requirements
            </button>
          </div>
          {activeTab === "screening" && (
            <div className="p-2">
              <div className="px-16">
                <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
                  Initial Screening Form
                </div>
                <DonorPages currentPage={currentPage} />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center space-x-4 px-16 mt-8">
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2 "
                    onClick={handlePrevClick}
                  >
                    {"<"}
                  </button>
                  {[1, 2, 3, 4].map((number) => (
                    <button
                      key={number}
                      className={`${
                        currentPage === number
                          ? "hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2 font-bold"
                          : "text-xl font-sans text-primary-disabled py-2 px-4"
                      }`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handleNextClick}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "medical" && (
            <div className="p-2">
              {/* Content for Medical Requirements */}
              {/* Add your content for medical requirements here */}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
