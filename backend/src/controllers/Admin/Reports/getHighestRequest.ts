import express, { Request, Response } from 'express';
import RequestModel, { Request as RequestDocument } from '../../../models/Requestor/RequestorRequestModel';

interface TopRequestorData {
    fullName: string;
    totalMilkAmount: number;
}

export const getHighestRequestors = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests: RequestDocument[] = await RequestModel.find({ RequestStatus: 'Complete' });

        const totalMilkAmountMap: Map<string, number> = new Map();
        const requestorDetailsMap: Map<string, string> = new Map();

        for (const request of requests) {
            const requestorID = request.Requestor_ID;
            const milkAmount = parseInt(request.milkAmount || '0');

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(requestorID) || 0;
                totalMilkAmountMap.set(requestorID, currentTotal + milkAmount);
                requestorDetailsMap.set(requestorID, request.fullName);
            }
        }

        const sortedRequestors = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1] - a[1]);

        const topFiveHighestRequestors: TopRequestorData[] = sortedRequestors.slice(0, 5).map((entry, index) => {
            return {
                fullName: requestorDetailsMap.get(entry[0]) || '',
                totalMilkAmount: entry[1]
            };
        });

        const topRequestorsWithRanking = topFiveHighestRequestors.map((requestor, index) => ({
            fullName: `Top ${index + 1} ${requestor.fullName}`,
            totalMilkAmount: requestor.totalMilkAmount
        }));

        res.json({ data: topRequestorsWithRanking });
    } catch (error) {
        console.error('Error fetching top five highest requestors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};