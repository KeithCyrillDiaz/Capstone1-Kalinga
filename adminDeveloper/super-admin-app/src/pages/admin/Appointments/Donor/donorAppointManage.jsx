import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";
import DeleteModal from "../../../../Modal/deleteModal";

export default function ({ remarks }) {
  const navigate = useNavigate();
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const appointmentsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getAppointmentByUsertype/Donor`
        );
        setAppointments(response.data.appointment);
        console.log(response.data.appointment); // Add this line to check the appointments data
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.fullName
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  // Calculate total pages based on filtered appointments
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  // Get current page of appointments
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
    setIsDeleteModalOpen(false); // Close the delete modal
    // Additional logic after confirming deletion
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
    // Additional logic if deletion is canceled
  };

  const handleDelete = async (AppointmentDonorID) => {
    try {
      const response = await axios.delete(
        `${WebHost}/kalinga/deleteAppointmentDonor/${AppointmentDonorID}`
      );
      if (response.status === 200) {
        // Appointment deleted successfully
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.AppointmentDonorID !== AppointmentDonorID
        );
        setAppointments(updatedAppointments);
        setIsDeleteModalOpen(true); // Open delete confirmation modal
      } else {
        console.error("Error deleting appointment:", response.data);
        // Handle error (e.g., display error message to user)
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleView = () => {
    navigate("/admin/DonorAppointments");
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemarksModal = (user) => {
    setSelectedUser(user);
    setRemarksModalOpen(true);
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-12 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
              Donor Appointments
            </h1>
            <div className="flex flex-col">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-primary-default border">
                      <thead className="bg-neutral-variant">
                        <tr>
                          <th
                            scope="col"
                            className="text-center px-6 py-2 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Appointment ID
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
                            Scheduled Date and Time
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
                        {currentAppointments.map((appointment) => (
                          <tr key={appointment._id}>
                            <td className="px-6 py-1 whitespace-nowrap">
                              <div className="text-center text-sm font-medium text-gray-900">
                                {appointment.AppointmentDonorID}
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
                                {new Date(
                                  appointment.selectedDate
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  appointment.selectedTime
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-1 whitespace-nowrap">
                              <span
                                className={`flex justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.DonationStatus === "Complete"
                                    ? "bg-lime-200 text-green-800"
                                    : appointment.DonationStatus === "Pending"
                                    ? "bg-blue-100 text-red-800"
                                    : appointment.DonationStatus === "Ongoing"
                                    ? "bg-yellow-100 text-red-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appointment.DonationStatus}
                              </span>
                            </td>
                            {/*DONATION REMARKS*/}
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div>
                                {appointment.DonationStatus === "Approved"
                                  ? "This is approved."
                                  : appointment.DonorRemark}
                              </div>
                            </td>

                            <td className="text-center  py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/donorAppointmentConfirmation/${appointment.AppointmentDonorID}`}
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
