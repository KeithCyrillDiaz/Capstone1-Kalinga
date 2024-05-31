import React, { useState, useEffect } from "react";
import {
  DonatePerMonthBarangay,
  RequestPerMonthBarangay,
  BarPerMonthBarangay,
  BarRequestPerMonth,
} from "../../components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";

export default function barangay() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [barangays, setBarangays] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCompleteDonations, setTotalCompleteDonations] = useState(0);
  const [totalDeclinedDonations, setTotalDeclinedDonations] = useState(0);
  const [totalCompleteRequests, setTotalCompleteRequests] = useState(0);
  const [totalDeclinedRequests, setTotalDeclinedRequests] = useState(0);
  const [totalAllMonthCompleteDonations, setTotalAllMonthCompleteDonations] = useState(0);
  const [totalAllMonthCompleteRequests, setTotalAllMonthCompleteRequests] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequestors, setTotalRequestors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalRequests, setTotalRequest] = useState(0);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

useEffect(() => {
  setSelectedMonth(currentMonth); 
  setSelectedYear(currentYear); 
  setSelectedBarangay ('Commonwealth')
}, []);

const handleSelectBarangay = (e) => {
  setSelectedBarangay(e.target.value);
};

useEffect(() => {
  const fetchBarangays = async () => {
    try {
      const response = await axios.get(`${WebHost}/kalinga/getAllBarangay`);
      setBarangays(response.data);
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };
  fetchBarangays();
}, []);
  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
  const monthValue = getMonthValue(selectedMonth);
    try {
      const responseComplete = await axios.get(
        `${WebHost}/kalinga/getTotalCompleteDonationPerBarangay`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
            selectedBarangay: selectedBarangay
          },
        }
      );
      const totalCompleteDonations = responseComplete.data.totalCompleteAppointments;
  
      const responseDecline = await axios.get(
        `${WebHost}/kalinga/getTotalDeclineDonationPerBarangay`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
            selectedBarangay: selectedBarangay

          },
        }
      );
      const totalDeclinedDonations = responseDecline.data.totalDeclineAppointments;
      setTotalCompleteDonations(totalCompleteDonations);
      setTotalDeclinedDonations(totalDeclinedDonations);
  
      const responseRequests = await axios.get(
        `${WebHost}/kalinga/getTotalCompleteRequestBarangay`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
            selectedBarangay: selectedBarangay,
          },
        }
      );
      const totalCompleteRequests = responseRequests.data.totalCompleteRequests;

      const responseDeclineRequests = await axios.get(
        `${WebHost}/kalinga/getTotalDeclineRequestBarangay`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
            selectedBarangay: selectedBarangay,
          },
        }
      );
      const totalDeclinedRequests = responseDeclineRequests.data.totalDeclineRequests;
      setTotalCompleteRequests(totalCompleteRequests);
      setTotalDeclinedRequests(totalDeclinedRequests);
      
      const donorsResponse = await axios.get(`${WebHost}/kalinga/getTotalDonorsPerBarangay`, {
        params: {
          selectedMonth: monthValue,
          selectedYear: parseInt(selectedYear),
          selectedBarangay: selectedBarangay,
        },
      });

      const requestorsResponse = await axios.get(`${WebHost}/kalinga/getTotalRequestorsPerBarangay`, {
        params: {
          selectedMonth: monthValue,
          selectedYear: parseInt(selectedYear),
          selectedBarangay: selectedBarangay,
        },
      });

      setTotalDonors(donorsResponse.data.totalDonors);
      setTotalRequestors(requestorsResponse.data.totalRequestors);

      const responseAppointments = await axios.get(
        `${WebHost}/kalinga/getTotalAppointmentsBarangay`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
            selectedBarangay: selectedBarangay,
          },
        }
      );
      setTotalAppointments(responseAppointments.data.totalAppointments);   
      
      const response = await axios.get(`${WebHost}/kalinga/getTotalRequestsPerMonthAndYearBarangay`, {
        params: {
          selectedMonth: monthValue,
          selectedYear: parseInt(selectedYear),
          selectedBarangay: selectedBarangay,
        },        

      });
      setTotalRequest(response.data.totalRequests);  
      const responseAllComplete = await axios.get(`${WebHost}/kalinga/getTotalCompleteDonationsAllMonthsBarangay`, { params: { selectedYear: selectedYear, selectedBarangay: selectedBarangay, } });
      const totalAllMonthCompleteDonations = responseAllComplete.data.reduce((acc, curr) => acc + curr.totalCompleteDonations, 0);
      setTotalAllMonthCompleteDonations(totalAllMonthCompleteDonations);
      console.log ("All Months", totalAllMonthCompleteDonations )
      console.log ("response", responseAllComplete )


      const responseAllRequests = await axios.get(`${WebHost}/kalinga/getTotalCompleteRequestAllMonthsBarangay`, { params: { selectedYear: selectedYear, selectedBarangay: selectedBarangay,  } });
      const totalAllMonthCompleteRequests = responseAllRequests.data.reduce((acc, curr) => acc + curr.totalCompleteRequests, 0);
      setTotalAllMonthCompleteRequests(totalAllMonthCompleteRequests);

      return {
        responseComplete: responseComplete.data,
        responseDecline: responseDecline.data,
        responseRequests: responseRequests.data,
        responseDeclineRequests: responseDeclineRequests.data,
      };
    } catch (error) {
    // Handle Axios errors
    console.error("Axios Error:", error);

    // Check if error response exists and handle it
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
    } else if (error.request) {
      // Handle request without response (e.g., network error)
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    // Throw error to be caught by caller
    throw new Error("Error fetching data");
  }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear && selectedBarangay) {
      fetchData();
    }
  }, [selectedMonth, selectedYear, selectedBarangay]);
  
  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const {
        responseComplete,
        responseDecline,
        responseRequests,
        responseDeclineRequests,
      } = await fetchData(selectedMonth, selectedYear, selectedBarangay);
  
      console.log("Donate Data:", responseComplete);
      console.log("Request Data:", responseRequests);
  
      const doc = new jsPDF();
  
      doc.setTextColor("#000000");
      doc.setFont("helvetica", "bold")
      doc.setFontSize(20);
      doc.text("KALINGA MONTHLY REPORT", 105, 15, { align: "center" });
      doc.text(`${selectedBarangay} ${selectedMonth} ${selectedYear}`, 105, 30, { align: "center" });

      doc.setTextColor("#000000");
  
      doc.setFontSize(14);
      doc.text(
        `Donation Report`,
        14,
        40
      );
  
      // Set table header fill color to pink
      doc.setFillColor("#FF69B4");
  
      doc.autoTable({
        startY: 45,
        headStyles: { fillColor: "#ED5077" },   // Pink color
        head: [["Category", "Value"]],
        body: [
          ["Total Complete Donations", responseComplete.totalCompleteAppointments],
          ["Total Declined Donations", responseDecline.totalDeclineAppointments],
        ],
      });
  
      doc.text(
        `Request Monthly Report`,
        14,
        doc.autoTable.previous.finalY + 10
      );
  
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        headStyles: { fillColor: "#ED5077" },   // Pink color
        head: [["Category", "Value"]],
        body: [
          ["Total Complete Requests", responseRequests.totalCompleteRequests],
          ["Total Declined Requests", responseDeclineRequests.totalDeclineRequests],
        ],
      });

      doc.text(
        `Overview Monthly Report`,
        14,
        doc.autoTable.previous.finalY + 10
      );
  
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        headStyles: { fillColor: "#ED5077" },   // Pink color
        head: [["Category", "Value"]],
        body: [
          ["Added Donor Users", totalDonors],
          ["Added Requestor Users", totalRequestors],
          ["Total Appointments", totalAppointments],
          ["Total Requests", totalRequests],
          ["Total All Month Complete Requests", totalAllMonthCompleteRequests], 
          ["Total All Month Complete Donations", totalAllMonthCompleteDonations], 

        ],
      });

      
  
      doc.save( `${selectedBarangay} monthly_reports.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError("Error downloading PDF");
    } finally {
      setLoading(false);
    }
  };
  


  const getMonthValue = (monthName) => {
    const monthsMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    return monthsMap[monthName];
  };

  const handleSelectMonth = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
  };

  const handleSelectYear = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
  };


  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
    console.log("Is filter visible:", !isFilterVisible);
  };


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
          <a
            href={seeMore}
            className="text-sm font-light italic font-sans underline"
          >
            See more
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="w-full h-auto bg-primary-body overflow-hidden">
        <div className="p-12 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-2">
              Barangay Report
            </h1>
          </div>

          <div className="px-2">
            <div className="flex flex-col items-end  lg:gap-x-3">
              <div className="flex flex-row gap-x-2">
                <button
                  onClick={toggleFilterVisibility}
                  className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600 flex items-center"
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
                <button 
                onClick={handleDownloadPDF}
                className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600 flex items-center">
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"
                    ></path>
                  </svg>
                  Export as PDF
                </button>
              </div>

              {isFilterVisible && (
                <div className="mt-2 w-auto gap-x-4 bg-neutral-variant flex p-2 px-6 pb-4 rounded-md shadow-md justify-end">
                  <div className="border-b border-primary-default">
                    <label className="text-xs text-primary-default">
                      Month
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={handleSelectMonth}
                      className="bg-white text-primary-default text-xl py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                    >
                      <option value="">Select a Month</option>
                      {months.map((month) => (
                        <option key={month.id} value={month.name}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className=" border-b border-primary-default">
                    <label className="text-xs text-primary-default">Year</label>
                    <select
                      value={selectedYear}
                      onChange={handleSelectYear}
                      className="bg-white text-primary-default text-xl py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                    >
                      <option value="">Select a year</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                  <div className=" border-b border-primary-default">
                    <label className="text-xs text-primary-default">Barangay</label>
                    <select
                      value={selectedBarangay}
                      onChange={handleSelectBarangay}
                      className="bg-white text-primary-default text-xl py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                    >
                      <option value="">Select a Barangay</option>
                      {barangays.map((barangay) => (
                        <option key={barangay} value={barangay}>
                          {barangay}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-2xl text-primary-default font-semibold font-sans py-4 pb-6">
                {" "}
                {/* nakadepende din dapat to sa filter */}
                Reports for {selectedBarangay} {selectedMonth} {selectedYear}
              </h1>
            </div>
            <div className="w-full flex justify-center gap-4">
              <div className="flex flex-col w-4/6 gap-4">
                {/* Transactions */}
                <div className="flex w-full justify-center gap-4">
                  <div className="flex items-center justify-center gap-x-4 w-full">
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
                      title="Added Donor Users"
                      count={totalDonors}
                      seeMore={"/admin/users"}
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
                      title="Added Requestor Users"
                      count={totalRequestors}
                      seeMore={"/admin/users"}
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
                      title="Appointments for the month"
                      count={totalAppointments}
                      seeMore={"/admin/donorAppointManage"}
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
                      title="Requests for the month"
                      count={totalRequests}                      
                      seeMore={"/admin/requestorManagement"}
                    />
                  </div>
                </div>

                {/* Overview */}
                <div className="flex flex-col  p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                  Overview
                  </h1>
                  <div>
                  
                  </div>
               
                  
                  <div className="absolute top-4 -right-1 text-white px-4 py-2">
                    <a href={"/admin/chart"} className="flex items-center">
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
                  <div className="flex flex-row">
                    <div className="py-2 ml-4">
                    
                      <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                        Donations
                      </h1>
                      <h1 className="text-4xl text-primary-default font-sans font-bold text-start ml-4">
                      {totalAllMonthCompleteDonations}

                      </h1>
                      <h3 className="text-sm  font-sans font-light text-start ml-4">
                        Total Overall Donations
                      </h3>
                    </div>
                    <div className="py-2 ml-32">
                      <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                        Requests
                      </h1>
                      <h1 className="text-4xl text-primary-default font-sans font-bold text-start ml-4">
                      {totalAllMonthCompleteRequests}
                      </h1>
                      <h3 className="text-sm  font-sans font-light text-start ml-4">
                        Total Overall Requests
                      </h3>
                    </div>
                  </div>
                  <div>
                  <BarPerMonthBarangay name="Total Requests" selectedYear={selectedYear} selectedBarangay={selectedBarangay}/>
                    
                  </div>
                </div>
              </div>
              {/* Analysis */}
              <div className="flex flex-col w-2/6 gap-4">
                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4">
                    Analysis
                  </h1>
                  <div className="px-4">
                    <div>
                      <h1 className="text-xl text-primary-default font-sans font-semibold text-start ml-4 mt-4">
                        Donations
                      </h1>
                    </div>
                    <div className="flex flex-row py-4 ml-4 gap-x-4">
                      <div>
                        <div className="flex flex-col px-4 py-10">
                          <h1 className="font-sans font-semibold text-center text-5xl text-primary-default">
                          {totalCompleteDonations}
                          </h1>
                          <h1 className="font-sans text-center text-sm text-primary-default">
                            Successful
                          </h1>
                          <hr className="my-4 border-t border-primary-default" />
                          <h1 className="font-sans font-semibold text-center text-5xl text-primary-default">
                          {totalDeclinedDonations}
                          </h1>
                          <h1 className="font-sans text-center text-sm text-primary-default">
                            Declined
                          </h1>
                        </div>
                      </div>
                      <div>
                      <DonatePerMonthBarangay
                      selectedMonth={selectedMonth}
                      selectedYear={selectedYear}
                      selectedBarangay = {selectedBarangay}
                    /></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm relative">
                  <h1 className="text-2xl text-primary-default font-sans font-semibold text-start ml-4"></h1>
                  <div className="px-4">
                    <div>
                      <h1 className="text-xl text-primary-default font-sans font-semibold text-start ml-4 mt-4">
                        Requests
                      </h1>
                    </div>
                    <div className="flex flex-row py-4 ml-4 gap-x-4">
                      <div>
                        <div className="flex flex-col px-4 py-10">
                          <h1 className="font-sans font-semibold text-center text-5xl text-primary-default">
                            {totalCompleteRequests}
                          </h1>
                          <h1 className="font-sans text-center text-sm text-primary-default">
                            Successful
                          </h1>
                          <hr className="my-4 border-t border-primary-default" />
                          <h1 className="font-sans font-semibold text-center text-5xl text-primary-default">
                          {totalDeclinedRequests}
                          </h1>
                          <h1 className="font-sans text-center text-sm text-primary-default">
                            Declined
                          </h1>
                        </div>
                      </div>
                      <div>
                      <RequestPerMonthBarangay
                      selectedMonth={selectedMonth}
                      selectedYear={selectedYear}
                      selectedBarangay = {selectedBarangay}
                    /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-flow-row-dense px-4 xl:grid-cols-2 gap-4 mt-6">
              <div className=" bg-white rounded-lg shadow-lg p-4 pb-10 ">
                <span clas>
                  <DonatePerMonth
                    name="Donations"
                    className="flex justify-center"
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                  />
                </span>
              </div>

              <div className=" bg-white rounded-lg shadow-lg p-4 pb-10 ">
                <span className="lg:pt-4 lg:pb-8 xl:p-0">
                  <RequestPerMonth
                    name="Requests"
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                  />
                </span>
              </div>

              <div className=" bg-white rounded-lg shadow-lg p-4 pb-10 ">
                <span className="lg:pt-4 lg:pb-8 xl:p-0 mt-8">
                  <BarDonatePerMonth name="Total Donation" />
                </span>
              </div>

              <div className=" bg-white rounded-lg shadow-lg p-4 pb-10 ">
                <span className="lg:pt-4 lg:pb-8 xl:p-0 mt-8">
                  <BarRequestPerMonth name="Total Request" />
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}