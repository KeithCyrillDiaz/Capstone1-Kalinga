import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

export const getCompletedRequests = async (req: Request, res: Response) => {
  try {
    const { Requestor_ID } = req.params; // Assuming Requestor_ID is passed in URL params

    const CompleteRequests = await RequestModel.find({
      RequestStatus: "Complete",
      Requestor_ID: Requestor_ID // Assuming Requestor_ID is a valid field in your document
    });


    if (!CompleteRequests || CompleteRequests.length === 0) {
      return res.status(404).json({ 
        messages: {
          success: false, 
        },
        error: 'No pending requests found' });
    }

    return res.status(200).json({ 
      messages: {
        success: true
      },
      RequestData: CompleteRequests });
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return res.status(500).json({ 
      messages: {
        success: false,
      },
         error: 'Error fetching pending requests' });
  }
};
