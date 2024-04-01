import express from 'express';
import { createMedicalRequirementImages } from '../../db/ApplyAsDonor'


interface Image {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const addMedicalRequirementsAsImage = async (req: express.Request, res: express.Response) => {

  let image: Image[] = [];

    try {

        const files: any = req.files;

        if(!files){
          return res.status(400).send('No file uploaded.');
        }

        // console.log(files)
        // Save file information in the database
        for (const file of files) {
            const fileData = {
                originalname: file.originalname,
                fieldname: file.fieldname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                destination: file.destination,
                filename: file.filename,
                path: file.path,
                size: file.size,
            };
            image = [fileData]
            // Save fileData to your database using Mongoose or another ORM
            await createMedicalRequirementImages(fileData);
           
        }
        
        const message = {
          code: 0, 
          message: 'Image uploaded successfully.'
      };
      
      return res.status(200). json({message, image}) .end();

      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
};
