import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from '../../MyConstantSuperAdmin';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchCounts = async () => {
      try {
        const responseUsers = await axios.get(`${WebHost}/kalinga/getTotalUser`);
        console.log("Users Response:", responseUsers.data); // Log the response data
        setTotalUsers(responseUsers.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
        if (error.response) {
          console.log("Response data:", error.response.data); // Log the response data if available
        }
      }
    };

    fetchCounts();
  }, []);

  const totalSuccessfulUser = totalUsers;

  const chartData = [
    { name: "QCGH", value: totalSuccessfulUser },
    { name: "Manila Human Milk Bank", value: 4 },
    { name: "Makati Milk Bank", value: 6 },
  ];

  const COLORS = ["#ED5077", "#67C5F8", "#82ca9d"];

  return (
    <>
      <div className="flex flex-row items-start justify-center gap-x-8">
        <ResponsiveContainer height={300} width={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60} // This makes it a donut chart
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-start mt-8"> {/* Adjust margin-top to move the legend lower */}
          <ul>
            {chartData.map((item, index) => (
              <li key={item.name} className="flex items-center my-1">
                <div
                  className="w-4 h-4 mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
