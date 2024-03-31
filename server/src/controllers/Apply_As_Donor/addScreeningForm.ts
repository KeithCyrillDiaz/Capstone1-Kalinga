import express from 'express'
import { createScreeningForm, getScreeningFormByMaxApplicantID, getScreeningFormByName } from '../../db/ApplyAsDonor';
import { random, passEncryption } from '../../helpers/passwordEncryption'

export const addScreeningForm = async( req: express.Request, res: express.Response) => {
try {
    const {
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
    } = req.body;


    if(!fullName){
        // console.log("fullName:", fullName)
        return res.sendStatus(400);
    };

    const exisistingUser = await getScreeningFormByName(fullName)

    if(exisistingUser){
        console.log("existingUser")
        return res.sendStatus(400);
    }

    const maxApplicantID = await getScreeningFormByMaxApplicantID()
    // console.log('test:', maxApplicantID)
    let Applicant_ID: number;
    let Screening_ID: number;

    if(maxApplicantID === null){

        Applicant_ID = 1;   
       
    } else {
        // Increment the maximum Applicant_ID by 1
        const maxApplicantIDValue = maxApplicantID.Applicant_ID as number
        Applicant_ID = maxApplicantIDValue + 1;

    }

    const moment = require('moment');
    const currentTime = moment();
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
    console.log(' Applicant_ID:',  Applicant_ID)
    Screening_ID = Applicant_ID;
    
    // const salt = random(); 
    const screeningForm = await createScreeningForm({
        Screening_ID,
        Applicant_ID,
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

    const message = {
        code: 0, 
        message: 'New Screening Form Added'
    };

    return res.status(200). json({message, screeningForm}) .end();
    
} catch (error) {
    console.log("ayaw")
    return res.sendStatus(400)
}


}