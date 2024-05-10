import express from 'express'
import { getDonorById, getRequestorById, updateDonorPassword, updateRequestorPassword } from '../../models/users'
import { passEncryption } from '../../helpers/passwordEncryption'

export const changePassword = async (req: express.Request, res: express.Response) => {

    try {

        const { password, userType, } = req.body
        const { id } = req.params

        if(!password || !userType || !id) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }

        const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)
        
        if(!existingUser) {
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "User Not Found"
                }
            }).status(404)
        }

        const salt = existingUser.salt
        const finalPassword = passEncryption(salt, password)

        const result = userType === "Donor" ? await updateDonorPassword(id, finalPassword, salt) 
        : await updateRequestorPassword(id, finalPassword, salt)

        if(!result) {
            console.log("Failed to Update Password")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to Update Password"
                }
            }).status(304)
        }

        console.log("Successfully Updated Password")

        return res.json({
            messages: {
                code: 0,
                message: "Successfully Updated Password"
            },
            result
        }).status(200)


    } catch(error) {
        console.log("Internal Server Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}