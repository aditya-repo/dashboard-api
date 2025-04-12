import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

export default Client;
