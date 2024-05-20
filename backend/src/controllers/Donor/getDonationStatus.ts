// Import necessary modules
import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

// Controller function to fetch request status
export const getDonationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all requests from the database using Mongoose
    const appointments = await AppointmentModel.find();

    // Check if any requests exist
    if (!appointments || appointments.length === 0) {
      res.status(404).json({ error: 'No requests found' });
      return;
    }

    // For simplicity, let's assume we want the first request's status
    const DonationStatus = appointments[0].DonationStatus;

    // Extract and send the RequestStatus in the response
    res.status(200).json({ RequestStatus: DonationStatus });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
export default getDonationStatus;


export const getDonationStatusOfMother = async (req: Request, res: Response) => {
  try{
      const { id } = req.params
      
      if(!id) {
        console.log("Bad Request")
        return res.json({
          messages: {
            code: 1,
            message: "Bad Request"
          }
        }).status(404)
      }

      const appointments = await AppointmentModel.findOne({Donor_ID: id, $or: [{DonationStatus: "Pending"}, {DonationStatus: "Ongoing"}]})

      if(appointments){
        console.log("There still Ongoing Or Pending Donation")
        return res.json({
          messages: {
            code: 0,
            message: "There still Ongoing Or Pending Donation"
          },
          appointments
        }).status(400)
      }

      console.log("No pending or ongoing Donation Appointment")
      return res.json({
        messages: {
          code: 0,
          message: "No pending or ongoing Donation Appointment"
        },
        appointments
      }).status(200)

  } catch(error) {
    console.log("InternalServer Error")
    return res.json({
      messages: {
        code: 1,
        message: "InternalServer Error"
      },
      error
    }).status(500)
  }
}
