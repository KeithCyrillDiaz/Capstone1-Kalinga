import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../../models/Donor/DonorSetAppointmentModel';

interface TopDonorData {
    fullName: string;
    milkAmount: number;
}

export const getHighestDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments: Appointment[] = await AppointmentModel.find({ DonationStatus: 'Complete' });

        const totalMilkAmountMap: Map<string, number> = new Map();
        const donorDetailsMap: Map<string, string> = new Map();

        for (const appointment of appointments) {
            const donorID = appointment.Donor_ID;
            const milkAmount = parseInt(appointment.milkAmount);

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(donorID) || 0;
                totalMilkAmountMap.set(donorID, currentTotal + milkAmount);
                donorDetailsMap.set(donorID, appointment.fullName);
            }
        }

        const sortedDonors = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1] - a[1]);

        const topFiveHighestDonations: TopDonorData[] = sortedDonors.slice(0, 5).map((entry, index) => {
            return {
                fullName: donorDetailsMap.get(entry[0]) || '',
                milkAmount: entry[1]
            };
        });

        const topDonorsWithRanking = topFiveHighestDonations.map((donor, index) => ({
            fullName: `Top ${index + 1} ${donor.fullName}`,
            milkAmount: donor.milkAmount
        }));

        res.json({ data: topDonorsWithRanking });
    } catch (error) {
        console.error('Error fetching top five highest donations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
