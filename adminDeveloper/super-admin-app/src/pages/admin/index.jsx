import React, { useState, useEffect } from "react";
import axios from "axios";
import Human from "@assets/human.png";
import { WebHost } from "../../../MyConstantSuperAdmin";
import { TotalUserPieChart } from "../../components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequestors, setTotalRequestors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerCity, setUsersPerCity] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchCounts = async () => {
      try {
        const responseDonors = await axios.get(
          `${WebHost}/kalinga/getTotalDonor`
        );
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
        const responseRequestors = await axios.get(
          `${WebHost}/kalinga/getTotalRequestor`
        );
        console.log("Requestors Response:", responseRequestors.data); // Log the response data
        setTotalRequestors(responseRequestors.data.totalRequestors);
      } catch (error) {
        console.error("Error fetching total requestors:", error);
        if (error.response) {
          console.log("Response data:", error.response.data); // Log the response data if available
        }
      }
      try {
        const responseUsers = await axios.get(
          `${WebHost}/kalinga/getTotalUser`
        );
        console.log("Requestors Response:", responseUsers.data); // Log the response data
        setTotalUsers(responseUsers.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total requestors:", error);
        if (error.response) {
          console.log("Response data:", error.response.data); // Log the response data if available
        }
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchUsersPerCity = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getTotalUsersPerCity`
        );
        console.log("Users Per City Response:", response.data); // Log the response data
        setUsersPerCity(response.data);
      } catch (error) {
        console.error("Error fetching users per city:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      }
    };

    fetchUsersPerCity();
  }, []);

  return (
    <>
      <section className="w-full bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-6">
              Dashboard
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div class="grid grid-rows-3 grid-flow-col gap-2">
                <div class="row-span-3 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#E60965"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h.5m7.5 7l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.24 2.24 0 0 0-3.129-.006l-.224.22l-.223-.22a2.24 2.24 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z"
                    ></path>
                  </svg>
                </div>
                <div class="col-span-2">
                  <span className="text-2xl text-primary-default mt-4">
                    Total Donor Users
                  </span>
                </div>
                <div class="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalDonors}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div class="grid grid-rows-3 grid-flow-col gap-2">
                <div class="row-span-3 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#E60965"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3m3 7l5-5m0 4.5V17h-4.5"
                    ></path>
                  </svg>
                </div>
                <div class="col-span-2">
                  <span className="text-2xl text-primary-default mt-4">
                    Total Requestor Users
                  </span>
                </div>
                <div class="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalRequestors}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div class="grid grid-rows-3 grid-flow-col gap-2">
                <div class="row-span-3 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#E60965"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0"
                    ></path>
                  </svg>
                </div>
                <div class="col-span-2">
                  <span className="text-2xl text-primary-default mt-4 ml-4">
                    Total App Users
                  </span>
                </div>
                <div class="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalUsers}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div class="grid grid-rows-3 grid-flow-col gap-2">
                <div class="row-span-3 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#E60965"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14q.19.017.384.017a4.5 4.5 0 0 0 4.102-6.352l-3.276 3.276a3 3 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008z"
                    ></path>
                  </svg>
                </div>
                <div class="col-span-2">
                  <span className="text-2xl text-primary-default mt-4 ml-6">
                    Pending Bugs
                  </span>
                </div>
                <div class="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    456
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex flex-col items-center">
              <div className="flex flex-col items-center px-6 pt-2 w-full">
                <h2 className="text-2xl text-primary-default text-center">
                  App Users per Milkbank
                </h2>
                <div className="w-full flex justify-center items-center">
                  <div className="w-full h-full overflow-hidden">
                    <TotalUserPieChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 row-span-3 px-8 py-8 bg-white rounded-lg shadow-md">
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={usersPerCity}
                  margin={{ top: 100, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="totalDonors"
                    name="Total Donors"
                    fill="#ED5077"
                    barSize={50}
                  />
                  <Bar
                    dataKey="totalRequestors"
                    name="Total Requestors"
                    fill="#67C5F8"
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="row-span-2 bg-white rounded-lg shadow-md px-6">
              <h2 className="text-2xl text-primary-default mt-6 ">
                Other Milkbank Stats
              </h2>
              <span className="text-md text-primary-default font-sans ">
                Total Milkbanks: 1
              </span>
              <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-x-2 mt-6">
                <div class="col-span-3">
                  <span className="text-lg text-primary-default font-bold mt-6">
                    QCGH Human Milk Bank
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Requestor
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Donor
                  </span>
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  {totalRequestors}
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  {totalDonors}
                </div>
              </div>

              <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-x-2 mt-6">
                <div class="col-span-3">
                  <span className="text-lg text-primary-default font-bold mt-6">
                    Manila Human Milk Bank
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Requestor
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Donor
                  </span>
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  3
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  3
                </div>
              </div>

              <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-x-2 mt-6 mb-8">
                <div class="col-span-3">
                  <span className="text-lg text-primary-default font-bold mt-6">
                    Makati Milk Bank
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Requestor
                  </span>
                </div>
                <div class="col-span-2">
                  <span className="text-md text-primary-default font-sans">
                    Donor
                  </span>
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  2
                </div>
                <div className="text-md text-primary-default font-sans text-right">
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
