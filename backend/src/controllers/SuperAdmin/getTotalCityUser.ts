import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

// Controller function to get the total numbers of DonationStatus (Complete/Decline) for Quezon City and Manila City
export const getDonationStatusTotal = async (req: Request, res: Response): Promise<void> => {
  const { city } = req.query;

  try {
    if (!city || (city !== 'Quezon City' && city !== 'Manila City')) {
      res.status(400).json({ error: 'Invalid city name. Please specify Quezon City or Manila City' });
      return;
    }

    const totalCompleteDonations = await AppointmentModel.countDocuments({ city: city, DonationStatus: 'Complete' });
    const totalDeclinedDonations = await AppointmentModel.countDocuments({ city: city, DonationStatus: 'Decline' });

    res.status(200).json({ totalCompleteDonations, totalDeclinedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get the total numbers of RequestStatus (Complete/Decline) for Quezon City and Manila City
export const getRequestStatusTotal = async (req: Request, res: Response): Promise<void> => {
  const { city } = req.query;

  try {
    if (!city || (city !== 'Quezon City' && city !== 'Manila City')) {
      res.status(400).json({ error: 'Invalid city name. Please specify Quezon City or Manila City' });
      return;
    }

    const totalCompleteRequests = await RequestModel.countDocuments({ city: city, RequestStatus: 'Complete' });
    const totalDeclinedRequests = await RequestModel.countDocuments({ city: city, RequestStatus: 'Decline' });

    res.status(200).json({ totalCompleteRequests, totalDeclinedRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
