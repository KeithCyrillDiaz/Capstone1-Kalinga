import express from 'express';

import { registerUserOrSetNewPassword } from '../controllers/setPassAndRegisterUser';
import { registerRequestor } from '../controllers/Requestor/Apply_As_Requestor/registerRequestor';
import { AdminLogIn } from '../controllers/Admin/adminLogin';
import { createAppointment } from '../controllers/Donor/appointmentController';
import { getAppointmentByDonorID } from '../controllers/Admin/Appointment/getDonorAppointment';
import {createRequest} from "../controllers/Requestor/RequestController";
import {getAppointmentByUsertype} from '../controllers/Admin/Appointment/getAppointmentByUsertype';
import { getRequestByID } from '../controllers/Admin/Appointment/getMakeRequest';
import { getRequestByUserType } from '../controllers/Admin/Appointment/getRequestByUserType';
import { logInUser, logOutUser } from '../controllers/LogInUser';
import { isApproved } from '../controllers/isApproved';
import { updateUserDetails } from '../controllers/updateUser';

export default (router: express.Router) => {
  
    router.post('/kalinga/registerUser', registerUserOrSetNewPassword);
    router.post('/kalinga/setPassword', registerUserOrSetNewPassword); // Do not delete, capable of Setting new password
    
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/userLogin', logInUser)
    router.get('/kalinga/userLogout/:token', logOutUser)
    router.post('/kalinga/adminLoginIn', AdminLogIn)
    router.get('/kalinga/isApproved/:Applicant_ID', isApproved)
    //donor
    router.post('/kalinga/createAppointment', createAppointment);
    router.get('/kalinga/getAppointmentsByDonorID/:AppointmentDonorID', getAppointmentByDonorID);
    router.get('/kalinga/getAppointmentByUserType/:userType', getAppointmentByUsertype)
    //Requestor
    router.post('/kalinga/createRequest', createRequest)
    router.get ('/kalinga/getRequestByID/:RequestID', getRequestByID)
    router.get('/kalinga/getRequestByUserType/:userType', getRequestByUserType)

    router.post('/kalinga/updateUserInformation', updateUserDetails)


    
} 
