import React, { useState } from "react";
import KalingaLogo from "@assets/Kalinga-Logo-Small.png";
import { useNavigate, NavLink } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] =
    useState(false);
  const [verificationDropdownHeight, setVerificationDropdownHeight] =
    useState(0);
  const [showIssuesDropdown, setShowIssuesDropdown] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);

  const isActiveRoute = (route) => {
    const currentPath = window.location.pathname;
    if (
      (currentPath === "/admin" && route === "admin") ||
      currentPath === `/admin/${route}` ||
      (currentPath === "/admin/approved" && route === "forum") ||
      (currentPath === "/admin/rejected" && route === "forum") ||
      (currentPath === "/admin/milkbanks" && route === "milkbanks")
    ) {
      return true;
    }
    return false;
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <>
      <section className="flex flex-col justify-between w-full py-8 p-2 body-color">
        <div>
          <div className="flex items-center pb-8 gap-x-4 pl-4 pr-4">
            <img className="w-1/3" src={KalingaLogo} alt="KalingaLogo" />
            <div>
              <h1 className="text-4xl font-bold text-neutral-primary">
                Kalinga
              </h1>
              <h3 className="text-2xl font-medium text-neutral-primary">
                Admin
              </h3>
            </div>
          </div>

          {/* DASHBOARD */}

          <div>
            <NavLink
              to="/admin"
              className={`flex items-center cursor-pointer w-full rounded-2xl py-2 mb-2 ${
                isActiveRoute("admin")
                  ? "bg-secondary-default"
                  : "bg-transparent hover:bg-secondary-default"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                className="ml-8"
              >
                <path
                  fill="none"
                  stroke="#FFEECC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75"
                />
              </svg>
              <h1 className="ml-4 text-2xl text-neutral-primary">Dashboard</h1>
            </NavLink>
            <div>
              <div className="relative">
                <div
                  onClick={() => setShowReportsDropdown(!showReportsDropdown)}
                  className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-2 pb-2 ${
                    showReportsDropdown ? "bg-secondary-default" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    className="ml-8"
                  >
                    <g
                      fill="none"
                      stroke="#FFEECC"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M9 21h6m-6 0v-5m0 5H3.6a.6.6 0 0 1-.6-.6v-3.8a.6.6 0 0 1 .6-.6H9m6 5V9m0 12h5.4a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6h-4.8a.6.6 0 0 0-.6.6V9m0 0H9.6a.6.6 0 0 0-.6.6V16"></path>
                    </g>
                  </svg>
                  <h1 className="ml-4 mr-4 text-2xl text-neutral-primary">
                    Reports
                  </h1>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="43"
                    height="43"
                    viewBox="0 0 24 24"
                    className={`transform transition-transform duration-300 ${
                      showReportsDropdown ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                  </svg>
                </div>

                {showReportsDropdown && (
                  <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                    <NavLink
                      to="/admin/chart"
                      className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-8 py-2 mb-5  ${
                        isActiveRoute("chart")
                          ? "bg-primary-default"
                          : "bg-transparent hover:bg-primary-default"
                      }`}
                    >
                      <h1 className="text-xl text-neutral-primary">
                        Total Donations & Requests
                      </h1>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            {/* MILKBANKS */}

            <NavLink
              to="/admin/milkbanks"
              className={`flex items-center cursor-pointer w-full rounded-2xl py-2 mb-2 ${
                isActiveRoute("milkbanks")
                  ? "bg-secondary-default"
                  : "bg-transparent hover:bg-secondary-default"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                className="ml-8"
              >
                <path
                  fill="none"
                  stroke="#FFEECC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m11.28 2.8l-.5.5a5.5 5.5 0 0 0-4.37-.43l-.08-.07A2.5 2.5 0 0 0 2.8 6.33l.07.08a5.5 5.5 0 0 0 .43 4.37l-.5.5a1.5 1.5 0 0 0 0 2.12l1.41 1.42a1.5 1.5 0 0 0 2.12 0l.35-.36l7.08 7.07a1.5 1.5 0 0 0 2.12 0l5.65-5.65a1.5 1.5 0 0 0 0-2.12l-7.07-7.08l.36-.35a1.5 1.5 0 0 0 0-2.12L13.4 2.8a1.5 1.5 0 0 0-2.12 0m2.48 2.47l-8.49 8.49l-1.41-1.42l8.48-8.48m2.48 7.77l-3.19 3.19l-1.06-1.06l3.19-3.19m3.18 3.19l-3.18 3.18l-1.07-1.06l3.19-3.19Z"
                ></path>
              </svg>
              <h1 className="ml-4 text-2xl text-neutral-primary">Milkbanks</h1>
            </NavLink>
            <NavLink
              to="/admin/forum"
              className={`flex items-center cursor-pointer w-full rounded-2xl py-2 mb-2 ${
                isActiveRoute("milkbanks")
                  ? "bg-secondary-default"
                  : "bg-transparent hover:bg-secondary-default"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                className="ml-8"
              >
                <path
                  fill="none"
                  stroke="#FFEECC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7.23 16.23q-.326 0-.547-.22q-.221-.222-.221-.548v-1h11.75l.634.634V6h1q.327 0 .548.221t.221.548v12.539l-3.077-3.077zm-3.845-.692V3.77q0-.327.22-.548T4.155 3h11.923q.327 0 .548.221t.221.548v7.923q0 .327-.221.548t-.548.222H6.462zm12.461-4.076V4H4.385v8.846l1.384-1.384zm-11.461 0V4z"
                ></path>
              </svg>
              <h1 className="ml-4 text-2xl text-neutral-primary">
                Forum Moderation
              </h1>
            </NavLink>

            {/* VERIFICATION */}

            <div>
              <div
                onClick={() => setShowIssuesDropdown(!showIssuesDropdown)}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-2 pb-2 ${
                  showIssuesDropdown ? "bg-secondary-default" : ""
                } `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  className="ml-8"
                >
                  <path
                    fill="none"
                    stroke="#FFEECC"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM4 8h16V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616zm6.95 7.82l4.958-4.959l-.72-.719l-4.238 4.239l-2.138-2.139l-.72.72z"
                  ></path>
                </svg>
                <h1 className="ml-4 mr-4 text-2xl text-neutral-primary">
                  Verification
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43"
                  height="43"
                  viewBox="0 0 24 24"
                  className={`transform transition-transform duration-300 ${
                    showIssuesDropdown ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>
              {showIssuesDropdown && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                  <NavLink
                    to="/admin/DonorVerifPendings"
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-10/12 rounded-2xl py-2 mb-2 ml-6  ${
                      isActiveRoute("bugs")
                        ? "bg-secondary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-xl text-neutral-primary">
                      Donor Pendings
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/admin/requestorVerifPendings"
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-10/12 rounded-2xl py-2 mb-2 ml-6 ${
                      isActiveRoute("feedback")
                        ? "bg-secondary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-xl text-neutral-primary">
                      Requestor Pendings
                    </h1>
                  </NavLink>
                </div>
              )}
            </div>

            {/* APPOINTMENT */}

            <div>
              <div className="relative">
                <div
                  onClick={() =>
                    setShowAppointmentsDropdown(!showAppointmentsDropdown)
                  }
                  className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-2 pb-2 ${
                    showAppointmentsDropdown ? "bg-secondary-default" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    className="ml-8"
                  >
                    <g
                      fill="none"
                      stroke="#FFEECC"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M9 20H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v3M8 2v2m7-2v2M2 8h19m-2.5 7.643l-1.5 1.5"></path>
                      <circle cx={17} cy={17} r={5}></circle>
                    </g>
                  </svg>
                  <h1 className="ml-4 mr-4 text-2xl text-neutral-primary">
                    Appointments
                  </h1>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="43"
                    height="43"
                    viewBox="0 0 24 24"
                    className={`transform transition-transform duration-300 ${
                      showAppointmentsDropdown ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                  </svg>
                </div>

                {showAppointmentsDropdown && (
                  <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                    <NavLink
                      to="/admin/donorAppointManage"
                      className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                        isActiveRoute("city")
                          ? "bg-primary-default"
                          : "bg-transparent hover:bg-primary-default"
                      }`}
                    >
                      <h1 className="text-lg text-neutral-primary">
                        Donor Mamangement
                      </h1>
                    </NavLink>
                    <NavLink
                      to="/admin/requestorManagement"
                      className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                        isActiveRoute("requestorManagement")
                          ? "bg-primary-default"
                          : "bg-transparent hover:bg-primary-default"
                      }`}
                    >
                      <h1 className="text-lg text-neutral-primary">
                        Requestor Mamangement
                      </h1>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-center justify-center grid-flow-col-dense mb-20 gap-x-4">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <path
                fill="#FFEECC"
                d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
              />
            </svg>
          </span>
          <button
            onClick={handleSignOut}
            className="text-3xl text-neutral-primary"
          >
            Sign Out
          </button>
        </div>
      </section>
    </>
  );
}
