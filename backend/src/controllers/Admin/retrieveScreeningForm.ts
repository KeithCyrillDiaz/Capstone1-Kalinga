import express from 'express'
import { isDeleteScreeningForm } from '../../models/ApplyAsDonor'
export const retrieveSoftDeletedForm = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.params.Applicant_ID)
        const retrieveScreeningForm = await isDeleteScreeningForm(req.params.Applicant_ID, "notDeleted")
        console.log("result: ",retrieveScreeningForm)
        if(!retrieveScreeningForm){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "None Existing User"
                }
            })
        }

        return res.status(200).json({
            messages: {
                code: 0,
                messages: "Retrieved Applicant Successfully"
            },
            retrieveScreeningForm
        })

    } catch(error) {

    }
    
}