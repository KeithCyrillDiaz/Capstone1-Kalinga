import express from 'express';
import { registerDonor } from '../controllers/registerDonor';
import { registerRequestor } from '../controllers/registerRequestor';
import { getScreeningForms } from '../controllers/Admin/DonorScreeningForm/getScreeningForms'; // Import the getScreeningForms function
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { addMedicalRequirementsAsImage } from '../controllers/Apply_As_Donor/addMRImage'
import { addMedicalRequirementsAsFile } from '../controllers/Apply_As_Donor/addMRFile'
import { reqMedAbstractForm } from '../controllers/Apply_As_Requestor/req_medicalAbstract';
import multerConfiguration from '../helpers/multer';

const upload = multerConfiguration();

export default (router: express.Router) => {
  router.post('/kalinga/registerDonor', registerDonor);
  router.post('/kalinga/registerRequestor', registerRequestor);
  router.post('/kalinga/addScreeningForm', addScreeningForm);
  
  router.get('/kalinga/getScreeningForms', getScreeningForms); 

    //Donor
    router.post('/kalinga/addMedicalRequirementsAsImage',  upload.array('DonorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMedicalRequirementsAsFile',  upload.array('DonorFiles'), addMedicalRequirementsAsFile);

    router.post('/kalinga/addMRImageRequestor',  upload.array('RequestorImages'), addMedicalRequirementsAsImage);
    router.post('/kalinga/addMRFileRequestor',  upload.array('RequestorFiles'), addMedicalRequirementsAsFile);
    // router.post('/kalinga/addMedicalRequirementsAsImage', addMedicalRequirementsAsImage);
   
    router.post('/req_MedAbstract', reqMedAbstractForm);
} 
