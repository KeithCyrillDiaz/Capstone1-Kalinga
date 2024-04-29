import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

export const getPendingRequests = async (req: Request, res: Response) => {
  try {
    const { Requestor_ID } = req.params; // Assuming Requestor_ID is passed in URL params

    const pendingRequests = await RequestModel.find({
      RequestStatus: "Pending",
      Requestor_ID: Requestor_ID // Assuming Requestor_ID is a valid field in your document
    });

    console.log('Pending Requests:', pendingRequests); // Check the fetched data

    if (!pendingRequests || pendingRequests.length === 0) {
      return res.status(404).json({ success: false, error: 'No pending requests found' });
    }

    res.status(200).json({ success: true, RequestData: pendingRequests });
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ success: false, error: 'Error fetching pending requests' });
  }
};
