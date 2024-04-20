import express from 'express'
import { isDeleteScreeningForm, approvedScreeningForm } from '../../models/ApplyAsDonor'

export const deleteScreeningForm = async (req: express.Request, res: express.Response) => {
    try{

        console.log(req.params.Applicant_ID)
        const updateScreeningForm = await approvedScreeningForm(req.params.Applicant_ID, "Yes")
        if(!updateScreeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Exisiting Applicant"
                }
            }).status(400)
        }
        const screeningForm = await isDeleteScreeningForm(req.params.Applicant_ID, "Deleted")
        if(!screeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Existing Applicant"
                }
            }).status(400)
        }

        if(updateScreeningForm.isApproved !== "Yes" || screeningForm.isDeleted !== "Deleted"){
            console.log("Failed to update Applicant Form")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update Applicant Form"
                }
            }).status(400)
        }
        console.log("Approved and Delete Applicant Successfully")
        return res.json({
            messages: {
                code: 0,
                message: "Approved and Delete Applicant Successfully"
            },
            screeningForm
        }).status(200)

    } catch (error) {
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}