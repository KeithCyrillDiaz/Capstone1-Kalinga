import express from 'express'
import { getMRImage } from '../../models/ApplyAsDonor'


export const getImage = async (req: express.Request, res: express.Response) =>{

    try{
        console.log("req.params.ownerID: ", req.params.ownerID)
  
        const image = await getMRImage(req.params.ownerID)
        if(image.length === 0) {
            console.log("No Image Uploaded")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Image Uploaded"
                }
            }).status(204)
        }
        console.log("image: ", image)
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Imaged Retrieved"
            },
            image
        })
    } catch (error) {

        return res.status(200).json({
            messages: {
                code: 1,
                message: "Imaged Not Retrieved"
            }
        })

    }


}