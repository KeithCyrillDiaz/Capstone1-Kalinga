import express from 'express'
import { sendApprovedAppointmentEmail } from '../controllers/Admin/sendEmail'
import { tokenVerification } from '../middleware/Authentication'


export default (router: express.Router) => {
    router.get(`/kalinga/sendApprovedAppointmentEmail/:id`, tokenVerification, sendApprovedAppointmentEmail)
}