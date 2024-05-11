import React, { useEffect } from "react";

export default function () {
  useEffect(() => {
    // Prevent scrolling of the entire page
    document.body.style.overflowY = "hidden";
    // Scrolling
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <section className="w-full min-h-screen bg-neutral-variant overflow-hidden">
        <div className="grid items-center justify-center grid-cols-[auto_1fr] gap-x-5 py-2 px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E60965"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m11.28 2.8l-.5.5a5.5 5.5 0 0 0-4.37-.43l-.08-.07A2.5 2.5 0 0 0 2.8 6.33l.07.08a5.5 5.5 0 0 0 .43 4.37l-.5.5a1.5 1.5 0 0 0 0 2.12l1.41 1.42a1.5 1.5 0 0 0 2.12 0l.35-.36l7.08 7.07a1.5 1.5 0 0 0 2.12 0l5.65-5.65a1.5 1.5 0 0 0 0-2.12l-7.07-7.08l.36-.35a1.5 1.5 0 0 0 0-2.12L13.4 2.8a1.5 1.5 0 0 0-2.12 0m2.48 2.47l-8.49 8.49l-1.41-1.42l8.48-8.48m2.48 7.77l-3.19 3.19l-1.06-1.06l3.19-3.19m3.18 3.19l-3.18 3.18l-1.07-1.06l3.19-3.19Z"
            ></path>
          </svg>

          <h1 className="text-3xl text-primary-default">Milkbanks</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />

        <div className="p-8">
          <div className="flex flex-row items-center xl:gap-x-6 lg:gap-x-3 justify-end">
            <div className="relative flex items-center bg-white border border-primary-default xl:w-1/2 lg:w-[60%] rounded-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="text-primary-default ml-10"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <input
                type="text"
                className="w-56 h-12 text-xl bg-transparent border-none outline-none pl-5 placeholder:text-primary-default text-primary-default"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        {/* first mb */}
        <div
          className="overflow-hidden flex flex-col gap-y-4 mt-4"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <div className="p-8 overflow-y-auto">
            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8em"
                height="8em"
                viewBox="0 0 640 512"
                className="text-primary-default ml-10"
              >
                <path
                  fill="currentColor"
                  d="M480 320a96 96 0 1 0-96-96a96 96 0 0 0 96 96m48 32a22.88 22.88 0 0 0-7.06 1.09a124.76 124.76 0 0 1-81.89 0A22.82 22.82 0 0 0 432 352a112 112 0 0 0-112 112.62c.14 26.26 21.73 47.38 48 47.38h224c26.27 0 47.86-21.12 48-47.38A112 112 0 0 0 528 352m-198.09 10.45A145.19 145.19 0 0 1 352 344.62V128a32 32 0 0 0-32-32h-32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v64H32a32 32 0 0 0-32 32v368a16 16 0 0 0 16 16h288.31A78.62 78.62 0 0 1 288 464.79a143.06 143.06 0 0 1 41.91-102.34M144 404a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm48-122a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6v-26h-26a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6h26V70a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v26h26a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-26zm80 250a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12z"
                />
              </svg>
              <div className="ml-14">
                <h1 className="text-3xl text-primary-default font-bold">
                  Dr. Jose Fabella Memorial Hospital
                </h1>
                <p1 className="text-3xl text-primary-default font-light flex items-center mt-4 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                    />
                    <path
                      fill="currentColor"
                      d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 0 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Address: Lope de Vega St, Santa Cruz, Manila, Metro Manila,
                    Philippines
                  </p>
                </p1>
                <p2 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="h-8 w-8 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8.12 8.12 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.61.61 0 0 0 0 .12l21 47l-20.67 24.74a6.13 6.13 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8.44 8.44 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Contact Number: +63 2 733 8537
                  </p>
                </p2>
                <p3 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 14 14"
                    className="h-8 w-8 mr-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13M.5 7h13" />
                      <path d="M9.5 7A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7" />
                    </g>
                  </svg>
                  <a
                    href="http://fabella.doh.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-primary-default"
                  >
                    Website: fabella.doh.gov.ph
                  </a>
                </p3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8em"
                height="8em"
                viewBox="0 0 640 512"
                className="text-primary-default ml-10"
              >
                <path
                  fill="currentColor"
                  d="M480 320a96 96 0 1 0-96-96a96 96 0 0 0 96 96m48 32a22.88 22.88 0 0 0-7.06 1.09a124.76 124.76 0 0 1-81.89 0A22.82 22.82 0 0 0 432 352a112 112 0 0 0-112 112.62c.14 26.26 21.73 47.38 48 47.38h224c26.27 0 47.86-21.12 48-47.38A112 112 0 0 0 528 352m-198.09 10.45A145.19 145.19 0 0 1 352 344.62V128a32 32 0 0 0-32-32h-32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v64H32a32 32 0 0 0-32 32v368a16 16 0 0 0 16 16h288.31A78.62 78.62 0 0 1 288 464.79a143.06 143.06 0 0 1 41.91-102.34M144 404a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm48-122a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6v-26h-26a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6h26V70a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v26h26a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-26zm80 250a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12z"
                />
              </svg>
              <div className="ml-14">
                <h1 className="text-3xl text-primary-default font-bold">
                  Philippines General Hospital, PGH, Manila
                </h1>
                <p1 className="text-3xl text-primary-default font-light flex items-center mt-4 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                    />
                    <path
                      fill="currentColor"
                      d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 0 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Address: Taft Avneue Ermita, Brgy 670 Zone 72, Manila,
                    Philippines
                  </p>
                </p1>
                <p2 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="h-8 w-8 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8.12 8.12 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.61.61 0 0 0 0 .12l21 47l-20.67 24.74a6.13 6.13 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8.44 8.44 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Contact Number: +63 2 554 8400
                  </p>
                </p2>
                <p3 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 14 14"
                    className="h-8 w-8 mr-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13M.5 7h13" />
                      <path d="M9.5 7A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7" />
                    </g>
                  </svg>
                  <a
                    href="http://pgh.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-primary-default"
                  >
                    Website: pgh.gov.ph
                  </a>
                </p3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8em"
                height="8em"
                viewBox="0 0 640 512"
                className="text-primary-default ml-10"
              >
                <path
                  fill="currentColor"
                  d="M480 320a96 96 0 1 0-96-96a96 96 0 0 0 96 96m48 32a22.88 22.88 0 0 0-7.06 1.09a124.76 124.76 0 0 1-81.89 0A22.82 22.82 0 0 0 432 352a112 112 0 0 0-112 112.62c.14 26.26 21.73 47.38 48 47.38h224c26.27 0 47.86-21.12 48-47.38A112 112 0 0 0 528 352m-198.09 10.45A145.19 145.19 0 0 1 352 344.62V128a32 32 0 0 0-32-32h-32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v64H32a32 32 0 0 0-32 32v368a16 16 0 0 0 16 16h288.31A78.62 78.62 0 0 1 288 464.79a143.06 143.06 0 0 1 41.91-102.34M144 404a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm48-122a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6v-26h-26a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6h26V70a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v26h26a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-26zm80 250a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12z"
                />
              </svg>
              <div className="ml-14">
                <h1 className="text-3xl text-primary-default font-bold">
                  Ospital ng Maynila Medical Center, OMMC, Manila
                </h1>
                <p1 className="text-3xl text-primary-default font-light flex items-center mt-4 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                    />
                    <path
                      fill="currentColor"
                      d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 0 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Address: Barangay 719,President Quirino Ave. Roxas
                    Boulevard, Malate, Manila
                  </p>
                </p1>
                <p2 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="h-8 w-8 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8.12 8.12 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.61.61 0 0 0 0 .12l21 47l-20.67 24.74a6.13 6.13 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8.44 8.44 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Contact Number: +63 2 524 6061
                  </p>
                </p2>
                <p3 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 14 14"
                    className="h-8 w-8 mr-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13M.5 7h13" />
                      <path d="M9.5 7A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7" />
                    </g>
                  </svg>
                  <a
                    href="https://www.facebook.com/ommcofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-primary-default"
                  >
                    Website: https://www.facebook.com/ommcofficial/
                  </a>
                </p3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8em"
                height="8em"
                viewBox="0 0 640 512"
                className="text-primary-default ml-10"
              >
                <path
                  fill="currentColor"
                  d="M480 320a96 96 0 1 0-96-96a96 96 0 0 0 96 96m48 32a22.88 22.88 0 0 0-7.06 1.09a124.76 124.76 0 0 1-81.89 0A22.82 22.82 0 0 0 432 352a112 112 0 0 0-112 112.62c.14 26.26 21.73 47.38 48 47.38h224c26.27 0 47.86-21.12 48-47.38A112 112 0 0 0 528 352m-198.09 10.45A145.19 145.19 0 0 1 352 344.62V128a32 32 0 0 0-32-32h-32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v64H32a32 32 0 0 0-32 32v368a16 16 0 0 0 16 16h288.31A78.62 78.62 0 0 1 288 464.79a143.06 143.06 0 0 1 41.91-102.34M144 404a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12H92a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm48-122a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6v-26h-26a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6h26V70a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v26h26a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-26zm80 250a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12zm0-128a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h40a12 12 0 0 1 12 12z"
                />
              </svg>
              <div className="ml-14">
                <h1 className="text-3xl text-primary-default font-bold">
                  Quezon City General Hospital, QCGH
                </h1>
                <p1 className="text-3xl text-primary-default font-light flex items-center mt-4 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                    />
                    <path
                      fill="currentColor"
                      d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 0 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Address: Project 8, Quezon City, Metro Manila, Philippines
                  </p>
                </p1>
                <p2 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="h-8 w-8 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8.12 8.12 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.61.61 0 0 0 0 .12l21 47l-20.67 24.74a6.13 6.13 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8.44 8.44 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"
                    />
                  </svg>
                  <p className="text-xl text-primary-default">
                    Contact Number: +63 2 426 1314
                  </p>
                </p2>
                <p3 className="text-3xl text-primary-default font-light flex items-center mt-2 ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 14 14"
                    className="h-8 w-8 mr-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13M.5 7h13" />
                      <path d="M9.5 7A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7" />
                    </g>
                  </svg>
                  <a
                    href="https://www.facebook.com/QC.HUMANMILKBANK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-primary-default"
                  >
                    Website: https://www.facebook.com/QC.HUMANMILKBANK
                  </a>
                </p3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
