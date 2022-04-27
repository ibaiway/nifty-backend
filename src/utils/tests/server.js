import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from '../../config/config.js';

function setupTestServer() {
  let SERVER = null;
  let MONGO_URI = null;

  const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  async function startTestServer() {
    SERVER = await MongoMemoryServer.create();
    MONGO_URI = SERVER.getUri();
  }

  function debugTestServer() {
    if (MONGO_URI) {
      config.logger.debug(`MongoDB connected to ${MONGO_URI}`);
    } else {
      config.logger.debug(`MongoDB not connected yet`);
    }
  }

  async function connectTestServer() {
    try {
      await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

      mongoose.connection.on('error', (error) => {
        if (e.message.code === 'ETIMEDOUT') {
          config.logger.debug(error);
          mongoose.connect(mongoUri, mongooseOpts);
        }

        config.logger.debug(error);
      });
    } catch (error) {
      config.logger.error(error);
    }
  }

  async function initTestServer() {
    await startTestServer();
    await connectTestServer();
  }

  async function clearUsersCollection() {
    await mongoose.connection.db.collection('users').deleteMany({});
  }

  async function stopTestServer() {
    await mongoose.disconnect();
    await SERVER.stop();
  }

  return {
    initTestServer,
    debugTestServer,
    clearUsersCollection,
    stopTestServer
  };
}

export default setupTestServer();
