import express from 'express'
import multer from '../helpers/multer';
import { addMedicalRequirementsAsImage } from '../controllers/Apply_As_Donor/addMRImage'
import { addMedicalRequirementsAsFile } from '../controllers/Apply_As_Donor/addMRFile'

const upload = multer()

export default (router: express.Router) => {
    router.post('/kalinga/addMedicalRequirementsAsImage',  upload.array('DonorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMedicalRequirementsAsFile',  upload.array('DonorFiles'), addMedicalRequirementsAsFile);

    router.post('/kalinga/addMRImageRequestor',  upload.array('RequestorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMRFileRequestor',  upload.array('RequestorFiles'), addMedicalRequirementsAsFile);
}