import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

export const getCompleteDonationsTotal = async (req: Request, res: Response) => {
  try {

    const { year } = req.params;
    console.log("YEar, ", year)
    if (!year || isNaN(parseInt(year as string))) {
      throw new Error('Invalid year');
    }

    console.log("YEar, ", year)
    const selectedYear = parseInt(year as string);
    
    const startDate = new Date(Date.UTC(selectedYear, 0, 1));
    const endDate = new Date(Date.UTC(selectedYear + 1, 0, 1));
    console.log(`Start Dateeee: ${startDate.toISOString()}`);
    console.log(`End Dateeee: ${endDate.toISOString()}`);

    const totalCompleteDonations = await AppointmentModel.find({
      DonationStatus: 'Complete',
      selectedDate: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      }
    });
    console.log("SUCeSSSSS", totalCompleteDonations)
    res.json({ totalCompleteDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching total complete donations' });
  }
};

export const getDeclinedDonationsTotal = async (req: Request, res: Response) => {
  try {
    const totalDeclinedDonations = await AppointmentModel.countDocuments({ DonationStatus: 'Decline' });
    res.json({ totalDeclinedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching total declined donations' });
  }
};
