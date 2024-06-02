
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../../../modal/ConfirmationModal";
import DeclineModal from "../../../../modal/DeclineModal";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import CompleteModal from "../../../../modal/CompleteModal";
import AppointmentDeclineModal from "../../../../modal/AppointmentDeclineModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMedicalAbstractsFiles, getMedicalAbstractsImages } from "../../../../api/Appointments/Request";
import { getDateTime } from "../../../../functions/ConvertDateandTime";
import { getToken } from "../../../../functions/Authentication";

const donorAppointmentConfirmation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])


  const [formData, setFormData] = useState({
    DonationStatus: "",
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    medicalCondition: "",
    milkAmount: "",
    location: "",
    selectedDate: new Date(),
    selectedTime: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { AppointmentDonorID } = useParams();
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getAppointmentsByDonorID/${AppointmentDonorID}`
        );
        setAppointmentData(response.data.Appointment);
        setSelectedDate(new Date(response.data.Appointment.selectedDate));
        setSelectedTime(new Date(response.data.Appointment.selectedTime));
        await fetchRequirements(response.data.Appointment.Donor_ID);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    console.log("AppointmentDonorID:", AppointmentDonorID);
    fetchAppointmentData();
  }, [AppointmentDonorID]);

  const handleApproved = async () => {
    setShowModal(true); // Open the modal
    try {
      // Make a PUT request to update the RequestStatus to "Ongoing"
      // const utcTime = new Date(selectedTime.getTime() + (selectedTime.getTimezoneOffset() * 60000));

      await axios.put(
        `${WebHost}/kalinga/updateDonationStatus/${AppointmentDonorID}`,
        {
          DonationStatus: "Ongoing",
          selectedDate: selectedDate.toISOString(),
          selectedTime: selectedTime.toISOString()
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

  const handleComplete = async () => {
    // Mark the function as async
    setIsCompleteModalOpen(true);

    try {
      await axios.put(
        `${WebHost}/kalinga/updateDonationComplete/${AppointmentDonorID}`,
        {
          DonationStatus: "Complete",
        }
      );

      // Optionally, you can reload the data or do any other action upon successful update
    } catch (error) {
      console.error("Error updating request status:", error);
      // Handle error if needed
    }
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
    setIsCompleteModalOpen(false);
  };

  const handleCompleteCancel = () => {
    setIsCompleteModalOpen(false); // Close the modal
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (selectedTime) => {
    const { time } = getDateTime({data: {selectedTime: selectedTime}})
    setSelectedTime(time);
  };

  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = getToken()
    console.log("token", token)
    if(token)setToken(token)
  },[])

   //fetch Image requirements
  const fetchRequirements = async (id) => {
    const Donor_ID = id
    console.log("id: ", id)
    const files = await getMedicalAbstractsFiles({id: Donor_ID, purpose: "Donate", token: token})
    const images = await getMedicalAbstractsImages({id: Donor_ID, purpose: "Donate", token: token})
    if(files) setFiles(files)
      else setFiles([])
    if(images) setImages(images)
      else setImages([])
  }

  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden relative px-4">
      <div className="p-12 pt-1">
        <h1 className="mt-8 text-3xl text-primary-default font-bold font-sans">
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
              value={`Phone Number: ${
                appointmentData ? appointmentData.phoneNumber : ""
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
              value={`Email Address: ${
                appointmentData ? appointmentData.emailAddress : ""
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
                appointmentData ? appointmentData.homeAddress : ""
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
              value={`City: ${appointmentData ? appointmentData.city : ""}`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="City"
            />
          </div>
        </div>
        {/* Medical Condition and Amount Donated Input */}
        <div className="flex gap-x-2">
          <div className="w-2/3 mt-4">
            <input
              type="text"
              id="medicalCondition"
              name="medicalCondition"
              value={`Medical Condition: ${
                appointmentData ? appointmentData.medicalCondition : ""
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
              value={`Donated Milk Amount (in mL): ${
                appointmentData ? appointmentData.milkAmount : ""
              }`}
              onChange={handleChange}
              className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
              disabled
              placeholder="Amount of Milk Donated"
            />
          </div>
        </div>

        <div className="flex gap-x-2">
          {appointmentData && (
            <>
              <div className="w-1/2 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-md font-medium font-bold text-primary-default ml-2"
                  >
                    Scheduled Date
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className={`bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default ${
                      appointmentData.DonationStatus === "Pending"
                        ? "focus: text-primary-default"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                    // Disable date selection if not pending
                    disabled={appointmentData.DonationStatus !== "Pending"}
                  />
                </div>
              </div>
              <div className="w-1/2 mt-4">
                <label
                  htmlFor="time"
                  className="text-md font-medium font-bold text-primary-default ml-2"
                >
                  Scheduled Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={
                    selectedTime
                      ? selectedTime.toISOString().substring(11, 16)
                      : ""
                  }
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":");
                    const newTime = new Date(selectedTime);
                    
                    // Set the hours and minutes of the new time
                    newTime.setUTCHours(parseInt(hours, 10), parseInt(minutes, 10));
                  
                    // Convert newTime to local time zone (Philippine time)
                    const localTime = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                  
                    // Parse the local time string to get the hours, minutes, and AM/PM
                    const [localHours, localMinutes, amPm] = localTime.split(/:| /);
                    
                    // Convert hours to 24-hour format
                    let hours24 = parseInt(localHours, 10);
                    if (amPm.toLowerCase() === 'pm' && hours24 < 12) {
                      hours24 += 12;
                    } else if (amPm.toLowerCase() === 'am' && hours24 === 12) {
                      hours24 = 0;
                    }
                  
                    // Set the new time with local hours and minutes
                    newTime.setHours(hours24, parseInt(localMinutes, 10));
                  
                    setSelectedTime(newTime);
                  }}
                  className={`bg-white w-full py-2 h-14 px-4 shadow-md rounded-lg focus:outline-none focus: text-primary-default ${
                    appointmentData.DonationStatus === "Pending"
                      ? "focus: text-primary-default"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  // Disable time selection if not pending
                  disabled={appointmentData.DonationStatus !== "Pending"}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex gap-x-2">
          <div className="w-1/2 mt-4">
            <label
              htmlFor="milkBankLocation"
              className="block text-primary-default text-md text-primary-default ml-2"
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
                className="bg-white w-full px-4 text-sm py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
                disabled
                placeholder="Milkbank Location"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="absolute top-0 right-2 mt-3 ml-3 text-primary-default"
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
          <div className="w-1/2 mt-4">
            <label
              htmlFor="appointmentTime"
              className="block text-primary-default text-md text-primary-default ml-2"
            >
              Method of obtaining
            </label>
            <div className="relative">
              <input
                id="appointmentTime"
                name="appointmentTime"
                value={appointmentData ? appointmentData.method : ""}
                onChange={handleChange}
                placeholder="Time"
                className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
                disabled
              />
            </div>
          </div>
        </div>
      
          <div
          className="flex flex-row"
          >
            {images.length !== 0 && images.map(requirement => (
              <>
                    <div key={requirement.originalname} className="bg-white px-4 py-2 w-full h-72 shadow-md rounded-lg focus:outline-none focus: text-primary-default">
                      <span className="flex justify-center text-primary-default text-lg text-center">
                      {requirement.originalname}
                      </span>
                      <img
                          className="w-[80%] h-[80%] mt-2 mx-auto py-2 hover: cursor-pointer object-contain"
                        src={requirement.link}
                        alt={requirement.originalname}
                        />
                    </div>
              </>
              
            ))}
        {files.length !== 0 && files.map(requirement => (
         <div key={requirement.originalname} className="bg-white px-4 py-2 w-[40%] h-72 shadow-md items-center justify-center rounded-lg focus:outline-none focus: text-primary-default">
           <span className="flex justify-center text-primary-default text-lg text-center">
             {requirement.originalname}
           </span>
           <a href ={`${requirement.link}`} target="_blank">
                <button 
                className="bg-primary-default px-4 py-2 text-white rounded-lg text-xs">
                Download {requirement.originalname} File
              </button>
            </a>
         </div>
      ))}
          </div>
          

       
        

        {appointmentData && appointmentData.DonationStatus === "Pending" && (
          <div className="flex justify-end mr-4 mt-10">
            <div className="flex flex-col gap-y-2">
              <button
                onClick={handleApproved}
                className="flex justify-end bg-primary-default text-white px-4 py-2 rounded-full hover:bg-pink-600 shadow-md"
              >
                Approved
              </button>
              <button
                onClick={handleDecline}
                className="bg-white text-primary-default px-4 py-2 rounded-full border border-pink-500 hover:bg-primary-default hover:text-white"
              >
                Decline
              </button>
            </div>
          </div>
        )}
        {appointmentData && appointmentData.DonationStatus === "Ongoing" && (
          <div className="flex justify-end mr-4 mt-10">
            <button
              onClick={handleComplete}
              className="flex justify-end bg-primary-default text-white px-4 py-2 rounded-full hover:bg-pink-600 shadow-md"
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
        <AppointmentDeclineModal
          isOpen={isDeclineModalOpen}
          onConfirm={handleDeclineConfirm}
          onCancel={handleDeclineCancel}
          message="Are you sure you want to decline this appointment? Once declined, the request process will not proceed."
          AppointmentDonorID={AppointmentDonorID}
        />
        <CompleteModal
          isOpen={isCompleteModalOpen}
          onConfirm={handleCompleteConfirm}
          onCancel={handleCompleteCancel}
          message="Are you sure this appointment is already completed?"
        />
      </div>
    </section>
  );
};

export default donorAppointmentConfirmation;