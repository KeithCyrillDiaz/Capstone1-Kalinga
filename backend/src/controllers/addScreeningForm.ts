import express from 'express'
import { createScreeningForm, getScreeningFormByApplicantID } from '../models/ApplyAsDonor';
import { random, passEncryption } from '../helpers/passwordEncryption'


export const addScreeningForm = async( req: express.Request, res: express.Response) => {
   
try {
    const {
        fullName,
        Screening_ID,
        Applicant_ID,
        CompleteName,
        parentAge,
        email,
        address,
        birthday,
        contactNumber,
        homeAddress,
        NameOfChild,
        childAge,
        Sex,
        DateOfBirth,
        BirthWeight,
        AgeOfGestation,
        MedicalCondition,
        TypeOfDonor,
        QA,
        QB,
        Q1,
        Q2,
        MH1,
        MH2,
        MH3,
        MH4,
        MH5,
        MH6,
        MH7,
        MH8,
        MH9,
        MH10,
        MH11,
        MH12,
        MH13,
        MH14,
        SH1,
        SH2,
        createdAt,
        updatedAt,
    } = req.body;


    if(!fullName){

        return res.sendStatus(400);
    };

    const existingUser = await getScreeningFormByApplicantID(Applicant_ID)

    if(existingUser){

        return res.sendStatus(400);
    };

    const moment = require('moment');
    const currentTime = moment();
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

    const salt = random(); 
    const screeningForm = await createScreeningForm({
        fullName,
        Screening_ID,
        Applicant_ID,
        CompleteName,
        parentAge,
        email,
        address,
        birthday,
        contactNumber,
        homeAddress,
        NameOfChild,
        childAge,
        Sex,
        DateOfBirth,
        BirthWeight,
        AgeOfGestation,
        MedicalCondition,
        TypeOfDonor,
        QA,
        QB,
        Q1,
        Q2,
        MH1,
        MH2,
        MH3,
        MH4,
        MH5,
        MH6,
        MH7,
        MH8,
        MH9,
        MH10,
        MH11,
        MH12,
        MH13,
        MH14,
        SH1,
        SH2,
        createdAt: formattedTime,
        updatedAt: formattedTime,
    });
    console.log(screeningForm)

    const message = {
        code: 0, 
        message: 'New Screening Form Added'
    };

    return res.status(200). json({message, screeningForm}) .end();
    
} catch (error) {
    return res.sendStatus(400)
}


}