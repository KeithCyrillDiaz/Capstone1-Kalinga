import express from 'express'

import {getScreeningFormByApplicantID} from '../../../models/ApplyAsDonor'

export const getScreeningFormByID = async (req: express.Request, res: express.Response) => {
  try {
    const screeningForms = await getScreeningFormByApplicantID( req.params.Applicant_ID  );
    console.log("form", screeningForms)
    res.json({ screeningForms });
  } catch (error) {
    console.error('Error fetching screening forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


