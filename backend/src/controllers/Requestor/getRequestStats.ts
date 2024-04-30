import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

// Controller function to get total milk amount and total completed requests for a user
export const getRequestStats = async (req: Request, res: Response) => {
  console.log(req.params); // Log request parameters

  const { Requestor_ID } = req.params;

  try {
    // Calculate total milk requested
    const totalMilkRequestedResult = await RequestModel.aggregate([
      {
        $match: {
          Requestor_ID: Requestor_ID,
        },
      },
      {
        $group: {
          _id: '$Requestor_ID',
          totalMilkRequested: { $sum: { $toInt: '$milkAmount' } },
        },
      },
    ]);

    // Count completed requests
    const completedRequestsCount = await RequestModel.countDocuments({
      Requestor_ID: Requestor_ID,
      RequestStatus: 'Complete',
    });

    // Extract the total milk requested and completed requests count from the aggregation result
    const totalMilkRequested = totalMilkRequestedResult.length > 0 ? totalMilkRequestedResult[0].totalMilkRequested : 0;

    res.json({ totalMilkRequested, completedRequestsCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

