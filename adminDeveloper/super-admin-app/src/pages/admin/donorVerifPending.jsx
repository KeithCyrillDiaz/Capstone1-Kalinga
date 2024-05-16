import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-10 pt-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl text-primary-default font-bold font-sans py-4">
              Donor Pendings
            </h1>
            <div className="relative flex items-center bg-white border border-primary-default w-1/4 rounded-full">
              <input
                type="text"
                className="w-56 h-8 text-xl bg-transparent border-none outline-none pl-5 placeholder:text-primary-default text-primary-default"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
                className="text-primary-default ml-28"
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
            </div>
          </div>

          <div
            className="overflow-hidden flex flex-col gap-y-4 mt-4"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            <div className="p-10 pt-2 overflow-y-auto">
              <div className="bg-white rounded-2xl mb-4 flex items-center border border-primary-default py-2">
                <div className="ml-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    className="text-primary-default"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
                      />
                    </g>
                  </svg>
                </div>
                {/* Details */}
                <div className="flex-grow ml-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-default">
                      Jeannah Padasas
                    </h3>
                    <p className="text-lg text-primary-default">
                      pdsjanna@gmail.com
                    </p>
                    <p className="text-lg text-primary-default">
                      July 04, 2024 | 10:00 pm
                    </p>
                  </div>
                </div>
                {/* Button */}
                <div className="flex flex-col gap-y-2 mr-14 p-2">
                  <Link to="/admin/DonorVerification">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      View
                    </button>
                  </Link>

                  <Link to="/admin/bugResolve">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
              {/* 2 */}
              <div className="bg-white rounded-2xl mb-4 flex items-center border border-primary-default py-2">
                <div className="ml-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    className="text-primary-default"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
                      />
                    </g>
                  </svg>
                </div>
                {/* Details */}
                <div className="flex-grow ml-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-default">
                      Rogine Cubelo
                    </h3>
                    <p className="text-lg text-primary-default">
                      rogine.cubelo@gmail.com
                    </p>
                    <p className="text-lg text-primary-default">
                      July 04, 2024 | 10:00 pm
                    </p>
                  </div>
                </div>
                {/* Button */}
                <div className="flex flex-col gap-y-2 mr-14 p-2">
                  <Link to="/admin/DonorVerification">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      View
                    </button>
                  </Link>

                  <Link to="/admin/bugResolve">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
              {/* 3 */}
              <div className="bg-white rounded-2xl mb-4 flex items-center border border-primary-default py-2">
                <div className="ml-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    className="text-primary-default"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
                      />
                    </g>
                  </svg>
                </div>
                {/* Details */}
                <div className="flex-grow ml-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-default">
                      Beverly Somodio
                    </h3>
                    <p className="text-lg text-primary-default">
                      mabeverly.somodio@gmail.com
                    </p>
                    <p className="text-lg text-primary-default">
                      July 04, 2024 | 10:00 pm
                    </p>
                  </div>
                </div>
                {/* Button */}
                <div className="flex flex-col gap-y-2 mr-14 p-2">
                  <Link to="/admin/DonorVerification">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      View
                    </button>
                  </Link>

                  <Link to="/admin/bugResolve">
                    <button className="w-full h-8 px-12 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
