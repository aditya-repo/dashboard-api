import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRefreshToken extends Document {
  _id: Types.ObjectId;
  token: string;
  userId: string;
  userType: "vendor" | "admin";
  isRevoked: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["vendor", "admin"],
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ userId: 1, userType: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export default mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema); 