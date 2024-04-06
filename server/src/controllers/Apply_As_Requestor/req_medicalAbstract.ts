import express from 'express';
import { createReqMedAbstract } from '../../db/req_medicalAbstractDB';

export const reqMedAbstractForm = async (req: express.Request, res: express.Response) => {
    try {
        const { 
            clinicalHistory,
            complaint,
            clinicalFindings,
            diagnosis,
            treatment
        } = req.body;

        console.log("req.body: ", req.body)
        if (!clinicalHistory || 
            !complaint || 
            !clinicalFindings || 
            !diagnosis || 
            !treatment) {
            return res.sendStatus(400);
        }

        const medAbstract = await createReqMedAbstract({
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
