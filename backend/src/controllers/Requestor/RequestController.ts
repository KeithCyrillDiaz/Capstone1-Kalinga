import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';

// Controller to create a new request
const createRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userType,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      medicalCondition,
      milkAmount,
      BabyCategory,
      ReasonForRequesting,
    } = req.body;

    const newRequest = await RequestModel.create({
      userType,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      medicalCondition,
      milkAmount,
      BabyCategory,
      ReasonForRequesting,
    });

    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

export { createRequest };
