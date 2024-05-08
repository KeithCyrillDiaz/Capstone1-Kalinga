import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

export const getCompletedDonation = async (req: Request, res: Response) => {
  try {
    const { Donor_ID } = req.params; // Assuming Requestor_ID is passed in URL params

    const CompleteRequests = await AppointmentModel.find({
      DonationStatus: "Complete",
      Donor_ID: Donor_ID // Assuming Requestor_ID is a valid field in your document
    });

   

    if (!CompleteRequests || CompleteRequests.length === 0) {
      console.log("No Completed Request ")
      return res.status(404).json({ 
        messages: {
          success: false, 
        },
        error: 'No pending requests found' });
    }
    
    console.log("Retrieved Completed Request ")
    return res.status(200).json({ 
      messages: {
        success: true, 
      },
      DonorData: CompleteRequests });

  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return res.status(500).json({ 
      messages: {
        success: false,
      },
      error: 'Error fetching pending requests' });
  }
};
