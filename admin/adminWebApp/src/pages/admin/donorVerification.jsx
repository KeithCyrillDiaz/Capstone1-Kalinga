import React, { useState } from "react";
import DonorPages from "./donorpages";
import ConfirmationModal from "./confirmModal";

export default function () {
  const [activeTab, setActiveTab] = useState("screening");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isApproveConfirmed, setIsApproveConfirmed] = useState();
  const [isSecondModalConfirm, setSecondModalConfirm] = useState();
  //const [isRejectConfirmed, setIsRejectConfirmed] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  const handleConfirmationClick = (isApprove) => {
    setIsApproveConfirmed(isApprove);
    setIsConfirmationModalOpen(true);
  };

  const handleSecondModalConfirm = (isApproveConfirmed) => {
    setIsSecondModalOpen(false); // Close the second modal

    // Implement logic based on isApproveConfirmed
    if (isApproveConfirmed) {
      // Perform actions for approval (e.g., update appointment status)
      console.log("Appointment approved!"); // Replace with your actual logic
    } else {
      // Perform actions for rejection (e.g., notify user)
      console.log("Appointment rejected!"); // Replace with your actual logic
    }
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
              <div className="px-14">
                <DonorPages currentPage={currentPage} />
              </div>
              <div className="fixed bottom-0 right-0 p-4 m-4">
                <div className="flex items-center space-x-4">
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
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
              <div className="px-32">
                <div className="my-8">
                  <div className="bg-white relative border rounded-md border-primary-default px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Hepa B Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-defaultpx-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      HIV 1 & 2 Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Syphilis Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Pregnancy Booklet
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Government ID
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div>
                    <button
                      className="hover:bg-primary-default hover:text-white fixed bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full right-40"
                      onClick={() => handleConfirmationClick(true)}
                    >
                      <span className="flex justify-center items-center font-sans">
                        Approve
                      </span>
                    </button>
                  </div>

                  <div>
                    <button
                      className="hover:bg-primary-default hover:text-white fixed bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full right-40 mt-12"
                      onClick={() => handleConfirmationClick(false)}
                    >
                      <span className="flex justify-center items-center font-sans">
                        Reject
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          confirmMessage={() =>
            isApproveConfirmed
              ? "Are you sure you want to approve?"
              : "Are you sure you want to reject?"
          }
          onConfirm={() => {
            setIsConfirmationModalOpen(false);
          }}
          onCancel={() => setIsConfirmationModalOpen(false)}
          isApproved={isApproveConfirmed}
        />
      )}
    </>
  );
}
