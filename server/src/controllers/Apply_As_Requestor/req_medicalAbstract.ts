import express from 'express';
import { createReqMedAbstract } from '../../models/req_medicalAbstractDB';

export const reqMedAbstractForm = async (req: express.Request, res: express.Response) => {
    try {
        const { 
            Applicant_ID,
            clinicalHistory,
            complaint,
            clinicalFindings,
            diagnosis,
            treatment
        } = req.body;

        if (!Applicant_ID || !clinicalHistory || 
            !complaint || 
            !clinicalFindings || 
            !diagnosis || 
            !treatment) {
            return res.sendStatus(400);
        }

        const medAbstract = await createReqMedAbstract({
            Applicant_ID,
            clinicalHistory,
            complaint,
            clinicalFindings,
            diagnosis,
            treatment
        });

        const message = {
            code: 0, 
            message: 'Requestor Registered'
        };

        return res.status(200). json({message, medAbstract}) .end();

    } catch (error) {
        console.log("Error")
        console.log(error)
        return res.sendStatus(400)
    }

} 
