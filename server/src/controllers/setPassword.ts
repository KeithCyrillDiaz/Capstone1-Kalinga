import express from 'express'
import { getScreeningFormByApplicantID } from '../models/ApplyAsDonor'
import { createDonor } from '../models/users'
import { random, passEncryption } from '../helpers/passwordEncryption'

export const setPassword = async (req: express.Request, res: express.Response) => {
    try{
        
        if(!req.body.Applicant_ID || !req.body.password){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            })
        }
        const existingUser = await getScreeningFormByApplicantID(req.body.Applicant_ID)

        if(!existingUser){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Applicant ID"
                }
            })
        }
        
        const salt = random();
        const newDonor = await createDonor({
            fullName: existingUser.fullName,
            password: passEncryption(salt, req.body.password),
            email: existingUser.email,
            Donor_ID: existingUser.Applicant_ID,
            userName: existingUser.email,
            age: existingUser.Age,
            address: existingUser.address,
            birthday: existingUser.birthday,
            mobileNumber: existingUser.contactNumber,
            homeAddress: existingUser.homeAddress,
        })
            

        


    } catch(error){


    }

}