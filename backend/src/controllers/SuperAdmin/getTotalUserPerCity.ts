import { Router, Request, Response } from 'express';
import { DonorModel, RequestorModel } from '../../models/users';

const router: Router = Router();

// Route to get total donors and requestors per city
export const getTotalUsersPerCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const donorsPerCity = await DonorModel.aggregate([
      { $group: { _id: "$municipality", totalDonors: { $sum: 1 } } }
    ]);

    const requestorsPerCity = await RequestorModel.aggregate([
      { $group: { _id: "$municipality", totalRequestors: { $sum: 1 } } }
    ]);

    const totalUsersPerCity = donorsPerCity.map((donorCity) => {
      const requestorCity = requestorsPerCity.find(requestor => requestor._id === donorCity._id);
      return {
        city: donorCity._id || 'Unknown', // Use 'Unknown' if city is null or undefined
        totalDonors: donorCity.totalDonors,
        totalRequestors: requestorCity ? requestorCity.totalRequestors : 0
      };
    });

    res.json(totalUsersPerCity);
  } catch (error) {
    console.error('Error fetching total users per city:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default router;
