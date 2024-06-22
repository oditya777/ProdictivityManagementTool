import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import sessionMiddleware from './middleware/sessionMiddleware.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/api', authRoutes);

export default app;
