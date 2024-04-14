import express from 'express';

import { registerDonor } from '../controllers/Apply_As_Donor/registerDonor';
import { registerRequestor } from '../controllers/Apply_As_Requestor/registerRequestor';
import { AdminLogIn } from '../controllers/Admin/adminLogin';


export default (router: express.Router) => {
  
    router.post('/kalinga/registerDonor', registerDonor);
    router.post('/kalinga/registerRequestor', registerRequestor);
    router.post('/kalinga/adminLoginIn', AdminLogIn)
    
} 
