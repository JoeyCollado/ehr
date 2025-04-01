import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/mongodb"
import Entry from "@/app/models/Entry";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    const entries = await Entry.find({});
    return res.status(200).json(entries);
  } else if (req.method === "POST") {
    const newEntry = await Entry.create(req.body);
    return res.status(201).json(newEntry);
  }
  
  res.status(405).end(); // Method Not Allowed
}
