import React, { useState } from "react";
import {
  DonatePerMonth,
  RequestPerMonth,
  BarDonatePerMonth,
  BarRequestPerMonth,
} from "../../components";

export default function () {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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

  const handleSelectMonth = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    console.log("Selected month:", month); // Make sure this log prints the selected month
  };

  const handleSelectYear = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    console.log("Selected year:", year); // Make sure this log prints the selected year
  };

  const handleFetchData = () => {
    const monthYear = `${selectedMonth} ${selectedYear}`;
    console.log("Selected month-year:", monthYear); // Check the combined month and year
    // Now make your API call with the combined month and year
    // Example: axios.get(`${WebHost}/kalinga/getTotalDonationPerMonth?month=${encodeURIComponent(monthYear)}`);
  };

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <section className="w-full h-auto bg-primary-body overflow-hidden">
        <div className="p-8 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-2">
              Monthly Report
            </h1>
          </div>

          <div className="px-8 ">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
