import express from 'express'
// import multer from 'multer';
import multer from '../helpers/multer';
import { addMedicalRequirementsAsImage } from '../controllers/Donor/Apply_As_Donor/addMRImage'
import { addMedicalRequirementsAsFile } from '../controllers/Donor/Apply_As_Donor/addMRFile'
import { getImage } from '../controllers/Admin/getImageByID';
import { getFile } from '../controllers/Admin//getFileByID';

const upload = multer()

export default (router: express.Router) => {
    router.post('/kalinga/addMedicalRequirementsAsImage',  upload.array('DonorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMedicalRequirementsAsFile',  upload.array('DonorFiles'), addMedicalRequirementsAsFile);

    router.post('/kalinga/addMRImageRequestor',  upload.array('RequestorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMRFileRequestor',  upload.array('RequestorFiles'), addMedicalRequirementsAsFile);
    
    router.get('/kalinga/getMedicalRequirementImage/:ownerID', getImage)
    router.get('/kalinga/getMedicalRequirementFile/:ownerID', getFile)
  
}