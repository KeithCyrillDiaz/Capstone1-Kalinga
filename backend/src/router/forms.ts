import express from 'express';
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { reqMedAbstractForm, getMedicalAbstract } from '../controllers/Apply_As_Requestor/req_medicalAbstract';
import { getScreeningFormsUserType, getScreeningFormApplicantID } from '../controllers/Apply_As_Requestor/Requestor/getScreeningForms';
import { getScreeningFormByID } from '../controllers/Apply_As_Donor/DonorScreeningForm/getScreeningFormsByApplicantID';
import { deleteScreeningForm } from '../controllers/Admin/deleteScreeningFormByID'
import { retrieveSoftDeletedForm } from '../controllers/Admin/retrieveScreeningForm';

export default (router: express.Router) => {
  
    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/req_MedAbstract', reqMedAbstractForm);

    router.get('/kalinga/getScreeningFormsUserType/:userType', getScreeningFormsUserType)
    router.get('/kalinga/getScreeningFormsRequestorApplicant_ID/:Applicant_ID', getScreeningFormApplicantID)

    router.get('/kalinga/getScreeningFormsApplicant_ID/:Applicant_ID', getScreeningFormByID)

    router.get('/kalinga/getMedicalAbstractByID/:Applicant_ID', getMedicalAbstract)


    router.delete('/kalinga/deleteScreeningFormByID/:Applicant_ID', deleteScreeningForm)
    router.get('/kalinga/retrieveApplicantForm/:Applicant_ID', retrieveSoftDeletedForm)
    


    
} 
