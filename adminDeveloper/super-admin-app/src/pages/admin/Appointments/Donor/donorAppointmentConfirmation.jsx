import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../../../Modal/ConfirmationModal";
import DeclineModal from "../../../../Modal/DeclineModal";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";
import CompleteModal from "../../../../Modal/CompleteModal";

const donorAppointmentConfirmation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState(null); // State to store appointment data

  const [formData, setFormData] = useState({
    DonationStatus: "",
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    medicalCondition: "",
    milkAmount: "",
    location: "",
    selectedDate: selectedDate.toISOString(),
    selectedTime: selectedTime.toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { AppointmentDonorID } = useParams(); // Get the appointmentDonorID from the URL

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        console.log("Fetching appointment data...");
        const response = await axios.get(
          `${WebHost}/kalinga/getAppointmentsByDonorID/${AppointmentDonorID}`
        );
        console.log("Response:", response.data);
        setAppointmentData(response.data.Appointment);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    console.log("AppointmentDonorID:", AppointmentDonorID);
    fetchAppointmentData();
  }, [AppointmentDonorID]);

  const [showModal, setShowModal] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleApproved = async () => {
    setShowModal(true); // Open the modal

    try {
      // Make a PUT request to update the RequestStatus to "Ongoing"
      await axios.put(
        `${WebHost}/kalinga/updateDonationStatus/${AppointmentDonorID}`,
        {
          DonationStatus: "Ongoing",
        }
      );

      // Optionally, you can reload the data or do any other action upon successful update
    } catch (error) {
      console.error("Error updating request status:", error);
      // Handle error if needed
    }
  };

  const handleDecline = () => {
    if (appointmentData && appointmentData.DonationStatus === "Pending") {
      setIsDeclineModalOpen(true); // Open the modal
    } else if (
      appointmentData &&
      appointmentData.DonationStatus === "Ongoing"
    ) {
      // Handle Ongoing status logic (e.g., Complete)
    }
  };

  const handleComplete = () => {
    setIsCompleteModalOpen(true);
  };

  const handleDeclineConfirm = async () => {
    try {
      // Update the DonationStatus to "Ongoing"
      const response = await axios.put(
        `${WebHost}/kalinga/updateDonationStatus/${AppointmentDonorID}`,
        {
          DonationStatus: "Decline",
        }
      );

      // Log the updated donation status from the response
      console.log("Status", response.data.DonationStatus);

      // Handle success response
      console.log("Donation status updated successfully:", response.data);
      setShowModal(false); // Close the modal
    } catch (error) {
      // Handle error
      console.error("Error updating donation status:", error);
      // You can add a notification or alert here to inform the user about the error
    }
  };

  const handleDeclineCancel = () => {
    setIsDeclineModalOpen(false); // Close the modal
  };

  const handleApproveConfirm = () => {
    // Add your logic for handling the "Solved" button action here
    setShowModal(false); // Close the modal
  };

  const handleApproveCancel = () => {
    setShowModal(false); // Close the modal
  };

  const handleCompleteConfirm = async () => {
    try {
      const response = await axios.put(
        `${WebHost}/kalinga/updateDonationComplete/${AppointmentDonorID}`
      );

      // Log the updated donation status from the response
      console.log("Status", response.data.DonationStatus);

      // Handle success response
      console.log("Donation status updated successfully:", response.data);
      setIsCompleteModalOpen(false); // Close the modal
    } catch (error) {
      // Handle error
      console.error("Error updating donation status:", error);
      // You can add a notification or alert here to inform the user about the error
    }
  };

  const handleCompleteCancel = () => {
    setIsCompleteModalOpen(false); // Close the modal
  };

  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden relative">
      <h1 className="mt-8 text-3xl text-pink-500 font-bold">
        Appointment Confirmation
      </h1>

      {/* Full Name Input */}
      <div className="mt-8">
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={`Full Name: ${
            appointmentData ? appointmentData.fullName : ""
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
            appointmentData ? appointmentData.phoneNumber : ""
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
            appointmentData ? appointmentData.emailAddress : ""
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
            appointmentData ? appointmentData.homeAddress : ""
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
          value={`City: ${appointmentData ? appointmentData.city : ""}`}
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
            appointmentData ? appointmentData.medicalCondition : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2  h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Medical Condition"
        />
      </div>

      {/* Amount Donated Input */}
      <div className="mt-4">
        <input
          type="text"
          id="amountDonated"
          name="amountDonated"
          value={`Milk Amount: ${
            appointmentData ? appointmentData.milkAmount : ""
          }`}
          onChange={handleChange}
          className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
          placeholder="Amount of Milk Donated"
        />
      </div>

      {/* Date and Time Inputs */}
      <div className="flex mt-4">
        <div className="mr-4 w-1/2 relative">
          <label
            htmlFor="appointmentDate"
            className="block text-pink-500 font-bold mb-2 text-pink-500"
          >
            Date
          </label>
          <div className="relative">
            <input
              id="appointmentDate"
              name="appointmentDate"
              value={appointmentData ? appointmentData.selectedDate : ""}
              onChange={handleChange}
              placeholder="Date"
              className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="absolute top-0 right-2 mt-3 ml-3 text-pink-500"
            >
              <path
                fill="currentColor"
                d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
              />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-6-3a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="w-1/2 relative">
          <label
            htmlFor="appointmentTime"
            className="block text-pink-500 font-bold mb-2 text-pink-500"
          >
            Time
          </label>
          <div className="relative">
            <input
              id="appointmentTime"
              name="appointmentTime"
              value={appointmentData ? appointmentData.selectedTime : ""}
              onChange={handleChange}
              placeholder="Time"
              className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="absolute top-0 right-2 mt-3 ml-3 text-pink-500"
            >
              <g fill="none">
                <path d="M24 0v24H0V0z" />
                <path
                  fill="currentColor"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Milk Bank Location Input */}
      <div className="mt-4 relative">
        <label
          htmlFor="milkBankLocation"
          className="block text-pink-500 font-bold mb-2 text-pink-500"
        >
          Milk Bank Location
        </label>
        <div className="relative">
          <input
            type="text"
            id="milkBankLocation"
            name="milkBankLocation"
            value={appointmentData ? appointmentData.location : ""}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            placeholder="Milkbank Location"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="absolute top-0 right-2 mt-3 ml-3 text-pink-500"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M21.5 8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552c-.441-.295-1.034-.332-2.115-.336c.004.291.004.596.004.91V7.25h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v6.5H17V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v15.25H5.5v-6.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1V5.91c0-.313 0-.618.004-.91c-1.081.005-1.674.042-2.115.337a2 2 0 0 0-.552.552C2.5 6.393 2.5 7.096 2.5 8.5v12.75H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-.5zM12 4.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V9a.75.75 0 0 1-1.5 0V7.75H10a.75.75 0 0 1 0-1.5h1.25V5a.75.75 0 0 1 .75-.75M9.25 12a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75M12 18.25a.75.75 0 0 1 .75.75v2.25h-1.5V19a.75.75 0 0 1 .75-.75"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      {appointmentData && appointmentData.DonationStatus === "Pending" && (
        <div className="absolute bottom-0 right-0 mb-8 mr-8 flex flex-col">
          <button
            onClick={handleApproved}
            className="bg-pink-500 text-white px-4 py-2 rounded-full mb-4"
          >
            Approved
          </button>
          <button
            onClick={handleDecline}
            className="bg-white text-pink-500 px-4 py-2 rounded-full border border-pink-500"
          >
            Decline
          </button>
        </div>
      )}

      {appointmentData && appointmentData.DonationStatus === "Ongoing" && (
        <div className="absolute bottom-0 right-0 mb-8 mr-8 flex flex-col">
          <button
            onClick={handleComplete}
            className="bg-pink-500 text-white px-4 py-2 rounded-full mb-4"
          >
            Complete
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onCancel={handleApproveConfirm}
        onConfirm={handleApproveCancel}
        message="Are you sure you want to approve this appointment? Once approved, the appointment will be scheduled."
      />

      <DeclineModal
        isOpen={isDeclineModalOpen}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
        message="Are you sure you want to decline this appointment? Once declined, the request process will not proceed."
      />

      <CompleteModal
        isOpen={isCompleteModalOpen}
        onConfirm={handleCompleteConfirm}
        onCancel={handleCompleteCancel}
        message="Are you sure this appointment is already completed?"
      />
    </section>
  );
};

export default donorAppointmentConfirmation;
