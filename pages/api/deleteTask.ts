import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const db = await connectToMongoDB();
      const taskId = req.query.id;

      const collection = db.collection("tasks");
      const result = await collection.deleteOne({
        _id: new ObjectId(taskId as string),
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Failed to delete task:", error);
      return res
        .status(500)
        .json({ error: "Failed to delete task from MongoDB" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
