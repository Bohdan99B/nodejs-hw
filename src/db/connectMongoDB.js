import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error('MONGO_URL is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('\u2705 MongoDB connection established successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
