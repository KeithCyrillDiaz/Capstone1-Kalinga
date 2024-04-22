import express from 'express'
import { UploadFiles } from '../../helpers/GdriveUploader'

import { updateDonorProfilePic, updateRequestorProfilePic } from '../../models/users'
export const addProfilePicture = async (req: express.Request, res: express.Response) => {
    try{    
        console.log("files: ", req.files as any[])
        console.log("body: ", req.body)
        const images = req.files as any[]
        if(!images){
            console.log("No Images Uploaded")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Images Uploaded"
                }
            })
        }
            console.log("Images Uploads")

            let subFolderID: string
            if (req.body.userType === "Donor") {
                subFolderID = process.env.DONOR_PROFILE_PICTURES;
            } else {
               subFolderID = process.env.REQUESTOR_PROFILE_PICTURES;
            }  

            const moment = require('moment');
            const currentTime = moment();
            const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

            for (const image of images as any[]) {
            
                const {id, name} = await UploadFiles(image, subFolderID)
                const link = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
                let result: any
                if(req.body.userType === "Donor"){
                    result = await updateDonorProfilePic(req.body.ownerID, link)
                } else result = await updateRequestorProfilePic(req.body.ownerID, link)

                if(!result) {
                    console.log("Failed to saved the Image Data")
                    return res.json({
                        messages: {
                            code:1 ,
                            message: "Failed to saved the Image Data"
                        }
                    }).status(400)
                }
                console.log("result: ", result)
                console.log("Upload files Successfully")
                return res.json({
                    messages: {
                        code: 0,
                        message: "Upload files Successfully"
                    },
                    link
                }).status(200)
              }

           
    }catch (error){
        return res.json({
            messages:{
                 code: 1,
                 message: "Internal server error"
            }
        }).status(500)
    }
}