import express, { Request, Response } from 'express';
import RequestModel, { Request as RequestDocument } from '../../../models/Requestor/RequestorRequestModel';

interface TopRequestorData {
    barangay: string;
    totalMilkAmount: number;
}

export const getHighestRequestBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests: RequestDocument[] = await RequestModel.find({ RequestStatus: 'Complete' });

        const totalMilkAmountMap: Map<string, number> = new Map();

        for (const request of requests) {
            const barangay = request.barangay; // Assuming the barangay is stored in the request
            const milkAmount = parseInt(request.milkAmount || '0');

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(barangay) || 0;
                totalMilkAmountMap.set(barangay, currentTotal + milkAmount);
            }
        }

        const sortedBarangays = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1] - a[1]);

        const topFiveHighestRequestors: TopRequestorData[] = sortedBarangays.slice(0, 5).map((entry, index) => {
            return {
                barangay: entry[0],
                totalMilkAmount: entry[1]
            };
        });

        const topRequestorsWithRanking = topFiveHighestRequestors.map((requestor, index) => ({
            barangay: `Top ${index + 1} ${requestor.barangay}`,
            totalMilkAmount: requestor.totalMilkAmount
        }));

        res.json({ data: topRequestorsWithRanking });
    } catch (error) {
        console.error('Error fetching top five highest requestors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
