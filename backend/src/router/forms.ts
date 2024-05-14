import express from 'express';
import { addScreeningForm } from '../controllers/Donor/Apply_As_Donor/addScreeningForm'
import { reqMedAbstractForm, getMedicalAbstract } from '../controllers/Requestor/Apply_As_Requestor/req_medicalAbstract';
import { getScreeningFormsUserType, getScreeningFormApplicantID } from '../controllers/Requestor/Apply_As_Requestor/getScreeningForms';
import { getScreeningFormByID } from '../controllers/Donor/Apply_As_Donor/DonorScreeningForm/getScreeningFormsByApplicantID';
import { deleteScreeningForm } from '../controllers/Admin/deleteScreeningFormByID'
import { retrieveSoftDeletedForm } from '../controllers/Admin/retrieveScreeningForm';
import { checkEmail } from '../controllers/checkEmailValidity';

export default (router: express.Router) => {
  
    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/req_MedAbstract', reqMedAbstractForm);
    router.get('/kalinga/checkEmail/:email', checkEmail)

    router.get('/kalinga/getScreeningFormsUserType/:userType', getScreeningFormsUserType)
    router.get('/kalinga/getScreeningFormsRequestorApplicant_ID/:Applicant_ID', getScreeningFormApplicantID)

    router.get('/kalinga/getScreeningFormsApplicant_ID/:Applicant_ID', getScreeningFormByID)

    router.get('/kalinga/getMedicalAbstractByID/:Applicant_ID', getMedicalAbstract)


    router.patch('/kalinga/deleteScreeningFormByID/:Applicant_ID', deleteScreeningForm)
    router.get('/kalinga/retrieveApplicantForm/:Applicant_ID', retrieveSoftDeletedForm)
    


    
} 
