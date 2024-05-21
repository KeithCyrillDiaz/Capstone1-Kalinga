import { RequestorModel, DonorModel } from '../../../models/users';
import { Router, Request, Response } from 'express';

export const getTotalUsersPerBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRequestorsPerBarangay = await RequestorModel.aggregate([
      {
        $group: {
          _id: '$barangay',
          totalRequestors: { $sum: 1 }
        }
      }
    ]);

    const totalDonorsPerBarangay = await DonorModel.aggregate([
      {
        $group: {
          _id: '$barangay',
          totalDonors: { $sum: 1 }
        }
      }
    ]);

    res.json({ totalRequestorsPerBarangay, totalDonorsPerBarangay });
  } catch (error) {
    throw new Error('Error fetching total users per barangay');
  }
};
