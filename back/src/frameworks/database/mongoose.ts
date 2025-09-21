import mongoose from 'mongoose';

const connectMongoose = async (): Promise<mongoose.Connection> => {
  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not set');
  }

  mongoose.set('strictQuery', false);

  const url = `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`;

  return mongoose
    .connect(url, {
      directConnection: ['development', 'test'].includes(process.env.MODE),
    })
    .then(() => mongoose.connection);
};

export default connectMongoose;
