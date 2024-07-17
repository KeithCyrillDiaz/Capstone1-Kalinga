import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import { Loader } from "../../../../components/loader";
import {
  NoUploadedRequirementModal,
  ShowImage,
  MissingRequirements,
} from "../../../../modal/Verification/ImageModals";
import { getToken } from "../../../../functions/Authentication";

const DonorMedicalPage = ({ currentPage, id, form }) => {
  const totalPages = 5;
  const [images, setImages] = useState({});
  const [files, setFiles] = useState({});

  // Modals

  const [openNoRequirementModal, setOpenNoRequirementModal] = useState(false);
  const [openMissingRequirements, setOpenMissingRequirements] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image Modal Info
  const [imageLink, setImageLink] = useState("");
  const [fileName, setFileName] = useState("");

  const [token, setToken] = useState(null)

  useEffect(() => {
    const token =getToken()
    if(token)setToken(token)
  },[])

  

  const fetchImagesAndFiles = async () => {
    try {
      setLoading(true);
      console.log("Fetching Files and Images in database");
      const token = getToken()
      const getFilesResponse = await axios.post(
        `${WebHost}/kalinga/getMedicalRequirementFile/${id}`,
        {purpose: "Application"},
        {headers: { Authorization: `Bearer ${token}`}}
      );
      console.log(getFilesResponse.data.messages.message);
      if (getFilesResponse.data.messages.code === 0) {
        const filesObj = {};
        getFilesResponse.data.files.forEach((file) => {
          filesObj[file.originalname] = file.link
        });
        setFiles(filesObj)
      }
  
      const getImagesResponse = await axios.post(`${WebHost}/kalinga/getMedicalRequirementImage/${id}`,
      {purpose: "Application"},
      {headers: { Authorization: `Bearer ${token}`}}
    )
      console.log(getImagesResponse.data.messages.message);
      if (getImagesResponse.data.messages.code === 0) {
        const imagesObj = {};
        getImagesResponse.data.images.forEach((image) => {
          imagesObj[image.originalname] = image.link;
        });
        setImages(imagesObj);
      }
    } catch (error) {
      console.log("Error fetching Images And Files", error);
    } finally {
      setLoading(false);
    }
  };


  const getImageUri = (link, name) => {
    setImageLink(link);
    setFileName(name)
    setShowImage(true);
};

  useEffect(() => {
    fetchImagesAndFiles();
  }, []);
  const pageContents = {
    [currentPage]: (
      <>
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

        <div className="p-2 ">
          <div className="flex flex-wrap justify-center items-center">
            {[
              "HepaB",
              "HIV",
              "Syphillis",
              "Pregnancy Book",
              "Government_ID",
            ].map((requirement) => (
              <>        
                        {images[requirement] && (
                          <div
                            key={requirement}
                            onClick={() => getImageUri(images[requirement], requirement)}
                            className=" relative border rounded-md border-primary-default bg-white px-4 py-4 my-4 mx-2 w-60 h-60"
                          >
                            <span className="flex justify-center font-sans text-primary-default text-lg font-bold text-center">
                              {requirement.replace(/_/g, " ")}
                            </span>
                              {/* <a href={`${images[requirement]}`} target="_blank"> */}
                                <img
                                  src={images[requirement]}
                                  alt={requirement}
                                  className="w-50 h-40 mt-2 mx-auto py-2 hover: cursor-pointer"
                                />
                              {/* </a> */}
                          </div>
                       )}

                      {files[requirement] && (
                        <a href ={`${files[requirement]}`} target="_blank">
                           <button 
                            className="bg-primary-default px-4 py-2 m-7 text-white rounded-lg">
                           View {requirement} File
                          </button>
                        </a>
                       
                      )}
                  </>
                 
            ))}
          </div>
        </div>
      </>
    ),
  };
  return pageContents[currentPage];
};

export default DonorMedicalPage;
