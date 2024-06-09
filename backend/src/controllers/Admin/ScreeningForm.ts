import express from 'express'
import { screeningFormModel } from '../../models/ApplyAsDonor'

export const getScreeningFormByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body

        if(!email) {
            console.log ("Bad Request - getScreeningFormByEmail")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }

        const screeningForm = await screeningFormModel.findOne({email: email})

        if(!screeningForm){
            console.log ("Not Found Screening Form - getScreeningFormByEmail")
            return res.status(404).json({
                messages: {
                    code: 1,
                    message: "Not Found Screening Form"
                }
            })
        }

        console.log ("Successfully Retrieved Screening Form")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Successfully Retrieved Screening Form"
            },
            screeningForm
        })
    } catch (error) {
        console.log("Internal Server Error - getScreeningFormByEmail")
        return res.status(500).json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            }
        })
    }
}