import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

// Define the months array
const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteRequestPerMonth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedMonth, selectedYear } = req.query as { selectedMonth: string; selectedYear: string };
    if (!selectedMonth || !selectedYear || isNaN(parseInt(selectedMonth as string)) || isNaN(parseInt(selectedYear as string))) {
      throw new Error('Invalid selectedMonth or selectedYear');
    }

    const monthIndex = parseInt(selectedMonth) - 1; // Adjust for 0-based index

    const completeRequest = await RequestModel.find({
      RequestStatus: 'Complete',
    });

    const filteredAppointments = completeRequest.filter(request => {
      const date = new Date(request.Date);
      const appointmentMonth = date.getMonth() + 1; // Adding 1 to get 1-based month index
      const appointmentYear = date.getFullYear();

      return appointmentMonth === parseInt(selectedMonth) && appointmentYear === parseInt(selectedYear);
    });

    const totalCompleteRequest = filteredAppointments.length;

    const dataForFrontend = {
      totalCompleteRequest,
    };

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete appointments:', error);
    res.status(500).json({ error: 'Error fetching total complete appointments' });
  }
  };

 