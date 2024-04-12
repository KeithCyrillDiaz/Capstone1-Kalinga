import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const multerConfiguration = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      let subfolder = '';

      // Create subfolders based on fieldname
      if (file.fieldname === "DonorImages" || file.fieldname === "DonorFiles") {
        if(file.fieldname === "DonorImages" ) subfolder = 'Donor/Images';
        else subfolder = 'Donor/Files'
      } else if (file.fieldname === "RequestorImages" || file.fieldname === "RequestorFiles") {
        if(file.fieldname === "RequestorImages" ) subfolder = 'Requestor/Images';
        else subfolder = 'Requestor/Files'   
      }

      // Construct full upload path
      const folderId = await getOrCreateFolder(subfolder);

      // Return the folder ID as the upload destination
      cb(null, folderId);
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

async function getOrCreateFolder(folderPath: string): Promise<string> {
  const folders = folderPath.split('/');
  let parentFolderId = 'root';

  for (const folderName of folders) {
    const folderId = await findOrCreateFolder(folderName, parentFolderId);
    parentFolderId = folderId;
  }

  return parentFolderId;
}

async function findOrCreateFolder(folderName: string, parentFolderId: string): Promise<string> {
  // Check if the folder already exists
  const query = `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`;
  const response = await drive.files.list({
    q: query,
    fields: 'files(id)',
  });

  if (response.data.files && response.data.files.length > 0) {
    return response.data.files[0].id; // Folder already exists, return its ID
  } else {
    // Folder doesn't exist, create it
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const createdFolder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    return createdFolder.data.id; // Return the ID of the newly created folder
  }
}

export default multerConfiguration;