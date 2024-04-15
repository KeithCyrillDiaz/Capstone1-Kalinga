import express from 'express'
import { isAuthorized } from '../middleware/middleware'
import { getToken } from '../controllers/token'
import { generateToken } from '../controllers/test'
import { sendEmail } from '../controllers/Donor/Apply_As_Donor/sendEmail';

export default (router: express.Router) => {
    // router.get("/kalinga/getToken", isAuthorized, getToken) comment ko muna pre try ko lang yung naka express.Request
    router.get("/kalinga/reqToken", isAuthorized, generateToken)
    router.get("/kalinga/getToken", isAuthorized, getToken)
    router.post('/kalinga/sendEmail', sendEmail)

}