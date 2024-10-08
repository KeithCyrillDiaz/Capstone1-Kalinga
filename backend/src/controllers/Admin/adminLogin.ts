import express from 'express'
import { createLogInToken } from '../../models/Authentication'
import jwt from "jsonwebtoken";
import moment from 'moment';

export const AdminLogIn = async (req: express.Request, res: express.Response) => {
    try{
        if(!process.env.USERNAMEE || !process.env.PASSWORD){
            return res.json({
                messages: {
                    code: 1,
                    messages: "env credentials missing"
                }
            }).status(500)
        }

        if(!req.body.username || !req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        
        if(process.env.USERNAMEE !== req.body.username && process.env.PASSWORD !== req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Credentials"
                }, 
       
            }).status(400)
        }


        const user = process.env.USERNAMEE
        const pass = process.env.PASSWORD
        const newToken: any = await createLogInToken({
            logInToken: jwt.sign({ user, pass }, process.env.SECRET_KEY, { expiresIn: '1m' }),
            expiresAt: moment().add('1m').toDate()
        });

        const token = newToken.logInToken
        return res.json({
            messages: {
                code: 0,
                message:  "Log In Successfully"
            },
            user,
            token
        }).status(200)
 
    }catch(error){
        res.json({
            messages: {
                code: 1,
                message: "Invalid Credentials"
            },
            error
        }).status(500)
    }
}


export const superAdminLogIn = async (req: express.Request, res: express.Response) => {
    try{
        if(!process.env.SUPER_ADMIN_USERNAMEE || !process.env.SUPER_ADMIN_PASSWORD){
            return res.json({
                messages: {
                    code: 1,
                    messages: "env credentials missing"
                }
            }).status(500)
        }
        console.log("req.body: ", req.body)
        if(!req.body.username || !req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }
        if(process.env.SUPER_ADMIN_USERNAMEE !== req.body.username || process.env.SUPER_ADMIN_PASSWORD !== req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Credentials"
                }
            }).status(400)
        } 
        return res.json({
            messages: {
                code: 0,
                message: "Log In Successfully"
            }
        }).status(200)


    }catch(error){
        res.json({
            messages: {
                code: 1,
                message: "Invalid Credentials"
            },
            error
        }).status(500)
    }
}