import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function RequestPieChart({ name }) {
  const [totalCompleteRequests, setTotalCompleteRequests] = useState(0);
  const [totalDeclinedRequests, setTotalDeclinedRequests] = useState(0);

  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getCompleteRequestsTotal`
        );
        const responseDeclined = await axios.get(
          `${WebHost}/kalinga/getDeclinedRequestsTotal`
        );

        setTotalCompleteRequests(responseComplete.data.totalCompleteRequests);
        setTotalDeclinedRequests(responseDeclined.data.totalDeclinedRequests);
      } catch (error) {
        console.error(error); // Log any errors
      }
    };

    fetchRequestsData();
  }, []);

  const chartData = [
    { name: "Complete", value: totalCompleteRequests },
    { name: "Decline", value: totalDeclinedRequests },
  ];

  const COLORS = ["#ED5077", "#67C5F8"];

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
            <Tooltip formatter={(value) => `${value}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid items-center justify-center grid-flow-row-dense gap-y-6">
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">
              {totalCompleteRequests}
            </h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Complete
            </p>
          </div>
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">
              {totalDeclinedRequests}
            </h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Decline
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
