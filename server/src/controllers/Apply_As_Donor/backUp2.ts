import express from 'express'
import path from 'path';
import fs from 'fs';
import multer from 'multer';

export const addMedicalRequirementsAsImage = async( req: express.Request, res: express.Response) => {
    console.log("uploadImages: ", req.file)

    

}