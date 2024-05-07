import express from 'express'
import { getMRFileZip } from '../../models/ApplyAsDonor'
export const getFile = async (req: express.Request, res: express.Response) => {
   try{
        // console.log(req.params.ownerID)
        const zipFile = await getMRFileZip(req.params.ownerID)
        if(!zipFile) {
            return res.json({
                messages: {
                    code: 1,
                    message: "None Existent Zip File"
                }
            }).status(400)
        }

        return res.json({
            messages:{
                code: 0,
                message: "Retrieved Zip File"
            },
            zipFile
        }).status(200)
        
   }catch(error){
    return res.status(500).json({
        messages: {
            code: 1,
            message: "Internal Server Error"
        },
        error
    })
   }
}