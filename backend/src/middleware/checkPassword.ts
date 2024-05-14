import express from 'express'
import { passEncryption } from '../helpers/passwordEncryption'
import { getDonorById, getRequestorById } from '../models/users'


export const checkPassword = async (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction 
) => {

    try{
        const { id } = req.params
        const { currentPassword, userType } = req.body

        if(!currentPassword) {
            console.log("Invalid current Password")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid current Password"
                }
            }).status(400)
        }

        const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)

        if(!existingUser) {
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(404)
        }

        const salt = existingUser.salt
        const encryptePassword = passEncryption(salt, currentPassword)
        const oldPassword = existingUser.password

        if(encryptePassword !== oldPassword) {
            console.log("Password not match")
            return res.json({
                messages: {
                    code: 1,
                    message: "Password not match"
                }
            }).status(400)
        }

        next()

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