import express from 'express'
import { createMedicalRequirementFiles, createMedicalRequirementImages } from '../../models/ApplyAsDonor'


export const uploadImageOrFileData = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params
        const { url, path, purpose, name, type } = req.body

        if(!id || !url || !path ||!purpose || !name) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }

        const newData = {
            ownerID: id,
            link: url,
            path: path,
            purpose: purpose,
            originalname: name
        }

        const result = type === "Image" ? await createMedicalRequirementImages(newData) 
        : await createMedicalRequirementFiles(newData)

        if(!result){
            console.log("Failed to upload Image Data")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to upload Image Data"
                }
            }).status(304)
        }

        console.log("Succesfully Uploaded Image Data")
        return res.json({
            messages: {
                code: 0,
                message: "Succesfully Uploaded Image Data"
            },
            result
        }).status(200)

    } catch (error){
        console.log("Internal Server Error", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}
