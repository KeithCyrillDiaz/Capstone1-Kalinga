import express from 'express';
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { reqMedAbstractForm, getMedicalAbstract } from '../controllers/Apply_As_Requestor/req_medicalAbstract';
import { getImage } from '../controllers/Admin/DonorScreeningForm/getImageByID';

import { getScreeningFormsUserType, getScreeningFormApplicantID } from '../controllers/Admin/Requestor/getScreeningForms';
import { getScreeningFormByID } from '../controllers/Admin/DonorScreeningForm/getScreeningFormsByApplicantID';


export default (router: express.Router) => {
  
    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/req_MedAbstract', reqMedAbstractForm);

    router.get('/kalinga/getScreeningFormsUserType/:userType', getScreeningFormsUserType)
    router.get('/kalinga/getScreeningFormsRequestorApplicant_ID/:Applicant_ID', getScreeningFormApplicantID)

    router.get('/kalinga/getScreeningFormsApplicant_ID/:Applicant_ID', getScreeningFormByID)

    router.get('/kalinga/getMedicalAbstractByID/:Applicant_ID', getMedicalAbstract)

    router.get('/kalinga/getMedicalRequirementImage/:ownerID', getImage)
    


    
} 
