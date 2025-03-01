import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDb} from './models/db';

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

import authRoutes from './routes/auth';

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
    connectDb();
});
