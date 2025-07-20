import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  slug: string;
  image: string; // URL or file path
  status: "draft" | "published";
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    content: { type: String, default: "", trim: true },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    publishDate: { type: Date, default: Date.now },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 160,
    },
    metaKeywords: [{ type: String, trim: true, maxlength: 30 }],
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },
    image: { type: String, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
