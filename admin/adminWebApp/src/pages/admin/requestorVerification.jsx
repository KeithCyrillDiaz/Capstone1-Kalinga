import React, { useState } from "react";
import RequestorPages from "./requestorpages";
import ConfirmationModal from "./confirmModal";

export default function App() {
    const [activeTab, setActiveTab] = useState("screening");
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isApproveConfirmed, setIsApproveConfirmed] = useState();

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

    return (
        <>
            <section className="w-full min-h-screen bg-neutral-variant">
                <div>
                    <div className="flex justify-center m-6">
                        <button
                            onClick={() => handleTabChange("screening")}
                            className={`${activeTab === "screening"
                                ? "bg-primary-default text-white"
                                : "bg-transparent"
                                } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
                        >
                            Screening Form
                        </button>
                        <button
                            onClick={() => handleTabChange("medical")}
                            className={`${activeTab === "medical"
                                ? "bg-primary-default text-white"
                                : "bg-transparent"
                                } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
                        >
                            Medical Requirements
                        </button>
                    </div>
                    {activeTab === "screening" && (
                        <div className="p-2">
                            <div>
                                <div className="px-16 my-[-10]">
                                    <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
                                        Initial Screening Form
                                    </div>
                                    <div className="flex  font-bold text-2xl text-primary-default font-sans">
                                        Personal Information
                                    </div>
                                    <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Full Name
                                    </div>
                                    <div className="flex gap-x-6 my-4">
                                        <div className="relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Age
                                        </div>
                                        <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Birthdate
                                        </div>
                                    </div>
                                    <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Email Address
                                    </div>
                                    <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Phone Number
                                    </div>
                                    <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-24 font-sans text-primary-disabled">
                                        Home Address
                                    </div>
                                </div>

                                <div className="px-16 my-6 ">
                                    <div className="flex font-bold text-2xl text-primary-default font-sans">
                                        Infant Information
                                    </div>
                                    <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Name of Child
                                    </div>
                                    <div className="flex gap-x-6 my-4">
                                        <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Age
                                        </div>
                                        <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Sex
                                        </div>
                                    </div>
                                    <div className="flex gap-x-6 my-4">
                                        <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Birthdate
                                        </div>
                                        <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
                                            Birth Weight (kg)
                                        </div>
                                    </div>
                                    <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Age of Gestation
                                    </div>
                                    <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
                                        Medical Condition
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "medical" && (
                        <div className="p-2">
                            <div className="px-14">
                                <RequestorPages currentPage={currentPage} />
                            </div>
                            <div className="fixed bottom-0 right-0 p-4 m-4">
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                                        onClick={handlePrevClick}
                                    >
                                        {"<"}
                                    </button>
                                    {[1, 2,].map((number) => (
                                        <button
                                            key={number}
                                            className={`${currentPage === number
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