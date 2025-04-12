import mongoose, { Schema, Document } from "mongoose";

export interface IVendorCategory extends Document {
  name: string;
  description?: string;
}

const VendorCategorySchema = new Schema<IVendorCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IVendorCategory>(
  "VendorCategory",
  VendorCategorySchema
);
