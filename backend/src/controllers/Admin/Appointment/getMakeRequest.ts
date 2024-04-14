import express from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const getRequestByID = async (req: express.Request, res: express.Response) => {
  try {
    console.log ("endpoint", req.params)
    const Request = await RequestModel.findOne({RequestID: req.params.RequestID});

    console.log("form", Request);
    res.json({ Request });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

