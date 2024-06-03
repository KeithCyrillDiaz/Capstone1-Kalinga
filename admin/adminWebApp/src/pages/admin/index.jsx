import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { PieChart, LoadPercentage, RequestPieChart } from "@components";
import { AdminLogin } from "../../api/AdminLogin";
import { useParams } from "react-router-dom";
import { BarDonationOverAll, BarRequestOverAll, LineGraphTotalUserPerMonth,BarangayGraph } from "../../components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';
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
import { checkId, getId } from "../../functions/Authentication";
import { NotFound } from "../../layouts/NotFoundExportConst";
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
  const [totalPendingAppointments, setTotalPendingAppointments] = useState(0);
  const [totalPendingRequest, setTotalPendingRequest] = useState(0);
  const [totalCompleteDonations, setTotalCompleteDonations] = useState(0);
  const [totalCompleteRequests, setTotalCompleteRequests] = useState(0);
  const [topDonatingUsers, setTopDonatingUsers] = useState([]);
  const [topRequestingUsers, setTopRequestingUsers] = useState([]);
  const [topDonatingBarangay, setTopDonatingBarangay] = useState([]);
  const [topRequestingBarangay, setTopRequestingBarangay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false)



  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;


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

      try {
        const responsePendingAppointments = await axios.get(
          `${WebHost}/kalinga/getTotalPendingAppointment`
        );
        setTotalPendingAppointments(
          responsePendingAppointments.data.totalPendingAppointments || 0
        );
      } catch (error) {
        console.error("Error fetching total pending appointments:", error);
      }

      try {
        const responsePendingRequest = await axios.get(
          `${WebHost}/kalinga/getTotalPendingRequest`
        );
        setTotalPendingRequest(
          responsePendingRequest.data.totalPendingRequest || 0
        );
      } catch (error) {
        console.error("Error fetching total pending appointments:", error);
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

        setBarangaysData(mergedData); 
        console.log("Barangays Data:", mergedData);
        console.log("response Data:", response.data); 
      } catch (error) {
        console.error("Error fetching total users per barangay:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCompleteDonation = await axios.get(`${WebHost}/kalinga/getCompleteDonationsTotal`);
        console.log("Response Complete Donations:", responseCompleteDonation.data);
        setTotalCompleteDonations(responseCompleteDonation.data.totalCompleteDonations);
        
        const responseCompleteRequest = await axios.get(`${WebHost}/kalinga/getCompleteRequestsTotal`);
        console.log("Response Complete Requests:", responseCompleteRequest.data);
        setTotalCompleteRequests(responseCompleteRequest.data.totalCompleteRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Donationresponse = await axios.get(`${WebHost}/kalinga/getHighestDonation`);
        const Requestresponse = await axios.get(`${WebHost}/kalinga/getHighestRequestors`);
        console.log("Top Donating Users Response:", Donationresponse.data); 
        console.log("Top Donating Users Response:", Requestresponse.data); 

        setTopDonatingUsers(Donationresponse.data.data || []); 
        setTopRequestingUsers(Requestresponse.data.data || []); 

      } catch (error) {
        console.error('Error fetching top donating users:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BarangayDonationresponse = await axios.get(`${WebHost}/kalinga/getHighestDonationBarangay`);
        const BarangayRequestresponse = await axios.get(`${WebHost}/kalinga/getHighestRequestBarangay`);
        console.log("Top Donating Users Response:", BarangayDonationresponse.data); 
        console.log("Top Donating Users Response:", BarangayRequestresponse.data); 

        setTopDonatingBarangay(BarangayDonationresponse.data.data || []); 
        setTopRequestingBarangay(BarangayRequestresponse.data.data || []); 

      } catch (error) {
        console.error('Error fetching top donating users:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleDownloadPDFTopDonatingBarangay = () => {
    const doc = new jsPDF();
    const title = "Kalinga Top Donating Barangay"; // Set the title
    
    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: "center" });
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Barangay", "Milk Amount (ml)"]],
      body: topDonatingBarangay.map(({ barangay, milkAmount }) => [barangay, milkAmount]),
      startY: 40, // Adjust startY value to leave space for the title
    });
  
    // Check if the PDF is generated correctly
    console.log(doc.output("datauristring")); // Log the PDF data URI
  
    // Set the file name using the title
    doc.save(`${title.toLowerCase().replace(/\s/g, "_")}.pdf`);
};

  const handleDownloadPDFTopRequestingBarangay = () => {
    const doc = new jsPDF();
    const title = "Kalinga Top Requesting Barangay"; // Set the title

    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: "center" });
  
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Barangay", "Milk Amount (ml)"]],
      body: topRequestingBarangay.map(({ barangay, totalMilkAmount }) => [barangay, totalMilkAmount]),
      startY: 40, // Adjust startY value to leave space for the title
    });
  
    // Check if the PDF is generated correctly
    console.log(doc.output("datauristring")); // Log the PDF data URI
  
    // Check if the download is triggered
    doc.save(`${title.toLowerCase().replace(/\s/g, "_")}.pdf`);
  };

  const handleDownloadPDFTopDonatingUser = () => {
    const doc = new jsPDF();
    const title = "Kalinga Top Donating User"; // Set the title

    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: "center" });
  
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Fullname", "Milk Amount (ml)"]],
      body: topDonatingUsers.map(({ fullName, milkAmount }) => [fullName, milkAmount]),
      startY: 40, // Adjust startY value to leave space for the title
    });
  
    // Check if the PDF is generated correctly
    console.log(doc.output("datauristring")); // Log the PDF data URI
  
    // Check if the download is triggered
    doc.save(`${title.toLowerCase().replace(/\s/g, "_")}.pdf`);
  };

  const handleDownloadPDFTopRequestingUser = () => {
    const doc = new jsPDF();
    const title = "Kalinga Top Requesting User"; // Set the title

    
    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: "center" });
  
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Fullname", "Milk Amount (ml)"]],
      body: topRequestingUsers.map(({ fullName, totalMilkAmount }) => [fullName, totalMilkAmount]),
      startY: 40, // Adjust startY value to leave space for the title
    });
  
    // Check if the PDF is generated correctly
    console.log(doc.output("datauristring")); // Log the PDF data URI
  
    // Check if the download is triggered
    doc.save(`${title.toLowerCase().replace(/\s/g, "_")}.pdf`);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const DashboardCard = ({ icon, title, count, seeMore }) => {
    return (
      <div className="flex flex-col h-32 p-2 pr-3 bg-white rounded-2xl shadow-sm w-1/4">
           
        <div className="flex justify-end">
          <span className="text-md font-sans text-primary-default ">
            {title}
          </span>
        </div>
        <div className="flex flex-row justify-start items-center w-full mt-2">
          {icon}
          <span className="flex-grow text-5xl font-sans font-bold text-primary-default text-right pr-2">
            {count}
          </span>
        </div>
        <div className="flex justify-end mt-2">
          <Link
            to={seeMore}
            className="text-sm font-light italic font-sans underline"
          >
            See more
          </Link>
        </div>
      </div>
    );
  };
  const [id, setId]=useState(null)
  useEffect(() => {
    const storedId = getId();
    if (storedId) {
      setId(storedId);
    } else {
      const newId = generateId();
      saveId({ id: newId });
      setId(newId);
    }
  }, []);

  if(id)
  return (
    <>
    <div className="overflow-y-auto">
    <section className="w-full h-full bg-primary-body overflow-y-auto rounded-xl">
        <div className="p-12 pt-2">
          <div className="py-4">
            <h1 className="text-2xl text-primary-default font-bold font-sans py-">
              Welcome, QCGH Human Milk Bank Admin!
            </h1>
            <h3 className="text-md text-primary-default font-light font-sans pb-3">
              Here’s the overview for Quezon City
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex w-full justify-center gap-4">
              <div className="flex items-center justify-center gap-x-4 w-4/6">
                <DashboardCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      className="rounded-full bg-primary-default p-2 ml-2"
                    >
                      <path
                        fill="none"
                        stroke="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h.5m7.5 7l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.24 2.24 0 0 0-3.129-.006l-.224.22l-.223-.22a2.24 2.24 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z"
                      ></path>
                    </svg>
                  }
                  title="Total Donor Users"
                  count={totalDonors}
                  seeMore={`/admin/${id}/users`}
                />
                <DashboardCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      className="rounded-full bg-primary-default p-2 ml-2"
                    >
                      <path
                        fill="none"
                        stroke="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3m3 7l5-5m0 4.5V17h-4.5"
                      ></path>
                    </svg>
                  }
                  title="Total Requestor Users"
                  count={totalRequestors}
                  seeMore={`/admin/${id}/users`}
                />
                <DashboardCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      className="rounded-full bg-primary-default p-2 ml-2"
                    >
                      <path
                        fill="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                      ></path>
                    </svg>
                  }
                  title="Pending Appointment"
                  count={totalPendingAppointments}
                  seeMore={`/admin/${id}/donorAppointManage`}
                />
                <DashboardCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="-0.5 -0.5 24 24"
                      className="rounded-full bg-primary-default p-2 ml-2"
                    >
                      <path
                        fill="#FFFFFF"
                        d="m21.289.98l.59.59c.813.814.69 2.257-.277 3.223L9.435 16.96l-3.942 1.442c-.495.182-.977-.054-1.075-.525a.928.928 0 0 1 .045-.51l1.47-3.976L18.066 1.257c.967-.966 2.41-1.09 3.223-.276zM8.904 2.19a1 1 0 1 1 0 2h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a1 1 0 0 1 2 0v4a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4z"
                      ></path>
                    </svg>
                  }
                  title="Pending Requests"
                  count={totalPendingRequest}
                  seeMore={`/admin/${id}/requestorManagement`}
                />
              </div>
              <div className="flex items-center justify-center h-32 bg-white rounded-2xl shadow-sm w-2/6">
                <div className="flex items-center -ml-28 h-full bg-primary-default rounded-l-2xl p-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#FFFFFFFF"
                      d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center ml-10">
                  <div className="flex items-top font-sans ">Today is</div>
                  <p className="text-2xl font-bold text-primary-default font-sans">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center gap-4">
              <div className="flex flex-col w-4/6 gap-4">
                {/* Transactions */}
                <div className="flex flex-col  p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Transaction Overview
                  </h1>
                  <div className="absolute top-4 -right-1 text-white px-4 py-2">
                    <a href={`/admin/${id}/chart`} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        className="cursor-pointer"
                      >
                        <path
                          fill="#E60965"
                          fillRule="evenodd"
                          d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8.5a.5.5 0 0 0-1 0V12H3V3h3.5a.5.5 0 0 0 0-1zm9.854.146a.5.5 0 0 1 .146.351V5.5a.5.5 0 0 1-1 0V3.707L6.854 8.854a.5.5 0 1 1-.708-.708L11.293 3H9.5a.5.5 0 0 1 0-1h3a.499.499 0 0 1 .354.146"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="py-2 ml-4">
                    <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                      Donations
                    </h1>
                    <h1 className="text-4xl text-primary-default font-sans font-bold text-start ml-4">
                    {totalCompleteDonations}
                    </h1>
                    <h3 className="text-sm font-sans font-light text-start ml-4">
                      Total Overall Donations
                    </h3>
                    <div><BarDonationOverAll/></div>
                  </div>
                  <div className="py-2 ml-4">
                    <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                      Requests
                    </h1>
                    <h1 className="text-4xl text-primary-default font-sans font-bold text-start ml-4">
                    {totalCompleteRequests}

                    </h1>
                    <h3 className="text-sm font-sans font-light text-start ml-4">
                      Total Overall Requests
                    </h3>
                    <div><BarRequestOverAll/></div>
                  </div>
                </div>
                {/* Barangays */}
                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Barangays
                  </h1>
                  <h3 className="text-md font-sans font-light text-start ml-4">
                    Registered Barangays: {barangaysData.length}
                  </h3>
                  <div className="absolute top-4 -right-1 text-white px-4 py-2">
                    <a href={"/"} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        className="cursor-pointer"
                      >
                        <path
                          fill="#E60965"
                          fillRule="evenodd"
                          d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8.5a.5.5 0 0 0-1 0V12H3V3h3.5a.5.5 0 0 0 0-1zm9.854.146a.5.5 0 0 1 .146.351V5.5a.5.5 0 0 1-1 0V3.707L6.854 8.854a.5.5 0 1 1-.708-.708L11.293 3H9.5a.5.5 0 0 1 0-1h3a.499.499 0 0 1 .354.146"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>

                  <div className="py-2 ml-4">
                    <div><BarangayGraph/></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-2/6 gap-4">
                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Total App Users
                  </h1>
                  <div className="py-4 ml-4">
                    <h1 className="text-4xl text-primary-default font-sans font-bold text-start ml-4">
                    {totalUsers}
                    </h1>
                    <h3 className="text-sm text-primary-default font-sans font-light text-start ml-4">
                      Total Overall App Users
                    </h3>
                    <div><LineGraphTotalUserPerMonth/></div>
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                <div className="py-4 px-2 ml-4">
                <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4 pb-4">
                    Top Donating Barangay
                  </h1>
                  <div className="flex justify-end mb-4"> {/* Updated className */}
                    <button
                      onClick={handleDownloadPDFTopDonatingBarangay}
                      className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
                    >
                      Export as PDF
                    </button>
                  </div>
                      {topDonatingBarangay.map((user, index) => (
                        <div key={index} className="flex flex-row items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            className="cursor-pointer"
                          >
                            <path
                              fill="#E60965"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              fillRule="evenodd"
                              d="M12 20a7.97 7.97 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.97 7.97 0 0 1 12 20M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12m10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <h1 className="text-lg text-primary-default font-sans mt-1 text-start ml-4">
                            {user.barangay}
                          </h1>
                          <h1 className="text-lg text-primary-default font-sans font-light mt-1 ml-auto">
                            {user.milkAmount} ml
                          </h1>
                        </div>
                      ))}
                    </div>
                </div>

                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Top Requesting Barangay
                  </h1>
                  <div className="flex justify-end mb-4"> {/* Updated className */}
                    <button
                      onClick={handleDownloadPDFTopRequestingBarangay}
                      className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
                    >
                      Export as PDF
                    </button>
                  </div>
                  <div className="py-4 px-2 ml-4">
                    {topRequestingBarangay.map((user, index) => (
                      <div key={index} className="flex flex-row items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          className="cursor-pointer"
                        >
                          <path
                            fill="#E60965"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            fillRule="evenodd"
                            d="M12 20a7.97 7.97 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.97 7.97 0 0 1 12 20M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12m10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <h1 className="text-lg text-primary-default font-sans mt-1 text-start ml-4">
                            {user.barangay}
                          </h1>
                          <h1 className="text-lg text-primary-default font-sans font-light mt-1 ml-auto">
                            {user.totalMilkAmount} ml
                          </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Top Donating Users
                  </h1>
                  <div className="flex justify-end mb-4"> {/* Updated className */}
                    <button
                      onClick={handleDownloadPDFTopDonatingUser}
                      className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
                    >
                       Export as PDF
                    </button>
                  </div>
                  <div className="py-4 px-2 ml-4">
                    {topDonatingUsers.map((user, index) => (
                      <div key={index} className="flex flex-row items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          className="cursor-pointer"
                        >
                          <path
                            fill="#E60965"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            fillRule="evenodd"
                            d="M12 20a7.97 7.97 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.97 7.97 0 0 1 12 20M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12m10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <h1 className="text-lg text-primary-default font-sans mt-1 text-start ml-4">
                            {user.fullName}
                          </h1>
                          <h1 className="text-lg text-primary-default font-sans font-light mt-1 ml-auto">
                            {user.milkAmount} ml
                          </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Top Requesting Users
                  </h1>
                  <div className="flex justify-end mb-4"> {/* Updated className */}
                    <button
                      onClick={handleDownloadPDFTopRequestingUser}
                      className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
                    >
                       Export as PDF
                    </button>
                  </div>
                  <div className="py-4 px-2 ml-4">
                    {topRequestingUsers.map((user, index) => (
                      <div key={index} className="flex flex-row items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          className="cursor-pointer"
                        >
                          <path
                            fill="#E60965"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            fillRule="evenodd"
                            d="M12 20a7.97 7.97 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.97 7.97 0 0 1 12 20M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12m10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <h1 className="text-lg text-primary-default font-sans mt-1 text-start ml-4">
                            {user.fullName}
                          </h1>
                          <h1 className="text-lg text-primary-default font-sans font-light mt-1 ml-auto">
                            {user.totalMilkAmount} ml
                          </h1>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* <div className="flex w-full justify-center gap-4">
              <div className="flex flex-col items-center justify-center col-span-2 px-8 py-2 bg-white rounded-lg shadow-md w-1.5/5">
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
              </div>
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
            </div> */}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
