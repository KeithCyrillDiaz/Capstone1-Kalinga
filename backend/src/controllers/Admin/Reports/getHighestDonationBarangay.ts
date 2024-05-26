import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../../models/Donor/DonorSetAppointmentModel';

interface TopDonorData {
    barangay: string;
    milkAmount: number;
}

export const getHighestDonationBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments: Appointment[] = await AppointmentModel.find({ DonationStatus: 'Complete' });

        const totalMilkAmountMap: Map<string, number> = new Map();

        for (const appointment of appointments) {
            const barangay = appointment.barangay; // Assuming the barangay is stored in the appointment
            const milkAmount = parseInt(appointment.milkAmount);

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(barangay) || 0;
                totalMilkAmountMap.set(barangay, currentTotal + milkAmount);
            }
        }

        const sortedBarangays = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1] - a[1]);

        const topFiveHighestDonations: TopDonorData[] = sortedBarangays.slice(0, 5).map((entry, index) => {
            return {
                barangay: entry[0],
                milkAmount: entry[1]
            };
        });

        const topDonorsWithRanking = topFiveHighestDonations.map((barangayData, index) => ({
            barangay: `Top ${index + 1} ${barangayData.barangay}`,
            milkAmount: barangayData.milkAmount
        }));

        res.json({ data: topDonorsWithRanking });
    } catch (error) {
        console.error('Error fetching top five highest donations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
