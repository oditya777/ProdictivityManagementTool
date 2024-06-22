import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGO_URI;

export const ConnectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
