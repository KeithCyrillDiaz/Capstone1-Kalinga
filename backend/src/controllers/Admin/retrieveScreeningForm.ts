import express from 'express'
import { isDeleteScreeningForm } from '../../models/ApplyAsDonor'
export const retrieveSoftDeletedForm = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.params.Applicant_ID)
        const retrieveScreeningForm = await isDeleteScreeningForm(req.params.Applicant_ID, "notDeleted")
        if(!retrieveScreeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Existing User"
                }
            }).status(400)
        }
        if(retrieveScreeningForm.isDeleted === "Deleted"){
            console.log("Failed to update Applicant Form")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update Applicant Form"
                }
            }).status(400)
        }
        console.log("Retrieved Applicant Successfully")
        return res.json({
            messages: {
                code: 0,
                messages: "Retrieved Applicant Successfully"
            },
            retrieveScreeningForm
        }).status(200)

    } catch(error) {

    }
    
}