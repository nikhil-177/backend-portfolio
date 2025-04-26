import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_LOCAL);
    console.log('database connected')
  } catch (error) {
    console.log(error);
  }
};
