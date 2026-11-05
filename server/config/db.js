import mongoose from 'mongoose';

let memoryServer = null;

// Disable Mongoose query buffering so queries fail fast or use fallback instead of hanging for 10000ms
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`[Database] MongoDB Cloud Connected: ${conn.connection.host}/${conn.connection.name}`);
      return true;
    } catch (err) {
      console.error(`[Database Error] Could not connect to MONGODB_URI: ${err.message}`);
    }
  }

  // Attempt local connection
  try {
    const localUri = 'mongodb://127.0.0.1:27017/vrf_homes';
    const conn = await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] Local MongoDB connected to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (err) {
    console.log(`[Database Notice] Local MongoDB daemon not found at 127.0.0.1:27017.`);
    console.log(`[Database] Attempting embedded in-memory MongoDB engine...`);

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      
      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Embedded in-memory MongoDB initialized successfully at: ${memUri}`);
      return true;
    } catch (memErr) {
      console.log(`[Database Notice] Embedded MongoDB engine not available. Seamless in-memory catalog mode is ACTIVE.`);
      return false;
    }
  }
};
