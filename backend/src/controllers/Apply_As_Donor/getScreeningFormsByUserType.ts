import express from 'express'
import { getScreeningFormByApplicantID, getScreeningFormByUserType } from '../../models/ApplyAsDonor';


export const getScreeningFormsByUserType = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.params.userType)
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