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

    const completeDonations = await AppointmentModel.find({
      DonationStatus: 'Complete',
      selectedDate: {
        $gte: new Date(`${selectedYear}-01-01T00:00:00`),
        $lt: new Date(`${selectedYear + 1}-01-01T00:00:00`)
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
