import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDb } from './models/db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

import userRoutes from './routes/user';
import contentRouter from './routes/content';
import shareRouter from './routes/share';


app.use('/api/auth', userRoutes);
app.use('/api/content', contentRouter);
app.use('/api/brain',shareRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
    connectDb();
});
