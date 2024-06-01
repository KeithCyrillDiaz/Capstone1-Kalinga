import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalDeclineRequestAllMonths = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year } = req.query;
    if (!year || isNaN(parseInt(year as string))) {
      throw new Error('Invalid year');
    }

    const selectedYear = parseInt(year as string);
    console.log(`Selected Year: ${selectedYear}`);

    const monthlyTotals: Record<string, number> = {};

    // Initialize monthlyTotals with zero values for each month
    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const startDate = new Date(Date.UTC(selectedYear, 0, 1));
    const endDate = new Date(Date.UTC(selectedYear + 1, 0, 1));
    console.log(`Start Date: ${startDate.toISOString()}`);
    console.log(`End Date: ${endDate.toISOString()}`);

    const declineRequests = await RequestModel.find({
      RequestStatus: 'Decline',
      Date: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    });

    declineRequests.forEach(request => {
      const date = new Date(request.Date);
      const month = date.getMonth();
      const requestYear = date.getFullYear();
      const monthName = months[month];

      // Ensure only requests from the selected year are counted
      if (requestYear === selectedYear) {
        monthlyTotals[monthName]++;
      }
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalDeclineRequests: monthlyTotals[monthName]
    }));

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total decline requests:', error);
    res.status(500).json({ error: 'Error fetching total decline requests' });
  }
};
