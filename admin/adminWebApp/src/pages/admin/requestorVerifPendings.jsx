import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { Loader } from "../../components/loader";
import { RenderPendingVerification } from "../../components/Verification/RenderPendingVerification";
export default function () {
  useEffect(() => {
    // Prevent scrolling of the entire page
    document.body.style.overflowY = "hidden";
    // Scrolling
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const userType = "Requestor";
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching Data");
      const response = await axios.get(
        `${WebHost}/kalinga/getScreeningFormsUserType/${userType}`
      );
      console.log(response.data.screeningForms);
      if (!response.data.screeningForms) {
        console.log("Error fetching Screening Forms");
      } else {
        setForms(response.data.screeningForms);
        console.log("Fetch Screening Forms Successfully");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("forms: ", forms);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Loader isLoading={loading} />
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-10 pt-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4">
              Requestor Pendings
            </h1>
            <div className="relative flex items-center bg-white border border-primary-default w-1/4 rounded-full">
              <input
                type="text"
                className="w-56 h-8 text-xl bg-transparent border-none outline-none pl-5 placeholder:text-primary-default text-primary-default"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
                className="text-primary-default ml-28"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div
            className="overflow-hidden flex flex-col gap-y-4 mt-4"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            <div className="p-10 pt-2 overflow-y-auto">
              {forms.length === 0 && (
                <div className="bg-white rounded-2xl mb-4 flex items-center border border-primary-default py-2">
                  No Pending Donor Application at the moment
                </div>
              )}
              {forms.map((form, index) => (
                <RenderPendingVerification
                  key={index}
                  name={form.fullName}
                  email={form.email}
                  date={form.createdAt}
                  form={form}
                  userType={form.userType} //Requestor
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
