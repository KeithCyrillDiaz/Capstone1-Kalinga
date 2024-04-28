import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function ({ name }) {
  const chartData = [
    { name: "Value 1", value: 80 },
    { name: "Value 2", value: 20 },
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
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid items-center justify-center grid-flow-row-dense gap-y-6">
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">53</h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Successful
            </p>
          </div>
          <div className="px-6 py-2 bg-white border shadow-xl rounded-2xl border-primary-default">
            <h1 className="text-4xl text-center text-primary-default">0</h1>
            <p className="text-center 2xl:text-3xl xl:text-2xl text-primary-default">
              Unsuccessful
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
