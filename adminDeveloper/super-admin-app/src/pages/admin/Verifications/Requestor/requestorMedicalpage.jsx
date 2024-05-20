import React, { useState, useEffect } from "react";
import { Loader } from "../../../../components/loader";
import axios from "axios";
import { WebHost } from "../../../../../MyConstantSuperAdmin";
import {
  NoUploadedRequirementModal,
  ShowImage,
  MissingRequirements,
} from "../../../../Modal/Verification/ImageModals";

const RequestorMedicalPage = ({ currentPage, id }) => {
  const [images, setImages] = useState({});
  const [files, setFiles] = useState([]);

  const [openNoRequirementModal, setOpenNoRequirementModal] = useState(false);
  const [openMissingRequirements, setOpenMissingRequirements] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageLink, setImageLink] = useState("");
  const [fileName, setFileName] = useState("");

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
      console.log("No requirement found");
      setOpenMissingRequirements(true);
      return;
    }

    const file = getFileByOriginalName(requirement);
    const image = getImageByOriginalName(requirement);

    if (!file && !image) {
      console.log("No Requirements Found");
      setOpenMissingRequirements(true);
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

        <div className="p-2">
          <div className="px-32">
            <div className="my-[-10]">
              <div className="flex flex-wrap justify-center">
                {[
                  "Clinical History",
                  "Presenting Complaint",
                  "Clinical Findings",
                  "Diagnosis",
                  "Treatments and Intervensions",
                  "Prescription",
                  "Government_ID",
                  "Medical Abstract of the Infant",
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
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 mx-20 border-b border-primary-default">
              <label
                htmlFor="babyCategorization"
                className="block text-lg text-primary-default"
              >
                Baby Categorization: (based on Medical Abstract)
              </label>
              <select
                id="babyCategorization"
                name="babyCategorization"
                className="mt-2 block w-full rounded-sm shadow-sm p-2 focus:outline-none focus:ring-primary-default focus:border-primary-default sm:text-md text-primary-default"
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="">Select Baby Category</option>
                <option value="Well baby">Well baby</option>
                <option value="Sick Baby">Sick Baby</option>
                <option value="Sick Baby">Medically Fragile Baby</option>
              </select>
            </div>
          </div>
        </div>
      </>
    ),
  };
  return pageContents[currentPage];
};

export default RequestorMedicalPage;