// import test from '../../../userUploads''

import express from 'express'
import path from 'path';
import fs from 'fs';
import multer from 'multer';

export const addMedicalRequirementsAsImage = async( req: express.Request, res: express.Response) => {
    console.log("uploadImages: ", req.files)
    console.log("req", req.body)
    let images : any = {};
try {

    const uploadImages = req.file;

    for(const attachmentType in req.body){
        
        if(Object.prototype.hasOwnProperty.call(req.body, attachmentType)){
            const {uri, type, name} =  req.body[attachmentType];
            images[attachmentType] = {
                    uri: uri,
                    type: type,
                    name:  name,
            }
        }

    }
        // console.log("test",images)
    // console.log("req", req.body)
    console.log("images: ", images)
    console.log("uploadImages", uploadImages)

    
    const message = {
        code: 0, 
        message: 'New Screening Form Added'
    };

    return res.status(200). json({message}) .end();
    
} catch (error) {
    return res.sendStatus(400)
}


}
