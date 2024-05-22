import express, { Request, Response } from 'express';
import { FeedBackModel } from '../../models/Settings/FeedBack';


export const getFeedbackByFeedbackID = async (req: Request, res: Response) => {
    try {
      const { feedBack_ID } = req.params;
      console.log('Received feedback_ID:', feedBack_ID); // Debug log
      const feedbackData = await FeedBackModel.findOne({ feedBack_ID: feedBack_ID });
      if (!feedbackData) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
      res.status(200).json(feedbackData);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      res.status(500).json({ error: 'Error fetching feedback data' });
    }
  };
  


