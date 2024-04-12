import path from 'path';
import fs from 'fs';
import multer from 'multer';

const multerConfiguration = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadsDir = path.join(__dirname, '../userUploads');
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
    console.log("upload:", upload);
    return upload;
}

export default multerConfiguration;