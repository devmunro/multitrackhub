// pages/api/tasks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../lib/db'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const db = await connectToMongoDB();
      const task = req.body; // Assuming the task data is sent in the request body

      // Insert the new task into the MongoDB collection
      console.log(db.collection)
      const collection = db.collection('tasks');
      console.log("test collection")
      const result = await collection.insertOne(task);

      res.status(201).json({ message: 'Task added successfully', _id: result.insertedId });
    } catch (error) {
      console.error('Failed to add task:', error);
      res.status(500).json({ error: 'Failed to add task to MongoDB' });
    }
  } else {
    // Handle other HTTP methods or return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
