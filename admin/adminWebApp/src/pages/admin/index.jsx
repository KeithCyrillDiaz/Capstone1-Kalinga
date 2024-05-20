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
        const responseDonors = await axios.get(`${WebHost}/kalinga/getTotalDonor`);
        setTotalDonors(responseDonors.data.totalDonors || 0);
      } catch (error) {
        console.error("Error fetching total donors:", error);
      }
  
      try {
        const responseRequestors = await axios.get(`${WebHost}/kalinga/getTotalRequestor`);
        setTotalRequestors(responseRequestors.data.totalRequestors || 0);
      } catch (error) {
        console.error("Error fetching total requestors:", error);
      }
  
      try {
        const responseUsers = await axios.get(`${WebHost}/kalinga/getTotalUser`);
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
        const response = await axios.get(`${WebHost}/kalinga/getTotalUsersPerCity`);
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
      <section className="w-full bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-2xl text-primary-default font-bold font-sans py-4 mt-6 pb-6">
              Welcome, {username} Admin!
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-6 justify-center">
            {/* Total Donor Users */}
            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div className="grid grid-rows-3 grid-flow-col gap-2">
                {/* SVG Icon */}
                <div className="row-span-3 mt-4">
                  {/* Your SVG Icon */}
                </div>
                {/* Total Donor Users Title */}
                <div className="col-span-2">
                  <span className="text-2xl text-primary-default mt-4 text-center">
                    Total Donor Users
                  </span>
                </div>
                {/* Total Donor Users Count */}
                <div className="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalDonors}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Requestor Users */}
            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div className="grid grid-rows-3 grid-flow-col gap-2">
                {/* SVG Icon */}
                <div className="row-span-3 mt-4">
                  {/* Your SVG Icon */}
                </div>
                {/* Total Requestor Users Title */}
                <div className="col-span-2">
                  <span className="text-2xl text-primary-default mt-4 text-center">
                    Total Requestor Users
                  </span>
                </div>
                {/* Total Requestor Users Count */}
                <div className="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalRequestors}
                  </span>
                </div>
              </div>
            </div>

            {/* Total App Users */}
            <div className="px-2 py-4 bg-white rounded-lg shadow-md flex justify-center items-center">
              <div className="grid grid-rows-3 grid-flow-col gap-2">
                {/* SVG Icon */}
                <div className="row-span-3 mt-4">
                  {/* Your SVG Icon */}
                </div>
                {/* Total App Users Title */}
                <div className="col-span-2">
                  <span className="text-2xl text-primary-default mt-4 text-center">
                    Total App Users
                  </span>
                </div>
                {/* Total App Users Count */}
                <div className="row-span-2 col-span-2 ">
                  <span className="text-center text-5xl font-semibold text-primary-default flex justify-center">
                    {totalUsers}
                  </span>
                </div>
              </div>
            </div>


            {/* Bar Graph */}
            <div className="col-span-4 px-8 py-8 bg-white rounded-lg shadow-md">
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