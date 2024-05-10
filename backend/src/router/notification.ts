import express from 'express'
import { tokenVerification } from '../middleware/Authentication'
import { fetchUnreadNotification, updateNotificationStatus} from '../controllers/Notification/notification'


export default (router: express.Router) => {
    router.get('/kalinga/fetchUnreadNotification/:id', tokenVerification, fetchUnreadNotification)
    router.patch('/kalinga/updateStatus/:id', tokenVerification, updateNotificationStatus)
}