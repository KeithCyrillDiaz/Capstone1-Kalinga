import express from "express"
import nodemailer from 'nodemailer';
import randomatic from "randomatic";
import moment from 'moment';
import { getScreeningFormByApplicantID } from "../../models/ApplyAsDonor";
import { createCode, createPassCode} from "../../models/Authentication";
import { getDonorByEmail, getRequestorByEmail } from "../../models/users";
import { random } from "helpers/passwordEncryption";
import AppointmentModel from "../../models/Donor/DonorSetAppointmentModel";
import RequestModel from "../../models/Requestor/RequestorRequestModel";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NM_EMAIL, // Sender email address
      pass: process.env.NM_PASS // Sender email password or app-specific password
    }
  });

  export const sendEmailVerifCode = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.email)
        console.log(process.env.NM_EMAIL)
        const { email } = req.params

        const verificationCode = randomatic('0', 6)

        const newCode = await createCode({
            code: verificationCode,
            expiresAt: moment().add(4, 'hours').toDate()
        })

        const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: email,
            subject: "Change Email Verification from Kalinga",
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
                    <h2>Change Email Verification</h2>
                    <p>Dear User,</p>
                    <p style="font-size: 18px; font-weight: bold;">Your verification code to change your email is: ${verificationCode}</p>
                    <p>Kindly enter the verification code in the designated field to complete the email change process:</p>
                    <a href="Kalinga://" class="button">Verify Email</a>
                    <p>If you did not initiate this change, please disregard this email.</p>
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




export const sendEmail = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.Applicant_ID)
        console.log(process.env.NM_EMAIL)

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


