import mongoose from 'mongoose';

export interface IImage extends mongoose.Document {
    name: string;
    data: string;
  }
  
  const imageSchema = new mongoose.Schema({
    name: String,
    data: String,
  });
  
  export const ImageModel = mongoose.model<IImage>('Image', imageSchema);