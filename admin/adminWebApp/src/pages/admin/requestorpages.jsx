import React, { useState, useEffect} from "react";
import { Loader } from '../../components/loader'
import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { NoUploadedRequirementModal, ShowImage, MissingRequirements } from "../../modal/Verification/ImageModals";
const RequestorPages = ({ 
    currentPage, 
    id, // Applicant ID
    form
  })  => {

    //Variable for storing data from Database
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([])

     //Modals
    const [openNoRequirementModal, setOpenNoRequirementModal] = useState(false)
    const [openMissingRequirements, setOpenMissingRequirements] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [loading, setLoading] = useState(false)


    //Image Modal Info
    const [imageLink, setImageLink] = useState("")
    const [fileName, setFileName] = useState("")


  const fetchImagesAndFiles = async () => {
    try{
        setLoading(true)
        console.log("Fetching Files and Images in database")
        //getFileData in Database
        const getFilesResponse = await axios.get(`${WebHost}/kalinga/getMedicalRequirementFile/${id}`)
        console.log(getFilesResponse.data.messages.message)
        if(getFilesResponse.data.messages.code === 0) {
          setFiles(getFilesResponse.data.files)
        }

        //getImageData in Database
        const getImagesResponse = await axios.get(`${WebHost}/kalinga/getMedicalRequirementImage/${id}`)
        console.log(getImagesResponse.data.messages.message)
        if(getImagesResponse.data.messages.code === 0) {
          setImages(getImagesResponse.data.images)
        }
      
    } catch(error) {
      console.log("Error fetching Images And Files", error)
    } finally {
      setLoading(false)
    }
  }

  const getImageByOriginalName = (name) => images.filter(image => image.originalname === name)
  const getFileByOriginalName = (name) => files.filter(file => file.originalname === name)

  const getImageUri = (requirement) => {

    if(files.length === 0 && images.length === 0) {
      console.log("No requirement found")
      setOpenMissingRequirements(true)
      return
    }

    const file = getFileByOriginalName(requirement)
    const image = getImageByOriginalName(requirement)

    if(!file && !image) {
      console.log("No Requirements Found")
      setOpenMissingRequirements
      return
    }
    // const { link } = image ? image[0] : file[0]

    if(image[0]){
      const { link } = image[0]// 0 index since isang image lang kinukuha sa array of images variable
      console.log(`${requirement} link: `, link)
      if(!link) {
        console.log("Error: Image link is Missing")
      } else {
        setImageLink(link)
        setShowImage(true)
        setFileName(requirement)
      }
    } 
    console.log("File: ", files)
    if(file[0]) {
      const { link } = file[0]// 0 index since isang file lang kinukuha sa array of files variable
      console.log(`${requirement} link: `, link)
      if(!link) {
        console.log("Error: File link is Missing")
      } else {
        window.open(link, '_blank');
      }
    } else {
      console.log("No File Found")
    }
  }


  useEffect(() => {
    fetchImagesAndFiles();
  },[])

  // Define content for each page here
  const pageContents = {
    1: (
      <>
           {/* Modals */}
            <Loader isLoading={loading}/>
            {openNoRequirementModal && (
              <NoUploadedRequirementModal onClose={() => setOpenNoRequirementModal(false)}/>
            )}
            {showImage && (
              <ShowImage 
                link = {imageLink}
                fileName={fileName}
                onClose={() => setShowImage(false)}
              />
            )}
            {openMissingRequirements && (
              <MissingRequirements 
                onClose={() => setOpenMissingRequirements(false)}
              />
            )}

          <div className="p-2">
            <div className="px-32">
              <div className="my-[-10]">
                <div className="flex font-sans font-bold justify-center text-3xl text-primary-default">
                  Medical Abstract of an Infant
                </div>
                <div 
                onClick={() => getImageUri("Clinical History")}
                className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Clinical History
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Presending Complaint")}
                className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Presenting Complaint
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Clinical Findings")}
                className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Clinical Findings
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Diagnosis")}
                className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Diagnosis
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Treatments and Intervensions")}
                className="relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Treatment and Interventions
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Prescription")}
                className=" relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Prescription
                  </span>
                </div>
                <div 
                onClick={() => getImageUri("Government_ID")}
                className=" relative border rounded-md border-primary-default bg-white px-8 py-6 my-6">
                  <span className="flex justify-center font-sans text-primary-disabled text-xl font-bold">
                    Government ID
                  </span>
                </div>
              </div>
            </div>
          </div>
      </>
      
    ),
    2: <div className="p-2">
      <div className="px-32">
        <div className="my-[-10]">
          <div className="flex font-sans font-bold justify-center text-3xl text-primary-default ">
            Reason for Requesting
          </div>
          <div className=" relative border rounded-md bg-white md:h-60 md:w-[700px] 2xl:w-auto border-primary-default p-4 my-6">
            {form.RFR}
          </div>
        </div>
      </div>
    </div>
  };
  return pageContents[currentPage]
};

export default RequestorPages;

