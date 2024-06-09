import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RequestConfirmModal from "../../../../modal/RequestConfirmModal";
import RequestDeclineModal from "../../../../modal/RequestDeclineModal";
import AppointmentRequestDeclineModal from "../../../../modal/AppointmentRequestDeclineModal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { WebHost } from "../../../../../MyConstantAdmin";
import { getMedicalAbstractsFiles, getMedicalAbstractsImages } from "../../../../api/Appointments/Request";
import DatePicker from 'react-datepicker';
import { CustomModal } from "../../../../modal/logIn/AlertModal";
import { Loader } from "../../../../components/loader";
import { ShowImage } from "../../../../modal/Verification/ImageModals";
import { getId, getToken } from "../../../../functions/Authentication";
import { sendApprovedAppointmentEmail } from "../../../../api/email/AppointmentEmail";
import { getDateTime } from "../../../../functions/ConvertDateandTime";

const requestorAppointmentConfirmation = () => {


  const [requestData, setRequestData] = useState(null); // State to store fetched request details
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState("");
  const navigate = useNavigate()

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
    console.log("Name: ", name)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { RequestID } = useParams(); // Get the appointmentDonorID from the URL
  console.log("RequestID: ", RequestID)
  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        setLoading(true)
        console.log("Fetching appointment data for RequestID:", RequestID);
        const response = await axios.get(
          `${WebHost}/kalinga/getRequestByID/${RequestID}`
        );
        setLoading(false)
        console.log("API Response:", response.data);
        setRequestData(response.data); // Update state with response data
        fetchRequirements(response.data)
        const request  = response.data.Request
        if(request.RequestStatus === "Ongoing"){
          const { time } = getDateTime({data: {selectedTime: request.Time}})
          console.log("time: ", time)
          setFormattedTime(time)
        }

      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    console.log("RequestID:", RequestID);
    fetchRequestData();
    fetchRequirements()
  }, [RequestID]);


  const [showModal, setShowModal] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleApproved = async () => {
    setShowModal(false);
    try {
      setLoading(true)
      console.log("Selected Date: ", selectedDate)
      console.log("Selected Date: ", selectedDate)
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Ongoing",
        Date: selectedDate, 
        Time: selectedTime,
        BabyCategory: requestData?.Request?.BabyCategory || ''
      });
      const Request = requestData?.Request;
      const { Requestor_ID } = Request || {};
      setLoading(false)
      sendApprovedAppointmentEmail({id:Requestor_ID})
    
    } catch (error) {
      console.error("Error updating request status:", error);
    } finally {
      setLoading(false)
      const id = getId()
      navigate(`/admin/${id}/requestorManagement`)
    }
  };
  const handleApprovedConfirm = () => {
    setShowModal(false);
  };

  const handleApprovedCancel = () => {
    setShowModal(false);
  };
  const handleDecline = async () => {
    setIsDeclineModalOpen(false);

    try {
      setLoading(true)
      await axios.put(`${WebHost}/kalinga/updateRequestStatus/${RequestID}`, {
        RequestStatus: "Decline",
      });
      setLoading(false)
      const id = getId()
      navigate(`/admin/${id}/DonorAppointManage`)
    } catch (error) {
      console.error("Error updating request status:", error);
    } finally {
      setLoading(false)
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


  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const newRequest = {
      ...requestData.Request,
      BabyCategory: value
    }
    setRequestData({
      ...requestData,
      Request: newRequest
    })
  };

  const handleScheduleChange = (name, value) => {

      value = value.toISOString();
  
    console.log(name + ": " + value)
    const newRequest = {
      ...requestData.Request,
      [name]: value
    }

    setRequestData({
      ...requestData,
      Request: newRequest
    })
    if(name === "Time") setSelectedTime(value)
      else setSelectedDate(value)
  }


  console.log("Request Data: ", requestData)

  const fetchRequirements = async (id) => {
    const Requestor_ID= id.Request.Requestor_ID
    const token = getToken()
    const files = await getMedicalAbstractsFiles({id: Requestor_ID, purpose: "Request", token: token})
    const images = await getMedicalAbstractsImages({id: Requestor_ID, purpose: "Request", token: token})
    if(files) setFiles(files)
      else setFiles([])
    if(images) setImages(images)
      else setImages([])
  }


  const [alert, setAlert] = useState(false)
  const confirmation = () => {
    if(requestData?.Request?.BabyCategory === "" || requestData?.Request?.BabyCategory == null ){
      setAlert(true)
      return
    }
    setShowModal(true)
    
  }

  const [imageLink, setImageLink] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [fileName, setFileName] = useState("")
  const getImageUri = (data) => {
    const {link, originalname} = data
    setImageLink(link);
    setFileName(originalname)
    setShowImage(true);
};

  if(loading){
    return (
      <Loader isLoading={loading}/>
    )
  }

  return (
    <section className="w-full h-screen bg-primary-body overflow-hidden px-4">
      <div className="p-10 pt-1">
        <h1 className="text-3xl text-primary-default font-bold font-sans py-4 pb-2">
          Request Confirmation
        </h1>
        {alert && (
          <CustomModal message={"Please add a baby category first"} onClose={() => setAlert(false)}/>
        )}
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
          <label
                htmlFor="date"
                className="text-md z-10 font-medium font-bold text-primary-default ml-2"
              >
                Baby Category
              </label>
            <select
              disabled={requestData?.Request?.RequestStatus !== "Pending"}
              id="BabyCategory"
              name="BabyCategory"
              value={requestData?.Request?.BabyCategory ?? "Did not set"}
              onChange={handleSelectChange}
              className={`bg-white w-full px-4 py-2 h-14 shadow-md rounded-lg focus:outline-none focus:text-primary-default ${requestData?.Request?.RequestStatus !== "Pending" ? "text-[#E60965]" : ""}`}
            >
              <option value="">Select Baby Category</option>
              <option value="Well Baby">Well Baby</option>
              <option value="Sick Baby">Sick Baby</option>
              <option value="Medically Fragile Baby">Medically Fragile Baby</option>
            </select>
        </div>
          <div className="w-1/3 mt-10">
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
                value={`Method for Obtaining: ${
                  requestData ? requestData.Request.method : ""
                }`}
                onChange={handleChange}
                className="bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default"
                disabled
                placeholder="Reason for Requesting"
              />
            </div>
          </div>
        </div>

        {/* Scheduling Request Appointment */}
        <div className="flex gap-x-2">
          <div className="w-1/2 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="text-md font-medium font-bold text-primary-default ml-2"
              >
                Scheduled Date
              </label>
              <DatePicker
                selected={requestData?.Request?.Date || new Date()}
                onChange={(date) => handleScheduleChange("Date", date)}
                dateFormat="dd/MM/yyyy"
                className={`bg-white w-full px-4 py-2 h-14 shadow-md  rounded-lg focus:outline-none focus: text-primary-default ${
                 requestData?.Request?.RequestStatus === "Pending" 
                    ? "focus: text-primary-default"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                // Disable date selection if not pending
                disabled={requestData?.Request?.RequestStatus !== "Pending"}
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
            { requestData?.Request?.RequestStatus === "Pending" && (
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
                  handleScheduleChange("Time", newTime)
                  setSelectedTime(newTime);
                }}
                className={`bg-white w-full py-2 h-14 px-4 shadow-md rounded-lg focus:outline-none focus: text-primary-default ${
                  requestData?.Request?.RequestStatus === "Pending"
                    ? "focus: text-primary-default"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                // Disable time selection if not pending
                disabled={requestData?.Request?.RequestStatus !== "Pending"}
              />
            )}
            { requestData?.Request?.RequestStatus !== "Pending" && (
              <input
                type="text"
                id="time"
                value={formattedTime}
                disabled={true}
                className={`bg-white w-full py-2 h-14 px-4 shadow-md rounded-lg focus:outline-none focus: text-primary-default`}
              />
            )}

            
          </div>
        </div>
         
        {showImage && (
          <ShowImage
            link={imageLink}
            fileName={fileName}
            onClose={() => setShowImage(false)}
          />
        )}

        <div className="mt-4 flex flex-cols gap-4">
      {images.length !== 0 && images.map(requirement => (
        <>
              <div key={requirement.originalname} 
              onClick={() => getImageUri(requirement)}
              className="bg-white px-4 py-2 w-full h-72 shadow-md rounded-lg focus:outline-none focus: text-primary-default">
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
        {/* <div className="mt-4 flex flex-cols gap-4">
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
          </div>*/}
        </div> 
{/* 
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
        </div> */}

        <div className="absolute  right-0 mt-8 mr-16 flex flex-col">
          {requestData &&
            requestData.Request &&
            requestData.Request.RequestStatus !== "Ongoing" &&
            requestData.Request.RequestStatus !== "Decline" &&
            requestData.Request.RequestStatus !== "Complete" && (
              <>
                <button
                  onClick={()=> confirmation()}
                  className="bg-primary-default text-white px-4 py-2 rounded-full mb-4"
                >
                  Approved
                </button>
                <button
                  onClick={() => setIsDeclineModalOpen(true)}
                  className="bg-white text-primary-default px-4 py-2 rounded-full border border-primary-default"
                >
                  Decline
                </button>
              </>
            )}
        </div>

        <RequestConfirmModal
          isOpen={showModal}
          onConfirm={handleApproved}
          onCancel={handleApprovedConfirm}
          message="Are you sure you want to approve this request? Once approved, the request process will proceed."
        />

        {/* <RequestDeclineModal
          isOpen={isDeclineModalOpen}
          onConfirm={handleDecline}
          onCancel={handleDeclineCancel}
          message="Are you sure you want to decline this request? Once declined, the request process will not proceed."
        /> */}

        <AppointmentRequestDeclineModal
          isOpen={isDeclineModalOpen}
          onConfirm={handleDecline}
          onCancel={handleDeclineCancel}
          message="Are you sure you want to decline this appointment? Once declined, the request process will not proceed."
          RequestID={RequestID}
        />
      </div>
    </section>
  );
};

export default requestorAppointmentConfirmation;
