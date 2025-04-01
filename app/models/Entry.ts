import mongoose, { Schema, Document } from "mongoose";

export interface IEntry extends Document {
  consultReportID: string;
  patientID: string;
  consultingProvider: string;
  findings: string;
  recomendations: string;
  reportDate: string;
  followUpActions: string;
}

const EntrySchema = new Schema<IEntry>({
  consultReportID: { type: String, required: true },
  patientID: { type: String, required: true },
  consultingProvider: { type: String, required: true },
  findings: { type: String, required: true },
  recomendations: { type: String, required: true },
  reportDate: { type: String, required: true },
  followUpActions: { type: String, required: true },
});

export default mongoose.models.Entry || mongoose.model<IEntry>("Entry", EntrySchema);
