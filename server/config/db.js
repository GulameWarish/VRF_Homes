import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vrf_homes';

  // Attempt standard connection first
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (err) {
    console.log(`[Database Notice] Local MongoDB daemon not found at ${uri}.`);
    console.log(`[Database] Initializing embedded in-memory MongoDB engine for standalone operation...`);

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      
      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Embedded in-memory MongoDB initialized successfully at: ${memUri}`);
      return true;
    } catch (memErr) {
      console.error(`[Database Error] Could not start embedded MongoDB: ${memErr.message}`);
      return false;
    }
  }
};
