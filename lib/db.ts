import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
console.log("hi there")
const uri = process.env.MONGODB_URI;

export async function connectToMongoDB() {
    const client = new MongoClient(uri);
    console.log("trying to connect")
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

