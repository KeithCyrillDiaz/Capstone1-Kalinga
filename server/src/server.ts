// server.js or server.ts
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
<<<<<<< Updated upstream
import mongoose from 'mongoose'
import router from './router';
import dotenv from 'dotenv';
dotenv.config();

const app = express ();
=======
import mongoose from 'mongoose';
import router from './router'; 

const app = express();
>>>>>>> Stashed changes

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(7000, () => {
    console.log("Server Running on http://localhost:7000/");
});

<<<<<<< Updated upstream

const MongoDb_URL = process.env.MONGO_DB_URL;
// console.log(process.env.MONGO_DB_URL);

if (!MongoDb_URL) {
    throw new Error("MongoDB URL is not defined");
}
=======
const MongoDb_URL = "mongodb://localhost:27017/KalingaBackend";
>>>>>>> Stashed changes

mongoose.Promise = Promise;
mongoose.connect(MongoDb_URL);
mongoose.connection.on('error', (error:Error) => console.log(error));

// Use your router for all routes starting from /
app.use('/', router());

//export default app;
