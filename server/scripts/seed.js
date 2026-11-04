import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { autoSeedData } from './autoSeed.js';

dotenv.config();

const runSeed = async () => {
  try {
    console.log('[Manual Seed] Connecting to database...');
    const connected = await connectDB();
    if (connected) {
      await autoSeedData();
      console.log('[Manual Seed] Seeding finished successfully.');
      process.exit(0);
    } else {
      console.error('[Manual Seed] Database connection failed.');
      process.exit(1);
    }
  } catch (error) {
    console.error('[Manual Seed Error]:', error);
    process.exit(1);
  }
};

runSeed();
