import express from 'express'
import { getCode, getPassCode, deleteCode, deletePassCode } from '../../models/Authentication'

export const checkCode = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.Code)

        let verificationCode = await getCode(req.params.Code)
        if(!verificationCode) {
            return res.json({
                messages: {
                    code: 1,
                    message: "Ïnvalid Code"
                }
            }).status(401)
        }
        await deleteCode(req.params.Code)
        return res.json({
            messages: {
                code: 0,
                message: "Valid Code"
            }
        }).status(202)
       
    } catch(error){
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}


export const checkPassCode = async (req: express.Request, res: express.Response) => {
    try{

        console.log("code: ", req.params.Code)

        if(!req.params.Code){
            return res.json({
                messages: {
                    code: 1,
                    message: "Ïnvalid Input"
                }
            }).status(400)
        }
        let verificationCode = await getPassCode(req.params.Code)
        if(!verificationCode) {
            return res.json({
                messages: {
                    code: 1,
                    message: "Ïnvalid Code"
                }
            }).status(401)
        }
    
        const result = await deletePassCode(verificationCode.passCode)
        return res.json({
            messages: {
                code: 0,
                message: "Valid Code"
            }
        }).status(202)
       
    } catch(error){
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}
