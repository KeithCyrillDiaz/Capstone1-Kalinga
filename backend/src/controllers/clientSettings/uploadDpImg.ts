import express from 'express'
import { UploadFiles, DeleteFiles } from '../../helpers/GdriveUploader'

import { updateDonorProfilePic, updateRequestorProfilePic, getDonorById, getRequestorById} from '../../models/users'
export const addProfilePicture = async (req: express.Request, res: express.Response) => {
    try{    
  
        console.log("files: ", req.files as any[])
        console.log("body: ", req.body)
        console.log("test: ", req.body.ownerID)
        console.log("Image_ID: ", req.body.Image_ID)
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
        if(!req.body.ownerID){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Owner"
                }
            })
        }
             if(req.body.Image_ID){
                try {
                    await DeleteFiles(req.body.Image_ID);
                    console.log("Image deleted successfully");
                  } catch (error) {
                    console.log("Error deleting previous image:", error.message);
                    return res.json({
                        messages: {
                            code: 1,
                            message: "Error deleting previous image"
                        }
                    }).status(400)
                  }
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
               
    
            let result: any
            let link: any
            let Image_ID: any
            for (const image of images as any[]) {
                    // Upload a new image
                 const { id } = await UploadFiles(image, subFolderID);
                console.log("Prev_Image_ID: ", req.body.Image_ID)
                console.log("id: ", id)
                link = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
                Image_ID = id
              }

              if(req.body.userType === "Donor"){
                result = await updateDonorProfilePic(req.body.ownerID, link, Image_ID)
            } else result = await updateRequestorProfilePic(req.body.ownerID, link, Image_ID)

            if(!result) {
                console.log("Failed to saved the Image Data")
                return res.json({
                    messages: {
                        code:1 ,
                        message: "Failed to saved the Image Data"
                    }
                }).status(400)
            }
            // console.log("result: ", result)
            console.log("Upload files Successfully")

            return res.json({
                messages: {
                    code: 0,
                    message: "Upload files Successfully"
                },
                link,
                Image_ID
            }).status(200)

           
    }catch (error){
        return res.json({
            messages:{
                 code: 1,
                 message: "Internal server error"
            }
        }).status(500)
    }
}