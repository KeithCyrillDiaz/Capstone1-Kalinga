import { MedicalRequirementsFilesModel, MedicalRequirementsImagesModel } from './ApplyAsDonor';

export const getMedicalRequirementFilesByOwnerIDAndFilename = async (ownerID: string, filename: string) => {
    try {
        const files = await MedicalRequirementsFilesModel.find({ ownerID, filename });
        return files.map(file => file.toObject());
    } catch (error) {
        console.error('Error fetching files:', error);
        throw new Error('Error fetching files');
    }
};

export const getMedicalRequirementImagesByOwnerIDAndFilename = async (ownerID: string, filename: string) => {
    try {
        const images = await MedicalRequirementsImagesModel.find({ ownerID, filename });
        return images.map(image => image.toObject());
    } catch (error) {
        console.error('Error fetching images:', error);
        throw new Error('Error fetching images');
    }
};
