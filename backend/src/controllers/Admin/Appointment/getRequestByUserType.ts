import express from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const getRequestByUserType = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.params.userType);
    const request = await RequestModel.find({ userType: req.params.userType });
    res.status(200).json({
      messages: {
        code: 0,
        message: 'Retrieve Successfully'
      },
      request 
    });
    
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 