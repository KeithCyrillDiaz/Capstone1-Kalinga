import React from "react";
import { PieChart, LoadPercentage } from "@components";

export default function () {
  return (
    <>
      <section className="w-full min-h-screen bg-neutral-variant">
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
            <div className="flex flex-row items-center justify-center gap-x-3 px-4 bg-white border xl:w-1/2 lg:w-[60%] rounded-3xl border-primary-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#E60965"
                  d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.99.99 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75zM7.04 5L11 10.06v5.52l2 2v-7.53L16.96 5z"
                />
              </svg>
              <input
                type="text"
                className="w-full text-xl bg-transparent border-none outline-none focus:ring-0 placeholder:text-primary-default text-primary-default"
                placeholder="Filter"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path fill="#E60965" d="m7 10l5 5l5-5z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-flow-row-dense px-4 xl:grid-cols-2 gap-x-4">
            <span>
              <PieChart name="Donations" />
            </span>
            <span className="lg:pt-4 lg:pb-8 xl:p-0">
              <PieChart name="Requests" />
            </span>
          </div>
          <LoadPercentage name="Lactating Mothers" />
        </div>
      </section>
    </>
  );
}
