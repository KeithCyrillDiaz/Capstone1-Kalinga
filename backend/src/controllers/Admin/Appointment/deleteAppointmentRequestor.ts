import express, { Request, Response } from 'express';
import RequestModel from '../../../models/Requestor/RequestorRequestModel';


export const deleteAppointmentRequestor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { RequestID } = req.params;
    const request = await RequestModel.findOneAndDelete({ RequestID: RequestID });

    if (!request) {
       res.status(404).json({ error: 'Request not found' });
       return; 
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};