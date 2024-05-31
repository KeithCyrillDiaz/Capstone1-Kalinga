import express, { Request, Response } from 'express';
import RequestModel, { Request as RequestDocument } from '../../../../models/Requestor/RequestorRequestModel';

interface TopRequestorData {
    fullName: string;
    totalMilkAmount: number;
    year: string;
}

export const getTopRequestorByBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
        const { barangay } = req.params;
        const requests: RequestDocument[] = barangay 
            ? await RequestModel.find({ RequestStatus: 'Complete', barangay: barangay })
            : await RequestModel.find({ RequestStatus: 'Complete' });

        const totalMilkAmountMap: Map<string, { totalMilk: number, year: string }> = new Map();
        const requestorDetailsMap: Map<string, string> = new Map();

        for (const request of requests) {
            const requestorID = request.Requestor_ID;
            const milkAmount = parseInt(request.milkAmount || '0');
            const year = request.Date.split("-")[0];

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(requestorID)?.totalMilk || 0;
                totalMilkAmountMap.set(requestorID, { totalMilk: currentTotal + milkAmount, year: year });
                requestorDetailsMap.set(requestorID, request.fullName);
            }
        }

        const sortedRequestors = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1].totalMilk - a[1].totalMilk);

        const topFiveHighestRequestors: TopRequestorData[] = sortedRequestors.slice(0, 5).map((entry, index) => {
            return {
                fullName: requestorDetailsMap.get(entry[0]) || '',
                totalMilkAmount: entry[1].totalMilk,
                year: entry[1].year
            };
        });

        const topRequestorsWithRanking = topFiveHighestRequestors.map((requestor, index) => ({
            fullName: `Top ${index + 1} ${requestor.fullName}`,
            milkAmount: requestor.totalMilkAmount,
            year: requestor.year
        }));

        res.json({ data: topRequestorsWithRanking });
    } catch (error) {
        console.error('Error fetching top five highest requestors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};