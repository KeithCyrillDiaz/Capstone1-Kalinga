import express from 'express'
import moment from 'moment'
import { getScreeningFormByApplicantID, getScreeningFormByEmail } from '../models/ApplyAsDonor'
import { createDonor, createRequestor, getRequestorById, getDonorById, updateDonorPassword, updateRequestorPassword } from '../models/users'
import { random, passEncryption } from '../helpers/passwordEncryption'

export const registerUserOrSetNewPassword = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.body)
        if((!req.body.Applicant_ID || !req.body.email) && !req.body.password){
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            })
        }
        let Appilicant_ID: string
        if(!req.body.Applicant_ID) {
            const existingUser = await getScreeningFormByEmail(req.body.email)
            console.log("existingUser: ", existingUser)
            if(!existingUser){
                return res.json({
                    messages: {
                        code: 1,
                        message: "Cannot find email"
                    }
                }).status(400)
            }
            else Appilicant_ID = existingUser.Applicant_ID
        } else Appilicant_ID = req.body.Applicant_ID

        const existingUser = await getScreeningFormByApplicantID(Appilicant_ID)
        if(!existingUser){
            return res.json({
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

        if(existingUser.userType === "Donor"){
            const registeredUser = await getDonorById(existingUser.Applicant_ID)
            if(!registeredUser) await createDonor(newUser);
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
                await updateDonorPassword(existingUser.Applicant_ID, newUser.password, salt) // set new Password
                console.log("Password updated")
            } 
        } else{
            const registeredUser = await getRequestorById(existingUser.Applicant_ID)
            if(!registeredUser) await createRequestor(newUser);
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

                const result = await updateRequestorPassword(existingUser.Applicant_ID, newUser.password, salt) // set new Password
                console.log("Password updated")
                return res.status(200).json({
                    messages: {
                        code: 0,
                        messages: "Log in Successfully"
                    }
                })
            }
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

