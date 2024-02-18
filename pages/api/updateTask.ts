import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "../../lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
      try {
        // Destructure _id and the rest of the data from the request body
        const { _id, ...updateData } = req.body;

        console.log(_id, updateData, "update data");
  
        // Check if _id is provided, return an error if not
        if (!_id) {
          return res.status(400).json({ error: "Task ID is required for updating." });
        }
  
        // Connect to the database
        const db = await connectToMongoDB();
        const collection = db.collection("tasks");
  
        // Convert _id from string to ObjectId for MongoDB query
        const filter = { _id: new ObjectId(_id) };
        const update = { $set: updateData };
        
        // Perform the update operation
        const result = await collection.updateOne(filter, update);
  
        // Check if the task was found and updated, return an error if not
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Task not found." });
        }
  
        // Respond with success message
        res.status(200).json({ message: "Task updated successfully" });
      } catch (error) {
        console.error("Failed to update task:", error);
        res.status(500).json({ error: "Failed to update task in MongoDB" });
      }
    } else {
      // Return method not allowed for other HTTP methods
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }