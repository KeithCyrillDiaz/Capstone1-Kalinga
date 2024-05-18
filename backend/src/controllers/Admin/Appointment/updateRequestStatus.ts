import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { RequestID } = req.params;
  const { RequestStatus } = req.body; 
  console.log('RequestID:', RequestID);
  console.log('RequestStatus:', RequestStatus);

  try {
    const updatedRequest = await RequestModel.findOneAndUpdate(
      { RequestID: RequestID },
      { $set: { RequestStatus: RequestStatus } }, 
      { new: true }
    );

    console.log('Updated Request:', updatedRequest);

    if (!updatedRequest) {
      console.log('Request not found');
       res.status(404).json({ message: 'Request not found' });
       return
    }

    console.log('Request status updated successfully');
    res.json({ message: 'Request status updated successfully', request: updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { updateRequestStatus };
