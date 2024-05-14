import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantSuperAdmin";

export default function () {
  const [city, setCity] = useState(""); // State to hold the selected city
  const [donationData, setDonationData] = useState({}); // State to hold donation data
  const [requestData, setRequestData] = useState({}); // State to hold request data
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationResponse = await axios.get(
          `${WebHost}/kalinga/getDonationStatusTotal?city=${encodeURIComponent(
            city
          )}`
        );

        setDonationData(donationResponse.data);

        const requestResponse = await axios.get(
          `${WebHost}/kalinga/getRequestStatusTotal?city=${encodeURIComponent(
            city
          )}`
        );

        setRequestData(requestResponse.data);

        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Error fetching data: " + error.message); // Set error state with descriptive message
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-10 py-12 px-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E60965"
              strokeWidth="1.5"
              d="M9 21h6m-6 0v-5m0 5H3.6a.6.6 0 0 1-.6-.6v-3.8a.6.6 0 0 1 .6-.6H9m6 5V9m0 12h5.4a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6h-4.8a.6.6 0 0 0-.6.6V9m0 0H9.6a.6.6 0 0 0-.6.6V16"
            />
          </svg>
          <h1 className="text-5xl text-primary-default">Reports</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />
        <div className="p-8">
          <div className="flex flex-row items-center justify-center xl:gap-x-6 lg:gap-x-3">
            <h1 className="w-full text-3xl text-primary-default">
              Total Donations & Requests each City
            </h1>
            <div className="relative w-full lg:w-64 xl:w-80">
              <select
                className="block appearance-none w-full bg-transparent border border-primary-default text-xl text-primary-default py-4 px-5 pr-8 rounded-xl focus:outline-none"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                <option value="Manila City">Manila City</option>
                <option value="Quezon City">Quezon City</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {city === "Manila City" && (
          <div className="xl:px-8 lg:px-2 flex items-center justify-center w-full h-[60%] 2xl:gap-x-32 xl:gap-x-20 lg:gap-x-8">
            <div className="flex flex-col items-center justify-center gap-y-12">
              <h1 className="text-4xl text-center text-primary-default">
                Donations
              </h1>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-24 lg:px-16 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {donationData.totalCompleteDonations}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Successful
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-20 lg:px-12 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {donationData.totalDeclinedDonations}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Unsuccessful
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-12">
              <h1 className="text-4xl text-center text-primary-default">
                Requests
              </h1>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-24 lg:px-16 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {requestData.totalCompleteRequests}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Successful
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-20 lg:px-12 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {requestData.totalDeclinedRequests}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Unsuccessful
                </p>
              </div>
            </div>
          </div>
        )}
        {city === "Quezon City" && (
          <div className="xl:px-8 lg:px-2 flex items-center justify-center w-full h-[60%] 2xl:gap-x-32 xl:gap-x-20 lg:gap-x-8">
            <div className="flex flex-col items-center justify-center gap-y-12">
              <h1 className="text-4xl text-center text-primary-default">
                Donations
              </h1>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-24 lg:px-16 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {donationData.totalCompleteDonations}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Successful
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-20 lg:px-12 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {donationData.totalDeclinedDonations}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Unsuccessful
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-12">
              <h1 className="text-4xl text-center text-primary-default">
                Requests
              </h1>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-24 lg:px-16 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {requestData.totalCompleteRequests}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Successful
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 bg-white border shadow-xl xl:px-20 lg:px-12 rounded-xl border-primary-default">
                <h1 className="pb-4 text-6xl text-center text-primary-default">
                  {requestData.totalDeclinedRequests}
                </h1>
                <p className="text-2xl text-center text-primary-default">
                  Unsuccessful
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
