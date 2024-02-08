import { MongoClient, Db } from 'mongodb';
import { config } from 'dotenv';

config();
console.log("hi there")
const uri = process.env.MONGODB_URI;
let client: MongoClient;
let db: Db;

export async function connectToMongoDB() {
    if (!client || !client.isConnected()) {
        client = new MongoClient(uri);
        await client.connect();
      }
      if (!db) {
        db = client.db('multitaskhub'); // Use your actual database name
      }
      return db;
    }

