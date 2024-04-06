import express from 'express';
import { createMedicalRequirementImages } from '../../models/ApplyAsDonor';


export const addMedicalRequirementsAsImage = async (req: express.Request, res: express.Response) => {
    try {
        const images = req.files;
        const body = req.body

        if (!images) {
            return res.status(400).send('No images uploaded.');
        }

        if(images){
         
        for (const image of images as any[]) {
          const imageData = {
              originalname: image.originalname,
              fieldname: image.fieldname,
              encoding: image.encoding,
              mimetype: image.mimetype,
              destination: image.destination,
              filename: image.filename,
              path: image.path,
              size: image.size,
              userType: req.body.userType[0], 
              owner: req.body.owner[0],
              ownerID: req.body.ownerID[0]
       
          };

          await createMedicalRequirementImages(imageData);
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