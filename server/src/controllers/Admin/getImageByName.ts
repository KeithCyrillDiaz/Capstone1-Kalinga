import express from 'express'
import path from 'path';
import fs from 'fs';

export const getImage = async (req: express.Request, res: express.Response) =>{

    try{
        console.log(req.params.imageName)
        const imageName  = req.params.imageName;
        let imagePath = ""
        console.log(imageName)
        if(fs.existsSync(path.join(__dirname, '../../../uploads', 'Donor', 'Images', imageName))){
            imagePath = path.join(__dirname, '../../../uploads', 'Donor', 'Images', imageName);
        } else {
            imagePath = path.join(__dirname, '../../../uploads', 'Requestor', 'Images', imageName);
        }

        console.log(imagePath)
        res.sendFile(imagePath)
        // res.status(200).json({imagePath})
      
    } catch(error) {
        return res.status(400).json({
            messages: {
                code: 1,
            message: "Invalid Photo"
            },
            error
        })
    }
   
    
}