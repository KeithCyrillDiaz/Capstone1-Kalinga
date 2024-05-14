import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from '../../MyConstantSuperAdmin';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function DonatePerMonth({ name, selectedMonth, selectedYear }) {
  const [totalCompleteDonations, setTotalCompleteDonations] = useState(0);
  const [totalDeclinedDonations, setTotalDeclinedDonations] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      // Convert selectedMonth to a numerical value if it's a string
      const monthValue = isNaN(parseInt(selectedMonth)) ? getMonthValue(selectedMonth) : parseInt(selectedMonth);
    
      try {
        console.log('Fetching data for:', monthValue, selectedYear);
        const response = await axios.get(`${WebHost}/kalinga/getTotalCompleteDonationPerMonth`, {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          }
        });
        const completeData = response.data;
        console.log('Complete data:', completeData); // Log complete data received
        setTotalCompleteDonations(completeData.totalCompleteAppointments);

        const Declineresponse = await axios.get(`${WebHost}/kalinga/getTotalDeclineDonationPerMonth`, {
          params: {
            selectedMonth: monthValue,
            selectedYear: parseInt(selectedYear),
          }
        });
        const declineData = Declineresponse.data;
        console.log('Decline data:', declineData); // Log complete data received
        setTotalDeclinedDonations(declineData.totalDeclineAppointments);
      } catch (error) {
        console.error('Error fetching total donations:', error);
        // Do not set the error state here to prevent showing the error message
      } finally {
        setLoading(false);
      }
    };
  
    fetchData(); // Always fetch data regardless of dependencies
  }, [selectedMonth, selectedYear]);

  // Helper function to get numerical month value from string month name
  const getMonthValue = (monthName) => {
    const monthsMap = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    return monthsMap[monthName] || null;
  };

  const chartData = [
    { name: "Successful", value: totalCompleteDonations },
    { name: "Unsuccessful", value: totalDeclinedDonations }, // Placeholder value for now
  ];

  const COLORS = ["#ED5077", "#67C5F8"];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-row items-end justify-center gap-x-8">
        <ResponsiveContainer height={300} width={250}>
          <h1 className="text-3xl text-center text-primary-default">{name}</h1>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid items-center justify-center grid-flow-row-dense gap-y-6">
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">{totalCompleteDonations}</h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Complete
            </p>
          </div>
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">{totalDeclinedDonations}</h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Decline
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
