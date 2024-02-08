import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const db = await connectToMongoDB(); 
      console.log('Connected to MongoDB');
  
  
      res.status(200).json({ message: 'Data fetched successfully' });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }