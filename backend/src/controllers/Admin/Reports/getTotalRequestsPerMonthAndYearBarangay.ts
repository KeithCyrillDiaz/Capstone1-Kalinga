import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const getTotalRequestsPerMonthAndYearBarangay = async (req: Request, res: Response): Promise<void> => {
    const { selectedYear, selectedMonth, selectedBarangay } = req.query;

    if (!selectedYear || !selectedMonth || !selectedBarangay) {
        res.status(400).json({ message: 'selectedYear, selectedMonth, and selectedBarangay are required parameters' });
        return;
    }

    const startDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);
    const endDate = new Date(Number(selectedYear), Number(selectedMonth), 0, 23, 59, 59, 999);

    try {
        const count = await RequestModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
            barangay: selectedBarangay
        });
        res.status(200).json({ totalRequests: count });
    } catch (error) {
        console.error('Error fetching total requests:', error);
        res.status(500).json({ message: 'Failed to fetch total requests' });
    }
};
