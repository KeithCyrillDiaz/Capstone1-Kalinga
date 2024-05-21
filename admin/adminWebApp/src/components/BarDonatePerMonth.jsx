import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
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

export default function BarDonatePerMonth({ name }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch total complete donations
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteDonationsAllMonths`
        );
        // Fetch total decline donations
        const responseDecline = await axios.get(
          `${WebHost}/kalinga/getTotalDeclineDonationsAllMonths`
        );
        // Merge the data from both responses
        const mergedData = mergeData(
          responseComplete.data,
          responseDecline.data
        );
        setMonthlyData(mergedData);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mergeData = (completeData, declineData) => {
    return completeData.map((completeItem) => ({
      month: completeItem.month,
      totalCompleteDonations: completeItem.totalCompleteDonations,
      totalDeclineDonations:
        declineData.find((item) => item.month === completeItem.month)
          ?.totalDeclineDonations || 0,
    }));
  };

  const COLORS = ["#ED5077", "#007AFF"]; // Add blue color for decline donations

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Monthly data:", monthlyData); // Log monthly data for debugging

  return (
    <div>
      <h1 className="text-3xl text-center text-primary-default">{name}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, "auto"]} /> {/* Adjust the YAxis domain */}
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalCompleteDonations"
            fill={COLORS[0]}
            name="Total Complete Donations"
          />
          <Bar
            dataKey="totalDeclineDonations"
            fill={COLORS[1]}
            name="Total Decline Donations"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
