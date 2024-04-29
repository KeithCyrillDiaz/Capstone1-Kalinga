// Import necessary modules
import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

// Controller function to fetch request status
export const getRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all requests from the database using Mongoose
    const requests = await RequestModel.find();

    // Check if any requests exist
    if (!requests || requests.length === 0) {
      res.status(404).json({ error: 'No requests found' });
      return;
    }

    // For simplicity, let's assume we want the first request's status
    const requestStatus = requests[0].RequestStatus;

    // Extract and send the RequestStatus in the response
    res.status(200).json({ RequestStatus: requestStatus });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
export default getRequestStatus;
