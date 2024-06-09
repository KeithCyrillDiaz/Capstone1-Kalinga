import React from "react";
import NotFoundImg from "@assets/not-found.png";
import { block } from "million/react";

export const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen body-color">
        <img
          src={NotFoundImg}
          alt="NotFoundImg"
          className="md:w-[26rem] lg:w-[30rem]"
        />
        <h1 className="py-4 text-4xl font-semibold">Not Found</h1>
        <h2 className="text-xl">The requested page could not be found.</h2>
        <br />
        <button
          title="Go Back"
          onClick={goBack}
          className="px-12 py-2 text-xl font-medium text-white bg-primary-default rounded-xl"
        >
          Go Back
        </button>
      </div>
    </>
  );
};
