import mongoose, { Document, Schema, Types } from "mongoose";

export interface IVendor extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  vendorTypeId: Types.ObjectId;
  businessName: string;
  location?: string;
  phone?: string;
  createdAt?: Date;
}

const VendorSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  vendorTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorType",
    required: true,
  },
  businessName: { type: String, required: true },
  location: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVendor>("Vendor", VendorSchema);
