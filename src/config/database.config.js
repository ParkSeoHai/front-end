const mongoose = require('mongoose');
const logger = require('../logs/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB Connection Successful', {
      host: conn.connection.host,
      port: conn.connection.port,
      name: conn.connection.name,
      environment: process.env.NODE_ENV
    });

    mongoose.connection.on('connected', () => {
      logger.info('Mongoose Connection Established', {
        timestamp: new Date().toISOString(),
        status: 'connected'
      });
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB Connection Error', {
        error: err.message,
        errorCode: err.code,
        timestamp: new Date().toISOString(),
        stack: err.stack
      });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB Disconnected', {
        timestamp: new Date().toISOString(),
        status: 'disconnected',
        reason: 'connection lost'
      });
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB Connection Terminated', {
        reason: 'application shutdown',
        timestamp: new Date().toISOString(),
        status: 'closed'
      });
      process.exit(0);
    });

  } catch (error) {
    logger.error('MongoDB Connection Failed', {
      error: error.message,
      errorCode: error.code,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      mongoURI: process.env.MONGO_URI?.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://***:***@')
    });
    process.exit(1);
  }
};

module.exports = connectDB;