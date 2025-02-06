import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDirectMongoConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  console.log('Attempting to connect with:', {
    uri: uri ? uri.replace(/:[^:]*@/, ':****@') : 'URI NOT SET',
    dbName: dbName || 'DB NAME NOT SET'
  });

  if (!uri || !dbName) {
    console.error('MongoDB connection details are missing');
    process.exit(1);
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });

    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db(dbName);
    
    // Ping the database
    const pingResult = await db.command({ ping: 1 });
    console.log('MongoDB Ping Successful!', pingResult);
    
    await client.close();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB Connection Failed:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

testDirectMongoConnection();