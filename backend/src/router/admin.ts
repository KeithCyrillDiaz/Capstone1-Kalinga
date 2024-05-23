import express from 'express'
import { updateBlockStatus } from '../controllers/Admin/BlocklUser'
import { sendBlockedEmail } from '../controllers/Admin/sendEmail'


export default(router: express.Router) => {

    router.patch('/kalinga/updateBlockStatus/:id', updateBlockStatus, sendBlockedEmail)
    
}