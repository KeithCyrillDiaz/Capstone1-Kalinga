import { Request, Response } from 'express';
import { ReportBugModel } from '../../models/Settings/ReportBug';

export const getBugReportById = async (req: Request, res: Response) => {
  try {
    const { ReportBugID } = req.params;

    if (!ReportBugID) {
      return res.status(400).json({ error: 'ReportBugID parameter is missing' });
    }

    const bugReport = await ReportBugModel.findOne({ ReportBugID });

    if (!bugReport) {
      return res.status(404).json({ error: 'Bug report not found' });
    }

    return res.status(200).json({ bugReport });
  } catch (error) {
    console.error('Error fetching bug report by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
