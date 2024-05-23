import express from 'express'
import { getMRImage, deleteMRImages } from '../../models/ApplyAsDonor'


export const getImage = async (req: express.Request, res: express.Response) =>{

    try{
        const { ownerID } = req.params
        const { purpose } = req.body

        if(!ownerID || !purpose){
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }
   
        const images = await getMRImage(ownerID, purpose)
        if(images.length === 0) {
            console.log("No Image Uploaded")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Image Uploaded"
                }
            }).status(404)
        }
        console.log("Successfully Retrieved Images")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Successfully Retrieved Images"
            },
            images
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