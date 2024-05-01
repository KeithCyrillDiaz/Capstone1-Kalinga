import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';


// Controller function to get the total of requests with status "Complete"
export const getCompleteRequestsTotal = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalCompleteRequests = await RequestModel.countDocuments({ RequestStatus: 'Complete' });
    res.status(200).json({ totalCompleteRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get the total of requests with status "Decline"
export const getDeclinedRequestsTotal = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalDeclinedRequests = await RequestModel.countDocuments({ RequestStatus: 'Decline' });
    res.status(200).json({ totalDeclinedRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
