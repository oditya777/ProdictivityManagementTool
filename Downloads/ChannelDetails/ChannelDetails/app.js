import express from 'express';
import connectDB from './db/mongoose.js';

import detailsRouter from './routers/detailsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());


app.use('/api/details', detailsRouter);

app.use(errorHandler);

export default app;
