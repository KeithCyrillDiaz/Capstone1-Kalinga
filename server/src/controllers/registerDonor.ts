import express from 'express'
import { createDonor, getDonorByEmail} from '../db/users';
import { random, passEncryption } from '../helpers/passwordEncryption'


export const registerDonor = async( req: express.Request, res: express.Response) => {
   
try {
    const {
        fullName,
        password,
        email,
        Donor_ID,
        userName,
        MilkAmountDonated,
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

    

    if(!fullName || !password || !email){

        return res.sendStatus(400);
    };

    const existingUser = await getDonorByEmail(email)

    if(existingUser){

        return res.sendStatus(400);
    };

    const moment = require('moment');
    const currentTime = moment();
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

    const salt = random(); 
    const donor = await createDonor({
        email,
        fullName,
        Donor_ID,
        userName,
        MilkAmountDonated,
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
        userType: "Donor",
        createdAt: formattedTime,
        updatedAt: formattedTime,
    });

    const message = {
        code: 0, 
        message: 'Donor Registered'
    };

    return res.status(200). json({message, donor}) .end();
    
} catch (error) {
    console.log(error)
    return res.sendStatus(400)
}


}