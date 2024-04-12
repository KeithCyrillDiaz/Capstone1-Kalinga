import express from 'express';
import { createMedicalRequirementFiles } from '../../models/ApplyAsDonor';


export const addMedicalRequirementsAsFile = async (req: express.Request, res: express.Response) => {
    try {
        const files = req.files;
        const body = req.body;

        console.log(files)

        if (!files) {
            return res.status(400).send('No filess uploaded.');
        }

        if(files){
         
        for (const file of files as any[]) {
          const fileData = {
              originalname: file.originalname,
              fieldname: file.fieldname,
              encoding: file.encoding,
              mimetype: file.mimetype,
              destination: file.destination,
              filename: file.filename,
              path: file.path,
              size: file.size,
              userType: body.userType[0], 
              owner: body.owner[0],
              ownerID: body.ownerID[0],
              requirementType: body.requirementType[0]
          };
          await createMedicalRequirementFiles(fileData);
      }
        }
        

        const message = {
            code: 0,
            message: 'Images uploaded successfully.',
        };

        return res.status(200).json({ message }).end();
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Server Error');
    }
};