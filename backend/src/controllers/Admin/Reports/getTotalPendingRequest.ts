import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const getTotalPendingRequest = async (req: Request, res: Response): Promise<void> => {
    try {
    const pendingCount = await RequestModel.countDocuments({ RequestStatus: 'Pending' });
    res.status(200).json({ totalPendingRequest: pendingCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending appointments count', error });
  }
};