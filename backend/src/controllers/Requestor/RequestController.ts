import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';
import moment from 'moment'
// Controller to create a new request
const createRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      Requestor_ID,
      userType,
      RequestStatus,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      city,
      milkBank,
      milkAmount,
      ReasonForRequesting,
      method,
    } = req.body;

    console.log(req.body)
    const currentTime = moment().toDate()
    const newRequest = await RequestModel.create({
      Requestor_ID,
      userType,
      RequestStatus,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      city,
      milkBank,
      milkAmount,
      ReasonForRequesting,
      Date: currentTime,
      method,
    });
    console.log(newRequest)
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

export { createRequest };
