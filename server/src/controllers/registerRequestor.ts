import express from 'express'
import {  createRequestor, getRequestorByEmail} from '../db/users';
import { random, passEncryption } from '../helpers/passwordEncryption'


export const registerRequestor = async( req: express.Request, res: express.Response) => {
   
try {
    const {
        fullName,
        password,
        email,
        Requestor_ID,
        userName,
        MilkAmountReceived,
        age,
        address,
        birthday,
        mobileNumber,
        homeAddress,
        NumberPost,
        Badge_ID,
        Community_ID,
        Post_ID,
        BookMark_ID,
    } = req.body;


    // console.log("password:", password)
    // console.log("email:", email)
    // console.log("fullName: ", fullName)

    if(!fullName || !password || !email){
        console.log("if error")
        return res.sendStatus(400);
    };

    const existingUser = await getRequestorByEmail(email)

    if(existingUser){
        console.log("Existing User")
        return res.sendStatus(400);
    };

    const moment = require('moment');
    const currentTime = moment();
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

    const salt = random(); 

    const requestor = await createRequestor({
        email,
        fullName,
        Requestor_ID,
        userName,
        MilkAmountReceived,
        password: passEncryption(salt, password),
        age,
        address,
        birthday,
        mobileNumber,
        homeAddress,
        NumberPost,
        Badge_ID,
        Community_ID,
        Post_ID,
        BookMark_ID,
        userType: "Requestor",
        createdAt: formattedTime,
        updatedAt: formattedTime,
    });


    const message = {
        code: 0, 
        message: 'Requestor Registered'
    };

    return res.status(200). json({message, requestor}) .end();
    
} catch (error) {
    console.log("Error")
    console.log(error)
    return res.sendStatus(400)
}


}