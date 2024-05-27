import express from 'express'
import { 
    updateDonorDetails, 
    updateRequestorDetails, 
} from '../models/users'
import moment from 'moment'
import { getScreeningFormByScreeningID, updateScreeningFormDetails } from '../models/ApplyAsDonor'
import { userLogInToken } from './Users/userLoginViaToken'
export const updateUserDetails = async (req: express.Request, res: express.Response) => {
    try{
        const userData = req.body.userData
        console.log("userData: ", userData)
        console.log("ID: ", userData.Requestor_ID)

          const existingScreeningForm =  userData.Requestor_ID 
          ? await getScreeningFormByScreeningID(userData.Requestor_ID) 
          : await getScreeningFormByScreeningID(userData.Donor_ID)

          const newScreeningForm = {
            ...existingScreeningForm,
            email: userData.email,
            contactNumber: userData.mobileNumber,
            homeAddress: userData.homeAddress
          }
          const existingUser = userData.userType === "Donor" 
          ? await updateScreeningFormDetails(userData.Donor_ID, newScreeningForm)
          : await updateScreeningFormDetails(userData.Requestor_ID, newScreeningForm)

          const updatedUserData = {
            ...userData,
            updatedAt: moment().toDate()
          };
      
          const result = userData.userType === "Donor" 
          ? await updateDonorDetails(userData.Donor_ID, updatedUserData) 
          : await updateRequestorDetails(userData.Requestor_ID, updatedUserData)

        if(!result && !existingUser){
            console.log("Failed to update user")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update user"
                }
            }).status(400)
        }
        console.log("existingUser: ", existingUser)
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