import express from 'express'
import { createMedicalRequirementFiles, createMedicalRequirementImages, deleteMRFiles, deleteMRImages, getScreeningFormByApplicantID } from '../../models/ApplyAsDonor'


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
        console.log("id: ", id)


        const existingApplicant = await getScreeningFormByApplicantID(id)

        if(!existingApplicant){
            console.log("User not Found")
            return res.json({
                messages: {
                    code: 1,
                    message: "User not Found"
                }
            }).status(404)
        }

        const { fullName } = existingApplicant
        
        const newData = {
            owner: fullName,
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


export const deleteImageFileData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { purpose } = req.body
        
        if(!id || !purpose){
            console.log("Bad Request")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }
        
        if(purpose !== "Request" &&  purpose !== "Donate"){
            console.log("No Changes")
            return res.status(304).json({
                messages: {
                    code: 1,
                    message: "No Changes"
                }
            })
        }
           

        const resultImages = await deleteMRFiles(id, purpose)
        const resultFiles = await deleteMRImages(id, purpose)

        if(resultImages && resultFiles){
            console.log("Successfully Deleted Data")
            res.status(200).json({
                messages: {
                    code: 0,
                    message: "Successfully Deleted Data"
                }
            })
        }
        

    } catch(error){
        console.log("Internal Server Error")
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}
