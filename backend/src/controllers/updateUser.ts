import express from 'express'
import { getDonorById, updateDonorDetails, updateRequestorDetails, createRequestor} from '../models/users'
import moment from 'moment'
export const updateUserDetails = async (req: express.Request, res: express.Response) => {
    try{
        const userData = req.body.userData
        console.log("userData: ", userData)
        console.log("ID: ", userData.Requestor_ID)
        const updatedUserData = {
            ...userData,
            updatedAt: moment().toDate()
          };
        let result: any = {}

        if(userData.userType === "Requestor"){
            result = await updateRequestorDetails(userData.Requestor_ID, updatedUserData)
        } else result = await updateDonorDetails(userData.Donor_ID, updatedUserData)

        if(!result){
            console.log("Failed to update user")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update user"
                }
            }).status(400)
        }
        console.log("result: ", result)
        console.log("Update user details successfully")
        return res.json({
            messages: {
                code: 0,
                message: "Update user details successfully"
            }, result
        }).status(200)
    }catch(error){
        console.log("error", error)
    }
}