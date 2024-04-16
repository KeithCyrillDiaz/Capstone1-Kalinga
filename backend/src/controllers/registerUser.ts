import express from 'express'
import moment from 'moment'
import { getScreeningFormByApplicantID } from '../models/ApplyAsDonor'
import { createDonor, createRequestor, getRequestorById, getDonorById, updateDonorPassword, updateRequestorPassword } from '../models/users'
import { random, passEncryption } from '../helpers/passwordEncryption'

export const registerUser = async (req: express.Request, res: express.Response) => {
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
        console.log("salt",salt)
        const newUser = {
            fullName: existingUser.fullName,
            password: passEncryption(salt, req.body.password),
            email: existingUser.email,
            Donor_ID: existingUser.Applicant_ID,
            userName: existingUser.email,
            age: existingUser.Age,
            birthDate: existingUser.birthDate,
            mobileNumber: existingUser.contactNumber,
            homeAddress: existingUser.homeAddress,
            userType: existingUser.userType,
            salt: salt,
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        }
        console.log("newUser Salt: ",newUser.salt)

        if(existingUser.userType === "Donor"){
            const registeredUser = await getDonorById(existingUser.Applicant_ID)
            if(!registeredUser) await createDonor(newUser);
            else await updateDonorPassword(existingUser.Applicant_ID, newUser.password, salt)
        } else{
            const registeredUser = await getRequestorById(existingUser.Applicant_ID)
            if(!registeredUser) await createRequestor(newUser);
            else await updateRequestorPassword(existingUser.Applicant_ID, newUser.password, salt)
        }
      
        return res.status(200).json({
            messages:{
                code: 0,
                messages: "User Registered"
            },
            newUser
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