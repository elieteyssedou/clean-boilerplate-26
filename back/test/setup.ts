import './test-env-variables';
import mongoose from 'mongoose';
import { Server } from 'http';
import app from '@test/server';
import connectMongoose from '@/frameworks/database/mongoose';

const startMongod = async () => {
  await connectMongoose();
  await removeAllCollections();
};

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

const stopMongod = async () => {
  await mongoose.disconnect();
};

let server: Server;

const startServer = () => {
  server = app.listen(process.env.PORT);
};

const stopServer = () => {
  server.close();
};

setTimeout(() => {
  // BEFORE TEST SUITE
  before(async () => {
    await startMongod();
    startServer();
  });

  // AFTER TEST SUITE
  after(async () => {
    stopServer();
    await stopMongod();
  });
});
