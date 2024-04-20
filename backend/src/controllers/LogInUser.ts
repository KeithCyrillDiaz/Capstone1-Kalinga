import express from 'express'
import { getDonorByEmail, getRequestorByEmail } from '../models/users'
import { passEncryption } from '../helpers/passwordEncryption'

export const logInUser = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.body)
        console.log(req.body.email)
        console.log(req.body.password)
        if(!req.body.email || !req.body.password){
            return res.status(400).json({messages: {code: 1, message: "Invalid Input"}})
        }

        let email: string;
        let pass: string;
        let salt: string; 
        let userType: string;

        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (req.body.password.includes(' ') || specialCharacters.test(req.body.password)) {
        return res.status(400).json({ messages: {code: 1, message: 'Password cannot contain spaces and special characters' }})
    }
    if (req.body.email.includes(' ')) {
        return res.status(400).json({ messages: {code: 1, message: 'Email cannot contain spaces' }})
    }
    

        const existingUser = await getDonorByEmail(req.body.email)
        console.log(existingUser)
        if(!existingUser){
            const existingUser = await getRequestorByEmail(req.body.email)
            if(!existingUser){
                return res.json({
                    messages: {
                        code: 1,
                        message: "Email Not Found"
                    }
                }).status(400)
            }
            email = existingUser.email
            pass = existingUser.password
            salt = existingUser.salt
            userType = existingUser.userType
        } else{
            email = existingUser.email
            pass = existingUser.password
            salt = existingUser.salt
            userType = existingUser.userType
        }
        

        if(pass !== passEncryption(salt, req.body.password)){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Password"
                }
            }).status(400)
        }

        return res.status(200).json({
            messages: {
                code: 0,
                message: "Log in Sucessfully"
            },
            userType
        })
        
    } catch(error){
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}