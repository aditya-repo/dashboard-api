import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHelpdeskTicket extends Document {
  vendorId: Types.ObjectId;
  issueType: "payment" | "profile" | "technical" | "other";
  subject: string;
  body: string;
  images: string[];
  status: "open" | "in_progress" | "resolved" | "closed";
  adminResponse?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const HelpdeskTicketSchema = new Schema<IHelpdeskTicket>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    issueType: {
      type: String,
      enum: ["payment", "profile", "technical", "other"],
      required: true,
    },
    subject: { type: String, required: true, minlength: 5, maxlength: 100 },
    body: { type: String, required: true, minlength: 10 },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    adminResponse: { type: String },
  },
  { timestamps: true }
);

export const HelpdeskTicket = mongoose.model<IHelpdeskTicket>(
  "HelpdeskTicket",
  HelpdeskTicketSchema
);
