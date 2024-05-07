import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RequestConfirmModal from "../../../../modal/RequestConfirmModal";
import RequestDeclineModal from "../../../../modal/RequestDeclineModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WebHost } from '../../../../../MyConstantAdmin'



const requestorAppointmentConfirmation = () => {
  const [requestData, setRequestData] = useState(null); // State to store fetched request details

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    homeAddress: '',
    city: '',
    medicalCondition: '',
    milkAmount: '',
    BabyCategory: '',
    ReasonForRequesting: '',
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
        const response = await axios.get(`${WebHost}/kalinga/getRequestByID/${RequestID}`);
        console.log("API Response:", response.data);
        setRequestData(response.data); // Update state with response data
      } catch (error) {
        console.error('Error fetching appointment data:', error);
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
    setShowModal(true); // Open the modal

    try {
      // Make a PUT request to update the RequestStatus to "Ongoing"
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Ongoing",
      });
      
      // Optionally, you can reload the data or do any other action upon successful update
    } catch (error) {
      console.error("Error updating request status:", error);
      // Handle error if needed
    }
  };
  const handleDecline = async () => {
    setIsDeclineModalOpen(true); // Open the modal

    try {
      // Make a PUT request to update the RequestStatus to "Ongoing"
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Decline",
      });
      
      // Optionally, you can reload the data or do any other action upon successful update
    } catch (error) {
      console.error("Error updating request status:", error);
      // Handle error if needed
    }
  };
  
 

  const handleDeclineConfirm = () => {
    // Add your logic for handling the "Solved" button action here
    setIsDeclineModalOpen(false); // Close the modal
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

  const babyCategoryOptions = [
    { label: "Newborn", value: "newborn" },
    { label: "Infant", value: "infant" },
    { label: "Toddler", value: "toddler" },
    { label: "Other", value: "other" },
  ];
  return (
    <section className="w-full min-h-screen bg-neutral-variant p-8 relative">
      <h1 className="mt-8 text-3xl text-pink-500 font-bold">
        Request Confirmation
      </h1>

      {/* Full Name Input */}
      <div className="mt-8">
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={`Full Name: ${requestData ? requestData.Request.fullName : ''}`}
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
          value={`Phone Number: ${requestData ? requestData.Request.phoneNumber : ''}`}
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
          value={`Email Address: ${requestData ? requestData.Request.emailAddress : ''}`}
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
          value={`Home Address: ${requestData ? requestData.Request.homeAddress : ''}`}
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
          value={`City: ${requestData ? requestData.Request.city : ''}`}
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
          value={`Medical Condition: ${requestData ? requestData.Request.medicalCondition : ''}`}
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
            value={`Milk Amount: ${requestData ? requestData.Request.milkAmount : ''}`}
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
            value={`Baby Category: ${requestData ? requestData.Request.BabyCategory : ''}`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500"
            placeholder="Amount of Milk Donated"
          />
        </div>
      </div>

     
      {/* Milk Bank Location Input */}
      <div className="mt-4 relative">
        <div className="relative">
          <input
            type="text"
            id="reasonRequest"
            name="reasonRequest"
            value={`Reason for Requesting: ${requestData ? requestData.Request.ReasonForRequesting : ''}`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-20 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            placeholder="Reason for Requesting"
          />
        </div>
        </div>

        <div className="mt-4 relative">
        <label htmlFor="milkBankLocation" className="block text-pink-500 font-bold mb-2 text-pink-500">
        Note: Maximum of 3 images or files per field.       
         </label>
        <div className="relative">
          <input
            type="text"
            id="reasonRequest"
            name="reasonRequest"
            value={`Reason For Requesting: ${requestData ? requestData.ReasonForRequesting : ''}`}
            onChange={handleChange}
            className="w-full px-4 py-2 h-14 border border-pink-500 rounded-lg focus:outline-none focus:border-pink-500 text-pink-500 pl-8"
            placeholder=""
          />
        </div>
        </div>

        <div className="absolute bottom-0 right-0 mb-8 mr-8 flex flex-col">
          {requestData && requestData.Request && (requestData.Request.RequestStatus !== "Ongoing" && requestData.Request.RequestStatus !== "Complete") && (
            <>
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
            </>
          )}
        </div>

      <RequestConfirmModal
        isOpen={showModal}
        onCancel={handleApproveConfirm}
        onConfirm={handleApproveCancel}
        message="Are you sure you want to approve this request? Once approved, the request process will proceed."
      />

      <RequestDeclineModal
        isOpen={isDeclineModalOpen}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
        message="Are you sure you want to decline this request? Once declined, the request process will not proceed."
      />
    </section>
  );
};

export default requestorAppointmentConfirmation;
