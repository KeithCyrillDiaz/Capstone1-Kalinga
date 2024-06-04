import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteDonationsAllMonths = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year } = req.query;
    if (!year || isNaN(parseInt(year as string))) {
      throw new Error('Invalid year');
    }

    const selectedYear = parseInt(year as string);
    const monthlyTotals: Record<string, number> = {};

    // Initialize monthlyTotals with zero values for each month
    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const startDate = new Date(Date.UTC(selectedYear, 0, 1));
    const endDate = new Date(Date.UTC(selectedYear + 1, 0, 1));
    console.log(`Start Date: ${startDate.toISOString()}`);
    console.log(`End Date: ${endDate.toISOString()}`);

    const completeDonations = await AppointmentModel.find({
      DonationStatus: 'Complete',
      selectedDate: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    });

    completeDonations.forEach(appointment => {
      const date = new Date(appointment.selectedDate);
      const month = date.getMonth();
      const appointmentYear = date.getFullYear();
      const monthName = months[month];

      // Ensure only donations from the selected year are counted
      if (appointmentYear === selectedYear) {
        monthlyTotals[monthName]++;
      }
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteDonations: monthlyTotals[monthName]
    }));

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete donations:', error);
    res.status(500).json({ error: 'Error fetching total complete donations' });
  }
};
