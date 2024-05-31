import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

// Define the months array
const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalDeclineRequestBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedMonth, selectedYear, selectedBarangay } = req.query as { selectedMonth: string; selectedYear: string; selectedBarangay: string };

    if (!selectedMonth || !selectedYear || isNaN(parseInt(selectedMonth)) || isNaN(parseInt(selectedYear)) || !selectedBarangay) {
      throw new Error('Invalid selectedMonth, selectedYear, or barangay');
    }

    const monthIndex = parseInt(selectedMonth) - 1;

    const declineRequests = await RequestModel.find({
      RequestStatus: 'Decline',
      barangay: selectedBarangay,
    });

    const filteredRequests = declineRequests.filter(request => {
      const date = new Date(request.Date);
      return date.getMonth() === monthIndex && date.getFullYear() === parseInt(selectedYear);
    });

    const totalDeclineRequests = filteredRequests.length;

    const dataForFrontend = {
      totalDeclineRequests,
    };

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total decline requests:', error);
    res.status(500).json({ error: 'Error fetching total decline requests' });
  }
};