export const sendBlockedEmail = async (req: express.Request, res: express.Response) => {
    try{

        const { email, userType, status } = req.body

        const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: email,
            subject: status === "Yes" ? "Your Account Has Been Blocked" : "Your Account Is Now Unblocked",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Notification</title>
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
                        transition-duration: 0.3s;
                        border: none;
                    }
                    .button:hover {
                        cursor: pointer;
                        background-color: #c10756;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hi there,</p>
                    <p>${status === "Yes" 
                        ? "Unfortunately, your account has been blocked by the admin due to violations. If you have any questions, please contact us by clicking the button below." 
                        : "Good news! Your account has been unblocked, and you now have access to all features of the Kalinga app. If you have any questions or concerns, please contact us by clicking the button below."}</p>
                    <a href="mailto:no.reply.kalingabreastmilkapp@gmail.com" target="_blank">
                        <button class="button">Contact Us</button>
                    </a>
                    <div class="footer">
                        <p>Best Regards,</p>
                        <p>Kalinga Team</p>
                    </div>
                </div>
            </body>
            </html>
            `
          });
        console.log("Email Sent Successfully")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Email Sent Successfully"
            },
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
                        .highlight {
                            font-size: 18px;
                            font-weight: bold;
                            color: #E60965; /* Highlight color */
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>${existingUser.userType} Approval Notification</h2>
                        <p>Congratulations! You have been approved as a ${userType}.</p>
                        <p style="font-size: 18px; font-weight: bold;">ApplicantID: <a href="kalinga://app"> ${existingUser.Applicant_ID}</a> </p>
                        <p>With your approval, you can now start ${duty} breast milk through MilkBanks.</p>
                        <p>Thank you for joining us in our mission.</p>
                        <p>To complete your registration, please input your Applicant ID and set your password by clicking the button below:</p>
                        <a href="kalinga://setPassword" class="button">Set Password</a>
                        <p><span style="font-size: 18px; font-weight: bold;" >NOTE:</span> If button did not work, kindly restart the Kalinga app instead. Thank you </p>
                      
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>Kalinga Team</p>
                        </div>
                    </div>
                </body>
                </html>`
            })

            
            console.log("Email Sent Successfully")
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
        const { reason } = req.body
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
                    <title>Application Rejection Notification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            padding: 20px;
                            border: 1px solid #e0e0e0;
                            border-radius: 10px;
                            background-color: #ffffff;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        h2 {
                            color: #333;
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        p {
                            margin-bottom: 20px;
                            color: #555;
                            font-size: 16px;
                        }
                        .reason {
                            color: #e60965;
                            font-weight: bold;
                        }
                        .button {
                            display: inline-block;
                            background-color: #e60965;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-size: 16px;
                            margin-top: 20px;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 14px;
                            color: #999;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>${existingUser.userType} Application Rejection</h2>
                        <p>Dear ${existingUser.fullName},</p>
                        <p>We regret to inform you that your application to become a ${existingUser.userType} has been rejected for the following reason:</p>
                        <p class="reason">"${reason}"</p>
                        <p>We appreciate your interest in joining our mission. However, your application did not meet our current requirements.</p>
                        <p>If you have any questions or need further clarification regarding this decision, please don't hesitate to contact us. We are here to help you.</p>
                        <p>Thank you for your understanding.</p>
                        <a href="mailto:${process.env.NM_EMAIL}" class="button">Contact Us</a>
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>The Kalinga Team</p>
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

export const sendCode = async(req: express.Request, res: express.Response) => {
    try {
        const  receivedEmail = req.params.email
        console.log("req.params.email: ", req.params.email)
        if(!receivedEmail){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Email"
                }
            })
        }
        const requestor = await getRequestorByEmail(receivedEmail)
        const donor = await getDonorByEmail(receivedEmail)
        console.log("donor", donor)
        if(!requestor && !donor){
            return res.json({
                messages: {
                    code: 1,
                    message: "Email Not Found"
                }
            }).status(400)
        }

        let email: string;
        if(!requestor){
            email = donor.email
        } else{
            email = requestor.email
        }
     
        console.log("email: ", email)
        const passCode = {
            passCode: randomatic('0', 6),
            expiresAt: moment().add(7, 'minutes').toDate()
        }
        console.log(passCode)
        await createPassCode(passCode)
        const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: email,
            subject: `Reset Password Verification Code`,
            html:
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Password Verification Code</title>
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
                    <h2>Reset Password Verification Code</h2>
                    <p>You have requested to reset your password. Please use the following verification code:</p>
                    <p style="font-size: 24px; font-weight: bold;">${passCode.passCode}</p>
                    <p>This code will expire in 7 minutes. If you did not request this change, please ignore this email.</p>
                    <p>If you have any questions or concerns, please feel free to contact us.</p>
                    <a href="mailto: ${process.env.NM_EMAIL}" class="button">Contact Us</a>
                    <div class="footer">
                        <p>Best Regards,</p>
                        <p>Kalinga's Team</p>
                    </div>
                </div>
            </body>
            </html>`
        })
//
//Kalinga://SetPassword
        return res.json({
            messages: {
                code: 0,
                message: "Verification Email Sent Successfully"
            }
        }).status(200)
        

    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: error
            },
        })
    }
}


export const sendApprovedAppointmentEmail = async (req: express.Request, res: express.Response) => {

    try {
        
        const { id } = req.params
       

        if(!id){
            console.log("No Id")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }
        console.log("id: ", id)
        const existingUser = await getScreeningFormByApplicantID(id);
        if (!existingUser) {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Non-existent Applicant",
                },
            });
        }

        if (!existingUser.email || existingUser.email === "") {
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "User has No Email",
                },
            });
        }

        console.log("id: ",id)
        const type = existingUser.userType
        const appointment = type === "Donor" ? await AppointmentModel.findOne({Donor_ID: id, DonationStatus: "Ongoing"}) : null
        const request = type === "Requestor" ? await RequestModel.findOne({Requestor_ID: id, RequestStatus: "Ongoing"}) : null
        console.log( "appointment: ", appointment)
        if (!appointment && !request) {
            console.log("Appointment or Request Not Found");
            return res.json({
                messages: {
                    code: 1,
                    message: "Not Found"
                }
            }).status(404);
        }
        let updateEmail: any
        if(appointment) {
            if(appointment.emailAddress !== existingUser.email){
                console.log("Updating Email")
                updateEmail = await AppointmentModel.updateMany({Donor_ID: id}, {$set: {emailAddress: existingUser.email}})
            }
        } else {
            if(request.emailAddress !== existingUser.email){
                console.log("Updating Email")
                updateEmail = await RequestModel.updateMany({Requestor_ID: id}, {$set: {emailAddress: existingUser.email}})
            }
        }
        console.log("Updated Email: ", updateEmail)
        if(!updateEmail)console.log("Email is up to date")
            else console.log("Updated Email Successfully")

    

        const appointmentDate = type === "Donor" ? appointment.selectedDate : null
        const appointmentTime = type === "Donor" ? appointment.selectedTime : null
        const requestDate = type === "Requestor" ? request.Date: null
        const requestTime = type === "Requestor" ? request.Time: null

        const date = type === "Donor" ? appointmentDate : requestDate
        const time = type === "Donor" ? appointmentTime : requestTime
        
        // time:2024-06-03T19:54:06.997Z
        // Date: 2024-06-03T19:54:06.997Z

        const formattedDate = new Date(date).toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          });
          
          const dateObj = new Date(time);
          const hours = dateObj.getUTCHours();
          const minutes = dateObj.getUTCMinutes();
          const ampm = hours >= 12 ? 'pm' : 'am';
          const formattedHours = hours % 12 || 12;
          const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
          const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;

        const location = type === "Donor" ? appointment.location : request.milkBank
        console.log("date: ", formattedDate)
        console.log("time: ", formattedTime)
        
        const userType = existingUser.userType === "Donor" ? "donor" : "requestor";
        const duty = existingUser.userType === "Donor" ? "donating" : "requesting";
        const duty2 = existingUser.userType === "Donor" ? "donation" : "obtaining";
        const setPasswordURL = "Kalinga://verification-result?success=true";

        const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: existingUser.email,
            subject: "Appointment Approval Notification",
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Appointment Approval Notification</title>
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
                        .highlight {
                            font-size: 18px;
                            font-weight: bold;
                            color: #E60965;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Appointment Approved</h2>
                        <p>Dear ${existingUser.fullName},</p>
                        <p>We are pleased to inform you that your appointment for ${duty} milk has been approved. Please proceed to your chosen milk bank location at the designated date and time to begin the ${duty2} process.</p>
                        <p>Details of your appointment:</p>
                        <p>
                        <span class="highlight">Milk Bank Location:</span> ${location}<br>
                        <span class="highlight">Date:</span> ${formattedDate}<br>
                        <span class="highlight">Time:</span> ${formattedTime}
                        </p>
                        <p>Thank you for your generous contribution. Your support is invaluable to us and helps save lives.</p>
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>The Kalinga Team</p>
                        </div>
                    </div>
                </body>
                </html>`,
        });

        console.log("Email Sent Successfully");
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Email Sent Successfully",
            },
            result,
        });
    } catch (error) {
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error",
            },
            error,
        });
    }
};