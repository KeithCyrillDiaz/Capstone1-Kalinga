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
import { updateDonationStatus } from '../controllers/Admin/Appointment/updateAppointmentStatus';
import { updateRequestStatus }  from '../controllers/Admin/Appointment/updateRequestStatus';
import { getPendingRequests } from '../controllers/Requestor/getPendingRequest';
import { getApprovedRequests } from '../controllers/Requestor/getApprovedRequest';
import { getRequestStatus} from '../controllers/Requestor/requestStatus';
import { getOngoingDonation } from '../controllers/Donor/getOngoingDonation';
import { updateCompleteStatus } from '../controllers/Admin/Appointment/updateCompleteStatus';
import { getCompletedRequests} from '../controllers/Requestor/getCompletedRequest';
import { getRequestStats } from '../controllers/Requestor/getRequestStats';
import { updateDonationComplete } from '../controllers/Admin/Appointment/updateDonationComplete'
import { getCompletedDonation } from '../controllers/Donor/getCompletedDonation';
import { getDonorStats } from '../controllers/Donor/getDonorStats'
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
    router.put ('/kalinga/updateDonationStatus/:AppointmentDonorID', updateDonationStatus)
    router.get('/kalinga/getOngoingDonation/:Donor_ID', getOngoingDonation)
    router.put ('/kalinga/updateDonationComplete/:AppointmentDonorID', updateDonationComplete)
    router.get('/kalinga/getCompletedDonation/:Donor_ID', getCompletedDonation)
    router.get('/kalinga/getDonorStats/:Donor_ID', getDonorStats)


    //Requestor
    router.post('/kalinga/createRequest', createRequest)
    router.get ('/kalinga/getRequestByID/:RequestID', getRequestByID)
    router.get('/kalinga/getRequestByUserType/:userType', getRequestByUserType)
    router.put('/kalinga/updateRequestStatus/:RequestID',updateRequestStatus)
    router.get('/kalinga/getPendingRequests/:Requestor_ID', getPendingRequests)
    router.get('/kalinga/getApprovedRequests/:Requestor_ID', getApprovedRequests)
    router.get('/kalinga/getRequestStatus', getRequestStatus)
    router.put('/kalinga/updateCompleteStatus/:Requestor_ID',updateCompleteStatus)
    router.get('/kalinga/getCompletedRequests/:Requestor_ID', getCompletedRequests)
    router.get('/kalinga/getRequestStats/:Requestor_ID', getRequestStats)









    router.post('/kalinga/updateUserInformation', updateUserDetails)

    router.put('/kalinga/updateDonationStatus/:AppointmentDonorID', updateDonationStatus);
    router.put('/kalinga/updateDonationComplete/:AppointmentDonorID', updateDonationComplete)
    router.put('/kalinga/updateRequestStatus/:RequestID', updateRequestStatus)
    router.put('/kalinga/updateCompleteStatus/:Requestor_ID', updateCompleteStatus)


    router.get('/kalinga/getPendingRequests/:Requestor_ID', getPendingRequests);
    router.get('/kalinga/getApprovedRequests/:Requestor_ID', getApprovedRequests);
    router.get('/kalinga/getCompletedRequests/:Requestor_ID', getCompletedRequests);
    router.get('/kalinga/getCompletedDonation/:Donor_ID', getCompletedDonation)

    router.get ('/kalinga/getRequestStatus', getRequestStatus)

    router.get('/kalinga/getOngoingDonation/:Donor_ID', getOngoingDonation)
    router.get('/kalinga/getRequestStats/:Requestor_ID', getRequestStats)
    router.get('/kalinga/getDonorStats/:Donor_ID', getDonorStats)
    

    
} 
