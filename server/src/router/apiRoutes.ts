import express from 'express';
import { registerDonor } from '../controllers/registerDonor';
import { registerRequestor } from '../controllers/registerRequestor';
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { addMedicalRequirementsAsImage } from '../controllers/Apply_As_Donor/addMedicalRequirements'
import multerConfiguration from '../helpers/multer';

const upload = multerConfiguration();

export default (router: express.Router) => {
  
    router.post('/kalinga/registerDonor', registerDonor);
    router.post('/kalinga/registerRequestor', registerRequestor);

    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/kalinga/addMedicalRequirementsAsImage', upload.array('images'), addMedicalRequirementsAsImage);
    // router.post('/kalinga/addMedicalRequirementsAsImage', addMedicalRequirementsAsImage);
   
} 
