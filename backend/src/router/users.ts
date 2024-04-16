import express from 'express';

import { registerUser} from '../controllers/registerUser';
import { registerRequestor } from '../controllers/Requestor/Apply_As_Requestor/registerRequestor';
import { AdminLogIn } from '../controllers/Admin/adminLogin';
import { createAppointment } from '../controllers/Donor/appointmentController';
import { getAppointmentByDonorID } from '../controllers/Admin/Appointment/getDonorAppointment';
import {createRequest} from "../controllers/Requestor/RequestController";
import {getAppointmentByUsertype} from '../controllers/Admin/Appointment/getAppointmentByUsertype';
import { getRequestByID } from '../controllers/Admin/Appointment/getMakeRequest';
import { getRequestByUserType } from '../controllers/Admin/Appointment/getRequestByUserType';
import { logInUser } from '../controllers/LogInUser';

export default (router: express.Router) => {
  
    router.post('/kalinga/registerUser', registerUser);
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/userLogin', logInUser)
    router.post('/kalinga/adminLoginIn', AdminLogIn)

    //donor
    router.post('/kalinga/createAppointment', createAppointment);
    router.get('/kalinga/getAppointmentsByDonorID/:AppointmentDonorID', getAppointmentByDonorID);
    router.get('/kalinga/getAppointmentByUserType/:userType', getAppointmentByUsertype)
    //Requestor
    router.post('/kalinga/createRequest', createRequest)
    router.get ('/kalinga/getRequestByID/:RequestID', getRequestByID)
    router.get('/kalinga/getRequestByUserType/:userType', getRequestByUserType)




    
} 
