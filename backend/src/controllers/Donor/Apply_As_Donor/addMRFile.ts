import express from 'express';
import { createMedicalRequirementFiles, getMRFileZip } from '../../models/ApplyAsDonor';
import { UploadFiles } from '../../helpers/GdriveUploader';
import archiver from 'archiver'; // Import the archiver library
import fs from 'fs'
import path from 'path';

interface ZipFile {
    originalname: string;
    path: string;
    mimetype: string;
}


export const addMedicalRequirementsAsFile = async (req: express.Request, res: express.Response) => {
    try {
        
        const files = req.files as any[];

        if (!files) {
            return res.status(400).send('No files uploaded.');
        }

        // Create a ZIP archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Compression level
        });

        // Pipe the archive to the response
        archive.pipe(res);

        let zipName = req.body.owner[0]
        const zipFilePath = path.join(files[0].destination, `${zipName}.zip`)
        const output = fs.createWriteStream(zipFilePath);

        // Pipe the archive to the output file stream
        archive.pipe(output);

        for (const file of files as any[]) {
            // Create a read stream for each file and append it to the ZIP archive
            const readStream = fs.createReadStream(file.path);
            archive.append(readStream, { name: file.originalname });
        }

        // Finalize the ZIP archive
        archive.finalize();

        output.on('close', () => {
            console.log(`ZIP file saved to: ${zipFilePath}`);
        });
        
      
        // Pipe the archive to the response
        archive.pipe(res);

        let zipFile: ZipFile = {
            originalname:`${zipName}.zip`,
            path: `${zipFilePath}`,
            mimetype: 'application/zip'
        }

        //Once the archive is finalized, upload it to Google Drive
       archive.on('end', async () => {
                const subFolderID = (files[0].fieldname === "DonorFiles") ? process.env.DONOR_FILES : process.env.REQUESTOR_FILES;
                const { id, name } = await UploadFiles(zipFile, subFolderID);
                
                for(const file of files as any []){
                    fs.unlinkSync(file.path)
                }

                
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
                    requirementType: (req.body.requirementType && req.body.requirementType[0]) || ""
                };

                await createMedicalRequirementFiles(fileData);

                fs.unlinkSync(zipFilePath)
        });

      
        const message = {
            code: 0,
            message: 'Files uploaded successfully.',
        };

         return res.status(200).json({ message}).end();

       
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Server Error');
    }
};
