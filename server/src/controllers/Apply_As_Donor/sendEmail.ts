import express from "express"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NM_EMAIL, // Sender email address
      pass: process.env.NM_PASS // Sender email password or app-specific password
    }
  });

export const sendEmail = async (req: express.Request, res: express.Response) => {
    try{

       const result = await transporter.sendMail({
            from: process.env.NM_EMAIL,
            to: req.body.email,
            subject: "Test Email",
            html:
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body>
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Welcome to Our Service!</h2>
                    <p>To complete your registration, please click the button below to verify your email address:</p>
                    <a href="{{verification_link}}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>Thanks,<br> 
                    Your Service Team</p>
                </div>
            </body>
            </html>`
        })
        
        return res.status(200).json({
            messages: {
                code: 0,
                message: "email Sent"
            },
            result,
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