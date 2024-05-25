import express from 'express';

import { registerUserOrSetNewPassword } from '../controllers/setPassAndRegisterUser';
import { registerRequestor } from '../controllers/Requestor/Apply_As_Requestor/registerRequestor';
import { AdminLogIn, superAdminLogIn } from '../controllers/Admin/adminLogin';
import { createAppointment } from '../controllers/Donor/appointmentController';
import { getAppointmentByDonorID } from '../controllers/Admin/Appointment/getDonorAppointment';
import {createRequest} from "../controllers/Requestor/RequestController";
import {getAppointmentByUsertype} from '../controllers/Admin/Appointment/getAppointmentByUsertype';
import { getRequestByID } from '../controllers/Admin/Appointment/getMakeRequest';
import { getRequestByUserType } from '../controllers/Admin/Appointment/getRequestByUserType';
import { logInUser, logOutUser, checkIfBlock } from '../controllers/LogInUser';
import { isApproved } from '../controllers/isApproved';
import { updateUserDetails } from '../controllers/updateUser';
import { updateDonationStatus } from '../controllers/Admin/Appointment/updateAppointmentStatus';
import { updateRequestStatus }  from '../controllers/Admin/Appointment/updateRequestStatus';
import { getPendingRequests } from '../controllers/Requestor/getPendingRequest';
import { getApprovedRequests } from '../controllers/Requestor/getApprovedRequest';
import { getRequestStatus, getRequestStatusOfMother} from '../controllers/Requestor/requestStatus';
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
import { deleteAppointmentDonor } from '../controllers/Admin/Appointment/deleteAppointmentDonor'
import { deleteAppointmentRequestor} from '../controllers/Admin/Appointment/deleteAppointmentRequestor'
import { updateDonorRemark } from '../controllers/Admin/Appointment/updateDonorRemark'
import { updateRequestRemark} from '../controllers/Admin/Appointment/updateRequestRemark'
import { getDonationStatus, getDonationStatusOfMother } from '../controllers/Donor/getDonationStatus'
import { getAllUsers } from '../controllers/SuperAdmin/getAllUser'
import { deleteUser } from '../controllers/SuperAdmin/deleteUser'
import { getTotalUsersPerBarangay } from '../controllers/Admin/Reports/getTotalUserBarangay'
import { getTotalPendingAppointment } from '../controllers/Admin/Reports/getTotalPendingAppointment'
import { getTotalPendingRequest } from '../controllers/Admin/Reports/getTotalPendingRequest'
import { getTotalUserPerMonth } from '../controllers/Admin/Reports/getTotalUserPerMonth'
import { getHighestDonation } from '../controllers/Admin/Reports/getHighestDonation'
import { getHighestRequestors } from '../controllers/Admin/Reports/getHighestRequest'
import { getTotalDonorsPerMonth } from '../controllers/Admin/Reports/getTotalUserPerMonthYear'
import { getTotalRequestorsPerMonth} from '../controllers/Admin/Reports/getTotalUserPerMonthYear'

export default (router: express.Router) => {
  
    router.post('/kalinga/registerUser', registerUserOrSetNewPassword);
    router.post('/kalinga/setPassword', registerUserOrSetNewPassword); // Do not delete, capable of Setting new password
    
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/userLogin', checkIfBlock, logInUser)
    router.get('/kalinga/userLogout/:token', logOutUser)
    router.post('/kalinga/superAdminLogin', superAdminLogIn)
    router.post('/kalinga/adminLogin', AdminLogIn)
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
    router.get('/kalinga/getDonationStatus', getDonationStatus)
    router.get('/kalinga/getDonationStatusMoterSide/:id', getDonationStatusOfMother)


   //Requestor
   router.post('/kalinga/createRequest', createRequest)
   router.get ('/kalinga/getRequestByID/:RequestID', getRequestByID)
   router.get('/kalinga/getRequestByUserType/:userType', getRequestByUserType)
    router.put('/kalinga/updateRequestStatus/:RequestID', sendRequestsNotification, updateRequestStatus)
    router.get('/kalinga/getPendingRequests/:Requestor_ID', getPendingRequests)
    router.get('/kalinga/getApprovedRequests/:Requestor_ID', getApprovedRequests)
    router.get('/kalinga/getRequestStatus', getRequestStatus)
    router.get('/kalinga/getRequestStatusOfMotherMobile/:id', getRequestStatusOfMother)
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
    router.get('/kalinga/getTotalCompleteDonationsAllMonths', getTotalCompleteDonationsAllMonths)
    router.get('/kalinga/getTotalDeclineDonationsAllMonths', getTotalDeclineDonationsAllMonths )
    router.get('/kalinga/getTotalCompleteRequestAllMonths',getTotalCompleteRequestAllMonths)
    router.get('/kalinga/getTotalDeclineRequestAllMonths',getTotalDeclineRequestAllMonths)
    router.get('/kalinga/getTotalUsersPerCity', getTotalUsersPerCity)
    router.get('/kalinga/getReports', getReports)
    router.get('/kalinga/getBugReportById/:ReportBugID', getBugReportById)
    router.get('/kalinga/updateResolved/:ReportBugID', updateResolved)
    router.get('/kalinga/getResolvedReports', getResolvedReports)
    router.delete ('/kalinga/deleteAppointmentDonor/:AppointmentDonorID', deleteAppointmentDonor)
    router.delete ('/kalinga/deleteAppointmentRequestor/:RequestID', deleteAppointmentRequestor)
    router.put ('/kalinga/updateDonorRemark/:AppointmentDonorID', updateDonorRemark)
    router.put ('/kalinga/updateRequestRemark/:RequestID', updateRequestRemark)
    router.get ('/kalinga/getAllUsers', getAllUsers)
    router.delete ('/kalinga/deleteUser/:id/:userType', deleteUser)
    router.get ('/kalinga/getTotalUsersPerBarangay', getTotalUsersPerBarangay)
    router.get ('/kalinga/getTotalPendingAppointment', getTotalPendingAppointment)
    router.get ('/kalinga/getTotalPendingRequest', getTotalPendingRequest)
    router.get ('/kalinga/getTotalUserPerMonth', getTotalUserPerMonth)
    router.get ('/kalinga/getHighestDonation', getHighestDonation)
    router.get ('/kalinga/getHighestRequestors', getHighestRequestors)
    router.get ('/kalinga/getTotalDonorsPerMonth', getTotalDonorsPerMonth)
    router.get ('/kalinga/getTotalRequestorsPerMonth', getTotalRequestorsPerMonth)









} 
