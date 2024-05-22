import React, { useState } from "react";
import KalingaLogo from "@assets/Kalinga-Logo-Small.png";
import { useNavigate, NavLink, useParams } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showVerificationDropdown, setVerificationDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] =
    useState(false);

  const isActiveRoute = (route) => {
    const currentPath = window.location.pathname;
    if (
      (currentPath === "/admin" && route === "admin") ||
      currentPath === `/admin/${route}` ||
      (currentPath === "/admin/approved" && route === "forum") ||
      (currentPath === "/admin/rejected" && route === "forum") ||
      (currentPath === "/admin/milkbanks" && route === "milkbanks") ||
      (currentPath === "/admin/forum" && route === "forum")
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <section className="flex flex-col justify-between w-60 h-full py-4 p-2 body-color">
        <div>
          <div className="flex items-center pb-4 gap-x-2 pl-2  mb-6">
            <img className="w-1/3" src={KalingaLogo} alt="KalingaLogo" />
            <div>
              <h1 className="text-3xl font-bold text-neutral-primary">
                Kalinga
              </h1>
              <h3 className="text-lg font-medium text-neutral-primary">
                Admin
              </h3>
            </div>
          </div>
          {/* DASHBOARD */}
          <NavLink
            to={`/admin`}
            className={`flex items-center cursor-pointer w-full rounded-2xl py-1 mb-1 ${
              isActiveRoute("admin")
                ? "bg-secondary-default"
                : "bg-transparent hover:bg-secondary-default"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="ml-6"
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
            <h1 className="ml-2 text-lg text-neutral-primary">Dashboard</h1>
          </NavLink>

          {/* FORUM MOD */}
          <NavLink
            to="/admin/forum"
            className={`flex items-center cursor-pointer w-full rounded-2xl py-1 mb-1 ${
              isActiveRoute("forum")
                ? "bg-secondary-default"
                : "bg-transparent hover:bg-secondary-default"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="ml-6"
            >
              <path
                fill="none"
                stroke="#FFEECC"
                strokeLinecap="round"
                strokeWidth="1"
                d="M7.23 16.23q-.326 0-.547-.22q-.221-.222-.221-.549v-1h11.75l.634.635V6h1q.327 0 .548.221t.222.548v10.595q0 .534-.498.742q-.497.207-.876-.171l-1.704-1.704zm-.768-3.769l-1.704 1.705q-.38.378-.876.17q-.497-.207-.497-.742V3.77q0-.327.22-.548Q3.828 3 4.155 3h11.923q.327 0 .548.221t.221.548v7.923q0 .327-.221.549q-.221.22-.548.22zm9.384-1V4H4.385v8.846l1.384-1.384zm-11.461 0V4z"
              ></path>
            </svg>

            <h1 className="ml-2 text-md text-neutral-primary">
              Forum Moderation
            </h1>
          </NavLink>
          {/* REPORTS */}
          <div>
            <div className="relative">
              <div
                onClick={() => setShowReportsDropdown(!showReportsDropdown)}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl  pb-2 ${
                  showReportsDropdown ? "bg-secondary-default" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  className="ml-6"
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
                <h1 className="ml-2 mr-2 text-lg text-neutral-primary">
                  Reports
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className={`absolute right-2 transform transition-transform duration-300 ${
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
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-5 py-1 mb-1 ${
                      isActiveRoute("donor verif")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      Monthly Report
                    </h1>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          {/* VERIFICAIION */}
          <div>
            <div className="relative">
              <div
                onClick={() =>
                  setVerificationDropdown(!showVerificationDropdown)
                }
                className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-1 pb-1 ${
                  showVerificationDropdown ? "bg-secondary-default" : ""
                } `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  className="ml-6"
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
                <h1 className="ml-2 mr-2 text-lg text-neutral-primary">
                  Verification
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className={`absolute right-2 transform transition-transform duration-300 ${
                    showReportsDropdown ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>

              {showVerificationDropdown && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                  <NavLink
                    to="/admin/DonorVerifPendings"
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-5 py-1 mb-1 ${
                      isActiveRoute("donor verif")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      Donor Pendings
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/admin/RequestorVerifPendings"
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                      isActiveRoute("requestor")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      Requestor Pendings
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                      isActiveRoute("users")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      User Management
                    </h1>
                  </NavLink>
                </div>
              )}
            </div>
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
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  className="ml-6"
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
                <h1 className="ml-2 mr-2 text-lg text-neutral-primary">
                  Appointments
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className={`absolute right-2 transform transition-transform duration-300 ${
                    showReportsDropdown ? "rotate-0" : "rotate-180"
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
                    <h1 className="text-md text-neutral-primary">
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
                    <h1 className="text-md text-neutral-primary">
                      Requestor Mamangement
                    </h1>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
