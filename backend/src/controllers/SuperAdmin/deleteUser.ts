import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { DonorModel, RequestorModel } from '../../models/users';

export const deleteUser = async (req: Request, res: Response) => {
  const { id, userType } = req.params as { id: string; userType: string };

  try {
    if (userType === "Donor") {
      const donor = await DonorModel.findOneAndDelete({ Donor_ID: id });
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
    } else if (userType === "Requestor") {
      const requestor = await RequestorModel.findOneAndDelete({ Requestor_ID: id });
      if (!requestor) {
        return res.status(404).json({ message: 'Requestor not found' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};