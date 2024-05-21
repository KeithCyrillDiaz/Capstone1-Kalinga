import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { PieChart, LoadPercentage, RequestPieChart } from "@components";
import { BarangayGraph } from "../../components";
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
//require("dotenv").config(); // Load environment variables

//const user = process.env.REACT_APP_ADMIN_USERNAME;

export default function Dashboard() {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequestors, setTotalRequestors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerCity, setUsersPerCity] = useState([]);
  const [totalRequestorsPerBarangay, setTotalRequestorsPerBarangay] = useState(
    []
  );
  const [totalDonorsPerBarangay, setTotalDonorsPerBarangay] = useState([]);
  const [barangaysData, setBarangaysData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getTotalUsersPerBarangay`
        );
        const { totalRequestorsPerBarangay, totalDonorsPerBarangay } =
          response.data;

        // Merge data for each barangay
        const mergedData = totalRequestorsPerBarangay.map((requestor) => ({
          ...requestor,
          totalDonors:
            totalDonorsPerBarangay.find((donor) => donor._id === requestor._id)
              ?.totalDonors || 0,
        }));

        setBarangaysData(mergedData); // Set barangaysData state
        console.log("Barangays Data:", mergedData); // Log the merged data
        console.log("response Data:", response.data); // Log the response data
      } catch (error) {
        console.error("Error fetching total users per barangay:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-full h-full bg-primary-body overflow-hidden">
        <div className="p-12 pt-2">
          <div>
            <h1 className="text-2xl text-primary-default font-bold font-sans py-4 mt-2 pb-6">
              Welcome, QCGH Human Milk Bank Admin!
            </h1>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* First Row */}
            {/* Total Donor */}
            <div className="flex w-full justify-center gap-4">
              <div className="flex items-center justify-center h-40 p-4 bg-white rounded-lg shadow-md w-1/5">
                <div className="flex items-center w-full">
                  <div className="flex justify-center items-center w-1/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="70"
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
                  <div className="flex flex-col items-center w-2/3">
                    <span className="text-lg text-primary-default pb-2">
                      Total Donor Users
                    </span>
                    <span className="text-5xl font-semibold text-primary-default pb-4">
                      {totalDonors}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Requestor  */}
              <div className="flex items-center justify-center h-40 p-4 bg-white rounded-lg shadow-md w-1/5">
                <div className="flex items-center w-full">
                  <div className="flex justify-center items-center w-1/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="70"
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
                  <div className="flex flex-col items-center w-2/3">
                    <span className="text-lg text-primary-default pb-2">
                      Total Requestor Users
                    </span>
                    <span className="text-5xl font-semibold text-primary-default pb-4">
                      {totalRequestors}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total App  */}
              <div className="flex items-center justify-center h-40 p-4 bg-white rounded-lg shadow-md w-1/5">
                <div className="flex items-center w-full">
                  <div className="flex justify-center items-center w-1/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="70"
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
                  <div className="flex flex-col items-center w-2/3">
                    <span className="text-lg text-primary-default pb-2">
                      Total App Users
                    </span>
                    <span className="text-5xl font-semibold text-primary-default pb-4">
                      {totalUsers}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pending Appointments  */}
              <div className="flex items-center justify-center h-40 p-4 bg-white rounded-lg shadow-md w-1/5">
                <div className="flex items-center w-full">
                  <div className="flex justify-center items-center w-1/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#E60965"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center w-2/3">
                    <span className="text-lg text-primary-default pb-2">
                      Pending Appointment
                    </span>
                    <span className="text-5xl font-semibold text-primary-default pb-4">
                      {totalDonors}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pending Requests  */}
              <div className="flex items-center justify-center h-40 p-4 bg-white rounded-lg shadow-md w-1/5">
                <div className="flex items-center w-full">
                  <div className="flex justify-center items-center w-1/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#E60965"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623a.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center w-2/3">
                    <span className="text-lg text-primary-default pb-2">
                      Pending Requests
                    </span>

                    <span className="text-5xl font-semibold text-primary-default pb-4">
                      {totalDonors}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex w-full justify-center gap-4">
              <div className="flex flex-col items-center justify-center col-span-5 px-8 py-8 bg-white rounded-lg shadow-md w-full">
                <h2 className="text-2xl text-primary-default text-center mb-4">
                  Percentage of Requests and Appointments
                </h2>
                <div className="w-full p-4">
                  <div className="py-3 bg-white rounded-2xl">
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

            {/* Third Row */}
            <div className="flex w-full justify-center gap-4">
              <div className="flex flex-col items-center justify-center col-span-2 px-8 py-8 bg-white rounded-lg shadow-md w-1/5">
                <h2 className="text-2xl text-center text-primary-default mt-2">
                  QCGH Human Milk Bank User Demographics
                </h2>
                <p className="text-md text-center text-primary-default font-sans">
                  Participating Barangays: {barangaysData.length}
                </p>
                {barangaysData &&
                  barangaysData.map((barangayData) => (
                    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-x-2 mt-10 px-10">
                      <div className="col-span-3">
                        <span className="text-lg text-primary-default font-bold mt-6">
                          {barangayData._id}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-md text-primary-default font-sans">
                          Requestor
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-md text-primary-default font-sans">
                          Donor
                        </span>
                      </div>
                      <div className="text-md text-primary-default font-sans text-right">
                        {barangayData.totalRequestors || 0}
                      </div>
                      <div className="text-md text-primary-default font-sans text-right">
                        {barangayData.totalDonors || 0}
                      </div>
                    </div>
                  ))}

                <div className="flex flex-col items-center justify-center col-span-3 px-8 py-8 bg-white rounded-lg shadow-md w-4/5">
                  <h2 className="text-2xl text-primary-default text-center mb-4">
                    App Users per Barangay
                  </h2>
                  <div className="w-full p-4">
                    <div className="py-3 bg-white rounded-2xl">
                      <span className="lg:pt-4 lg:pb-8 xl:p-0 mt-8">
                        <BarangayGraph name="" />
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
