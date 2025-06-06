import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_LOCAL);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
