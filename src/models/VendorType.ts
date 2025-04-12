import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVendorType extends Document {
  _id: Types.ObjectId;
  name: string;
}

const VendorTypeSchema: Schema = new Schema({
  name: { type: String, unique: true, required: true },
});

export default mongoose.model<IVendorType>("VendorType", VendorTypeSchema);
