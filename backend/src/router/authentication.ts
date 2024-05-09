import express from 'express'
import { isAuthorized, tokenVerification } from '../middleware/Authentication'
import { getToken } from '../controllers/token'
import { generateToken } from '../controllers/test'
import { sendEmail, sendApprovedEmail, sendDeclinedEmail, sendCode } from '../controllers/Admin/sendEmail';
import { checkCode, checkPassCode} from '../controllers/Admin/checkCodes'
import { userLogInToken } from '../controllers/Users/userLoginViaToken'

export default (router: express.Router) => {
    // router.get("/kalinga/getToken", isAuthorized, getToken) comment ko muna pre try ko lang yung naka express.Request
    router.get("/kalinga/reqToken", isAuthorized, generateToken)
    router.get("/kalinga/getToken", isAuthorized, getToken)
    router.post('/kalinga/sendEmail/:Applicant_ID', sendEmail)
    router.post('/kalinga/sendApprovedEmail/:Applicant_ID', sendApprovedEmail)
    router.post('/kalinga/sendDeclinedEmail/:Applicant_ID', sendDeclinedEmail)
    router.get('/kalinga/sendCode/:email', sendCode)
    router.post('/kalinga/tokenLogin/:userID', tokenVerification, userLogInToken)

    //code Checker
    router.get('/kalinga/checkCode/:Code', checkCode)
    router.get('/kalinga/checkPassCode/:Code', checkPassCode)
}