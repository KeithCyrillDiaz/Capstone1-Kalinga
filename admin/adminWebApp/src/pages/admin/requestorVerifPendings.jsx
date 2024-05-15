import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from '../../../MyConstantAdmin'
import { Loader } from '../../components/loader'
import { RenderPendingVerification } from '../../components/Verification/RenderPendingVerification'
export default function () {
  useEffect(() => {
    // Prevent scrolling of the entire page
    document.body.style.overflowY = "hidden";
    // Scrolling
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);


  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(false)
  const userType = "Requestor"
  const fetchData = async () => {
    try { 
      setLoading(true)
      console.log("Fetching Data")
      const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsUserType/${userType}`)
      console.log(response.data.screeningForms)
      if(!response.data.screeningForms){
        console.log("Error fetching Screening Forms")
      } else {
        setForms(response.data.screeningForms)
        console.log("Fetch Screening Forms Successfully")
      }
    } catch(error) {
      console.log("Something went wrong", error)
    } finally {
      setLoading(false)
    }
  }
  console.log("forms: ",forms)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Loader isLoading={loading}/>
      <section className="w-full min-h-screen bg-neutral-variant overflow-hidden">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-5 py-2 px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E60965"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM4 8h16V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616zm6.95 7.82l4.958-4.959l-.72-.719l-4.238 4.239l-2.138-2.139l-.72.72z"
            ></path>
          </svg>

          <h1 className="text-3xl text-primary-default">Requestor Verification</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />

        <div className="p-8" >
          <div className="flex flex-row items-center justify-between xl:gap-x-6 lg:gap-x-3">
            <div className="mt-8 ml-4 mb-1 text-4xl font-bold text-primary-default">
              Pendings
            </div>
            <div className="relative flex items-center bg-white border border-primary-default xl:w-1/2 lg:w-[60%] rounded-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="text-primary-default ml-10"
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
              <input
                type="text"
                className="w-56 h-12 text-xl bg-transparent border-none outline-none pl-5 placeholder:text-primary-default text-primary-default"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div
          className="overflow-hidden flex flex-col gap-y-4 mt-4 pb-10"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <div className="p-8 overflow-y-auto">
            <div className="flex flex-col">
              {/* Details */}
              {forms.length === 0 && (
                <div className="bg-white rounded-2xl p-8 mb-4 flex items-center justify-center border border-primary-default">
                  No Pending Requestor Application at the moment
                </div>
              )}
            {forms.map((form, index) => (
              <RenderPendingVerification 
              key={index} 
              name={form.fullName} 
              email={form.email} 
              date={form.createdAt} 
              form={form}
              userType={form.userType}//Requestor
              />
            ))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
