import path from 'path';
import fs from 'fs';
import multer from 'multer';

const multerConfiguration = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let uploadPath = '../../uploads'; // Base upload path
            let subfolder = ''; // Subfolder based on fieldname
            
            // Create subfolders based on fieldname
            if (file.fieldname === "DonorImages" || file.fieldname === "DonorFiles") {
                if(file.fieldname === "DonorImages" ) subfolder = 'Donor/Images';
                else subfolder = 'Donor/Files'
            } else if (file.fieldname === "RequestorImages" || file.fieldname === "RequestorFiles") {
                if(file.fieldname === "RequestorImages" ) subfolder = 'Requestor/Images';
                else subfolder = 'Requestor/Files'
            }
            
            // Construct full upload path
   
            uploadPath = path.join(__dirname, uploadPath, subfolder);
            console.log("destination1: ", uploadPath)
            // Create directory if it doesn't exist
            if (!fs.existsSync(uploadPath)) {
                try {
                    fs.mkdirSync(path.join(__dirname, `../../uploads/Donor/Images`), {recursive: true})
                    fs.mkdirSync(path.join(__dirname, `../../uploads/Donor/Files`), {recursive: true})
                    fs.mkdirSync(path.join(__dirname, `../../uploads/Requestor/Images`), {recursive: true})
                    fs.mkdirSync(path.join(__dirname, `../../uploads/Requestor/Files`), {recursive: true})
                    // fs.mkdirSync(uploadPath, { recursive: true });
                } catch (err) {
                    console.error("Error creating directory:", err);
                    return;
                }
            }
            console.log("destination2: ", uploadPath)
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            // Generate filename with current timestamp and original extension
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 25 * 1024 * 1024 // 25 MB in bytes
        }
    });
    
    return upload;
};

export default multerConfiguration;
