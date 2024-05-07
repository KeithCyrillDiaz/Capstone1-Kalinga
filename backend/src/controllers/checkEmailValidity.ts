import express from "express"

import { getScreeningFormByEmail } from "../models/ApplyAsDonor"
export const checkEmail = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.email)
        const userEmail = req.params.email

        if(!userEmail) {
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const checkEmail = await getScreeningFormByEmail(userEmail)
        console.log("checkEmail: ", checkEmail)
        if(!checkEmail) {
            console.log("Valid Email")
            return res.json({
                messages: {
                    code: 0,
                    messages: "Valid Email"
                }
            })
        } else {
            console.log("Email is already existing")
            return res.json({
                messages: {
                    code: 1,
                    message: "Email is already existing"
                }
            }).status(400)
        }
       
        
    } catch(error) {
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }

}