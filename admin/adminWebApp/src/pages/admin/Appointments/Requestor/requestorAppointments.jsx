import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WebHost } from '../../../../../MyConstantAdmin'


const requestorAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [requestData, setRequestData] = useState(null); // State to store user data
  const [currentPage, setCurrentPage] = useState(1);
  const requestPerPage = 10; // Adjust as needed

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`${WebHost}/kalinga/getRequestByUserType/Requestor`);
        const userData = response.data.request;
        setRequestData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call fetchUserData when the component mounts or userType changes
    fetchRequestData();
  }, []); // useEffect dependency on userType

  const filteredRequest = requestData
    ? requestData.filter((request) =>
        request.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentRequest = filteredRequest.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequest.length / requestPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };


  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8">
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

      <div className="flex mb-4 mt-12 mr-8 ">
        <div className="w-1/4 pr-2 text-3xl">
          <div className="text-pink-500 p-2 text-center rounded-lg font-bold">Name</div>
        </div>
        <div className="w-1/4 pl-2 text-3xl">
          <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
            Category
          </div>
        </div>
        <div className="w-1/4 pl-2 text-3xl">
          <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
            Application Status
          </div>
        </div>
      </div>

      <div className="border-b border-pink-500 w-full my-4"></div>
      {currentRequest.map((request) => (
            <div className="border-b border-pink-500 w-full my-4">
        <div key={request._id} className="flex mb-4 mt-12 ml-16 ">

          <div className="w-1/4 text-xl"> {/* Increased right margin */}
            <div className="text-pink-500 p-2 text-center rounded-lg font-bold">{request.fullName}</div>
          </div>
          <div className="w-1/4 text-xl"> {/* Increased right margin */}
            <div className="text-pink-500 p-2 text-center rounded-lg font-bold">{request.BabyCategory}</div>
          </div>
          <div className="w-1/4 pl-8 text-xl"> {/* Increased left and right margin */}
            <div className="text-pink-500 p-2 text-center rounded-lg font-bold">
              {request.RequestStatus}
            </div>
          </div>
          <div className="w-1/4 pl-8 ml-36"> {/* Increased left margin */}
            <Link to={`/admin/requestorAppointmentConfirmation/${request.RequestID}`}>
              <button className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white py-2 px-4 rounded-lg border border-pink-500">View</button>
            </Link>
          </div>
        </div>
        </div>
      ))}

<div className="flex justify-center mt-8">
        <button
          className={`px-4 py-2 border border-pink-500 rounded-lg ${
            currentPage === 1 ? "bg-pink-500 text-white" : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white"
          }`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"< Prev"}
        </button>
        <span className="px-4 py-2 text-pink-500">{`${currentPage}/${totalPages}`}</span>
        <button
          className={`px-4 py-2 border border-pink-500 rounded-lg ${
            currentPage === totalPages ? "bg-pink-500 text-white" : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white"
          }`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {"Next >"}
        </button>
      </div>

      





    </section>
  );
};

export default requestorAppointments;
