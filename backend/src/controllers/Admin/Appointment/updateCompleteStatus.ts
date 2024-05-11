import express, { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const updateCompleteStatus = async (req: Request, res: Response): Promise<void> => {
  const { RequestID } = req.params;
  const { RequestStatus } = req.body;
  
  try {
    const request = await RequestModel.findOneAndUpdate(
      {RequestID: RequestID }, 
      { $set: {RequestStatus: RequestStatus} }, 
      { new: true }
    );

    console.log('Request_ID', RequestID );
    console.log('Request Status', RequestStatus);

    if (!request) {
       res.status(404).json({ error: 'Request not found' });
       return; // Add return statement to exit the function after sending response
    }
    console.log('Donation status updated successfully')

    res.json({ message: 'Donation status updated successfully', request });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { updateCompleteStatus };
