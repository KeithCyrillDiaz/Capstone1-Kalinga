import express from 'express'
import { isAuthorized } from '../middleware/middleware'
import { getToken } from '../controllers/token'
import { generateToken } from '../controllers/test'
import { sendEmail, sendApprovedEmail, sendDeclinedEmail, checkCode } from '../controllers/Admin/sendEmail';

export default (router: express.Router) => {
    // router.get("/kalinga/getToken", isAuthorized, getToken) comment ko muna pre try ko lang yung naka express.Request
    router.get("/kalinga/reqToken", isAuthorized, generateToken)
    router.get("/kalinga/getToken", isAuthorized, getToken)
    router.post('/kalinga/sendEmail/:Applicant_ID', sendEmail)
    router.post('/kalinga/sendApprovedEmail/:Applicant_ID', sendApprovedEmail)
    router.post('/kalinga/sendDeclinedEmail/:Applicant_ID', sendDeclinedEmail)
    router.get('/kalinga/checkCode/:Code', checkCode)
    
}