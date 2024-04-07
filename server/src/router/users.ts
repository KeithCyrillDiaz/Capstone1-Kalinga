import express from 'express';

import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { reqMedAbstractForm } from '../controllers/Apply_As_Requestor/req_medicalAbstract';

import { getScreeningFormsUserType, getScreeningFormApplicantID } from '../controllers/Admin/Requestor/getScreeningForms';

export default (router: express.Router) => {
  
    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/req_MedAbstract', reqMedAbstractForm);
 
    router.get('/kalinga/getScreeningFormsUserType/:userType', getScreeningFormsUserType)
    router.get('/kalinga/getScreeningFormsApplicant_ID/:Applicant_ID', getScreeningFormApplicantID)

} 
