
import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { formatDate } from "./formatDateFunction";
import { WebHost } from '../../../MyConstantAdmin'
import axios from 'axios'
import { DeleteScreeningFormModal } from "../../modal/Verification/DeleteScreeningFormModal";

export const RenderPendingVerification = ({
  name,
  email,
  date,
  form
}) => {
  
  const [finalDate, setFinalDate] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)


  const setDateFormat = () => {
    if(!date){
      console.log("Date undefined")
      return
    }
    const newDate = formatDate(date) // import { formatDate } from "./formatDateFunction"
    setFinalDate(newDate)
  }

  useEffect(() => {

    setDateFormat();
  },[])

  const deleteApplicantForm = async() => {
    console.log("Deleting Screening Form")
    setDeleteModal(false)
    try{
      const { Applicant_ID } = form
      // console.log(" Applicant_ID: ",  Applicant_ID)
      const response = await axios.patch(`${WebHost}/kalinga/deleteScreeningFormByID/${Applicant_ID}`)
      console.log(response.data.messages.message)
      window.location.reload();
    } catch(error){
      console.log("Error Deleting Screening Form")
    }

  }
  const handleModal = () => {
    console.log("click")
    setDeleteModal(true)
  }
  return (
    <div className="bg-white rounded-2xl p-8 mb-4 flex items-center border border-primary-default">
         <DeleteScreeningFormModal confirm={() => deleteApplicantForm()} onClose={() => setDeleteModal(false)} openModal={deleteModal}/>
      <div className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10em"
          height="10em"
          viewBox="0 0 24 24"
          className="text-primary-default"
        >
          <g fill="none" fillRule="evenodd">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
            />
          </g>
        </svg>
      </div>
      {/* Details */}
      <div className="flex-grow ml-10">
        <div>
          <h3 className="text-3xl font-bold text-primary-default mb-6">
            {name}
          </h3>
          <p className="text-2xl text-primary-default mb-6">
            {email}
          </p>
          <p className="text-2xl text-primary-default mb-6">
            {finalDate}
          </p>
        </div>
      </div>
      {/* Button */}
      <div className="flex flex-col gap-y-4 mr-20">
        <Link 
        to={{pathname: `/admin/DonorVerification/${form.Applicant_ID}`}}
        > 

          <button className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
            View
          </button>
        </Link>
          <button onClick={handleModal}  className="w-full h-10 px-16 bg-transparent border border-primary-default text-primary-default font-bold rounded-lg hover:bg-primary-default hover:text-white focus:outline-none focus:ring-2 focus:primary-default">
            Delete
          </button>
      </div>
    </div>
  )
}
