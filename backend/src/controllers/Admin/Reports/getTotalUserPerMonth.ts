import { Request, Response } from 'express';
import { DonorModel, RequestorModel } from '../../../models/users';

export const getTotalUserPerMonth = async (req: Request, res: Response): Promise<void> => {
    try {
        const months = Array.from({ length: 12 }, (_, index) => index + 1);
        const currentYear = new Date().getFullYear();

        const donorCounts = await Promise.all(months.map(async (month) => {
            const count = await DonorModel.distinct('Donor_ID', {
                createdAt: {
                    $gte: new Date(currentYear, month - 1, 1),
                    $lt: new Date(currentYear, month, 0, 23, 59, 59, 999)
                }
            }).countDocuments();
            return { month, count };
        }));

        const requestorCounts = await Promise.all(months.map(async (month) => {
            const count = await RequestorModel.distinct('Requestor_ID', {
                createdAt: {
                    $gte: new Date(currentYear, month - 1, 1),
                    $lt: new Date(currentYear, month, 0, 23, 59, 59, 999)
                }
            }).countDocuments();
            return { month, count };
        }));

        const combinedData = months.map(month => {
            const donorEntry = donorCounts.find(d => d.month === month);
            const requestorEntry = requestorCounts.find(r => r.month === month);

            return {
                month,
                donorCount: donorEntry ? donorEntry.count : 0,
                requestorCount: requestorEntry ? requestorEntry.count : 0
            };
        });

        res.json({ data: combinedData });
    } catch (error) {
        console.error('Error in getTotalUserPerMonth:', error);
        res.status(500).json({ message: 'Error fetching users per month', error });
    }
};
