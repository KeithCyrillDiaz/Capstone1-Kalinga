import { Request, Response } from 'express';
import { DonorModel, RequestorModel } from '../../../models/users';

export const getTotalDonorsPerBarangay= async (req: Request, res: Response): Promise<void> => {
    try {
      const { selectedMonth, selectedYear, selectedBarangay } = req.query;
  
      if (!selectedMonth || !selectedYear || !selectedBarangay) {
        res.status(400).json({ message: 'Year, month, and barangay are required parameters' });
        return;
      }
  
      const startDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);
      const endDate = new Date(Number(selectedYear), Number(selectedMonth), 0, 23, 59, 59, 999);
  
      const count = await DonorModel.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        barangay: selectedBarangay
      });
  
      res.status(200).json({ totalDonors: count });
    } catch (error) {
      console.error('Error fetching total donors:', error);
      res.status(500).json({ message: 'Failed to fetch total donors' });
    }
  };
  
  export const getTotalRequestorsPerBarangay = async (req: Request, res: Response): Promise<void> => {
    try {
      const { selectedYear, selectedMonth, selectedBarangay } = req.query;
  
      if (!selectedYear || !selectedMonth || !selectedBarangay) {
        res.status(400).json({ message: 'Year, month, and barangay are required parameters' });
        return;
      }
  
      const startDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);
      const endDate = new Date(Number(selectedYear), Number(selectedMonth), 0, 23, 59, 59, 999);
  
      const count = await RequestorModel.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        barangay: selectedBarangay
      });
  
      res.status(200).json({ totalRequestors: count });
    } catch (error) {
      console.error('Error fetching total requestors:', error);
      res.status(500).json({ message: 'Failed to fetch total requestors' });
    }
  };