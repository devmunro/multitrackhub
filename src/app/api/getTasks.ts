import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../lib/db'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const db = await connectToMongoDB();
            const collection = db.collection('tasks');
            const tasks = await collection.find({}).toArray(); 
            res.status(200).json(tasks); 
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            res.status(500).json({ error: 'Failed to fetch tasks from MongoDB' });
        }
    } else {
        res.setHeader('Allow', ['GET']); 
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
