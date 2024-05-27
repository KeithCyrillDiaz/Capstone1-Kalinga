import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalOverAllRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const monthlyTotals: Record<string, number> = {};
    const completeRequests = await RequestModel.find({ RequestStatus: 'Complete' });

    completeRequests.forEach(request => {
      const date = new Date(request.Date); // Assuming 'Date' is the field containing the date in your RequestModel
      const month = date.getMonth();
      const monthName = months[month];
      monthlyTotals[monthName] = (monthlyTotals[monthName] || 0) + 1;
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteRequests: monthlyTotals[monthName] || 0
    }));

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete requests:', error);
    res.status(500).json({ error: 'Error fetching total complete requests' });
  }
};