import express from 'express';
import { createToken } from '../models/token';
import jwt from "jsonwebtoken";
import basicAuth from 'express-basic-auth';
import moment from 'moment';
import { IBasicAuthedRequest } from 'express-basic-auth';

export const getToken = async (req: IBasicAuthedRequest, res: express.Response) => {
    try {
        const user = req.auth.user;
        const pass = req.auth.password;

        if (!process.env.SECRET_KEY) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Secret Key is missing"
                }
            });
        }

        const newToken: any = await createToken({
            token: jwt.sign({ user, pass }, process.env.SECRET_KEY, { expiresIn: '1m' }),
            expiresAt: moment().add('1m').toDate()
        });

        return res.json({
            messages: {
                code: 0,
                message: "Generate Token"
            },
            newToken
        });
    } catch (error) {
        return res.status(400).json({
            messages: {
                code: 1,
                message: "Error generating token"
            }
        });
    }
};
