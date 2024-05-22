import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantAdmin";
import { Loader } from "../../../../components/loader";
import {
  NoUploadedRequirementModal,
  ShowImage,
  MissingRequirements,
} from "../../../../modal/Verification/ImageModals";

const DonorMedicalPage = ({ currentPage, id, form }) => {
  const totalPages = 5;
  const [images, setImages] = useState({});
  const [files, setFiles] = useState([]);

  // Modals

  const [openNoRequirementModal, setOpenNoRequirementModal] = useState(false);
  const [openMissingRequirements, setOpenMissingRequirements] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image Modal Info
  const [imageLink, setImageLink] = useState("");
  const [fileName, setFileName] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${WebHost}/kalinga/fetchPendingScreeningFormByUserType/${form.userType}`,
      { status: "Pending"}
    )
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
      setLoading(true);
      console.log("Fetching Files and Images in database");

      const getFilesResponse = await axios.get(
        `${WebHost}/kalinga/getMedicalRequirementFile/${id}`
      );
      console.log(getFilesResponse.data.messages.message);
      if (getFilesResponse.data.messages.code === 0) {
        setFiles(getFilesResponse.data.files);
      }

      const getImagesResponse = await axios.get(
        `${WebHost}/kalinga/getMedicalRequirementImage/${id}`
      );
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

  const getImageByOriginalName = (name) => images[name];
  const getFileByOriginalName = (name) =>
    files.find((file) => file.originalname === name);

  const getImageUri = (requirement) => {
    if (Object.keys(files).length === 0 && Object.keys(images).length === 0) {
      console.log("No Requirements found");
      setOpenMissingRequirements(true);
      return;
    }
    console.log("Files: ", files)
    const file = getFileByOriginalName(requirement);
    const image = getImageByOriginalName(requirement);
    console.log("file: ", file)
    console.log("image: ", image)
    if (!file && !image) {
      console.log("Check");
      return;
    }

    if (image) {
      console.log(`${requirement} link: `, image);
      if (!image) {
        console.log("Error: Image link is Missing");
      } else {
        setImageLink(image);
        setShowImage(true);
        setFileName(requirement);
      }
    }

    if (file) {
      const { link } = file;
      console.log(`${requirement} link: `, link);
      if (!link) {
        console.log("Error: File link is Missing");
      } else {
        console.log("Opening Link", link);
        window.open(link, "_blank");
      }
    } else {
      console.log("No File Found");
    }
  };

  useEffect(() => {
    fetchData();
    fetchImagesAndFiles();
  }, []);
  const pageContents = {
    1: (
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
          <div className="flex flex-wrap justify-center">
            {[
              "HepaB",
              "HIV",
              "Syphillis",
              "Pregnancy Book",
              "Government_ID",
            ].map((requirement) => (
              <div
                key={requirement}
                onClick={() => getImageUri(requirement)}
                className="relative border rounded-md border-primary-default bg-white px-4 py-4 my-4 mx-2 w-60 h-60"
              >
                <span className="flex justify-center font-sans text-primary-default text-lg font-bold text-center">
                  {requirement.replace(/_/g, " ")}
                </span>
                {images[requirement] && (
                  <img
                    src={images[requirement]}
                    alt={requirement}
                    className="w-50 h-40 mt-2 mx-auto py-2 hover: cursor-pointer"
                  />
                )}
                  {!images[requirement] && (
                    <a href="https://firebasestorage.googleapis.com/v0/b/kalinga-storage.appspot.com/o/Donor%2FJoshua%20Keith%20Rawr%2FApplication%2FFiles%2F1716366665084?alt=media&token=6a3907b5-89ee-4e1d-9d53-309efeff3d65"
                      target="_blank"
                    >
                       <button>
                        Download {requirement}
                        </button>
                    </a>
                   
                  )}
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  };
  return pageContents[currentPage];
};

export default DonorMedicalPage;
