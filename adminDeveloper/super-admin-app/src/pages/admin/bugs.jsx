import React, { useState } from "react";
import { Link } from "react-router-dom";

const Bugs = () => {
  const [activeTab, setActiveTab] = useState("report");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full min-h-screen bg-primary-body p-8">
      <div className="flex justify-center mb-8">
        <button
          onClick={() => handleTabChange("report")}
          className={`px-24 py-3 text-lg font-medium ${
            activeTab === "report"
              ? "bg-pink-500 text-white rounded-tl-lg rounded-bl-lg"
              : "text-red-500 bg-white border border-red-500"
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
        >
          Report Bugs
        </button>
        <button
          onClick={() => handleTabChange("resolved")}
          className={`px-24 py-3 text-lg font-medium ${
            activeTab === "resolved"
              ? "bg-pink-500 text-white rounded-tr-lg rounded-br-lg"
              : "text-red-500 bg-white border border-red-500"
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
        >
          Resolved Bugs
        </button>
      </div>
      {/* Your content based on activeTab */}
      {activeTab === "report" && (
        <div>
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Report Bugs
          </h2>

          <div className="bg-white rounded-lg p-4 mb-4 flex items-center">
            <div className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                className="text-pink-500"
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
            <div className="flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-2">
                  Beverly Somodio
                </h3>
                <p className="text-lg text-gray-600">
                  ma.beverlysomodio@gmail.com
                </p>
                <p className="text-lg text-gray-600">
                  July 04, 2024 | 10:00 pm
                </p>
              </div>
            </div>
            <div className="mr-8">
              <Link to="/admin/bugReport">
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  Review
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {activeTab === "resolved" && (
        <div>
          {/* Content for Resolved Bugs tab */}
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Resolved Bugs
          </h2>
          <div>
            <div className="bg-white rounded-lg p-4 mb-4 flex items-center">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  className="text-pink-500"
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
              <div className="flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-red-500 mb-2">
                    Beverly Somodio
                  </h3>
                  <p className="text-lg text-gray-600">
                    ma.beverlysomodio@gmail.com
                  </p>
                  <p className="text-lg text-gray-600">
                    July 04, 2024 | 10:00 pm
                  </p>
                </div>
              </div>
              {/* Button */}
              <div className="mr-8">
                <Link to="/admin/bugResolve">
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
                    Review
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bugs;
