import React from "react";

const RequestorPages = ({ currentPage, form }) => {
  // Define content for each page here
  const pageContents = {
    1: (
      <div>
        <div className="px-16 my-[-10]">
          <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
            Initial Screening Form
          </div>
          <div className="flex  font-bold text-2xl text-primary-default font-sans">
            Personal Information
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Full Name: {form.fullName}
          </div>
          <div className="flex gap-x-6 my-4">
            <div className="relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age:{form.Age}
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate: {form.birthDate}
            </div>
          </div>
          <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Email Address: {form.email}
          </div>
          <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Phone Number: {form.contactNumber}
          </div>
          <div className=" relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 h-24 font-sans text-primary-disabled">
            Home Address: {form.homeAddress}
          </div>
        </div>

        <div className="px-16 my-6 ">
          <div className="flex font-bold text-2xl text-primary-default font-sans">
            Infant Information
          </div>
          <div className="relative border rounded-md border-primary-default bg-white px-3 py-2 my-4 font-sans text-primary-disabled">
            Name of Child: {form.childName}
          </div>
          <div className="flex gap-x-6 my-4">
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Age: {form.childAge}
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Sex: {form.sex}
            </div>
          </div>
          <div className="flex gap-x-6 my-4">
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birthdate: {form.childBirthDate}
            </div>
            <div className=" relative border rounded-md border-primary-default bg-white w-full px-3 py-2 font-sans text-primary-disabled">
              Birth Weight (kg): {form.birthWeight}
            </div>
          </div>
        </div>
      </div>
    ),

    2: (
      <div className="p-2">
        <div className="px-32">
          <div className="my-[-10]">
            <div className="flex font-sans font-bold justify-center text-3xl text-primary-default ">
              Reason for Requesting
            </div>
            <div className="relative border rounded-md bg-white md:h-60 md:w-[700px] 2xl:w-auto border-primary-default p-4 my-6">
              {form.RFR}
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return pageContents[currentPage];
};

export default RequestorPages;
