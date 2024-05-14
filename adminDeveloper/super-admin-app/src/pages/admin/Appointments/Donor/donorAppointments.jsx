import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";

const DonorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getAppointmentByUserType/Donor`
        );
        setAppointments(response.data.appointment);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []); // Run once on component mount

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

  // Array to hold page numbers for the page indicator
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden">
      <div className="flex justify-end mb-4">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-pink-500"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-pink-500 rounded-lg focus:outline-none focus:border-primary-default w-full"
          />
        </div>
      </div>

      <div className="flex mb-4 mt-12 ">
        <div className="w-1/4 pr-2 text-3xl">
          <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
            Name
          </div>
        </div>
        <div className="w-1/4 pl-2 text-3xl">
          <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
            Application Status
          </div>
        </div>
      </div>

      {filteredAppointments.map((appointment) => (
        <div className="border-b border-pink-500 w-full my-4">
          <div key={appointment._id} className="flex mb-4 mt-12">
            <div className="w-1/4 pr-8 text-xl">
              <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
                {appointment.fullName}
              </div>
            </div>
            <div className="w-1/4 pl-8 pr-8 text-xl">
              <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
                {appointment.DonationStatus}
              </div>
            </div>
            <div className="w-1/4 pl-8 ml-36">
              <Link
                to={`/admin/donorAppointmentConfirmation/${appointment.AppointmentDonorID}`}
              >
                <button className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white py-2 px-4 rounded-lg border border-pink-500">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8 ">
        <button
          className=" py-2 px-4 "
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={`ml-2 hover:text-white py-2 px-4  ${
              currentPage === number && " text-black"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          className=" py-2 px-4 "
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {" >"}
        </button>
      </div>
    </section>
  );
};

export default DonorAppointments;
