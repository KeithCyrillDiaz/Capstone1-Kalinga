import express from 'express'
import multer from 'multer';
// import multer from '../helpers/multer';
import { addMedicalRequirementsAsImage } from '../controllers/Donor/Apply_As_Donor/addMRImage'
import { addMedicalRequirementsAsFile } from '../controllers/Donor/Apply_As_Donor/addMRFile'
import { getImage } from '../controllers/Admin/getImageByID';
import { getFile } from '../controllers/Admin/getFileByID';
import { addProfilePicture } from '../controllers/clientSettings/uploadDpImg';
import { uploadImageOrFileData, deleteImageFileData } from '../controllers/uploadImage/uploadImageOrFileData';
import { tokenVerification } from '../middleware/Authentication';
// import { addMedicalRequirementsAsImage } from '../../test/testImage'

const upload = multer()

export default (router: express.Router) => {
    router.post('/kalinga/addMedicalRequirementsAsImage',  upload.array('DonorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMedicalRequirementsAsFile',  upload.array('DonorFiles'), addMedicalRequirementsAsFile);

    router.post('/kalinga/addMRImageRequestor',  upload.array('RequestorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMRFileRequestor',  upload.array('RequestorFiles'), addMedicalRequirementsAsFile);
    
    router.post('/kalinga/uploadDP', upload.array('ProfilePicture'), addProfilePicture), 


    router.post('/kalinga/getMedicalRequirementImage/:ownerID', tokenVerification, getImage)
    router.post('/kalinga/getMedicalRequirementFile/:ownerID', tokenVerification, getFile)
    router.post('/kalinga/uploadFileOrImageDataInDatabase/:id', uploadImageOrFileData)

    router.post('/kalinga/deleteFiledata/:id', deleteImageFileData)



    // router.post('/kalinga/testImage', addMedicalRequirementsAsImage);
  
}