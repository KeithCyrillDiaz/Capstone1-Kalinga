import React, { useState } from "react";
import { DonatePerMonth, RequestPerMonth, BarDonatePerMonth, BarRequestPerMonth } from "../../components";


export default function () {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September'},
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];

  const handleSelectMonth = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    console.log('Selected month:', month); // Make sure this log prints the selected month
  };

  const handleSelectYear = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    console.log('Selected year:', year); // Make sure this log prints the selected year
  };

  const handleFetchData = () => {
    const monthYear = `${selectedMonth} ${selectedYear}`;
    console.log('Selected month-year:', monthYear); // Check the combined month and year
    // Now make your API call with the combined month and year
    // Example: axios.get(`${WebHost}/kalinga/getTotalDonationPerMonth?month=${encodeURIComponent(monthYear)}`);
  };


  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-10 py-12 px-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E60965"
              stroke-width="1.5"
              d="M9 21h6m-6 0v-5m0 5H3.6a.6.6 0 0 1-.6-.6v-3.8a.6.6 0 0 1 .6-.6H9m6 5V9m0 12h5.4a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6h-4.8a.6.6 0 0 0-.6.6V9m0 0H9.6a.6.6 0 0 0-.6.6V16"
            />
          </svg>
          <h1 className="text-5xl text-primary-default">Reports</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />
        <div className="px-8 py-4">
          <div className="flex flex-row items-center justify-center xl:gap-x-6 lg:gap-x-3">
            <h1 className="w-full text-3xl text-primary-default">
              Total Donations & Requests each Month
            </h1>
             <div className="flex flex-row items-center justify-center gap-x-6">
            <select
              value={selectedMonth}
              onChange={handleSelectMonth}
              className="block appearance-none w-50 bg-white border border-primary-default text-xl text-primary-default py-4 px-5 pr-8 rounded-xl focus:outline-none"
            >
              <option value="">Select a month</option>
              {months.map((month) => (
                <option key={month.id} value={month.name}>
                  {month.name}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={handleSelectYear}
              className="block appearance-none w-50 bg-white border border-primary-default text-xl text-primary-default py-4 px-5 pr-8 rounded-xl focus:outline-none"
            >
              <option value="">Select a year</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          </div>
          </div>
        <div>
          <div className="grid grid-flow-row-dense px-4 xl:grid-cols-2 gap-x-4 ">
            <span>
            <DonatePerMonth name="Donations" selectedMonth={selectedMonth} selectedYear={selectedYear} />
            </span>
            <span className="lg:pt-4 lg:pb-8 xl:p-0">
            <RequestPerMonth name="Requests" selectedMonth={selectedMonth} selectedYear={selectedYear}/>
            </span>
            <span className="lg:pt-4 lg:pb-8 xl:p-0 mt-8">
            <BarDonatePerMonth name="Total Donation"/>
            </span>
            <span className="lg:pt-4 lg:pb-8 xl:p-0 mt-8">
            <BarRequestPerMonth name="Total Request"/>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
