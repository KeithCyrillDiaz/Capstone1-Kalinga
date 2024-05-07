import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';
import { resolve } from 'path';

export const getOngoingDonation = async (req: Request, res: Response) => {
  try {
    const { Donor_ID } = req.params; // Assuming Requestor_ID is passed in URL params

    const ongoingDonation = await AppointmentModel.find({
      DonationStatus: "Ongoing",
      Donor_ID: Donor_ID // Assuming Requestor_ID is a valid field in your document
    });

    console.log('Pending Requests:', ongoingDonation); // Check the fetched data

    if (!ongoingDonation|| ongoingDonation.length === 0) {
      return res.json({ 
        messages: {
          code: 1,
          message: 'No pending requests found' 
        }
      }).status(404)
    }

    return res.json({ 
      messages: {
        code: 0,
        message: "Successful Retrieving"
      },
    ongoingDonation
    }).status(200)
    
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ success: false, error: 'Error fetching pending requests' });
  }
};
