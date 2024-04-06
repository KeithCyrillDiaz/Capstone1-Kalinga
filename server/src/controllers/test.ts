import express from 'express'
import { createToken } from '../models/token'
import jwt from "jsonwebtoken";
import moment from 'moment';

export const generateToken = async (req: express.Request, res: express.Response) => {
    try{

        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Username or Password"
                }
            })
        }

        const encodedCredentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = decodedCredentials.split(':');


        if(!process.env.SECRET_KEY){
        return res.status(400).json({
            messages: {
                code: 1,
                message: "secret Key is missing"
            }
          })
        }
            const newToken = await createToken({
                token: jwt.sign({username, password}, process.env.SECRET_KEY, { expiresIn: '1m' }),
                expiresAt: moment().add(1, 'minutes').toDate()
            })

        return res.json({
            newToken,
            messages:{
                code: 0,
                message: "Generate Token"
            }
        })
    } catch(error){
        return res.status(400).json({
            messages: {
                code: 1,
                message: "Error generating token"
            }
        })
            
        
    }
}