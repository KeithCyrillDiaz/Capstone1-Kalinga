import express from 'express'
import { getScreeningFormByUserType, getScreeningFormByApplicantID } from '../../../models/ApplyAsDonor'


export const getScreeningFormsUserType = async (req: express.Request, res: express.Response) => {
    try {

        const screeningForms = await getScreeningFormByUserType(req.params.userType)
        res.status(200).json({
            messages: {
                code: 0,
                message: "Retrieve Sucessfully"
            },
             screeningForms 
            });
    } catch (error) {
        return error
    }
}

export const getScreeningFormApplicantID = async (req: express.Request, res: express.Response) => {
    
    try{
        const screeningForm = await getScreeningFormByApplicantID(req.params.Applicant_ID)
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Screening Form Retrieve"
            },
            screeningForm
        })

    } catch (error){

    }

}