import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

interface QueryParams {
  selectedMonth: string;
  selectedYear: string;
}

export const getTotalDeclineDonationPerBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedMonth, selectedYear, selectedBarangay } = req.query as unknown as { selectedMonth: string; selectedYear: string; selectedBarangay: string };

    if (!selectedMonth || !selectedYear || isNaN(parseInt(selectedMonth)) || isNaN(parseInt(selectedYear)) || !selectedBarangay) {
      throw new Error('Invalid selectedMonth, selectedYear, or barangay');
    }

    const monthIndex = parseInt(selectedMonth) - 1;

    const declineDonations = await AppointmentModel.find({
      DonationStatus: 'Decline',
      barangay: selectedBarangay,
    });

    const filteredAppointments = declineDonations.filter(appointment => {
      const date = new Date(appointment.selectedDate);
      return date.getMonth() === monthIndex && date.getFullYear() === parseInt(selectedYear);
    });

    const totalDeclineAppointments = filteredAppointments.length;

    const dataForFrontend = {
      barangay: selectedBarangay,
      totalDeclineAppointments,
    };

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total decline appointments:', error);
    res.status(500).json({ error: 'Error fetching total decline appointments' });
  }
};
