import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILoginSession extends Document {
  _id: Types.ObjectId;
  userId: string;
  userType: "vendor" | "admin";
  refreshTokenId: Types.ObjectId; // Reference to RefreshToken
  ipAddress: string;
  userAgent: string;
  deviceInfo: {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    device: string;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  location: {
    country?: string;
    region?: string;
    city?: string;
    timezone?: string;
  };
  loginMethod: "email" | "social" | "otp";
  loginStatus: "success" | "failed" | "blocked";
  loginAttempts: number;
  sessionStart: Date;
  sessionEnd?: Date;
  lastActivity: Date;
  isActive: boolean;
  logoutReason?:
    | "user_logout"
    | "token_expired"
    | "admin_revoked"
    | "security_breach";
  metadata: {
    referrer?: string;
    language?: string;
    screenResolution?: string;
    timezone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const LoginSessionSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["vendor", "admin"],
      required: true,
    },
    refreshTokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RefreshToken",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    deviceInfo: {
      browser: String,
      browserVersion: String,
      os: String,
      osVersion: String,
      device: String,
      isMobile: Boolean,
      isTablet: Boolean,
      isDesktop: Boolean,
    },
    location: {
      country: String,
      region: String,
      city: String,
      timezone: String,
    },
    loginMethod: {
      type: String,
      enum: ["email", "social", "otp"],
      default: "email",
    },
    loginStatus: {
      type: String,
      enum: ["success", "failed", "blocked"],
      default: "success",
    },
    loginAttempts: {
      type: Number,
      default: 1,
    },
    sessionStart: {
      type: Date,
      default: Date.now,
    },
    sessionEnd: {
      type: Date,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    logoutReason: {
      type: String,
      enum: [
        "user_logout",
        "token_expired",
        "admin_revoked",
        "security_breach",
      ],
    },
    metadata: {
      referrer: String,
      language: String,
      screenResolution: String,
      timezone: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
LoginSessionSchema.index({ userId: 1, userType: 1 });
LoginSessionSchema.index({ refreshTokenId: 1 });
LoginSessionSchema.index({ isActive: 1 });
LoginSessionSchema.index({ sessionStart: 1 });
LoginSessionSchema.index({ ipAddress: 1 });

export default mongoose.model<ILoginSession>(
  "LoginSession",
  LoginSessionSchema
);
