import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteRequestAllMonths = async (req: Request, res: Response): Promise<void> => {
  try {
    const year: string = req.query.year as string
    if (!year || isNaN(parseInt(year))) {
      throw new Error('Invalid year');
    }

    const selectedYear = year.toString(); // Convert year to string
    console.log(`Selected Year: ${selectedYear}`);

    const monthlyTotals: Record<string, number> = {};

    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const startDate = new Date(Date.UTC(parseInt(selectedYear), 0, 1));
    const endDate = new Date(Date.UTC(parseInt(selectedYear) + 1, 0, 1));
    console.log(`Start Date: ${startDate.toISOString()}`);
    console.log(`End Date: ${endDate.toISOString()}`);

    const completeRequests = await RequestModel.find({
      RequestStatus: 'Complete',
      Date: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    });

    console.log(`Complete Requests: ${completeRequests.length}`);

    completeRequests.forEach(request => {
      const date = new Date(request.Date);
      const month = date.getMonth();
      const monthName = months[month];
      console.log(`Request Date: ${date.toISOString()}, Month: ${monthName}`);
      monthlyTotals[monthName]++;
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteRequests: monthlyTotals[monthName]
    }));

    console.log('Data for frontend:', dataForFrontend);

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete requests:', error);
    res.status(500).json({ error: 'Error fetching total complete requests' });
  }
};
