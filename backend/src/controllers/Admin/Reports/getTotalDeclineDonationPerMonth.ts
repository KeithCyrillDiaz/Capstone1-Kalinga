import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalDeclineDonationPerMonth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedMonth, selectedYear } = req.query as { selectedMonth: string; selectedYear: string };
    if (!selectedMonth || !selectedYear || isNaN(parseInt(selectedMonth as string)) || isNaN(parseInt(selectedYear as string))) {
      throw new Error('Invalid selectedMonth or selectedYear');
    }

    const monthIndex = parseInt(selectedMonth) - 1; // Adjust for 0-based index

    const declineDonations = await AppointmentModel.find({
      DonationStatus: 'Decline',
    });

    const filteredAppointments = declineDonations.filter(appointment => {
      const date = new Date(appointment.selectedDate);
      const appointmentMonth = date.getMonth() + 1; // Adding 1 to get 1-based month index
      const appointmentYear = date.getFullYear();

      return appointmentMonth === parseInt(selectedMonth) && appointmentYear === parseInt(selectedYear);
    });

    const totalDeclineAppointments = filteredAppointments.length;

    // Modify the response to only include the totalCompleteAppointments
    const dataForFrontend = {
      totalDeclineAppointments,
    };

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete appointments:', error);
    res.status(500).json({ error: 'Error fetching total complete appointments' });
  }
};