import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  permissions: {
    user?: "read" | "write" | "none";
    category?: "read" | "write" | "none";
    blog?: "read" | "write" | "none";
    eInvites?: "read" | "write" | "none";
    article?: "read" | "write" | "none";
    helpdesk?: "read" | "write" | "none";
  };
  createdAt?: Date;
}

const ClientSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
  permissions: {
    user: { type: String, enum: ["read", "write", "none"], default: "none" },
    category: {
      type: String,
      enum: ["read", "write", "none"],
      default: "none",
    },
    blog: { type: String, enum: ["read", "write", "none"], default: "none" },
    eInvites: {
      type: String,
      enum: ["read", "write", "none"],
      default: "none",
    },
    article: { type: String, enum: ["read", "write", "none"], default: "none" },
    helpdesk: {
      type: String,
      enum: ["read", "write", "none"],
      default: "none",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model<IClient>("Managers", ClientSchema);

export default Client;
