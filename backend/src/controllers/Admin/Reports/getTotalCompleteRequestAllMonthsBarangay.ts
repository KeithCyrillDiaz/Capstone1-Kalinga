import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getTotalCompleteRequestAllMonthsBarangay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedYear, selectedBarangay } = req.query as { selectedYear: string; selectedBarangay: string };

    if (!selectedYear || isNaN(parseInt(selectedYear)) || !selectedBarangay) {
      throw new Error('Invalid selectedYear or selectedBarangay');
    }

    const monthlyTotals: Record<string, number> = {};

    // Initialize monthlyTotals with zero values for each month
    months.forEach(month => {
      monthlyTotals[month] = 0;
    });

    const completeRequests = await RequestModel.find({
      RequestStatus: 'Complete',
      Date: {
        $gte: new Date(`${selectedYear}-01-01T00:00:00`),
        $lt: new Date(`${parseInt(selectedYear) + 1}-01-01T00:00:00`)
      },
      barangay: selectedBarangay
    });

    completeRequests.forEach(request => {
      const date = new Date(request.Date);
      const month = date.getMonth();
      const monthName = months[month];
      monthlyTotals[monthName]++;
    });

    const dataForFrontend = months.map(monthName => ({
      month: monthName,
      totalCompleteRequests: monthlyTotals[monthName]
    }));

    res.json(dataForFrontend);
  } catch (error) {
    console.error('Error fetching total complete requests:', error);
    res.status(500).json({ error: 'Error fetching total complete requests' });
  }
};
