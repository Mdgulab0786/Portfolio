import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  project_type?: string;
  status: "new" | "read";
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  budget: { type: String },
  timeline: { type: String },
  project_type: { type: String },
  status: { type: String, enum: ["new", "read"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
