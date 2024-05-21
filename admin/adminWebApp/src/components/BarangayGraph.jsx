import React, { useState, useEffect } from "react";
import { WebHost } from "../../MyConstantAdmin";
import axios from "axios";
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

export default function BarangayGraph({ name }) {
  const [barangaysData, setBarangaysData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${WebHost}/kalinga/getTotalUsersPerBarangay`
      );
      console.log("Response from API:", response.data); 
      
      const mergedData = response.data.totalRequestorsPerBarangay.map((requestor) => {
        const donor = response.data.totalDonorsPerBarangay.find((d) => d._id === requestor._id);
        return {
          _id: requestor._id,
          totalRequestors: requestor.totalRequestors,
          totalDonors: donor ? donor.totalDonors : 0
        };
      });

      setBarangaysData(mergedData);
    } catch (error) {
      console.error("Error fetching total users per barangay:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <h1 className="text-3xl text-center text-primary-default">{name}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={barangaysData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalRequestors"
            fill="#ED5077"
            name="Total Requestors"
            barSize={50}
          />
          <Bar
            dataKey="totalDonors"
            fill="#007AFF"
            name="Total Donors"
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
