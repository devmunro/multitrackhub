import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../lib/db'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            console.log('Delete task')
            const db = await connectToMongoDB();
            const taskId = req.query.id; 

            const collection = db.collection('tasks');
            const result = await collection.deleteOne({ _id: taskId });

            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task deleted successfully' });
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
            res.status(500).json({ error: 'Failed to delete task from MongoDB' });
        }
    } else {
        // Handle other HTTP methods or return a 405 Method Not Allowed error
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}