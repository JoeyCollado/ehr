import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // or your MongoDB Atlas URI
const client = new MongoClient(uri);

const databaseName = "ehr_system";
const collectionName = "consultationEntries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    if (req.method === "GET") {
      const entries = await collection.find({}).toArray();
      return res.status(200).json(entries);
    }

    if (req.method === "POST") {
      const newEntry = req.body;
      const result = await collection.insertOne(newEntry);
      return res.status(201).json(result);
    }

    if (req.method === "PUT") {
      const { _id, ...updateData } = req.body;
      const result = await collection.updateOne({ _id }, { $set: updateData });
      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      const { _id } = req.body;
      const result = await collection.deleteOne({ _id });
      return res.status(200).json(result);
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
