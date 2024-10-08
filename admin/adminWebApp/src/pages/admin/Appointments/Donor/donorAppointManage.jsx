import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import DeleteModal from "../../../../modal/deleteModal";
import { generateId, getId } from "../../../../functions/Authentication";

export default function ({ remarks }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])

  const appointmentsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getAppointmentByUsertype/Donor`
        );
        setAppointments(response.data.appointment);
        console.log(response.data.appointment);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handlePrevClick = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  //FILTERS
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const [filters, setFilters] = useState({
    monthOfCreation: "",
    status: "",
    remarks: "",
  });

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = (filters, appointments) => {
    return appointments.filter((appointment) => {
      const matchMonthOfCreation = filters.monthOfCreation
        ? new Date(appointment.createdAt).toLocaleString("default", {
            month: "long",
          }) === filters.monthOfCreation
        : true;
      const matchStatus = filters.status
        ? appointment.DonationStatus === filters.status
        : true;
      const matchRemarks = filters.remarks
        ? appointment.DonorRemark === filters.remarks
        : true;
      return (
        matchMonthOfCreation &&
        matchStatus &&
        matchRemarks
      );
    });
  };

  const filteredAppointments = applyFilters(filters, appointments).filter(
    (appointment) =>
      appointment.fullName
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (AppointmentDonorID) => {
    try {
      const response = await axios.delete(
        `${WebHost}/kalinga/deleteAppointmentDonor/${AppointmentDonorID}`
      );
      if (response.status === 200) {
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.AppointmentDonorID !== AppointmentDonorID
        );
        setAppointments(updatedAppointments);
        setIsDeleteModalOpen(true);
      } else {
        console.error("Error deleting appointment:", response.data);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

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



  if(id)

  return (
    <>
      <section className="w-full h-full bg-primary-body overflow-hidden">
        <div className="p-8 pt-1">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
              Donor Appointments
            </h1>
            <div className="px-8 mb-4">
              <div className="flex flex-col items-end xl:gap-x-6 lg:gap-x-3">
                <button
                  onClick={toggleFilterVisibility}
                  className="bg-primary-default text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600 shadow-md flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 36 36"
                    className="mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M22 33V19.5L33.47 8A1.81 1.81 0 0 0 34 6.7V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1.67a1.79 1.79 0 0 0 .53 1.27L14 19.58v10.2Z"
                      className="clr-i-solid clr-i-solid-path-1"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M33.48 4h-31a.52.52 0 0 0-.48.52v1.72a1.33 1.33 0 0 0 .39.95l12 12v10l7.25 3.61V19.17l12-12a1.35 1.35 0 0 0 .36-.91V4.52a.52.52 0 0 0-.52-.52"
                      className="clr-i-solid clr-i-solid-path-1"
                    ></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                  Filter By
                </button>

                {isFilterVisible && (
                  <div className="mt-2 w-auto gap-x-4 bg-neutral-variant flex p-2 px-6 pb-4 rounded-md shadow-md justify-end">
                    <div className="border-b border-primary-default">
                      <label className="text-xs text-primary-default">
                        Month Created
                      </label>
                      <select
                        className="bg-white text-primary-default text-lg py-1 pl-2 rounded-sm hover:cursor-pointer w-full"
                        name="monthOfCreation"
                        value={filters.monthOfCreation}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Month Created</option>
                        {months.map((month) => (
                          <option key={month.id} value={month.name}>
                            {month.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="border-b border-primary-default">
                      <label className="text-xs text-primary-default">
                        Status
                      </label>
                      <select
                        className="bg-white text-primary-default text-lg py-1 pl-2 rounded-sm hover:cursor-pointer w-full"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Complete">Complete</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Pending">Pending</option>
                        <option value="Decline">Decline</option>
                      </select>
                    </div>
                    <div className="border-b border-primary-default">
                      <label className="text-xs text-primary-default">
                        Remarks
                      </label>
                      <select
                        className="bg-white text-primary-default text-lg py-1 pl-2 rounded-sm hover:cursor-pointer w-full"
                        name="remarks"
                        value={filters.remarks}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Remarks</option>
                        <option value="Full Schedule">Full Schedule</option>
                        <option value="Holiday">Holiday</option>
                        <option value="No Office Hours">No Office Hours</option>
                        <option value="Insufficient Requirements">
                          Insufficient Requirements
                        </option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-primary-default border">
                      <thead className="bg-neutral-variant">
                        <tr>
                          <th
                            scope="col"
                            className="text-center px-4 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Index
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Created on
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider "
                          >
                            Method
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Remarks
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-primary-default">
                        {currentAppointments.map((appointment, index) => (
                          <tr key={appointment._id}>
                            <td className="px-2 py-1 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {index +
                                  1 +
                                  (currentPage - 1) * appointmentsPerPage}
                              </div>
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {new Date(
                                  appointment.createdAt
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  appointment.createdAt
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900 flex items-center justify-center">
                                {appointment.fullName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm text-gray-500 flex items-center justify-center">
                                {appointment.emailAddress}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center text-sm text-gray-500 flex items-center justify-center">
                              {appointment.method}
                              </div>
                            </td>
                            <td className="px-6 py-1 whitespace-nowrap">
                              <span
                                className={`flex justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.DonationStatus === "Complete"
                                    ? "bg-lime-200 text-green-800"
                                    : appointment.DonationStatus === "Pending"
                                    ? "bg-orange-300 text-red-800"
                                    : appointment.DonationStatus === "Ongoing"
                                    ? "bg-yellow-200 text-red-800"
                                    : "bg-red-200 text-red-800"
                                }`}
                              >
                                {appointment.DonationStatus}
                              </span>
                            </td>
                            {/*DONATION REMARKS*/}
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div>
                                {appointment.DonationStatus === "Complete"
                                  ? "This appointment is Complete."
                                  : appointment.DonationStatus === "Pending"
                                  ? "This appointment is still pending."
                                  : appointment.DonationStatus === "Ongoing"
                                  ? "This appointment is now ongoing."
                                  : `This appointment is declined due to ${appointment.DonorRemark}`}
                              </div>
                            </td>
                              {/* LINKING */}
                            <td className="text-center  py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/${id}/donorAppointmentConfirmation/${appointment.AppointmentDonorID}`}
                                className=" px-3 py-1 rounded-full hover:bg-neutral-variant mr-1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 32 32"
                                >
                                  <circle
                                    cx={16}
                                    cy={16}
                                    r={4}
                                    fill="#E60965"
                                  ></circle>
                                  <path
                                    fill="#E60965"
                                    d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5"
                                  ></path>
                                </svg>
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(appointment.AppointmentDonorID)
                                }
                                className="px-3 py-1 rounded-full hover:bg-neutral-variant"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="21"
                                  height="21"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#E60965"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                                  ></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                {/* Pagination */}
                <nav className="block">
                  <ul className="flex pl-0 rounded list-none flex-wrap">
                    <button
                      className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                      onClick={handlePrevClick}
                    >
                      {"<"}
                    </button>
                    {pageNumbers.map((number) => (
                      <li key={number}>
                        <button
                          className={`${
                            currentPage === number
                              ? "hover:font-bold hover:text-primary-default text-lg font-sans text-primary-disabled py-2 px-2 font-bold"
                              : "text-lg font-sans text-primary-disabled py-2 px-4"
                          } `}
                          onClick={() => goToPage(number)}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                    <button
                      className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                      onClick={handleNextClick}
                    >
                      {">"}
                    </button>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        message="Are you sure you want to delete this appointment?"
      />
    </>
  );
}
