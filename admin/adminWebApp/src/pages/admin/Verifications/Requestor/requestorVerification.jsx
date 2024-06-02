import React, { useState, useEffect } from "react";
import RequestorPages from "./requestorPages";
import RequestorMedicalPage from "./requestorMedicalpage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import { Loader } from "../../../../components/loader";
import { Confirmation, VerificationModal } from "../../../../modal/Verification/VerificationModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("screening");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState(false)

  const { Applicant_ID } = useParams();
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

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
          ? await axios.post(`${WebHost}/kalinga/sendApprovedEmail/${Applicant_ID}`)
          : await axios.post(`${WebHost}/kalinga/sendDeclinedEmail/${Applicant_ID}`);
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
        `${WebHost}/kalinga/updateScreeningFormStatus/${Applicant_ID}`,
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
      const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsApplicant_ID/${Applicant_ID}`,)

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Loader isLoading={loading} />
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
                <RequestorPages form={form} currentPage={currentPage} />
              </div>
              <div className="flex justify-end mr-20">
                <div className="flex items-center space-x-4">
                  <button
                    className="hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2"
                    onClick={handlePrevClick}
                  >
                    {"<"}
                  </button>
                  {[1, 2].map((number) => (
                    <button
                      key={number}
                      className={`${
                        currentPage === number
                          ? "hover:font-bold hover:text-primary-default text-xl font-sans text-primary-disabled py-2 px-2 font-bold"
                          : "text-xl font-sans text-primary-disabled py-2 px-4"
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
            <>
              <div className="p-2">
                <div className="px-14">
                  <RequestorMedicalPage
                    form={form}
                    currentPage={currentPage}
                    id={Applicant_ID}
                  />
                </div>
              </div>
              <div className="flex justify-end mr-32">
                <div className="flex flex-col gap-y-2">
                  <div>
                    <button
                      className="hover:bg-primary-default hover:text-white bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full"
                      onClick={() => {
                        setStatus("approved");
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
            </>
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
