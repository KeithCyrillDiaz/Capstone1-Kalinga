import express from 'express'
import path from 'path';

export const getImage = async (req: express.Request, res: express.Response) =>{
    console.log(req.params.imageName)
    const imageName  = req.params.imageName;
    const imagePath = path.join(__dirname, '../../../../uploads', 'Donor', 'Images', imageName);
    console.log(imagePath)
    // res.status(200).json({imagePath})
    res.sendFile(imagePath)
}