import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { PieChart, LoadPercentage, RequestPieChart } from "@components";
import { TotalUserPieChart } from "../../components";
import { AdminLogin } from "../../api/AdminLogin";
import { useParams } from "react-router-dom";
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
        setTotalDonors(responseDonors.data.totalDonors || 0);
      } catch (error) {
        console.error("Error fetching total donors:", error);
      }

      try {
        const responseRequestors = await axios.get(
          `${WebHost}/kalinga/getTotalRequestor`
        );
        setTotalRequestors(responseRequestors.data.totalRequestors || 0);
      } catch (error) {
        console.error("Error fetching total requestors:", error);
      }

      try {
        const responseUsers = await axios.get(
          `${WebHost}/kalinga/getTotalUser`
        );
        setTotalUsers(responseUsers.data.totalUsers || 0);
      } catch (error) {
        console.error("Error fetching total users:", error);
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
        setUsersPerCity(response.data || []);
      } catch (error) {
        console.error("Error fetching users per city:", error);
      }
    };

    fetchUsersPerCity();
  }, []);

  const { username } = useParams();

  return (
    <>
      <section className="w-full h-full bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-2xl text-primary-default font-bold font-sans py-4 mt-6 pb-6">
              Welcome, {username} Admin!
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-4 justify-center">
            <div className="h-40 p-2 bg-white rounded-lg shadow-md flex justify-center items-center">
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
            <div className="h-40 p-2 bg-white rounded-lg shadow-md flex justify-center items-center">
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
            <div className="h-40 p-2 bg-white rounded-lg shadow-md flex justify-center items-center">
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

            <div className="h-40 p-2 bg-white rounded-lg shadow-md flex justify-center items-center">
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

            <div className="h-40 p-2 bg-white rounded-lg shadow-md flex justify-center items-center">
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

            <div className="col-span-2 px-8 py-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl text-primary-default text-center mb-4">
                App Users per City
              </h2>
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

            {/* Bar Graph */}
            <div className="col-span-3 px-8 py-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl text-primary-default text-center mb-4">
                App Users per City
              </h2>
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
          </div>
        </div>
      </section>
    </>
  );
}
