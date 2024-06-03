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


    if (req.body.password.includes(' ')) {
        return res.json({ 
            messages: {
                code: 1, 
                message: 'Password cannot contain spaces and special characters' 
            }
        }).status(400)
    }
    if (req.body.email.includes(' ')) {
        return res.json({ 
            messages: {
                code: 1, 
                message: 
                'Email cannot contain spaces' 
            }
        }).status(400)
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
                message: "Internal Server Error"
            }
        })
    }
}


export const checkIfBlock = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { email }=req.body
        if(!email) {
            console.log("No Email, Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Email, Bad Request"
                }
            }).status(400)
        }
        let exisitingUser
        exisitingUser = await getDonorByEmail(email)
        if(!exisitingUser) exisitingUser = await getRequestorByEmail(email)

        if(!exisitingUser) {
            console.log("Email Not Found")
            return res.json({
                messages: {
                    code: 1,
                    message: "Email Not Found"
                }
            }).status(400)
        }
        if(exisitingUser.Blocked === "Yes"){
            console.log("User is Blocked")
            return res.json({
                messages: {
                    code: 1,
                    message: "User is Blocked"
                }
            }).status(400)
        }

        next()
    } catch(error) {
    return res.json({
                messages: {
                    code: 1,
                    message: "Internal Server Error"
                }
            }).status(500)
    }
}