import React, { useState } from "react";
import DonorUsers from "./donoraccounts";
import ConfirmationModal from "./";

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

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handleTabChange("screening")}
              className={`${
                activeTab === "screening"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Donor Accounts
            </button>
            <button
              onClick={() => handleTabChange("medical")}
              className={`${
                activeTab === "medical"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Requestor Accounts
            </button>
          </div>
          {activeTab === "screening" && (
            <DonorUsers currentPage={currentPage} />
          )}
          {activeTab === "medical" && (
            <div className="p-2">
              <div className="px-32">
                <div className="my-8">
                  <div className="bg-white relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Hepa B Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      HIV 1 & 2 Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Syphilis Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Pregnancy Booklet
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
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
