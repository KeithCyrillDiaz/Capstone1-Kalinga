import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../../models/Donor/DonorSetAppointmentModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalDeclineDonationsAllMonths = async (req: Request, res: Response): Promise<void> => {
    try {
      const monthlyTotals: Record<string, number> = {};
      const declineDonations = await AppointmentModel.find({ DonationStatus: 'Decline' });
  
      declineDonations.forEach(appointment => {
        const date = new Date(appointment.selectedDate); // Assuming 'Date' is the field containing the date in your RequestModel
        const month = date.getMonth();
        const monthName = months[month];
        monthlyTotals[monthName] = (monthlyTotals[monthName] || 0) + 1;
      });
  
      const dataForFrontend = months.map(monthName => ({
        month: monthName,
        totalDeclineDonations: monthlyTotals[monthName] || 0
      }));
  
      res.json(dataForFrontend);
    } catch (error) {
      console.error('Error fetching total complete requests:', error);
      res.status(500).json({ error: 'Error fetching total complete requests' });
    }
  };
  
