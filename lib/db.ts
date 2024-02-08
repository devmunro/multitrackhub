import { MongoClient, Db } from 'mongodb';
import { config } from 'dotenv';

config();
const uri = process.env.MONGODB_URI;
let client: MongoClient;
let db: Db;

export async function connectToMongoDB() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
      if (!db) {
        db = client.db('multitaskhub'); 
      }
      return db;
    }

