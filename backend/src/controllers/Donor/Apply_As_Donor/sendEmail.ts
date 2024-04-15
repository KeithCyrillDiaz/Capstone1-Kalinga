import express from "express"
import nodemailer from 'nodemailer';
import randomatic from "randomatic";
import moment from 'moment';
import { getScreeningFormByApplicantID } from "../../../models/ApplyAsDonor";
import { createCode, getCodeByCode } from "../../../models/Authentication";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NM_EMAIL, // Sender email address
      pass: process.env.NM_PASS // Sender email password or app-specific password
    }
  });




export const sendEmail = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.Applicant_ID)
        console.log(process.env.NM_EMAIL)
        console.log(process.env.NM_PASS)

        const existingUser = await getScreeningFormByApplicantID(req.params.Applicant_ID)
            if(!existingUser ){
                return res.status(400).json({
                    messages: {
                        code: 1,
                        message: "None Existant Applicant"
                    }
                })
            }

            if(!existingUser.email || existingUser.email === ""){
                return res.status(400).json({
                    messages: {
                        code: 1,
                        message: "No Email"
                    }
                })
            }
        const verificationCode = randomatic('0', 6)

        const newCode = await createCode({
            code: verificationCode,
            expiresAt: moment().add(4, 'hours').toDate()
        })

       const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: existingUser.email,
            subject: "Email Verification from Kalinga",
            html:
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 20px;
                        line-height: 1.6;
                    }
                    .button {
                        display: inline-block;
                        background-color: #E60965;
                        color: #fff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Our Service!</h2>
                    <p>Hi there,</p>
                    <p>Thank you for signing up for our service. To complete your registration, please use the following verification code:</p>
                    <p style="font-size: 18px; font-weight: bold;">Verification Code: ${verificationCode}</p>
                    <p>Once you have the code, click the button below to verify your email address:</p>
                    <a href="{{verification_link}}" class="button">Complete Registration</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <div class="footer">
                        <p>Best Regards,</p>
                        <p>Kalinga Team</p>
                    </div>
                </div>
            </body>
            </html>`
        })
 
        
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Email Sent Successfully"
            },
            verificationCode,
            newCode
        })

    } catch (error){
        return res.status(400).json({
            messages: {
                code: 1,
                message: error
            },
            
        })
    }
}


export const checkCode = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.params.Code)

        const verificationCode = await getCodeByCode(req.params.Code)
        if(!verificationCode) {
            return res.status(401).json({
                messages: {
                    code: 1,
                    message: "Ïnvalid Code"
                }
            })
        }

        return res.status(202).json({
            messages: {
                code: 0,
                message: "Valid Code"
            }
        })
       
    } catch(error){
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}

export const sendApprovedEmail = async (req: express.Request, res: express.Response) => {
    try{
            console.log(req.params)

            const existingUser = await getScreeningFormByApplicantID(req.params.Applicant_ID)
            if(!existingUser){
                return res.status(400).json({
                    messages: {
                        code: 1,
                        message: "None Existant Applicant"
                    }
                })
            }

            if(!existingUser.email || existingUser.email === ""){
                return res.status(400).json({
                    messages: {
                        code: 1,
                        message: "User has No Email"
                    }
                })
            }
            let userType: string;
            let duty: string
            if(existingUser.userType === "Donor"){
                userType = "donor"
                duty = "donating"
            } else{
                userType = "requestor"
                duty = "requesting"
            }
            const setPasswordURL = "Kalinga://verification-result?success=true"
            const result = await transporter.sendMail({
                from: process.env.NM_EMAIL,
                to: existingUser.email,
                subject: `${existingUser.userType} Application Approval Notification`,
                html:
                `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Donor Approval Notification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .button {
                            display: inline-block;
                            background-color: #E60965;
                            color: #fff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>${existingUser.userType} Approval Notification</h2>
                        <p>Congratulations! You have been approved as a ${userType}.</p>
                        <p>With your approval, you can now start ${duty} breast milk through MilkBanks.</p>
                        <p>Thank you for joining us in our mission.</p>
                        <p>To complete your registration, please set your password by clicking the button below:</p>
                        <a href="Kalinga://verification-result?success=true" class="button">Set Password</a>
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>Kalinga Team</p>
                        </div>
                    </div>
                    
                </body>
                </html>`
            })

            

            return res.status(200).json({
                messages: {
                    code: 0,
                    message: "Email Sent Successfully"
                },
                result
            })

    } catch(error){
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        })
    }
}

export const sendDeclinedEmail = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.params)
        const existingUser = await getScreeningFormByApplicantID(req.params.Applicant_ID)
        if(!existingUser){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "None Existant Applicant"
                }
            })
        }

        if(!existingUser.email || existingUser.email === ""){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "User has No Email"
                }
            })
        }

        let userType: string;
        let duty: string
        if(existingUser.userType === "Donor"){
            userType = "donor"
            duty = "donating"
        } else{
            userType = "requestor"
            duty = "requesting"
        }

        const setPasswordURL = "Kalinga://verification-result?success=true"
        const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: existingUser.email,
            subject: `${existingUser.userType} Application Rejection Notification`,
            html:
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Donor Rejection Notification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                    }
                    h2 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 20px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #E60965;
                        color: #fff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>${existingUser.userType} Rejection Notification</h2>
                    <p>We regret to inform you that your application as a ${existingUser.userType} has been rejected.</p>
                    <p>We appreciate your interest in joining our mission, but unfortunately, we are unable to approve your application at this time.</p>
                    <p>If you have any questions or concerns regarding this decision, please feel free to contact us.</p>
                    <p>Thank you for your understanding.</p>
                    <a href="${process.env.NM_EMAIL}" class="button">Contact Us</a>
                    <div class="footer">
                        <p>Best Regards,</p>
                        <p>Kalinga Team</p>
                    </div>
                </div>
               
            </body>
            </html>`
        })

        return res.status(200).json({
            messages: {
                code: 0,
                message: "Email Sent Successfully"
            }
        })

} catch(error){
    return res.status(500).json({
        messages: {
            code: 1,
            message: "Internal Server Error"
        },
        error
    })
}

}

