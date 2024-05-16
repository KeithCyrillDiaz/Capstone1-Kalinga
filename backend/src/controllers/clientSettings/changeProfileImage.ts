import express from 'express'
import { getDonorById, getRequestorById, updateDonorDp, updateRequestorDp} from '../../models/users'

export const updateProfileImagelink = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params 
        const { link, path, userType } = req.body

        if(!id || !link || !path || !userType) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }

        const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)

        if(!existingUser){
            console.log("User Not Found")
            return res.json({
                messages: {
                    code: 1,
                    message: "User Not Found"
                }
            }).status(404)
        }
        
        const result = userType === "Donor" ? await updateDonorDp(id, link) : await updateRequestorDp(id, link)

        if(!result){
            console.log("Failed to update DP Link")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update DP Link"
                }
            }).status(404)
        }
        
        console.log("Successfully Updated Dp")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Updated Dp"
            },
            result
        }).status(200)

    } catch(error) {
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