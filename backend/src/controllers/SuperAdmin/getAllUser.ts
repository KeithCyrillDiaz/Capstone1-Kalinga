import express from 'express'
import { getDonor } from '../../models/users';
import {getRequestor} from '../../models/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const donors = await getDonor();
        const requestors = await getRequestor();
        res.json({ donors, requestors });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
      }
}
