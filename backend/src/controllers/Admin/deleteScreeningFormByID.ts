import express from 'express'
import { isDeleteScreeningForm, updateIsApprovedScreeningForm  } from '../../models/ApplyAsDonor'

export const deleteScreeningForm = async (req: express.Request, res: express.Response) => {
    try{    

        const {status} = req.body
        console.log("status: ", status)

        const body = req.body.status
        let updateScreeningForm;
        if(body === "Declined"){
            updateScreeningForm = await updateIsApprovedScreeningForm (req.params.Applicant_ID, "No")
        } else  updateScreeningForm = await updateIsApprovedScreeningForm (req.params.Applicant_ID, "Yes")
       
        if(!updateScreeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Exisiting Applicant"
                }
            }).status(400)
        }
        const screeningForm = await isDeleteScreeningForm(req.params.Applicant_ID, "Deleted")
        console.log("None existing applicant")
        if(!screeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Existing Applicant"
                }
            }).status(400)
        }

        if((updateScreeningForm.isApproved !== "Yes" && updateScreeningForm.isApproved !== "No" ) || screeningForm.isDeleted !== "Deleted"){
            console.log("Failed to update Applicant Form")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update Applicant Form"
                }
            }).status(400)
        }
        if(updateScreeningForm.isApproved !== "Yes"){
            console.log("Declined and Delete Applicant Successfully")
        } else console.log("Approved and Delete Applicant Successfully")
        
        return res.json({
            messages: {
                code: 0,
                message: " Delete Applicant Successfully"
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