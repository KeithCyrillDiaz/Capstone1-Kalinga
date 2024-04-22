import express from 'express'
import moment from 'moment'
import { getScreeningFormByApplicantID, getScreeningFormByEmail } from '../models/ApplyAsDonor'
import { createDonor, createRequestor, getRequestorById, getDonorById, updateDonorPassword, updateRequestorPassword } from '../models/users'
import { random, passEncryption } from '../helpers/passwordEncryption'

export const registerUserOrSetNewPassword = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.body)
        console.log("password: ", req.body.password)
        if((!req.body.Applicant_ID || !req.body.email) && !req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            })
        }
        let Applicant_ID: string
        if(!req.body.Applicant_ID) {
            const existingUser = await getScreeningFormByEmail(req.body.email)
            // console.log("existingUser: ", existingUser)
            if(!existingUser){
                return res.json({
                    messages: {
                        code: 1,
                        message: "Cannot find email"
                    }
                }).status(400)
            }
            else Applicant_ID = existingUser.Applicant_ID
        } else Applicant_ID = req.body.Applicant_ID

        const existingUser = await getScreeningFormByApplicantID(Applicant_ID)
        if(!existingUser){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Applicant ID"
                }
            })
        }

        const salt = random();
        // console.log("salt",salt)
        console.log("Applicant_ID: ", Applicant_ID)
        const newDonor = {
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

        
        const newRequestor = {
            fullName: existingUser.fullName,
            password: passEncryption(salt, req.body.password),
            email: existingUser.email,
            Requestor_ID: existingUser.Applicant_ID,
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
        let newUser = {}
        if(existingUser.userType === "Donor"){
            console.log("existingUser.Applicant_ID for Donor: ", existingUser.Applicant_ID)
            const registeredUser = await getDonorById(existingUser.Applicant_ID)
            if(!registeredUser) newUser = await createDonor(newDonor);
            else {
                if(registeredUser.password === passEncryption(registeredUser.salt, req.body.password)){
                    console.log("Old and new password cannot be the same")
                    return res.json({
                        messages:{
                            code: 1,
                            message: "Old and new password cannot be the same"
                        }
                    })
                }
                await updateDonorPassword(existingUser.Applicant_ID, newDonor.password, salt) // set new Password
                console.log("Password updated")
            } 
        } else{
            console.log("existingUser.Applicant_ID for Requestor: ", existingUser.Applicant_ID)
            const registeredUser = await getRequestorById(existingUser.Applicant_ID)
            console.log("existingUser: ", registeredUser)
            if(!registeredUser) newUser = await createRequestor(newRequestor);
            else {
                if(registeredUser.password === passEncryption(registeredUser.salt, req.body.password)){
                    console.log("Old and new password cannot be the same")
                    return res.json({
                        messages:{
                            code: 1,
                            message: "Old and new password cannot be the same"
                        }
                    })
                } 

                const result = await updateRequestorPassword(existingUser.Applicant_ID, newRequestor.password, salt) // set new Password
                console.log("Password updated")
                return res.status(200).json({
                    messages: {
                        code: 0,
                        messages: "Log in Successfully"
                    }
                })
            }
        }
        console.log("newUser: ",newUser)
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

