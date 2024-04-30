import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

// Controller function to get total milk amount and total completed requests for a user
export const getDonorStats = async (req: Request, res: Response) => {
  console.log(req.params); // Log request parameters

  const { Donor_ID } = req.params;

  try {
    // Calculate total milk requested
    const totalMilkRequestedResult = await AppointmentModel.aggregate([
      {
        $match: {
            Donor_ID: Donor_ID,
        },
      },
      {
        $group: {
          _id: '$Donor_ID',
          totalMilkRequested: { $sum: { $toInt: '$milkAmount' } },
        },
      },
    ]);

    // Count completed requests
    const completedRequestsCount = await AppointmentModel.countDocuments({
        Donor_ID: Donor_ID,
      DonationStatus: 'Complete',
    });

    // Extract the total milk requested and completed requests count from the aggregation result
    const totalMilkRequested = totalMilkRequestedResult.length > 0 ? totalMilkRequestedResult[0].totalMilkRequested : 0;

    res.json({ totalMilkRequested, completedRequestsCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

