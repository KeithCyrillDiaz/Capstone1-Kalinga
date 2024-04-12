import express from 'express'
import basicAuth from 'express-basic-auth'

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


export const tokenVerification = async (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
    const authHeader = req.headers.authorization;
}