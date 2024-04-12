import crypto from "crypto"
import * as dotenv from 'dotenv';
dotenv.config(); 

// const secret = process.env.SECRET_KEY;

export const random = () => crypto.randomBytes(128).toString('base64');
export const passEncryption = (salt: string, password: string) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the .env file');
    }
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET_KEY).digest('hex')
}
