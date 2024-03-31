import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { registerDonor } from '../controllers/registerDonor';
import { registerRequestor } from '../controllers/registerRequestor';
import { addScreeningForm } from '../controllers/Apply_As_Donor/addScreeningForm'
import { addMedicalRequirementsAsImage } from '../controllers/Apply_As_Donor/addMedicalRequirements'
// import { storage, upload } from '../helpers/mutler'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, "../../userUploads");
        if (!fs.existsSync(uploadsDir)) {
            try {
                fs.mkdirSync(uploadsDir);
                console.log("Directory created:", uploadsDir);
            } catch (err) {
                console.error("Error creating directory:", err);
            }
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export default (router: express.Router) => {
  
    router.post('/kalinga/registerDonor', registerDonor);
    router.post('/kalinga/registerRequestor', registerRequestor);

    router.post('/kalinga/addScreeningForm', addScreeningForm);
    router.post('/kalinga/addMedicalRequirementsAsImage', upload.array('images'), addMedicalRequirementsAsImage);
    // router.post('/kalinga/addMedicalRequirementsAsImage', addMedicalRequirementsAsImage);
   
} 
