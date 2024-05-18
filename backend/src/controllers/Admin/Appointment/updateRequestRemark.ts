import { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';

export const updateRequestRemark = async (req: Request, res: Response): Promise<void> => {
  const { RequestRemark, RequestID } = req.body;
  console.log('Received DonorRemark:', RequestRemark); // Add this line for debugging

  try {
    // Find the appointment by AppointmentDonorID
    const existingAppointment = await RequestModel.findOneAndUpdate(
      { RequestID },
      { RequestRemark }, // Update the DonorRemark field
      { new: true } // Return the updated appointment
    );

    if (!existingAppointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Remark updated successfully', appointment: existingAppointment });
  } catch (error) {
    console.error('Error updating remark:', error);
    res.status(500).json({ success: false, message: 'Failed to update remark' });
  }
};
