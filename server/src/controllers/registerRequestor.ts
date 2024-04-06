import express from 'express'
import moment from 'moment'
import { getScreeningFormByApplicantID } from '../models/ApplyAsDonor'
import { createRequestor } from '../models/users'
import { random, passEncryption } from '../helpers/passwordEncryption'

export const registerRequestor = async (req: express.Request, res: express.Response) => {
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
        const newRequestor = await createRequestor({
            fullName: existingUser.fullName,
            password: passEncryption(salt, req.body.password),
            email: existingUser.email,
            Requestor_ID: existingUser.Applicant_ID,
            userName: existingUser.email,
            age: existingUser.Age,
            address: existingUser.address,
            birthday: existingUser.birthday,
            mobileNumber: existingUser.contactNumber,
            homeAddress: existingUser.homeAddress,
            userType: "Requestor",
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        })

        return res.status(200).json({
            messages:{
                code: 0,
                messages: "Requestor Registered"
            },
            newRequestor
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