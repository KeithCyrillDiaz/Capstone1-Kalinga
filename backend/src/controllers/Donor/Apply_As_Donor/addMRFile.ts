import express from 'express';
import { createMedicalRequirementFiles, getMRFileZip } from '../../../models/ApplyAsDonor';
import { UploadFiles } from '../../../helpers/GdriveUploader';
import archiver from 'archiver'; // Import the archiver library
import fs from 'fs'
import path from 'path';
import { Readable, Writable } from 'stream';

interface ZipFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
}


export const addMedicalRequirementsAsFile = async (req: express.Request, res: express.Response) => {
    try {
        
        const files = req.files as any[];
        console.log("files: ",files)
        if (!files) {
            return res.status(400).send('No files uploaded.');
        }
        // Create a ZIP archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Compression level
        });
        let zipName = req.body.owner[0]
        // let zipName = "Rexiela"
        archive.on('data', (chunk: any) => {
            buffers.push(chunk);
        });

        for (const file of files as any[]) {
            archive.append(file.buffer, { name: file.originalname });
        }

        const buffers: Buffer[] = [];

        // Finalize the ZIP archive
        archive.finalize();
      
        //Once the archive is finalized, upload it to Google Drive
       archive.on('end', async () => {
                const subFolderID = (files[0].fieldname === "DonorFiles") ? process.env.DONOR_FILES : process.env.REQUESTOR_FILES;
                const zipBuffer = Buffer.concat(buffers);
             
                // Create the ZipFile object
                let zipFile: ZipFile = {
                    originalname: `${zipName}.zip`,
                    mimetype: 'application/zip',
                    buffer: zipBuffer
                };
                
              
                
                const { id, name } = await UploadFiles(zipFile, subFolderID);

                const moment = require('moment');
                const currentTime = moment();
                const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
                // Save the metadata of the zipped file to your database
                const fileData = {
                    originalname: zipFile.originalname,
                    fieldname: files[0].fieldname,
                    mimetype: 'application/zip',
                    link: `https://drive.google.com/uc?export=download&id=${id}`,
                    gdriveId: id,
                    gdriveName: name,
                    userType: (req.body.userType && req.body.userType[0]) || "", 
                    owner: (req.body.owner && req.body.owner[0]) || "",
                    ownerID: (req.body.ownerID && req.body.ownerID[0]) || "",
                    requirementType: (req.body.requirementType && req.body.requirementType[0]) || "",
                    createdAt: formattedTime,
                    updatedAt: formattedTime,
                };

                await createMedicalRequirementFiles(fileData);

                const message = {
                    code: 0,
                    message: 'Files uploaded successfully.',
                };
        
                 return res.status(200).json({ message}).end();
        
        });

      
   
       
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Server Error');
    }
};
