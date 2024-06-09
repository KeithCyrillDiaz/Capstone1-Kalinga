import express from 'express'
import { DonorModel, RequestorModel } from '../../../models/users'


export const getBlockedUsers = async (req: express.Request, res: express.Response) => {
   try {
    const blockedDonor = await DonorModel.find({Blocked: "Yes"})
    const blockedRequestor = await RequestorModel.find({Blocked: "Yes"})

    if(blockedDonor.length === 0 && blockedRequestor.length === 0){
        console.log("No Blocked Users")
        return res.status(404).json({
            messages: {
                code: 1,
                message: "Not Found"
            }
        })
    }

    return res.status(200).json({
        messages: {
            code: 0,
            message: "Retrieve Blocked Users"
        },
        blockedDonor,
        blockedRequestor
    })
   } catch (error) {
        console.log("Internal Server Error - getBlockedUsers")
        return res.status(500).json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            }
        })
   }
}