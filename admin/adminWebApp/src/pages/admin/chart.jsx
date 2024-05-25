import React, { useState, useEffect } from "react";
import {
  DonatePerMonth,
  RequestPerMonth,
  BarDonatePerMonth,
  BarRequestPerMonth,
} from "../../components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";

export default function chart() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  const [totalDonors, setTotalDonors] = useState(0);
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
        `${WebHost}/kalinga/getTotalCompleteDonationPerMonth`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          },
        }
      );
  
      const responseDecline = await axios.get(
        `${WebHost}/kalinga/getTotalDeclineDonationPerMonth`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          },
        }
      );
  
      const responseRequests = await axios.get(
        `${WebHost}/kalinga/getTotalCompleteRequestPerMonth`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          },
        }
      );
  
      const responseDeclineRequests = await axios.get(
        `${WebHost}/kalinga/getTotalDeclineRequestPerMonth`,
        {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          },
        }
      );
  
      setLoading(false);
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
    fetchData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  
  const handleDownloadPDF = async () => {
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Year:", selectedYear);
  
    try {
      setLoading(true);
      setError(null);
  
      const {
        responseComplete,
        responseDecline,
        responseRequests,
        responseDeclineRequests,
      } = await fetchData(selectedMonth, selectedYear);
  
      console.log("Donate Data:", responseComplete);
      console.log("Request Data:", responseRequests);
  
      const doc = new jsPDF();
  
      // Set text color to pink
      doc.setTextColor("#FF69B4");
  
      // Add title at the top of the paper
      doc.setFontSize(20);
      doc.text("KALINGA MONTHLY REPORT", 105, 15, { align: "center" });
  
      // Reset text color to black
      doc.setTextColor("#000000");
  
      // Add selected month and year to the PDF
      doc.setFontSize(14);
      doc.text(
        `Donation Report for ${selectedMonth} ${selectedYear}`,
        14,
        30
      );
  
      // Set table header fill color to pink
      doc.setFillColor("#FF69B4");
  
      doc.autoTable({
        startY: 35,
        headStyles: { fillColor: [255, 105, 180] }, // Pink color
        head: [["Category", "Value"]],
        body: [
          ["Total Complete Donations", responseComplete.totalCompleteAppointments],
          ["Total Declined Donations", responseDecline.totalDeclineAppointments],
        ],
      });
  
      doc.text(
        `Request Monthly Report for ${selectedMonth} ${selectedYear}`,
        14,
        doc.autoTable.previous.finalY + 10
      );
  
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        headStyles: { fillColor: [255, 105, 180] }, // Pink color
        head: [["Category", "Value"]],
        body: [
          ["Total Complete Requests", responseRequests.totalCompleteRequest],
          ["Total Declined Requests", responseDeclineRequests.totalDeclineRequest],
        ],
      });
  
      doc.save("monthly_reports.pdf");
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
              Monthly Report
            </h1>
          </div>

            <div className="px-8 ">
              <div className="flex flex-col items-end xl:gap-x-6 lg:gap-x-3">
                <div className="flex gap-x-3">
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

                  <button
                    onClick={handleDownloadPDF}
                    className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-neutral-variant flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 36 36"
                      className="mr-2"
                    >
                      {/* Add SVG path for download icon */}
                    </svg>
                    Download PDF
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
                      <label className="text-xs text-primary-default">
                        Year
                      </label>
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
                  </div>
                )}
              </div>
            </div>
            <hr className="border-t-1 mt-4 border-primary-default" />
            <div>
              <div className="grid grid-flow-row-dense px-4 xl:grid-cols-2 gap-4 mt-6">
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
                  <span className>
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
            </div> 
          </div>
        </div>
      </section>
    </>
  );
}
