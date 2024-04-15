import express from 'express'
import moment from 'moment'
import { getScreeningFormByApplicantID } from '../../models/ApplyAsDonor'
import { createDonor } from '../../models/users'
import { random, passEncryption } from '../../helpers/passwordEncryption'

export const registerDonor = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.body)
        if(!req.body.Applicant_ID || !req.body.password){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            })
        }
        const existingUser = await getScreeningFormByApplicantID(req.body.Applicant_ID)

        console.log("existinguser: ", existingUser)

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
            birthDate: existingUser.birthDate,
            mobileNumber: existingUser.contactNumber,
            homeAddress: existingUser.homeAddress,
            userType: "Donor",
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        })

        return res.status(200).json({
            messages:{
                code: 0,
                messages: "Donor Registered"
            },
            newDonor
        })
    } catch(error){
        return res.status(400).json({
            messages:{
                code: 1,
                message: "Something went wrong"
            }
        })
    }

}