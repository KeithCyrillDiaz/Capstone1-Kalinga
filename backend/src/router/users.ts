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
import { getTotalDonor } from '../controllers/SuperAdmin/getTotalUser'
import { getTotalUser } from '../controllers/SuperAdmin/getTotalUser'
import { getTotalRequestor } from '../controllers/SuperAdmin/getTotalUser'
import { getCompleteDonationsTotal } from '../controllers/SuperAdmin/getCompleteDonationsTotal'
import { getDeclinedDonationsTotal } from '../controllers/SuperAdmin/getCompleteDonationsTotal'
import { getCompleteRequestsTotal } from '../controllers/SuperAdmin/getCompletedRequestTotal'
import { getDeclinedRequestsTotal } from '../controllers/SuperAdmin/getCompletedRequestTotal'
import { getDonationStatusTotal } from '../controllers/SuperAdmin/getTotalCityUser'
import { getRequestStatusTotal } from '../controllers/SuperAdmin/getTotalCityUser'
import { updateOngoingDonation } from '../controllers/Admin/Appointment/updateOngoingDonation';
import { sendUpdateStatusAppointmentNotification } from '../controllers/Notification/appointment';
import { sendRequestsNotification } from '../controllers/Notification/requests';
import { getTotalCompleteDonationPerMonth} from '../controllers/Admin/Reports/getTotalCompleteDonationPerMonth';
import { getTotalDeclineDonationPerMonth } from '../controllers/Admin/Reports/getTotalDeclineDonationPerMonth';
import { getTotalCompleteRequestPerMonth } from '../controllers/Admin/Reports/getTotalCompleteRequest';
import { getTotalDeclineRequestPerMonth } from '../controllers/Admin/Reports/getTotalDeclineRequest';
import { getTotalCompleteDonationsAllMonths } from '../controllers/Admin/Reports/getTotalCompleteDonationAllMonths';
import { getTotalDeclineDonationsAllMonths } from '../controllers/Admin/Reports/getTotalDeclineDonationAllMonths';
import { getTotalCompleteRequestAllMonths } from '../controllers/Admin/Reports/getTotalCompleteRequestAllMonths';
import { getTotalDeclineRequestAllMonths } from '../controllers/Admin/Reports/getTotalDeclineRequestAllMonths';
import { getTotalUsersPerCity } from '../controllers/SuperAdmin/getTotalUserPerCity';
import {getReports} from '../controllers/clientSettings/reportBug';
import {getBugReportById} from '../controllers/clientSettings/getBugReportByID';
import { updateResolved } from '../controllers/clientSettings/reportBug';
import { getResolvedReports } from '../controllers/clientSettings/reportBug'

export default (router: express.Router) => {
  
    router.post('/kalinga/registerUser', registerUserOrSetNewPassword);
    router.post('/kalinga/setPassword', registerUserOrSetNewPassword); // Do not delete, capable of Setting new password
    
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/userLogin', logInUser)
    router.get('/kalinga/userLogout/:token', logOutUser)
    router.post('/kalinga/adminLoginIn', AdminLogIn)
    router.get('/kalinga/isApproved/:Applicant_ID', isApproved)
    router.post('/kalinga/updateUserInformation', updateUserDetails)

   //donor
   router.post('/kalinga/createAppointment', createAppointment);
   router.get('/kalinga/getAppointmentsByDonorID/:AppointmentDonorID', getAppointmentByDonorID);
   router.get('/kalinga/getAppointmentByUserType/:userType', getAppointmentByUsertype)
    router.put ('/kalinga/updateDonationStatus/:AppointmentDonorID', sendUpdateStatusAppointmentNotification, updateDonationStatus)
    router.get('/kalinga/getOngoingDonation/:Donor_ID', getOngoingDonation)
    router.put('/kalinga/updateOngoingDonation/:AppointmentDonorID', sendUpdateStatusAppointmentNotification, updateOngoingDonation)
    router.put ('/kalinga/updateDonationComplete/:AppointmentDonorID', sendUpdateStatusAppointmentNotification, updateDonationComplete)
    router.get('/kalinga/getCompletedDonation/:Donor_ID', getCompletedDonation)
    router.get('/kalinga/getDonorStats/:Donor_ID', getDonorStats)


   //Requestor
   router.post('/kalinga/createRequest', createRequest)
   router.get ('/kalinga/getRequestByID/:RequestID', getRequestByID)
   router.get('/kalinga/getRequestByUserType/:userType', getRequestByUserType)
    router.put('/kalinga/updateRequestStatus/:RequestID', sendRequestsNotification, updateRequestStatus)
    router.get('/kalinga/getPendingRequests/:Requestor_ID', getPendingRequests)
    router.get('/kalinga/getApprovedRequests/:Requestor_ID', getApprovedRequests)
    router.get('/kalinga/getRequestStatus', getRequestStatus)
    router.put('/kalinga/updateCompleteStatus/:RequestID', sendRequestsNotification, updateCompleteStatus)
    router.get('/kalinga/getCompletedRequests/:Requestor_ID', getCompletedRequests)
    router.get('/kalinga/getRequestStats/:Requestor_ID', getRequestStats)

    //SuperAdmin // Admin
    router.get('/kalinga/getTotalDonor',getTotalDonor )
    router.get('/kalinga/getTotalRequestor', getTotalRequestor)
    router.get('/kalinga/getCompleteDonationsTotal', getCompleteDonationsTotal)
    router.get('/kalinga/getDeclinedDonationsTotal', getDeclinedDonationsTotal)
    router.get('/kalinga/getCompleteRequestsTotal', getCompleteRequestsTotal)
    router.get('/kalinga/getDeclinedRequestsTotal', getDeclinedRequestsTotal)
    router.get('/kalinga/getDonationStatusTotal', getDonationStatusTotal);
    router.get('/kalinga/getRequestStatusTotal', getRequestStatusTotal);
    router.get('/kalinga/getTotalUser', getTotalUser)
    router.get('/kalinga/getTotalCompleteDonationPerMonth', getTotalCompleteDonationPerMonth)
    router.get('/kalinga/getTotalDeclineDonationPerMonth', getTotalDeclineDonationPerMonth)
    router.get('/kalinga/getTotalCompleteRequestPerMonth', getTotalCompleteRequestPerMonth)
    router.get('/kalinga/getTotalDeclineRequestPerMonth', getTotalDeclineRequestPerMonth)
    router.get('/kalinga/getTotalCompleteDonationsAllMonths', getTotalCompleteDonationsAllMonths )
    router.get('/kalinga/getTotalDeclineDonationsAllMonths', getTotalDeclineDonationsAllMonths )
    router.get('/kalinga/getTotalCompleteRequestAllMonths',getTotalCompleteRequestAllMonths)
    router.get('/kalinga/getTotalDeclineRequestAllMonths',getTotalDeclineRequestAllMonths)
    router.get('/kalinga/getTotalUsersPerCity', getTotalUsersPerCity)
    router.get('/kalinga/getReports', getReports)
    router.get('/kalinga/getBugReportById/:ReportBugID', getBugReportById)
    router.get('/kalinga/updateResolved/:ReportBugID', updateResolved)
    router.get('/kalinga/getResolvedReports', getResolvedReports)



} 
