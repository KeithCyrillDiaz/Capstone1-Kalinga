import { Router, Request, Response } from 'express';
import { DonorModel } from '../../models/users';
import {RequestorModel} from '../../models/users'; 

const router: Router = Router();

// Route to get total donors
export const getTotalDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalDonors: number = await DonorModel.distinct('Donor_ID').countDocuments();
    res.json({ totalDonors });
  } catch (error) {
    console.error('Error fetching total donors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to get total requestors
export const getTotalRequestor = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRequestors: number = await RequestorModel.distinct('Requestor_ID').countDocuments();
    res.json({ totalRequestors });
  } catch (error) {
    console.error('Error fetching total requestors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTotalUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalDonors: number = await DonorModel.distinct('Donor_ID').countDocuments();
    const totalRequestors: number = await RequestorModel.distinct('Requestor_ID').countDocuments();
    const totalUsers = totalDonors + totalRequestors;
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
