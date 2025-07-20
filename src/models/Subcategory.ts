import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubcategory extends Document {
  subcategoryId: string;
  name: string;
  slug: string;
  description?: string;
  status: boolean;
  categoryid: Types.ObjectId;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    subcategoryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: { type: String, trim: true, maxlength: 200 },
    status: { type: Boolean, default: true },
    categoryid: {
      type: Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subcategory = mongoose.model<ISubcategory>(
  "Subcategory",
  SubcategorySchema
);
