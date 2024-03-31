import express from 'express';


export const addMedicalRequirementsAsImage = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
        // const image = new ImageModel({
        //   name: req.file.originalname,
        //   data: req.file.buffer.toString('base64'),
        // });
        // await image.save();
        res.status(201).send('Image uploaded successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
};
