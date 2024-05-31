import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteDonationPerBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedMonth, selectedYear, selectedBarangay } = req.query as { selectedMonth: string; selectedYear: string; selectedBarangay: string };

    if (!selectedMonth || !selectedYear || isNaN(parseInt(selectedMonth)) || isNaN(parseInt(selectedYear)) || !selectedBarangay) {
      throw new Error('Invalid selectedMonth, selectedYear, or barangay');
    }

    const monthIndex = parseInt(selectedMonth) - 1;

    const completeDonations = await AppointmentModel.find({
      DonationStatus: 'Complete',
      barangay: selectedBarangay,
    });

    const filteredAppointments = completeDonations.filter(appointment => {
      const date = new Date(appointment.selectedDate);
      return date.getMonth() === monthIndex && date.getFullYear() === parseInt(selectedYear);
    });

    const totalCompleteAppointments = filteredAppointments.length;

    const dataForFrontend = {
      totalCompleteAppointments,
    };

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete appointments:', error);
    res.status(500).json({ error: 'Error fetching total complete appointments' });
  }
};
