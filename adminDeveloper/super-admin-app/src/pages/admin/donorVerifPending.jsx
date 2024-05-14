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
              d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM4 8h16V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616zm6.95 7.82l4.958-4.959l-.72-.719l-4.238 4.239l-2.138-2.139l-.72.72z"
            ></path>
          </svg>

          <h1 className="text-3xl text-primary-default">Donor Verification</h1>
        </div>
        <hr className="border-t-2 border-primary-default" />

        <div className="p-8">
          <div className="flex flex-row items-center justify-between xl:gap-x-6 lg:gap-x-3">
            <div className="mt-8 ml-4 mb-1 text-4xl font-bold text-primary-default">
              Pendings
            </div>
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
        <div
          className="overflow-hidden flex flex-col gap-y-4 mt-4"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <div className="p-8 overflow-y-auto">
            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="flex-grow ml-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary-default mb-6">
                    Jeannah Padasas
                  </h3>
                  <p className="text-2xl text-primary-default mb-6">
                    pdsjanna@gmail.com
                  </p>
                  <p className="text-2xl text-primary-default mb-6">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col gap-y-4 mr-20">
                <Link to="/admin/DonorVerification">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    View
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Block
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Delete
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="flex-grow ml-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary-default mb-6">
                    Rogine Cubelo
                  </h3>
                  <p className="text-2xl text-primary-default mb-6">
                    cubelorogine@gmail.com
                  </p>
                  <p className="text-2xl text-primary-default mb-6">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col gap-y-4 mr-20">
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    View
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Block
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Delete
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="flex-grow ml-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary-default mb-6">
                    Beverly Somodio
                  </h3>
                  <p className="text-2xl text-primary-default mb-6">
                    somodioberverly@gmail.com
                  </p>
                  <p className="text-2xl text-primary-default mb-6">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col gap-y-4 mr-20">
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    View
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Block
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Delete
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="flex-grow ml-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary-default mb-6">
                    Keith Diaz
                  </h3>
                  <p className="text-2xl text-primary-default mb-6">
                    diazkeith@gmail.com
                  </p>
                  <p className="text-2xl text-primary-default mb-6">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col gap-y-4 mr-20">
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    View
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Block
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Delete
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="flex-grow ml-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary-default mb-6">
                    Alisha Arafol
                  </h3>
                  <p className="text-2xl text-primary-default mb-6">
                    aragolalisha@gmail.com
                  </p>
                  <p className="text-2xl text-primary-default mb-6">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="flex flex-col gap-y-4 mr-20">
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    View
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Block
                  </button>
                </Link>
                <Link to="/admin/bugResolve">
                  <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
