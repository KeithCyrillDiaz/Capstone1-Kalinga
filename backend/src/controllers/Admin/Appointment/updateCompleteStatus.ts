import express, { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const updateCompleteStatus = async (req: Request, res: Response): Promise<void> => {
  const { Requestor_ID } = req.params;
  const { RequestStatus } = req.body;

  try {
    const request = await RequestModel.findOneAndUpdate(
      { Requestor_ID: Requestor_ID }, 
      { RequestStatus: RequestStatus }, 
      { new: true }
    );

    console.log('Requestor_ID', Requestor_ID);
    console.log('Request Status', RequestStatus);

    if (!request) {
       res.status(404).json({ error: 'Request not found' });
       return; // Add return statement to exit the function after sending response
    }

    res.json({ message: 'Donation status updated successfully', request });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { updateCompleteStatus };
