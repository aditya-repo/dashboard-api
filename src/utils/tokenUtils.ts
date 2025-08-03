import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import RefreshToken from "../models/RefreshToken";
import LoginSession from "../models/LoginSession";
import { getRequestInfo } from "./deviceUtils";
import { Request } from "express";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// JWT Secret keys (should be in environment variables in production)
const ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_SECRET || "your-access-secret-key";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

// Token expiration times
const ACCESS_TOKEN_EXPIRY = "24h"; // 24 hours
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

/**
 * Generate access token and refresh token for a user
 * @param payload - User data to encode in token
 * @returns Object containing accessToken, refreshToken, and expiresIn
 */
export const generateTokens = (payload: TokenPayload): TokenResponse => {
  // Generate access token
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  // Generate refresh token
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  // Calculate expiration time in seconds
  const expiresIn = 15 * 60; // 15 minutes in seconds

  return {
    accessToken,
    refreshToken,
    expiresIn,
  };
};

/**
 * Verify access token
 * @param token - Access token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Verify refresh token with server-side validation
 * @param token - Refresh token to verify
 * @returns Promise<TokenPayload | null>
 */
export const verifyRefreshToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    // First verify JWT signature
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;

    // Then check if token exists in database and is not revoked
    const refreshTokenDoc = await RefreshToken.findOne({
      token: token,
      isRevoked: false,
    });

    if (!refreshTokenDoc) {
      return null; // Token not found or revoked
    }

    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Generate tokens for vendor with server-side refresh token storage and login tracking
 * @param vendorId - Vendor ID
 * @param email - Vendor email
 * @param req - Express request object for tracking
 * @returns Promise<TokenResponse>
 */
export const generateVendorTokens = async (
  vendorId: string,
  email: string,
  req?: Request
): Promise<TokenResponse> => {
  const payload: TokenPayload = {
    id: vendorId,
    email: email,
    role: "vendor",
  };

  const tokens = generateTokens(payload);

  // Store refresh token in database
  const refreshTokenDoc = new RefreshToken({
    token: tokens.refreshToken,
    userId: vendorId,
    userType: "vendor",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  await refreshTokenDoc.save();

  // Create login session if request object is provided
  if (req) {
    const requestInfo = getRequestInfo(req);

    const loginSession = new LoginSession({
      userId: vendorId,
      userType: "vendor",
      refreshTokenId: refreshTokenDoc._id,
      ipAddress: requestInfo.ipAddress,
      userAgent: requestInfo.userAgent,
      deviceInfo: requestInfo.deviceInfo,
      location: requestInfo.location,
      loginMethod: "email",
      loginStatus: "success",
      sessionStart: new Date(),
      lastActivity: new Date(),
      isActive: true,
    });

    await loginSession.save();
  }

  return tokens;
};

/**
 * Generate tokens for admin
 * @param adminId - Admin ID
 * @param email - Admin email
 * @returns Token response object
 */
export const generateAdminTokens = (
  adminId: string,
  email: string
): TokenResponse => {
  const payload: TokenPayload = {
    id: adminId,
    email: email,
    role: "admin",
  };

  return generateTokens(payload);
};

/**
 * Revoke a specific refresh token and end login session
 * @param token - Refresh token to revoke
 * @param logoutReason - Reason for logout
 * @returns Promise<boolean> - true if revoked, false if not found
 */
export const revokeRefreshToken = async (
  token: string,
  logoutReason:
    | "user_logout"
    | "token_expired"
    | "admin_revoked"
    | "security_breach" = "user_logout"
): Promise<boolean> => {
  try {
    // Find the refresh token
    const refreshToken = await RefreshToken.findOne({ token: token });
    if (!refreshToken) {
      return false;
    }

    // Revoke the refresh token
    await RefreshToken.updateOne({ token: token }, { isRevoked: true });

    // End the login session
    await LoginSession.updateOne(
      { refreshTokenId: refreshToken._id },
      {
        isActive: false,
        sessionEnd: new Date(),
        logoutReason: logoutReason,
      }
    );

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Revoke all refresh tokens for a user
 * @param userId - User ID
 * @param userType - User type (vendor/admin)
 * @returns Promise<number> - Number of tokens revoked
 */
export const revokeAllUserTokens = async (
  userId: string,
  userType: "vendor" | "admin"
): Promise<number> => {
  try {
    const result = await RefreshToken.updateMany(
      { userId: userId, userType: userType },
      { isRevoked: true }
    );
    return result.modifiedCount;
  } catch (error) {
    return 0;
  }
};

/**
 * Get all active refresh tokens for a user
 * @param userId - User ID
 * @param userType - User type (vendor/admin)
 * @returns Promise<IRefreshToken[]>
 */
export const getUserActiveTokens = async (
  userId: string,
  userType: "vendor" | "admin"
): Promise<any[]> => {
  try {
    return await RefreshToken.find({
      userId: userId,
      userType: userType,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    }).select("token createdAt expiresAt");
  } catch (error) {
    return [];
  }
};

/**
 * Get user's active login sessions with detailed information
 * @param userId - User ID
 * @param userType - User type (vendor/admin)
 * @returns Promise<ILoginSession[]>
 */
export const getUserActiveSessions = async (
  userId: string,
  userType: "vendor" | "admin"
): Promise<any[]> => {
  try {
    return await LoginSession.find({
      userId: userId,
      userType: userType,
      isActive: true,
    })
      .populate("refreshTokenId", "token expiresAt")
      .select("ipAddress deviceInfo sessionStart lastActivity loginMethod")
      .sort({ sessionStart: -1 });
  } catch (error) {
    return [];
  }
};

/**
 * Update session last activity
 * @param refreshTokenId - Refresh token ID
 * @returns Promise<boolean>
 */
export const updateSessionActivity = async (
  refreshTokenId: string
): Promise<boolean> => {
  try {
    await LoginSession.updateOne(
      { refreshTokenId: refreshTokenId },
      { lastActivity: new Date() }
    );
    return true;
  } catch (error) {
    return false;
  }
};
