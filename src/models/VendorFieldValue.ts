import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVendorFieldValue extends Document {
  _id: Types.ObjectId;
  vendorId: Types.ObjectId;
  fieldId: string;
  value: string;
}

const VendorFieldValueSchema: Schema = new Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  fieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorField",
    required: true,
  },
  value: { type: String, required: true },
});

export default mongoose.model<IVendorFieldValue>(
  "VendorFieldValue",
  VendorFieldValueSchema
);
