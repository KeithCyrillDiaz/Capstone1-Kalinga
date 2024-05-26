import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const getTotalRequestsPerMonthAndYear = async (req: Request, res: Response): Promise<void> => {
    const { year, month } = req.query;

    if (!year || !month) {
        res.status(400).json({ message: 'Year and month are required parameters' });
        return;
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    try {
        const count = await RequestModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        res.status(200).json({ totalRequests: count });
    } catch (error) {
        console.error('Error fetching total requests:', error);
        res.status(500).json({ message: 'Failed to fetch total requests' });
    }
};
