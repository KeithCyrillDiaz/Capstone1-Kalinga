import express, { Request, Response } from 'express';
import { DonorModel, RequestorModel } from '../../../models/users';

export const getAllBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
        const donorBarangays = await DonorModel.distinct('barangay');
        const requestorBarangays = await RequestorModel.distinct('barangay');
        
        const allBarangays = Array.from(new Set([...donorBarangays, ...requestorBarangays]));
        res.json(allBarangays);
      } catch (err) {
        res.status(500).json({ message: (err as Error).message });
      }
    };


