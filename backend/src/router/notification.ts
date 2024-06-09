import express from 'express'
import { tokenVerification } from '../middleware/Authentication'
import { fetchUnreadNotification, updateNotificationStatus} from '../controllers/Notification/notification'
import { checkAppointment, checkRequestStatus } from '../controllers/Notification/appointment'


export default (router: express.Router) => {
    router.get('/kalinga/fetchUnreadNotification/:id', tokenVerification, fetchUnreadNotification)
    router.patch('/kalinga/updateStatus/:id', tokenVerification, updateNotificationStatus)

    router.post('/kalinga/checkAppointmentStatus/:id', tokenVerification, checkAppointment)
    router.post('/kalinga/checkRequestsStatus/:id', tokenVerification, checkRequestStatus)

}