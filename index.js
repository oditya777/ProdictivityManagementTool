import express from 'express';
import { ConnectDB } from './DB/index.js';
import bodyParser from 'body-parser';
import sessionMiddleware from './middleware/sessionMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

console.log('Environment variables loaded:');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Session middleware
app.use(sessionMiddleware);

// Use the auth routes
app.use('/api', authRoutes);

const port = process.env.PORT || 3001;

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connecting to ${port}`);
    });
    app.on('error', (error) => {
      console.log(`Error: ${error}`);
      throw error;
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR: ${error}`);
  });
