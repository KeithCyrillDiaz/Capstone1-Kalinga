import express from 'express'
import { getMRFile } from '../../models/ApplyAsDonor'
export const getFile = async (req: express.Request, res: express.Response) => {
   try{
        // console.log(req.params.ownerID)
        const { ownerID } = req.params
        if(!ownerID) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }
        const files = await getMRFile(ownerID)
        if(!files) {
            console.log("Non Existent Zip File")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existent Zip File"
                }
            }).status(404)
        }

        return res.json({
            messages:{
                code: 0,
                message: "Retrieved Zip File"
            },
            files
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