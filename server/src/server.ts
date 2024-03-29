import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './router';


const app = express ();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())

const server = http.createServer(app)


server.listen(7000, () => {
    console.log("Server Running on http://localhost:7000/");
});


const MongoDb_URL = "mongodb://localhost:27017/KalingaBackend"

mongoose.Promise = Promise;
mongoose.connect(MongoDb_URL);
mongoose.connection.on('error', (error:Error) => console.log(error));


app.use('/', router());
