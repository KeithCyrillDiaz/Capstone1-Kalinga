import React, { useEffect, useState } from "react";
import DonorMedicalPage from "./donorMedicalpage";
import DonorPages from "./donorpages";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";
import { Loader } from "../../../../components/loader";
import {
  NoUploadedRequirementModal,
  ShowImage,
  MissingRequirements,
} from "../../../../Modal/Verification/ImageModals";
import { Confirmation, VerificationModal } from "../../../../Modal/Verification/VerificationModal";

export default function () {
  const [activeTab, setActiveTab] = useState("screening");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  //Modals
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState(false)
  const [openNoRequirementModal, setOpenNoRequirementModal] = useState(false);
  const [openMissingRequirements, setOpenMissingRequirements] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  //Image Modal Info
  const [imageLink, setImageLink] = useState("");
  const [fileName, setFileName] = useState("");

  const { id } = useParams(); // Applicant ID

  const [form, setForm] = useState({});
  //const [isRejectConfirmed, setIsRejectConfirmed] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  const sendEmail = async (status) => {
    try {
      console.log("Sending Email");
      const response =
        status === "approved"
          ? await axios.post(`${WebHost}/kalinga/sendApprovedEmail/${id}`)
          : await axios.post(`${WebHost}/kalinga/sendDeclinedEmail/${id}`);
      console.log(response.data.messages.message);
    } catch (error) {
      console.log("Error Sending Email", error);
    }
  };

  const updateStatus = async (data) => {
    setIsConfirmationModalOpen(false)
    const formatStatus = data === "declined" ? "Rejected" : "Approved";
    console.log("formatStatus: ", formatStatus);
    try {
      setLoading(true)
      console.log("Updating Screening Form Status to ", data);
      const response = await axios.patch(
        `${WebHost}/kalinga/updateScreeningFormStatus/${id}`,
        { status: formatStatus }
      );
      console.log("response: ", response.data.messages.message);
      if (response.data.messages.code === 0) sendEmail(data);
    } catch (error) {
      console.log("Error Deleting ScreeningForm", error);
    } finally {
      setLoading(false)
      setApprovalMessage(true)
    }
  };

  
  const fetchData = async () => {
    try {
      setLoading(true);
      //axiosToken
      const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsApplicant_ID/${id}`,)

      if (!response.data.screeningForms) {
        console.log("Error fetching Screening forms");
        return;
      }

      console.log("Successfully retrieved screeningForms");
      setForm(response.data.screeningForms);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImagesAndFiles = async () => {
    try {
      console.log("Fetching Files and Images in database");
      //getFileData in Database
      const getFilesResponse = await axios.get(
        `${WebHost}/kalinga/getMedicalRequirementFile/${id}`
      );
      console.log(getFilesResponse.data.messages.message);
      if (getFilesResponse.data.messages.code === 0) {
        setFiles(getFilesResponse.data.files);
      }

      //getImageData in Database
      const getImagesResponse = await axios.get(
        `${WebHost}/kalinga/getMedicalRequirementImage/${id}`
      );
      console.log(getImagesResponse.data.messages.message);
      if (getImagesResponse.data.messages.code === 0) {
        setImages(getImagesResponse.data.images);
      }
    } catch (error) {
      console.log("Error fetching Images And Files", error);
    }
  };

  const getImageByOriginalName = (name) =>
    images.filter((image) => image.originalname === name);
  const getFileByOriginalName = (name) =>
    files.filter((file) => file.originalname === name);

  const getImageUri = (requirement) => {
    if (files.length === 0 && images.length === 0) {
      console.log("No Requirements found");
      setOpenMissingRequirements(true);
      return;
    }

    const file = getFileByOriginalName(requirement);
    const image = getImageByOriginalName(requirement);

    if (!file && !image) {
      console.log("User have not uploaded any requirement for this ");
      setOpenNoRequirementModal(true);
      return;
    }
    // const { link } = image ? image[0] : file[0]

    if (image) {
      const { link } = image[0]; // 0 index since isang image lang kinukuha sa array of images variable
      console.log(`${requirement} link: `, link);
      if (!link) {
        console.log("Error: Image link is Missing");
      } else {
        setImageLink(link);
        setShowImage(true);
        setFileName(requirement);
      }
    }

    if (file) {
      const { link } = file[0]; // 0 index since isang file lang kinukuha sa array of files variable
      console.log(`${requirement} link: `, link);
      if (!link) {
        console.log("Error: Image link is Missing");
      } else {
        window.open(link);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchImagesAndFiles();
  }, []);

  return (
    <>
      {/* Modals */}
      <Loader isLoading={loading} />
      {openNoRequirementModal && (
        <NoUploadedRequirementModal
          onClose={() => setOpenNoRequirementModal(false)}
        />
      )}
      {showImage && (
        <ShowImage
          link={imageLink}
          fileName={fileName}
          onClose={() => setShowImage(false)}
        />
      )}
      {openMissingRequirements && (
        <MissingRequirements
          onClose={() => setOpenMissingRequirements(false)}
        />
      )}
      <section className="w-full min-h-screen bg-primary-body">
        <div>
          <div className="flex justify-center m-6">
            <button
              onClick={() => handleTabChange("screening")}
              className={`${
                activeTab === "screening"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Screening Form
            </button>
            <button
              onClick={() => handleTabChange("medical")}
              className={`${
                activeTab === "medical"
                  ? "bg-primary-default text-white"
                  : "bg-transparent"
              } text-primary-default text-2xl py-2 px-20 border-2 border-primary-default font-sans focus:outline-none`}
            >
              Medical Requirements
            </button>
          </div>
          {activeTab === "screening" && (
            <div className="p-2">
              <div className="px-14">
                <DonorPages form={form} currentPage={currentPage} />
              </div>
              <div className="flex justify-end mr-20">
                <div className="flex items-center space-x-4">
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handlePrevClick}
                  >
                    {"<"}
                  </button>
                  {[1, 2, 3, 4].map((number) => (
                    <button
                      key={number}
                      className={`${
                        currentPage === number
                          ? "hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 pr-1 font-bold"
                          : "text-xl font-sans text-primary-disabled py-2 pr-1"
                      }`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handleNextClick}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "medical" && (
            <div className="2xl:p-2">
              <div className="px-32">
                <DonorMedicalPage
                  form={form}
                  currentPage={currentPage}
                  id={id}
                />
                <div className="flex justify-end mr-10">
                  <div className="flex flex-col gap-y-2">
                    <div>
                      <button
                        className="hover:bg-primary-default hover:text-white bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full"
                        onClick={() => {
                          setStatus("approved");
                          // updateStatus("approved");
                          setIsConfirmationModalOpen(true);
                        }}
                      >
                        <span className="flex justify-center items-center font-sans">
                          Approve
                        </span>
                      </button>
                    </div>

                    <div>
                      <button
                        className="hover:bg-primary-default hover:text-white bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full mt-4 md:mt-0"
                        onClick={() => {
                          setStatus("declined");
                          // updateStatus("declined");
                          setIsConfirmationModalOpen(true);
                        }}
                      >
                        <span className="flex justify-center items-center font-sans">
                          Reject
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {isConfirmationModalOpen && (
        <>
            <Confirmation
            status={status}
            name={form.fullName}
            userType={form.userType}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm = {() => updateStatus(status)}
          />
        </>
      )}
      {approvalMessage && (
        <>
            <VerificationModal
            status={status}
            name={form.fullName}
            userType={form.userType}
            onClose={() => setApprovalMessage(false)}
          />
        </>
      )}
    </>
  );
}
