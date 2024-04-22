import express from 'express'
import { getDonorByEmail, getRequestorByEmail } from '../models/users'
import { passEncryption } from '../helpers/passwordEncryption'
import { createLogInToken, deleteLogInToken } from '../models/Authentication'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import randomatic from 'randomatic'

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
    
        let userInformation = {}
        const existingUser = await getDonorByEmail(req.body.email)
        console.log("existingUser: ", existingUser)
        if(!existingUser){
            const existingUser = await getRequestorByEmail(req.body.email)
            console.log("existingUser: ", existingUser)
            if(!existingUser){
                return res.json({
                    messages: {
                        code: 1,
                        message: "Email Not Found"
                    }
                }).status(400)
            }
            userInformation = existingUser
            email = existingUser.email
            pass = existingUser.password
            salt = existingUser.salt
            userType = existingUser.userType
        } else{
            userInformation = existingUser
            email = existingUser.email
            pass = existingUser.password
            salt = existingUser.salt
            userType = existingUser.userType
        }
        
        console.log(" userInformation: ",  userInformation)
        if(pass !== passEncryption(salt, req.body.password)){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Password"
                }
            }).status(400)
        }
        
        const newToken: any = await createLogInToken({
            logInToken: jwt.sign({ user: req.body.email, pass: passEncryption(salt, req.body.password)}, process.env.SECRET_KEY, { expiresIn: '1m' }),
            expiresAt: moment().add(1, 'minutes').toDate()
        });
        console.log("existingUser: ", userInformation)
        console.log("newToken: ", newToken)
        const token = newToken.logInToken
        console.log("token: ", newToken.logInToken)
   
        return res.json({
            messages: {
                code: 0,
                message: "Log in Sucessfully"
            },
            userInformation,
            token
        }).status(200)
        
    } catch(error){
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}


export const logOutUser = async (req: express.Request, res: express.Response) => {
    try{
         const token = req.params.token
         if(!token){
            return res.json({
                messages: {
                    code: 1,
                    message: "Unauthorized"
                }
            })
         }

         await deleteLogInToken(token)
         console.log("Token Deleted Successfully")
         return res.json({
            messages: {
                code: 0,
                message: "Token Deleted Successfully"
            }
        })
    } catch(error) {
        return res.json({
            messages: {
                code: 1,
                message: "Deleted Token Successfully"
            }
        })
    }
}