import express from 'express'
import { getDonorById, getRequestorById } from '../../models/users';


export const userLogInToken = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.body)
        console.log(req.params)
        const user_ID = req.params.userID
        const userType = req.body.userType

        console.log
        let userInformation
        if(userType === "Donor"){
            userInformation = await getDonorById(user_ID)
        } else  userInformation = await getRequestorById(user_ID)
          
        if(!userInformation){
            console.log("The User not Existing")
            return res.json({
                messages: {
                    code: 1,
                    message: "The User not Existing"
                }
            }).status(404)
        }

        if(userInformation.Blocked === "Yes"){
            console.log("User is Blocked")
            return res.json({
                messages: {
                    code: 0,
                    message: "User is Blocked"
                }
            }).status(200)
        }
        
        console.log("Retrieve User Information Successfully")
        return res.json({
            messages: {
                code: 0,
                message: "Retrieve User Information Successfully"
            },
            userInformation
        }).status(200)

    } catch (error) {

        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }

}