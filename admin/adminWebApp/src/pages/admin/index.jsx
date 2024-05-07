import React, { useState, useEffect } from "react";
import Human from "@assets/human.png";
import axios from "axios";

import { PieChart, LoadPercentage, RequestPieChart } from "@components";
import { WebHost } from '../../../MyConstantAdmin'

export default function () {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequestors, setTotalRequestors] = useState(0);

  useEffect(() => {
    console.log("Fetching data..."); 
    const fetchCounts = async () => {
        try {
          const responseDonors = await axios.get(`${WebHost}/kalinga/getTotalDonor`);
          console.log("Donors Response:", responseDonors.data); // Log the response data
          if (responseDonors.data && responseDonors.data.totalDonors) {
            setTotalDonors(responseDonors.data.totalDonors);
          } else {
            console.error("Invalid response format for total donors");
          }
        } catch (error) {
          console.error("Error fetching total donors:", error);
          if (error.response) {
            console.log("Response data:", error.response.data); // Log the response data if available
          }
        }
      
        try {
          const responseRequestors = await axios.get(`${WebHost}/kalinga/getTotalRequestor`);
          console.log("Requestors Response:", responseRequestors.data); // Log the response data
          setTotalRequestors(responseRequestors.data.totalRequestors);
        } catch (error) {
          console.error("Error fetching total requestors:", error);
          if (error.response) {
            console.log("Response data:", error.response.data); // Log the response data if available
          }
        }
      };

    fetchCounts();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen bg-neutral-variant">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-5 py-4 px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E60965"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75"
            />
          </svg>

          <h1 className="text-4xl text-primary-default">Dashboard</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />

        <div className="flex flex-wrap m-8 mx-28">
          <div className="w-1/2 p-4">
            <div className="py-3 bg-white rounded-2xl shadow-xl border-2 border-primary-default">
              <div className="flex items-center justify-center pt-2">
                <img src={Human} alt="Human" className="h-12 w-12 mr-2" />{" "}
                <h2 className="text-4xl text-primary-default">Donors</h2>
              </div>
              <div className="grid items-center justify-center py-2">
                <h1 className="text-center text-[6rem] font-semibold text-primary-default">
                {totalDonors}
                </h1>
                <p className="text-4xl font-medium text-center text-primary-default">
                  Total Donors
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 p-4">
            <div className="py-3 bg-white rounded-2xl shadow-xl border-2 border-primary-default">
              <div className="flex items-center justify-center pt-2">
                <img src={Human} alt="Human" className="h-12 w-12 mr-2" />{" "}
                <h2 className="text-4xl text-primary-default">Requestors</h2>
              </div>
              <div className="grid items-center justify-center py-2">
                <h1 className="text-center text-[6rem] font-semibold text-primary-default">
                {totalRequestors}
                </h1>
                <p className="text-4xl font-medium text-center text-primary-default">
                  Total Requestors
                </p>
              </div>
            </div>
          </div>

          <div class="w-full p-4">
            <div class="py-3 bg-white rounded-2xl shadow-xl border-2 border-primary-default">
              <div>
                <div className="grid grid-flow-row-dense px-4 xl:grid-cols-2 gap-x-4">
                  <span>
                    <PieChart name="Donations" />
                  </span>
                  <span className="lg:pt-4 lg:pb-8 xl:p-0">
                    <RequestPieChart name="Requests" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        
      </section>
    </>
  );
}
