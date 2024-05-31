import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../../../models/Donor/DonorSetAppointmentModel';

interface TopDonorData {
    // fullName: string;
    milkAmount: number;
}
export const getTopDonorByBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
        const { barangay } = req.params;

        const appointments: Appointment[] = await AppointmentModel.find({
            DonationStatus: 'Complete',
            barangay: barangay // Filter by barangay
        });

        const totalMilkAmountMap: Map<string, number> = new Map();

        for (const appointment of appointments) {
            const milkAmount = parseInt(appointment.milkAmount);

            if (!isNaN(milkAmount)) {
                const currentTotal = totalMilkAmountMap.get(appointment.Donor_ID) || 0;
                totalMilkAmountMap.set(appointment.Donor_ID, currentTotal + milkAmount);
            }
        }

        const sortedDonors = Array.from(totalMilkAmountMap.entries()).sort((a, b) => b[1] - a[1]);

        const donorsWithNames = await Promise.all(sortedDonors.map(async ([donorId, milkAmount]) => {
            const donor = await AppointmentModel.findOne({ Donor_ID: donorId });
            const year = donor.selectedDate.split("-")[0];
            return { donorId, milkAmount, fullName: donor.fullName, Year: year };
        }));

        const topDonorsWithRanking: TopDonorData[] = donorsWithNames.slice(0, 5).map((entry, index) => ({
            fullName: `Top ${index + 1} ${entry.fullName}`,
            barangay: barangay,
            donorID: entry.donorId,
            milkAmount: entry.milkAmount,
            ranking: index + 1,
            year: entry.Year
        }));

        res.json({ data: topDonorsWithRanking });
    } catch (error) {
        console.error('Error fetching top donors by barangay:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};