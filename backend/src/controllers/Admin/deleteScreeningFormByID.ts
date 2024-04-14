import express from 'express'
import { isDeleteScreeningForm } from '../../models/ApplyAsDonor'

export const deleteScreeningForm = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.Applicant_ID)
        const screeningForm = await isDeleteScreeningForm(req.params.Applicant_ID, "Deleted")
        console.log("result: ",screeningForm)
        if(!screeningForm){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "None Existing Applicant"
                }
            })
        }

        return res.status(200).json({
            messages: {
                code: 0,
                message: "Delete Applicant Successfully"
            },
            screeningForm
        })

    } catch (error) {

    }
}