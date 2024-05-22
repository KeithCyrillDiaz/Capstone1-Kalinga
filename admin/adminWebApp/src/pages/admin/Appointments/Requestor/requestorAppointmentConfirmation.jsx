import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RequestConfirmModal from "../../../../modal/RequestConfirmModal";
import RequestDeclineModal from "../../../../modal/RequestDeclineModal";
import AppointmentRequestDeclineModal from "../../../../modal/AppointmentRequestDeclineModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WebHost } from "../../../../../MyConstantAdmin";

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
        RequestStatus: "Ongoing",
        BabyCategory: formData.BabyCategory,
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

  const handleBabyCategoryChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      BabyCategory: e.target.value,
    }));
  };

  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden px-4">
      <div className="p-10 pt-1">
        <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-2">
          Request Confirmation
        </h1>

        {/* Full Name Input */}
        <div className="mt-2">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={`Full Name: ${
              requestData ? requestData.Request.fullName : ""
            }`}
            onChange={handleChange}
            className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
            disabled
            placeholder="Full Name"
          />
        </div>

        {/* Phone Number and Email Address  */}
        <div className="flex gap-x-2">
          <div className="w-2/3 mt-4">
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={`Email Address: ${
                requestData ? requestData.Request.emailAddress : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Email Address"
            />
          </div>
          <div className="w-1/3 mt-4">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={`Phone Number: ${
                requestData ? requestData.Request.phoneNumber : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Home Address and City Input */}
        <div className="flex gap-x-2">
          <div className="w-2/3 mt-4">
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              value={`Home Address: ${
                requestData ? requestData.Request.homeAddress : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Home Address"
            />
          </div>
          <div className="w-1/3 mt-4">
            <input
              type="text"
              id="city"
              name="city"
              value={`City: ${requestData ? requestData.Request.city : ""}`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="City"
            />
          </div>
        </div>

        {/* Medical Condition and Milk Requested Input */}
        <div className="flex gap-x-2">
          <div className="w-2/3 mt-4">
            <input
              type="text"
              id="medicalCondition"
              name="medicalCondition"
              value={`Medical Condition: ${
                requestData ? requestData.Request.medicalCondition : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Medical Condition"
            />
          </div>
          <div className="w-1/3 mt-4">
            <input
              type="text"
              id="amountDonated"
              name="amountDonated"
              value={`Requested Milk Amount (in mL): ${
                requestData ? requestData.Request.milkAmount : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Amount of Milk Donated"
            />
          </div>
        </div>

        {/* Reason */}
        <div className="flex gap-x-2">
          <div className="w-2/3 mt-4">
            <div className="relative">
              <input
                type="text"
                id="reasonRequest"
                name="reasonRequest"
                value={`Reason for Requesting: ${
                  requestData ? requestData.Request.ReasonForRequesting : ""
                }`}
                onChange={handleChange}
                className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
                disabled
                placeholder="Reason for Requesting"
              />
            </div>
          </div>
          <div className="w-1/3 mt-4">
            <div className="relative">
              <input
                type="text"
                id="reasonRequest"
                name="MethodforObtaining"
                value={`Method for Obtaining: Authorized Person`}
                onChange={handleChange}
                className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
                disabled
                placeholder="Reason for Requesting"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-cols gap-4">
          <div className="bg-white px-4 py-2 w-1/4 h-72 shadow-md  rounded-lg focus:outline-none focus: text-primary-default">
            <span className="flex justify-center text-primary-default text-lg text-center">
              Medical Abstract
            </span>
          </div>

          <div className="bg-white px-4 py-2 w-1/4 h-72 shadow-md  rounded-lg focus:outline-none focus: text-primary-default">
            <span className="flex justify-center text-primary-default text-lg text-center">
              QC Citizen ID / 2 Government ID
            </span>
          </div>

          <div className="bg-white px-4 py-2 w-1/4 h-72 shadow-md  rounded-lg focus:outline-none focus: text-primary-default">
            <span className="flex justify-center text-primary-default text-lg text-center">
              Authorization Letter (if applicable)
            </span>
          </div>

          <div className="bg-white px-4 py-2 w-1/4 h-72 shadow-md  rounded-lg focus:outline-none focus: text-primary-default">
            <span className="flex justify-center text-primary-default text-lg text-center">
              Authorized Person's ID
            </span>
          </div>
        </div>

        <div className="mt-4 ">
          <div className="flex bg-white w-full px-4 py-2 h-30 shadow-md  rounded-lg focus:outline-none focus: text-primary-default">
            <div>
              <label
                htmlFor="babyCategorization"
                className="block text-md text-primary-default"
              >
                Baby Categorization: (based on Medical Abstract)
              </label>
              {requestData &&
                requestData.Request &&
                requestData.Request.RequestStatus !== "Ongoing" &&
                requestData.Request.RequestStatus !== "Decline" &&
                requestData.Request.RequestStatus !== "Complete" && (
                  <select
                    id="babyCategorization"
                    name="babyCategorization"
                    value={formData.BabyCategory}
                    onChange={handleBabyCategoryChange}
                    className="mt-2 bg-white w-full rounded-lg shadow-md p-2 focus:outline-none focus:ring-primary-default focus:border-primary-default sm:text-md text-primary-default"
                  >
                    <option value="">Select Baby Category</option>
                    <option value="Well baby">Well baby</option>
                    <option value="Sick Baby">Sick Baby</option>
                    <option value="Medically Fragile Baby">
                      Medically Fragile Baby
                    </option>
                  </select>
                )}
            </div>
          </div>
        </div>

        <div className="absolute  right-0 mt-8 mr-16 flex flex-col">
          {requestData &&
            requestData.Request &&
            requestData.Request.RequestStatus !== "Ongoing" &&
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
                  className="bg-white text-primary-default px-4 py-2 rounded-full border border-primary-default"
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
      </div>
    </section>
  );
};

export default requestorAppointmentConfirmation;
