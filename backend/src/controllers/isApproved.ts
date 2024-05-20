import express from 'express'
import { getScreeningFormByApplicantID } from '../models/ApplyAsDonor'

export const isApproved = async (req: express.Request, res: express.Response) => {
    try{
        console.log("Applicant_ID: ",req.params.Applicant_ID)

        const exisitingUser = await getScreeningFormByApplicantID(req.params.Applicant_ID)
        console.log(exisitingUser)
        if(!exisitingUser){
            return res.json({
                messages: {
                    code: 1,
                    message: "Non existing Applicant"
                }
            }).status(400)
        }
        const userType = exisitingUser.userType
        if(exisitingUser.isDeleted === "Deleted" && exisitingUser.isApproved !== "Yes"){
            return res.json({
                messages: {
                    code: 1,
                    message: "Applicant is Deleted"
                },
          
            })
        }
        
        if(exisitingUser.isApproved === "Yes"){
            console.log(`${exisitingUser.userType} is Approved`)
            return res.json({
                messages: {
                    code: 0,
                    message: `${exisitingUser.userType} is Approved`
                },
                userType
            }).status(200)
        } else {
            console.log(`Application is still pending`)
            return res.json({
                messages: {
                    code: 1,
                    message: `${exisitingUser.userType} Application is still pending`
                },
             
            }).status(200)
        }

    } catch(error){
        return res.json({
            messages:{
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}