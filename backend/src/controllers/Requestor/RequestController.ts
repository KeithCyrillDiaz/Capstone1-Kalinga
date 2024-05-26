import { Request, Response } from 'express';
import RequestModel from '../../models/Requestor/RequestorRequestModel';
import { DonorModel, RequestorModel } from '../../models/users';
import moment from 'moment';

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
      barangay
    } = req.body;

    console.log(req.body);
    
    // Retrieve barangay if not provided
    let userBarangay = barangay;
    if (!userBarangay) {
      if (userType === 'Donor') {
        const donor = await DonorModel.findOne({ Donor_ID: Requestor_ID });
        if (donor) {
          userBarangay = donor.barangay;
        }
      } else if (userType === 'Requestor') {
        const requestor = await RequestorModel.findOne({ Requestor_ID: Requestor_ID });
        if (requestor) {
          userBarangay = requestor.barangay;
        }
      }
    }

    const currentTime = moment().toDate();
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
      barangay: userBarangay // Ensure barangay is included here
    });

    console.log(newRequest);
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

export { createRequest };
