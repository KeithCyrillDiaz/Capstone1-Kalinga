import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RequestConfirmModal from "../../../../Modal/RequestConfirmModal";
import RequestDeclineModal from "../../../../Modal/RequestDeclineModal";
import AppointmentRequestDeclineModal from "../../../../Modal/AppointmentRequestDeclineModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WebHost } from "../../../../../MyConstantSuperAdmin";

const requestorAppointmentConfirmation = () => {
  const [requestData, setRequestData] = useState(null); // State to store fetched request details

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    city: "",
    medicalCondition: "",
    milkAmount: "",
    BabyCategory: "",
    ReasonForRequesting: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { RequestID } = useParams(); // Get the appointmentDonorID from the URL

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        console.log("Fetching appointment data for RequestID:", RequestID);
        const response = await axios.get(
          `${WebHost}/kalinga/getRequestByID/${RequestID}`
        );
        console.log("API Response:", response.data);
        setRequestData(response.data); // Update state with response data
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    console.log("RequestID:", RequestID);
    fetchRequestData();
  }, [RequestID]);

  console.log("Request Data:", requestData);

  console.log("Request Data:", requestData);

  const [showModal, setShowModal] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const handleApproved = async () => {
    setShowModal(true);
    try {
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Approved",
      });
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleApprovedConfirm = () => {
    setShowModal(false);
  };

  const handleApprovedCancel = () => {
    setShowModal(false);
  };
  const handleDecline = async () => {
    setIsDeclineModalOpen(true);

    try {
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Decline",
      });
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleDeclineConfirm = () => {
    setIsDeclineModalOpen(false);
  };

  const handleDeclineCancel = () => {
    setIsDeclineModalOpen(false);
  };

  const babyCategoryOptions = [
    { label: "Newborn", value: "newborn" },
    { label: "Infant", value: "infant" },
    { label: "Toddler", value: "toddler" },
    { label: "Other", value: "other" },
  ];
  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden px-4">
      <h1 className="mt-8 text-3xl text-pink-500 font-bold">
        Request Confirmation
      </h1>

      {/* Full Name Input */}
      <div className="mt-8">
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={`Full Name: ${
            requestData ? requestData.Request.fullName : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Full Name"
        />
      </div>

      {/* Phone Number Input */}
      <div className="mt-4">
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={`Phone Number: ${
            requestData ? requestData.Request.phoneNumber : ""
          }`}
          onChange={handleChange}
          className="w-3/4 md:w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Phone Number"
        />
      </div>

      {/* Email Address Input */}
      <div className="mt-4">
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={`Email Address: ${
            requestData ? requestData.Request.emailAddress : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Email Address"
        />
      </div>

      {/* Home Address Input */}
      <div className="mt-4">
        <input
          type="text"
          id="homeAddress"
          name="homeAddress"
          value={`Home Address: ${
            requestData ? requestData.Request.homeAddress : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2 h-20 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Home Address"
        />
      </div>

      {/* City Input */}
      <div className="mt-4">
        <input
          type="text"
          id="city"
          name="city"
          value={`City: ${requestData ? requestData.Request.city : ""}`}
          onChange={handleChange}
          className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="City"
        />
      </div>

      {/* Medical Condition Input */}
      <div className="mt-4">
        <input
          type="text"
          id="medicalCondition"
          name="medicalCondition"
          value={`Medical Condition: ${
            requestData ? requestData.Request.medicalCondition : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2  h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Medical Condition"
        />
      </div>

      {/* Amount Donated Input */}
      <div className="flex mt-4">
        <div className="w-1/2 mr-4">
          <input
            type="text"
            id="amountDonated"
            name="amountDonated"
            value={`Milk Amount: ${
              requestData ? requestData.Request.milkAmount : ""
            }`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
            placeholder="Amount of Milk Donated"
          />
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="amountDonated"
            name="amountDonated"
            value={`Baby Category: ${
              requestData ? requestData.Request.BabyCategory : ""
            }`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
            placeholder="Amount of Milk Donated"
          />
        </div>
      </div>

      <div className="mt-4 relative">
        <div className="relative">
          <input
            type="text"
            id="reasonRequest"
            name="reasonRequest"
            value={`Reason for Requesting: ${
              requestData ? requestData.Request.ReasonForRequesting : ""
            }`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-20 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            placeholder="Reason for Requesting"
          />
        </div>
      </div>

      <div className="mt-4 relative">
        <label
          htmlFor="milkBankLocation"
          className="block text-pink-500 font-bold mb-2 text-pink-500"
        >
          Note: Maximum of 3 images or files per field.
        </label>
        <div className="relative">
          <input
            type="text"
            id="reasonRequest"
            name="reasonRequest"
            value={`Reason For Requesting: ${
              requestData ? requestData.ReasonForRequesting : ""
            }`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            placeholder=""
          />
        </div>
      </div>

      <div className="absolute  right-0 mt-8 mr-16 flex flex-col">
        {requestData &&
          requestData.Request &&
          requestData.Request.RequestStatus !== "Approved" &&
          requestData.Request.RequestStatus !== "Decline" &&
          requestData.Request.RequestStatus !== "Complete" && (
            <>
              <button
                onClick={handleApproved}
                className="bg-primary-default text-white px-4 py-2 rounded-full mb-4"
              >
                Approved
              </button>
              <button
                onClick={handleDecline}
                className="bg-white text-pink-500 px-4 py-2 rounded-full border border-pink-500"
              >
                Decline
              </button>
            </>
          )}
      </div>

      <RequestConfirmModal
        isOpen={showModal}
        onConfirm={handleApprovedCancel}
        onCancel={handleApprovedConfirm}
        message="Are you sure you want to approve this request? Once approved, the request process will proceed."
      />

      <RequestDeclineModal
        isOpen={isDeclineModalOpen}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
        message="Are you sure you want to decline this request? Once declined, the request process will not proceed."
      />

      <AppointmentRequestDeclineModal
        isOpen={isDeclineModalOpen}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
        message="Are you sure you want to decline this appointment? Once declined, the request process will not proceed."
        RequestID={RequestID}
      />
    </section>
  );
};

export default requestorAppointmentConfirmation;
