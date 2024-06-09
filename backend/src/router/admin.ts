import express from 'express'
import { updateBlockStatus } from '../controllers/Admin/Block/BlocklUser'
import { sendBlockedEmail } from '../controllers/Admin/sendEmail'
import { tokenVerification } from '../middleware/Authentication'
import { getAppointmentsConfiguration, updateRequestorAppointmentsConfiguration, updateDonationAppointmentsConfiguration} from '../controllers/Admin/Configurations/AppointmentForm'
import { getBlockedUsers } from '../controllers/Admin/Block/getBlockedUsers'
import { checkMaintenanceStatus, updateMaintenanceStatus } from '../controllers/Admin/Configurations/Maintenance'


export default(router: express.Router) => {

    router.patch('/kalinga/updateBlockStatus/:id', updateBlockStatus, sendBlockedEmail)
    router.get('/kalinga/getBlockedUsers/', tokenVerification, getBlockedUsers)
    
    //configurations
    router.get('/kalinga/getAppointmentsConfiguration/', tokenVerification, getAppointmentsConfiguration)
    router.put('/kalinga/updateRequestorAppointmentsConfiguration/', tokenVerification, updateRequestorAppointmentsConfiguration)
    router.put('/kalinga/updateDonationAppointmentsConfiguration/', tokenVerification, updateDonationAppointmentsConfiguration)

    router.get('/kalinga/checkMaintenanceStatus/', tokenVerification, checkMaintenanceStatus)
    router.patch('/kalinga/updateMaintenanceStatus/', tokenVerification, updateMaintenanceStatus)
}