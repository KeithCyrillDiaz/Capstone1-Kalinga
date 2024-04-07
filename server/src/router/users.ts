import express from 'express';
import { registerDonor } from '../controllers/registerDonor';
import { registerRequestor } from '../controllers/registerRequestor';
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { reqMedAbstractForm } from '../controllers/Apply_As_Requestor/req_medicalAbstract';
import { setPassword } from '../controllers/setPassword';
import { sendEmail } from '../controllers/Apply_As_Donor/sendEmail';
import { getScreeningFormsUserType, getScreeningFormApplicantID } from '../controllers/Admin/Requestor/getScreeningForms';
import { getScreeningFormByID } from '../controllers/Admin/DonorScreeningForm/getScreeningFormsByApplicantID';

export default (router: express.Router) => {
  
    router.post('/kalinga/registerDonor', registerDonor);
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/setPassword', setPassword)

    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/req_MedAbstract', reqMedAbstractForm);
    router.post('/kalinga/sendEmail', sendEmail)
    router.get('/kalinga/getScreeningFormsUserType/:userType', getScreeningFormsUserType)
    router.get('/kalinga/getScreeningFormsApplicant_ID/:Applicant_ID', getScreeningFormByID)
} 
