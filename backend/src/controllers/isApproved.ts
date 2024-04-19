import express from 'express'
import { getScreeningFormByApplicantID } from '../models/ApplyAsDonor'

export const isApproved = async (req: express.Request, res: express.Response) => {
    try{
        console.log("Applicant_ID: ",req.params.Applicant_ID)

        const exisitingUser = await getScreeningFormByApplicantID(req.params.Applicant_ID)
        console.log(exisitingUser)
        if(!exisitingUser){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Non existing Applicant"
                }
            })
        }
        const userType = exisitingUser.userType
        if(exisitingUser.isApproved === "Yes"){
            console.log(`${exisitingUser.userType} is Approved`)
            return res.status(200).json({
                messages: {
                    code: 0,
                    message: `${exisitingUser.userType} is Approved`
                },
                userType
            })
        } else {
            console.log(`Application is still pending`)
            return res.status(200).json({
                messages: {
                    code: 1,
                    message: `Application is still pending`
                },
             
            })
        }



    } catch(error){

    }
}