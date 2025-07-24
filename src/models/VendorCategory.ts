import mongoose, { Schema, Document, Types } from "mongoose";
import { ISubcategory } from "./Subcategory";

export interface IVendorCategory extends Document {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  subcategories: Types.ObjectId[] | ISubcategory[];
}

const VendorCategorySchema = new Schema<IVendorCategory>(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
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
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true }
);

export const VendorCategory = mongoose.model<IVendorCategory>(
  "VendorCategory",
  VendorCategorySchema
);
