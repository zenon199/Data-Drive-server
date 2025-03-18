import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDb } from './models/db';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

import userRoutes from './routes/user';

app.use('/api/auth', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
    connectDb();
});
