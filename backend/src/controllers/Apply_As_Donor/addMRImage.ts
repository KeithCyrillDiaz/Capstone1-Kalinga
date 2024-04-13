import express from 'express';
import { createMedicalRequirementImages } from '../../models/ApplyAsDonor';
// import { google } from 'googleapis';
import fs from 'fs'
import { UploadFiles } from '../../helpers/GdriveUploader'

export const addMedicalRequirementsAsImage = async (req: express.Request, res: express.Response) => {
    try {
        const images = req.files;
        const body = req.body   

        console.log("Body:", body)
        console.log("Img:", images)

        if (!images) {
            return res.status(400).send('No images uploaded.');
        }

        if(images){
         
        for (const image of images as any[]) {
            
          const {id, name} = await UploadFiles(image, process.env.FOLDER_ID)
          const imageData = {
              originalname: image.originalname,
              fieldname: image.fieldname,
              encoding: image.encoding,
              mimetype: image.mimetype,
              destination: image.destination,
              filename: image.filename,
              path: image.path,
              size: image.size,
              link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
              gdriveId: id,
              gdriveName: name,
              userType: (req.body.userType && req.body.userType[0]) || "", 
              owner: (req.body.owner && req.body.owner[0]) || "",
              ownerID: (req.body.ownerID && req.body.ownerID[0]) || ""
            //   userType: req.body.userType[0], 
            //   owner: req.body.owner[0],
            //   ownerID: req.body.ownerID[0]
       
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