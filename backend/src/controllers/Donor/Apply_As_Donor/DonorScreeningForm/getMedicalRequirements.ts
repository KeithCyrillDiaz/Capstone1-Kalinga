import express from 'express';
import { getMedicalRequirementFilesByOwnerIDAndFilename, getMedicalRequirementImagesByOwnerIDAndFilename } from '../../../../models/getMedicalModel'; 

export const getMedicalImagesController = async (req: express.Request, res: express.Response) => {
    try {
        const ownerID = req.params.ownerID;
        const filename = req.query.filename as string; // Explicitly type filename as string

        // Assuming you want to get images first and then files
        const images = await getMedicalRequirementImagesByOwnerIDAndFilename(ownerID, filename);
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Server Error');
    }
};

export const getMedicalFilesController = async (req: express.Request, res: express.Response) => {
    try {
        const ownerID = req.params.ownerID;
        const filename = req.query.filename as string; // Explicitly type filename as string

        // Assuming you want to get files after getting images
        const files = await getMedicalRequirementFilesByOwnerIDAndFilename(ownerID, filename);
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).send('Server Error');
    }
};
