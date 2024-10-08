import express from 'express'
import { 
    reportBug, 
    getReports, 
    getResolvedReports, 
    deleteReport, 
    updateResolved, 
} from '../controllers/clientSettings/reportBug'


import { tokenVerification } from '../middleware/Authentication'
import { changePassword } from '../controllers/clientSettings/changePassword'
import { fetchFeedBackByUserType, generateFeedback } from '../controllers/clientSettings/sendFeedback'
import { checkPassword } from '../middleware/checkPassword'
import { generateHelpAndSupportReport } from '../controllers/clientSettings/helpAndSupport'
import { updateProfileImagelink, checkCredentials } from '../controllers/clientSettings/changeProfileImage'
import { getFeedbackByFeedbackID } from '../controllers/clientSettings/getFeedback'
import { updateUserDetails } from '../controllers/updateUser';

export default (router: express.Router) => {
    
    //Report Bugs
    router.post('/kalinga/createReportBug/:id', tokenVerification, reportBug)
    router.get('/kalinga/getReportBugs/', tokenVerification, getReports)
    router.get('/kalinga/getResolvedReportBugs/', tokenVerification, getResolvedReports)
    router.patch('/kalinga/updateResolved/:id',  updateResolved)
    router.delete('/kalinga/deleteReport/:id', deleteReport)

    //ChangePassword
    router.patch('/kalinga/updatePassword/:id', tokenVerification, checkPassword, changePassword)
  
    //FeedBack
    router.post('/kalinga/createFeedback/:id', tokenVerification, generateFeedback)
    // router.get('/kalinga/getFeedbackByUserType/:userType', tokenVerification, fetchFeedBackByUserType)
    router.get('/kalinga/getFeedbackByUserType/:userType',  fetchFeedBackByUserType)
    router.get('/kalinga/getFeedbackByFeedbackID/:feedBack_ID', tokenVerification, getFeedbackByFeedbackID)
    
    //Help and Support
    router.post('/kalinga/createHelpAndSupportReport/:id', tokenVerification, generateHelpAndSupportReport)

    //Edit Personal Details
    router.patch('/kalinga/updateProfilePicture/:id', tokenVerification, updateProfileImagelink)
    router.post('/kalinga/updateUserInformation', tokenVerification, updateUserDetails)
    router.post('/kalinga/getAccess/:id', tokenVerification, checkCredentials)
}