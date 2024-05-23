// Import necessary modules
import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';
import app from '../../../api';

// Controller function to fetch request status
export const getRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all requests from the database using Mongoose
    const requests = await RequestModel.find();

    // Check if any requests exist
    if (!requests || requests.length === 0) {
      res.status(404).json({ error: 'No requests found' });
      return;
    }

    // For simplicity, let's assume we want the first request's status
    const requestStatus = requests[0].RequestStatus;

    // Extract and send the RequestStatus in the response
    res.status(200).json({ RequestStatus: requestStatus });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRequestStatusOfMother = async (req: Request, res: Response) => {
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

      const appointments = await RequestModel.findOne({Requestor_ID: id, $or: [{RequestStatus: "Pending"}, {RequestStatus: "Ongoing"}]})
      console.log("Yow:", appointments)
      if(appointments){
        console.log("There still Ongoing Or Pending Request")
        return res.json({
          messages: {
            code: 0,
            message: "There still Ongoing Or Pending Request"
          },
          appointments
        }).status(400)
      }

      console.log("No pending or ongoing Request Appointment")
      return res.json({
        messages: {
          code: 0,
          message: "No pending or ongoing Request Appointment"
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
