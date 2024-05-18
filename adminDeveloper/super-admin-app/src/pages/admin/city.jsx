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

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-2">
              Cities Report
            </h1>
          </div>
          <div className="px-8">
            <div className="flex flex-col items-end xl:gap-x-6 lg:gap-x-3">
              <button
                onClick={toggleFilterVisibility}
                className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-neutral-variant flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 36 36"
                  className="mr-2"
                >
                  <path
                    fill="currentColor"
                    d="M22 33V19.5L33.47 8A1.81 1.81 0 0 0 34 6.7V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1.67a1.79 1.79 0 0 0 .53 1.27L14 19.58v10.2Z"
                    className="clr-i-solid clr-i-solid-path-1"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M33.48 4h-31a.52.52 0 0 0-.48.52v1.72a1.33 1.33 0 0 0 .39.95l12 12v10l7.25 3.61V19.17l12-12a1.35 1.35 0 0 0 .36-.91V4.52a.52.52 0 0 0-.52-.52"
                    className="clr-i-solid clr-i-solid-path-1"
                  ></path>
                  <path fill="none" d="M0 0h36v36H0z"></path>
                </svg>
                Filter By
              </button>

              {isFilterVisible && (
                <div className="mt-2 w-auto gap-x-4 bg-neutral-variant flex p-2 px-6 pb-4 rounded-md shadow-md justify-end">
                  <div className="border-b border-primary-default">
                    <label className="text-xs text-primary-default">City</label>

                    <select
                      className="bg-white text-primary-default text-xl py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                      value={city}
                      onChange={handleCityChange}
                    >
                      <option value="">Select City</option>
                      <option value="Manila City">Manila City</option>
                      <option value="Quezon City">Quezon City</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-center xl:gap-x-6 lg:gap-x-3"></div>
          </div>
          <hr className="border-t-1 mt-4 border-primary-default" />

          {city === "Manila City" && (
            <div className="xl:px-8 lg:px-2 flex items-center justify-center w-full h-[60%] 2xl:gap-x-32 xl:gap-x-20 lg:gap-x-8">
              <div className=" bg-white rounded-lg shadow-lg p-4 pb-10 ">
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
        </div>
      </section>
    </>
  );
}
