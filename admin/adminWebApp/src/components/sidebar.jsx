import React, { useState, useEffect } from "react";
import KalingaLogo from "@assets/Kalinga-Logo-Small.png";
import { useNavigate, NavLink } from "react-router-dom";
import { getId } from "../functions/Authentication";
import { Loader } from "./loader";
import { TbDeviceMobileCog } from "react-icons/tb";

export default function () {
  const navigate = useNavigate();
  const [openedDropdown, setOpenedDropdown] = useState(null);

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

  
  const toggleDropdown = (dropdown) => {
    setOpenedDropdown(openedDropdown === dropdown ? null : dropdown);
  };
  
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(null)
  useEffect(() => {
    const storedId = getId();
    if (storedId) {
      setId(storedId);
    } else {
      const newId = generateId();
      saveId({ id: newId });
      setId(newId);
    }
  }, []);
  
  if(loading){
    return (
      <Loader isLoading={loading}/>
    )
  }
  if(id)
  return (
    <>
      <section
        className="flex flex-col justify-between w-60 h-full py-4 p-2 body-color"
        style={{ minHeight: "100vh" }}
      >
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
            to={`/admin/${id}`}
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

          {/* REPORTS */}
          <div>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("reports")}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl  pb-2 ${
                  openedDropdown === "reports" ? "bg-secondary-default" : ""
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
                    openedDropdown === "reports" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>

              {openedDropdown === "reports" && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                  <NavLink
                    to={`/admin/${id}/chart`}
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-5 py-1 mb-1 ${
                      isActiveRoute("chart")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      Monthly Report
                    </h1>
                  </NavLink>
                  <NavLink
                    to={`/admin/${id}/barangay`}
                    className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-5 py-1 mb-1 ${
                      isActiveRoute("barangay")
                        ? "bg-primary-default"
                        : "bg-transparent hover:bg-primary-default"
                    }`}
                  >
                    <h1 className="text-lg text-neutral-primary">
                      Barangay Report
                    </h1>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          {/* VERIFICATION */}
          <div>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("verification")}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-1 pb-1 ${
                  openedDropdown === "verification" ? "bg-secondary-default" : ""
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
                    d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.152T19.385 19H4.615ZM3 9h18"
                  />
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
                    openedDropdown === "verification" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>
              {openedDropdown === "verification" && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                <NavLink
                  to={`/admin/${id}/DonorVerifPendings`}
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
                  to={`/admin/${id}/RequestorVerifPendings`}
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
                  to={`/admin/${id}/users`}
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
          {/* APPOINTMENTS */}
          <div>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("appointments")}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-1 pb-1 ${
                  openedDropdown === "appointments" ? "bg-secondary-default" : ""
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
                    d="M8 2v3m8-3v3M3 9h18M4 7h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm4 4v7m8-7v7m-4-7v7"
                  />
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
                    openedDropdown === "appointments" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>

              {openedDropdown === "appointments" && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                <NavLink
                  to={`/admin/${id}/donorAppointManage`}
                  className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                    isActiveRoute("city")
                      ? "bg-primary-default"
                      : "bg-transparent hover:bg-primary-default"
                  }`}
                >
                  <h1 className="text-md text-neutral-primary">
                    Donor Management
                  </h1>
                </NavLink>
                <NavLink
                  to={`/admin/${id}/requestorManagement`}
                  className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                    isActiveRoute("requestorManagement")
                      ? "bg-primary-default"
                      : "bg-transparent hover:bg-primary-default"
                  }`}
                >
                  <h1 className="text-md text-neutral-primary">
                    Requestor Management
                  </h1>
                </NavLink>
              </div>
              )}
            </div>
          </div>

          {/* CONFIGURATIONS */}
          <div>
            <div className="relative">
              <div
                onClick={() => toggleDropdown("configurations")}
                className={`flex items-center cursor-pointer w-full rounded-t-2xl pt-1 pb-1 ${
                  openedDropdown === "configurations" ? "bg-secondary-default" : ""
                }`}
              >
                <TbDeviceMobileCog 
                className="ml-8"
                style={{flexShrink: 0}}
                size={30} 
                color="#FFEECC"/>
                <h1 className="ml-2 mr-2 text-lg text-neutral-primary">
                  Configurations
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className={`absolute right-2 transform transition-transform duration-300 ${
                    openedDropdown === "configurations" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path fill="#FFEECC" d="m7 10l5 5l5-5z" />
                </svg>
              </div>

              {openedDropdown === "configurations" && (
                <div className="p-2 w-full bg-secondary-default rounded-b-2xl pb-2 mb-2">
                <NavLink
                  to={`/admin/${id}/DonorAppointmentForm`}
                  className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                    isActiveRoute("city")
                      ? "bg-primary-default"
                      : "bg-transparent hover:bg-primary-default"
                  }`}
                >
                  <h1 className="text-md text-neutral-primary">
                    Donor Appointment Form
                  </h1>
                </NavLink>
                <NavLink
                  to={`/admin/${id}/RequestorAppointmentForm`}
                  className={`grid grid-flow-col-dense items-center justify-center cursor-pointer w-full rounded-2xl gap-x-10 py-2   ${
                    isActiveRoute("requestorManagement")
                      ? "bg-primary-default"
                      : "bg-transparent hover:bg-primary-default"
                  }`}
                >
                  <h1 className="text-md text-neutral-primary">
                    Requestor Appointment Form
                  </h1>
                </NavLink>
              </div>
              )}
            </div>
          </div>
          {/* FORUM
          <NavLink
            to={`/admin/forum`}
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
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.75 16.125c0 .69.56 1.25 1.25 1.25h5.5v2.625a.75.75 0 0 0 1.28.53l4.32-4.405h6.15c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H4a1.25 1.25 0 0 0-1.25 1.25v11.375Zm2-5h14.5m-14.5-4h14.5"
              />
            </svg>
            <h1 className="ml-2 text-lg text-neutral-primary">Forum</h1>
          </NavLink> */}
        </div>
      </section>
    </>
  );
}
