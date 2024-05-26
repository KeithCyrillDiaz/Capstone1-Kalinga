import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteRequestAllMonths = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year } = req.query;
    const monthlyTotals: Record<string, number> = {};

    // Initialize monthlyTotals with zero values for each month
    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const completeRequests = await RequestModel.find({
      RequestStatus: 'Complete',
      Date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31T23:59:59`) } // Assuming 'Date' is the field containing the date
    });

    completeRequests.forEach(request => {
      const date = new Date(request.Date);
      const month = date.getMonth();
      const monthName = months[month];
      monthlyTotals[monthName]++;
      
      // Log specific data for each request
      console.log('Request ID:', request._id);
      console.log('Request Date:', request.Date);
      // Add more fields as needed
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteRequests: monthlyTotals[monthName]
    }));

    console.log('Data for frontend:', dataForFrontend); // Log the data for frontend

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete requests:', error);
    res.status(500).json({ error: 'Error fetching total complete requests' });
  }
};