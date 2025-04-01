import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/mongodb"
import Entry from "@/app/models/Entry";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedEntry = await Entry.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedEntry);
  }

  if (req.method === "DELETE") {
    await Entry.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end(); // Method Not Allowed
}
