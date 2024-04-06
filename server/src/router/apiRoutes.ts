import express from 'express';
import { registerDonor } from '../controllers/registerDonor';
import { registerRequestor } from '../controllers/registerRequestor';
import { addScreeningForm } from '../controllers/addScreeningForm';
import { getScreeningForms } from '../controllers/Admin/DonorScreeningForm/getScreeningForms'; // Import the getScreeningForms function

export default (router: express.Router) => {
  router.post('/kalinga/registerDonor', registerDonor);
  router.post('/kalinga/registerRequestor', registerRequestor);
  router.post('/kalinga/addScreeningForm', addScreeningForm);
  
  router.get('/kalinga/getScreeningForms', getScreeningForms); 
};
