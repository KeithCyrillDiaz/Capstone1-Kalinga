import { Request, Response } from 'express';
import express from 'express'

import { screeningFormModel } from '../../../models/ApplyAsDonor'; // Import your MongoDB model

export const getScreeningForms = async( req: express.Request, res: express.Response) => {
  try {
    const screeningForms = await screeningFormModel.find(); // Fetch all screening forms from MongoDB
    res.status(200).json(screeningForms); // Send the screening forms as JSON response
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};