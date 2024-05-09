import express from 'express'
import basicAuth from 'express-basic-auth'
import { getLogInToken,} from '../models/Authentication'

export const isAuthorized = basicAuth({
    authorizeAsync: true,
    authorizer: async (username: string, password: string, cb: any) => {
        try{
            if(username === process.env.USERNAMEE && password === process.env.PASSWORD){
                return cb(null, true, {messages: { code: 0, message:"Valid Credentials"}})
            } else return cb(null, false, {messages: { code: 1, message:"Invalid Credentials"}})
        } catch(error){
            return cb(error)
        }   
    },
    challenge:true,
    unauthorizedResponse: () => {
        return {
            message:{
                code: 1,
                message: "Unauthorized"
            },
        }
    }
})


export const tokenVerification = async ( req: express.Request,  res: express.Response,  next: express.NextFunction) => {
    try{
        
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            console.log('Unauthorized User')
            return res.json({ 
                messages: {
                    code: 1, 
                    message: 'Unauthorized User', 
                }
            }).status(401)
        }
        
        const token = req.headers.authorization.replace("Bearer ", "");
        
        const result = await getLogInToken(token)
        if(!result) {
            console.log("Invalid Token")
            return res.json({
                messages: {
                    code: 1,
                    message: "Unauthorized User"
                }
            }).status(401)
        }   

        console.log("User is Authorized")
        next()
    } catch (error) {
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }

}