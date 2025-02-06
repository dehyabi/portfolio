import { MongoClient, Db } from 'mongodb';

export interface MongoDBConnection {
  client: MongoClient;
  db: Db;
}

export class MongoDBConnectionManager {
  private static instance: MongoDBConnectionManager;
  private connection: MongoDBConnection | null = null;

  private constructor() {}

  public static getInstance(): MongoDBConnectionManager {
    if (!MongoDBConnectionManager.instance) {
      MongoDBConnectionManager.instance = new MongoDBConnectionManager();
    }
    return MongoDBConnectionManager.instance;
  }

  async connect(): Promise<MongoDBConnection> {
    if (this.connection) {
      return this.connection;
    }

    console.log('Environment Variables:', {
      MONGODB_URI: process.env.MONGODB_URI ? 'SET (masked)' : 'NOT SET',
      MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET'
    });

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!uri) {
      const errorMessage = 'MONGODB_URI is not defined in environment variables';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!dbName) {
      const errorMessage = 'MONGODB_DB_NAME is not defined in environment variables';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const maskedUri = uri.replace(/:[^:]*@/, ':****@');
      console.log(`Attempting to connect to MongoDB: ${maskedUri}`);

      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        retryWrites: true,
        w: 'majority'
      });

      console.time('MongoDB Connection Time');
      await client.connect();
      console.timeEnd('MongoDB Connection Time');

      const db = client.db(dbName);

      this.connection = { client, db };
      return this.connection;
    } catch (error) {
      console.error('Comprehensive MongoDB Connection Error:', {
        errorName: error instanceof Error ? error.name : 'Unknown Error',
        errorMessage: error instanceof Error ? error.message : 'No error message',
        errorStack: error instanceof Error ? error.stack : 'No stack trace'
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.client.close();
      this.connection = null;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const connection = await this.connect();
      // Simple ping without serverStatus
      await connection.db.command({ ping: 1 });
      console.log('MongoDB ping successful');
      return true;
    } catch (error) {
      console.error('MongoDB connection test failed:', error);
      return false;
    }
  }
}