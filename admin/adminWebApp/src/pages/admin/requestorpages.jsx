import React from "react";

const RequestorPages = ({ currentPage })  => {
  // Define content for each page here
  const pageContents = {
    1: (
      <div className="p-2">
        <div className="px-32">
          <div className="my-[-10]">
            <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
              Medical Abstract of an Infant
            </div>
            <div className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Clinical History
              </span>
            </div>
            <div className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Presenting Complaint
              </span>
            </div>
            <div className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Clinical Findings
              </span>
            </div>
            <div className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Diagnosis
              </span>
            </div>
            <div className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Treatment and Interventions
              </span>
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Prescription
              </span>
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
              <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                Government ID
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    2: <div className="p-2">
      <div className="px-32">
        <div className="my-[-10]">
          <div className="flex font-sans font-bold justify-center text-3xl text-primary-default ">
            Reason for Requesting
          </div>
          <div className=" relative border rounded-md border-primary-default bg-white px-8 2xl:py-52 md:py-36 my-6"></div>
        </div>
      </div>
    </div>
  };
  return pageContents[currentPage]
};

export default RequestorPages;

