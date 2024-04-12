// Backend: server.ts

import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import fs from 'fs';
dotenv.config();

import { ImageModel, IImage } from '../src/models/test';

const app = express();

app.use(cors({
    credentials: true,
}));

const server = http.createServer(app)

server.listen(7000, () => {
    console.log("Server Running on http://localhost:7000/");
});

const MongoDb_URL = process.env.MONGO_DB_URL;

if (!MongoDb_URL) {
    throw new Error("MongoDB URL is not defined");
}

mongoose.Promise = Promise;
mongoose.connect(MongoDb_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      const image = new ImageModel({
        name: req.file.originalname,
        data: req.file.buffer.toString('base64'),
      });
      await image.save();
      res.status(201).send('Image uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  