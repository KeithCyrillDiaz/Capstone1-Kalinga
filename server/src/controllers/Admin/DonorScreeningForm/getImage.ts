import express from 'express'
import { getMRImage } from '../../../models/ApplyAsDonor'


export const getImage = async (req: express.Request, res: express.Response) =>{

    try{
        const image = await getMRImage(req.params.ownerID)
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