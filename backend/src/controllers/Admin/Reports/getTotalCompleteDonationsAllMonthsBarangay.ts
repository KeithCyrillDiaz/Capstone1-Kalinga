import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteDonationsAllMonthsBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedYear, selectedBarangay } = req.query as { selectedYear: string; selectedBarangay: string };

    if (!selectedYear || isNaN(parseInt(selectedYear)) || !selectedBarangay) {
      throw new Error('Invalid selectedYear or selectedBarangay');
    }

    const year = parseInt(selectedYear);
    console.log(`Selected Year: ${year}`);
    console.log(`Selected Barangay: ${selectedBarangay}`);

    const monthlyTotals: Record<string, number> = {};

    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year + 1, 0, 1));
    console.log(`Start Date: ${startDate.toISOString()}`);
    console.log(`End Date: ${endDate.toISOString()}`);

    const completeDonations = await AppointmentModel.find({
      DonationStatus: 'Complete',
      barangay: selectedBarangay,
      selectedDate: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    });

    console.log(`Complete Donations: ${completeDonations.length}`);

    completeDonations.forEach(appointment => {
      const date = new Date(appointment.selectedDate);
      const month = date.getMonth();
      const monthName = months[month];
      console.log(`Appointment Date: ${date.toISOString()}, Month: ${monthName}`);
      monthlyTotals[monthName]++;
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteDonations: monthlyTotals[monthName]
    }));

    console.log('Monthly Totals:', monthlyTotals);

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete donations:', error);
    res.status(500).json({ error: 'Error fetching total complete donations' });
  }
};
