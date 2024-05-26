import { Request, Response } from 'express';
import { DonorModel, RequestorModel } from '../../../models/users';

// Function to get total donors per month
export const getTotalDonorsPerMonth = async (req: Request, res: Response): Promise<void> => {
    const { year, month } = req.query;

    if (!year || !month) {
        res.status(400).json({ message: 'Year and month are required parameters' });
        return;
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    try {
        const count = await DonorModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        res.status(200).json({ totalDonors: count });
    } catch (error) {
        console.error('Error fetching total donors:', error);
        res.status(500).json({ message: 'Failed to fetch total donors' });
    }
};

// Function to get total requestors per month
export const getTotalRequestorsPerMonth = async (req: Request, res: Response): Promise<void> => {
    const { year, month } = req.query;

    if (!year || !month) {
        res.status(400).json({ message: 'Year and month are required parameters' });
        return;
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    try {
        const count = await RequestorModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        res.status(200).json({ totalRequestors: count });
    } catch (error) {
        console.error('Error fetching total requestors:', error);
        res.status(500).json({ message: 'Failed to fetch total requestors' });
    }
};