import mongoose, { Document, Schema, Types } from "mongoose";

export interface IVendorProfile extends Document {
  _id: Types.ObjectId;
  brandname: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerifiedStatus: boolean;
  password: string;
  city: Types.ObjectId;
  categoryId: Types.ObjectId;
  subcategoryId: Types.ObjectId;
  contactName: string;
  whatsapp: string;
  email2: string;
  phone2: string;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  description: string;
  image: string; // This will store the file path/name after upload
  address: {
    state: string;
    district: string;
    city: string;
    pincode: string;
    address: string;
    landmark: string;
  };
  status: string;
  badge: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VendorProfileSchema: Schema = new Schema(
  {
    brandname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    phoneVerifiedStatus: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    contactName: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    email2: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone2: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    address: {
      state: {
        type: String,
        required: false,
        trim: true,
      },
      district: {
        type: String,
        required: false,
        trim: true,
      },
      city: {
        type: String,
        required: false,
        trim: true,
      },
      pincode: {
        type: String,
        required: false,
        trim: true,
      },
      address: {
        type: String,
        required: false,
        trim: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "suspended"],
      default: "pending",
    },
    badge: {
      type: String,
      enum: ["verified", "premium", "featured", "new", ""],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVendorProfile>(
  "VendorProfile",
  VendorProfileSchema
);
