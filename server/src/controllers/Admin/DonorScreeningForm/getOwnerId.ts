import { Request, Response, Router } from 'express';
import { MedicalRequirementsFilesModel, MedicalRequirementsImagesModel } from '../../../models/ApplyAsDonor';

const router = Router();

// API endpoint to get images by ownerID
router.get('/getImagesByOwnerID/:ownerID', async (req: Request, res: Response) => {
  try {
    const ownerID = req.params.ownerID;

    // Validate ownerID
    if (!ownerID || ownerID === 'undefined') {
      return res.status(400).json({ error: 'Invalid ownerID' });
    }

    const images = await MedicalRequirementsImagesModel.find({ ownerID });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// API endpoint to get files by ownerID
router.get('/getFilesByOwnerID/:ownerID', async (req: Request, res: Response) => {
  try {
    const ownerID = req.params.ownerID;

    // Validate ownerID
    if (!ownerID || ownerID === 'undefined') {
      return res.status(400).json({ error: 'Invalid ownerID' });
    }

    const files = await MedicalRequirementsFilesModel.find({ ownerID });
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
