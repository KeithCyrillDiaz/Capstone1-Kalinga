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

export default (router: express.Router) => {
    
    //Report Bugs
    router.post('/kalinga/createReportBug/:id', tokenVerification, reportBug)
    router.get('/kalinga/getReportBugs/', tokenVerification, getReports)
    router.get('/kalinga/getResolvedReportBugs/', tokenVerification, getResolvedReports)
    router.patch('/kalinga/updateResolved/:id', tokenVerification, updateResolved)
    router.delete('/kalinga/deleteReport/:id', tokenVerification, deleteReport)

    //ChangePassword
    router.patch('/kalinga/updatePassword/:id', tokenVerification, changePassword)
  
    //FeedBack
    router.post('/kalinga/createFeedback/:id', tokenVerification, generateFeedback)
    router.get('/kalinga/getFeedbackByUserType/:userType', tokenVerification, fetchFeedBackByUserType)
    router.get('/kalinga/getFeedbackByUserType/:userType', tokenVerification, fetchFeedBackByUserType)
}