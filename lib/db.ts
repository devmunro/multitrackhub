import { MongoClient, Db } from 'mongodb';
import { config } from 'dotenv';

config();
const uri: string | undefined = process.env.MONGODB_URI;
let client: MongoClient;
let db: Db;

export async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(uri as string); 
    await client.connect();
  }
  if (!db) {
    db = client.db('multitaskhub'); 
  }
  return db;
}

