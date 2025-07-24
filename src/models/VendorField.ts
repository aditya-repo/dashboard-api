import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVendorField extends Document {
  _id: Types.ObjectId;
  fieldName: string;
  labelName: string;
  placeholder?: string;
  fieldType:
    | "text"
    | "number"
    | "email"
    | "date"
    | "checkbox"
    | "radio"
    | "select"
    | "multiple_select";
  options?: string[];
  optional: boolean;
  subcategoryId?: Types.ObjectId;
}

const VendorFieldSchema: Schema = new Schema({
  fieldName: { type: String, required: true },
  labelName: { type: String, required: true },
  placeholder: { type: String },
  fieldType: {
    type: String,
    enum: [
      "text",
      "number",
      "email",
      "date",
      "checkbox",
      "radio",
      "select",
      "multiple_select",
    ],
    required: true,
  },
  options: { type: [String], default: [] },
  optional: { type: Boolean, default: false },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: false,
  },
});

export default mongoose.model<IVendorField>("VendorField", VendorFieldSchema);
