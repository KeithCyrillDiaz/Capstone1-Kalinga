import express from 'express'
import { getMRFile } from '../../models/ApplyAsDonor'
export const getFile = async (req: express.Request, res: express.Response) => {
   try{
        // console.log(req.params.ownerID)
        const { ownerID } = req.params
        const { purpose } = req.body
        console.log("purpose: ", req.body)
        if(!ownerID || !purpose) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }


        const files = await getMRFile(ownerID, purpose)
        console.log("files: ", files)
        if(files.length === 0) {
            console.log("Non Existent Files")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existent Files"
                }
            }).status(404)
        }
        console.log("retrieved Files Successfully")
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