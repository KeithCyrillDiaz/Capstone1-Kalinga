import express from 'express'
import { createScreeningForm, getScreeningFormByMaxApplicantID, getScreeningFormByName } from '../../db/ApplyAsDonor';
import { random, passEncryption } from '../../helpers/passwordEncryption'
import randomatic from 'randomatic'

export const addScreeningForm = async( req: express.Request, res: express.Response) => {
try {
    const {
        Applicant_ID,
        fullName,
        userType,
        Age,
        birthday,
        email,
        address,
        contactNumber,
        homeAddress,
    
        //Infant Information
        NameOfChild,
        BirthWeight,
        Sex,
        childAge,
        DateOfBirth,
        AgeOfGestation,
        MedicalCondition,
        TypeOfDonor,
        QA,
        QB,
        QB_Reason,
        Q1,
        Q2,
        MH1,
        MH2,
        MH3,
        MH4,
        MH5,
        MH6,
        MH7,
        MH7_Reason,
        MH8,
        MH9,
        MH10,
        MH11,
        MH12,
        MH13,
        MH13_Reason,
        MH14,
        SH1,
        SH2,
    } = req.body;


    if(!fullName){
        const message = {
            code: 1, 
            message: 'Invalid Input no Full Name'
        }
         return res.status(200). json({message}) .end();
    };

    const existingUser = await getScreeningFormByName(fullName)

    if(existingUser){

        if(existingUser.Applicant_ID === Applicant_ID){
            const message = {
                code: 1, 
                message: 'Existing Applicant'
            }
             return res.json({message}) .end();
        };

    }

     const Screening_ID = randomatic('Aa0', 20);

    const moment = require('moment');
    const currentTime = moment();
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
    
    // const salt = random(); 
    const screeningForm = await createScreeningForm({
        Screening_ID,
        Applicant_ID,
        userType,
        fullName,
        Age,
        birthday,
        email,
        address,
        contactNumber,
        homeAddress,

        //Infant Information
        NameOfChild,
        BirthWeight,
        Sex,
        childAge,
        DateOfBirth,
        AgeOfGestation,
        MedicalCondition,
        TypeOfDonor,
        QA,
        QB,
        QB_Reason,
        Q1,
        Q2,
        MH1,
        MH2,
        MH3,
        MH4,
        MH5,
        MH6,
        MH7,
        MH7_Reason,
        MH8,
        MH9,
        MH10,
        MH11,
        MH12,
        MH13,
        MH13_Reason,
        MH14,
        SH1,
        SH2,
        createdAt: formattedTime,
        updatedAt: formattedTime,
    });

    const message = {
        code: 0, 
        message: 'New Screening Form Added'
    };

    return res.status(200). json({message, screeningForm}) .end();
    
} catch (error) {

    return res.sendStatus(400)
}


}