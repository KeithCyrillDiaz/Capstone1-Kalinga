import React, { useEffect, useState } from "react";
import DonorPages from "./donorpages";
import ConfirmationModal from "./confirmModal";
import { useParams} from "react-router-dom";
import { Loader } from '../../components/loader'
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";

export default function () {

  
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("screening");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({})
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
    try{
      console.log("Sending Email")
      const  response = status === "approved" ? await axios.post(`${WebHost}/kalinga/sendApprovedEmail/${id}`)
       : await axios.post(`${WebHost}/kalinga/sendDeclinedEmail/${id}`)
        console.log(response.data.messages.message)
        if(response.data.messages.code===0)deleteScreeningForm(status)
    } catch (error) {
      console.log("Error Sending Email", error)
    }
   
  }

 const deleteScreeningForm = async (data) => {
  const formatStatus = data === "declined" ? "Declined" : "Approved"
    console.log("formatStatus: ",formatStatus )
   try{
      console.log("Deleting Screening Form")
    const response = await axios.patch(`${WebHost}/kalinga/deleteScreeningFormByID/${id}`,
      {status: formatStatus}
    )
    console.log("response: ",response.data.messages.message)
   } catch (error) {
    console.log("Error Deleting ScreeningForm", error)
   }
 }

  const fetchData = async () => {
    try{
      setLoading(true)
      //axiosToken
      const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsApplicant_ID/${id}`)
      
      if(!response.data.screeningForms){
        console.log("Error fetching Screening forms")
        return
      }

      console.log("Successfully retrieved screeningForms")
      setForm(response.data.screeningForms)

    } catch(error) {
      console.log("Something went wrong", error)
    } finally{
      setLoading(false)
    }
  } 

  useEffect(() => {
    fetchData();
  },[])


  return (
    <>
      <Loader isLoading={loading}/>
      <section className="w-full min-h-screen bg-neutral-variant">
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
              <div className="fixed bottom-0 right-0 p-4 m-4">
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
            <div className="2xl:p-2">
              <div className="px-32">
                <div className="2xl:my-8">
                  <div className="bg-white relative border rounded-md border-primary-default px-8 2xl:py-6 md:py-4 my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Hepa B Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default px-8 2xl:py-6 md:py-4  my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      HIV 1 & 2 Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 2xl:py-6 md:py-4  my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Syphilis Test Result
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 2xl:py-6 md:py-4  my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Pregnancy Booklet
                    </span>
                  </div>
                  <div className="bg-white relative border rounded-md border-primary-default  px-8 2xl:py-6 md:py-4  my-6">
                    <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                      Government ID
                    </span>
                  </div>
                </div>
 
                <div className="flex 2xl:flex-col md:flex-row md:items-center md:gap-7 md:justify-center">
                  <div>
                    <button
                      className="hover:bg-primary-default hover:text-white 2xl:fixed bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full right-40"
                      onClick={() => {
                        setStatus("approved");
                        sendEmail("approved")
                        setIsConfirmationModalOpen(true)
       
                      }}
                    >
                      <span className="flex justify-center items-center font-sans">
                        Approve
                      </span>
                    </button>
                  </div>

                  <div>
                    <button
                      className="hover:bg-primary-default hover:text-white 2xl:fixed bg-neutral-default text-primary-default font-bold w-32 p-2 border border-primary-default rounded-full right-40 2xl:mt-12"
                      onClick={() => {
                        setStatus("declined");
                        sendEmail("declined")
                        setIsConfirmationModalOpen(true)

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
          )}
        </div>
      </section>
          {}
      {isConfirmationModalOpen && (
        <>
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            confirmMessage={() =>
              status === "approved"
                ? "Are you sure you want to approve?"
                : "Are you sure you want to reject?"
            }
            onCancel={() => setIsConfirmationModalOpen(false)}
            userType={form.userType} 
            name={form.fullName}
            status={status} 
            onClose={() => setIsConfirmationModalOpen(false)}
          />
        </>
      )}
    </>
  );
}
