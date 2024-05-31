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
  
      const monthlyTotals: Record<string, number> = {};
  
      months.forEach(month => {
        monthlyTotals[month] = 0;
      });
  
      const completeDonations = await AppointmentModel.find({
        DonationStatus: 'Complete',
        barangay: selectedBarangay,
        selectedDate: {
          $gte: new Date(`${selectedYear}-01-01T00:00:00`),
          $lt: new Date(`${parseInt(selectedYear) + 1}-01-01T00:00:00`)
        },
      });
  
      completeDonations.forEach(appointment => {
        const date = new Date(appointment.selectedDate);
        const month = date.getMonth();
        const monthName = months[month];
        monthlyTotals[monthName]++;
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
  