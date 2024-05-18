import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";
import  DeleteModal from "../../../../Modal/deleteModal";

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

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.fullName
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  // Calculate total pages based on filtered appointments
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
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
  
  
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemarksModal = (user) => {
    setSelectedUser(user);
    setRemarksModalOpen(true);
  };

  return (
    <>
      <section className="w-full h-screen bg-primary-body overflow-hidden">
        <div className="p-10 pt-2">
          <div>
            <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
              Donor Appointments
            </h1>
            <div className="flex flex-col">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-primary-default border">
                      <thead className="bg-neutral-variant">
                        <tr>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Appointment ID
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Created on
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider "
                          >
                            Scheduled Date and Time
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Remarks
                          </th>
                          <th
                            scope="col"
                            className="text-center px-6 py-3 text-left text-md font-sans text-primary-default uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-primary-default">
                        {filteredAppointments.map((appointment) => (
                          <tr key={appointment._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
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
                            <td className="px-6 py-4 whitespace-nowrap">
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
                                  : remarks}
                              </div>
                            </td>

                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/donorAppointmentConfirmation/${appointment.AppointmentDonorID}`}
                                className="bg-lime-300 px-4 py-2 rounded-full hover:bg-lime-400 mr-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#000000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M4 0C1.8 0 0 1.8 0 4v17c0 2.2 1.8 4 4 4h11c.4 0 .7-.094 1-.094c-1.4-.3-2.594-1.006-3.594-1.906H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h6.313c.7.2.687 1.1.687 2v3c0 .6.4 1 1 1h3c1 0 2 0 2 1v1h.5c.5 0 1 .088 1.5.188V8c0-1.1-.988-2.112-2.688-3.813c-.3-.2-.512-.487-.812-.687c-.2-.3-.488-.513-.688-.813C13.113.988 12.1 0 11 0zm13.5 12c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5c1.273 0 2.435-.471 3.375-1.219l.313.313a.955.955 0 0 0 .125 1.218l2.5 2.5c.4.4.975.4 1.375 0l.5-.5c.4-.4.4-1.006 0-1.406l-2.5-2.5a.935.935 0 0 0-1.157-.156l-.281-.313c.773-.948 1.25-2.14 1.25-3.437c0-3-2.5-5.5-5.5-5.5m0 1.5c2.2 0 4 1.8 4 4s-1.8 4-4 4s-4-1.8-4-4s1.8-4 4-4"
                                  ></path>
                                </svg>
                              </Link>
                              <button
                                  onClick={() => handleDelete(appointment.AppointmentDonorID)}
                                  className="bg-red-500 px- py-2 rounded-full hover:bg-red-600"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="#FFFFFF"
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
            </div>
          </div>
        </div>
        </section>
        <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm} // Pass handleDeleteConfirm as prop
        onCancel={handleDeleteCancel}
        message="Are you sure you want to delete this appointment?"
      />
    </>
  );
}
