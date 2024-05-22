import express from 'express'

import {getScreeningFormByApplicantID} from '../../../../models/ApplyAsDonor'

export const getScreeningFormByID = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.params.Applicant_ID)
    const screeningForms = await getScreeningFormByApplicantID(req.params.Applicant_ID);
    return res.status(200).json({ 
      messages: {
        code: 0,
        message: "Screening Form Retrieved"
      }, 
      screeningForms 
    });
  } catch (error) {
    console.error('Error fetching screening forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


