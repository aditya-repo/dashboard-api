import { Request, Response } from "express";
import VendorProfile from "../../models/VendorProfile";
import {
  generateVendorTokens,
  verifyRefreshToken,
  revokeRefreshToken,
} from "../../utils/tokenUtils";

export const signupVendor = async (req: Request, res: Response) => {
  try {
    const {
      brandName,
      email,
      password,
      city,
      vendorCategory,
      subCategory,
      phone,
    } = req.body;

    // Check if email already exists
    const existingVendor = await VendorProfile.findOne({ email });
    if (existingVendor) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    // Create vendor profile
    const vendorProfile = new VendorProfile({
      brandname: brandName,
      email,
      password, // TODO: hash password in production
      city,
      categoryId: vendorCategory,
      subcategoryId: subCategory[0], // Take the first subcategory from the array
      phone,
      status: "active", // Changed from "pending" to "active"
    });
    await vendorProfile.save();

    // Generate tokens with signup tracking
    const tokens = await generateVendorTokens(
      vendorProfile._id.toString(),
      vendorProfile.email,
      req
    );

    // Populate city for response
    const populatedVendor = await VendorProfile.findById(
      vendorProfile._id
    ).populate("city", "cityname");

    res.status(201).json({
      message: "Vendor registered successfully!",
      data: {
        vendor: {
          id: vendorProfile._id,
          brandname: vendorProfile.brandname,
          email: vendorProfile.email,
          phone: vendorProfile.phone,
          city:
            typeof populatedVendor?.city === "object" &&
            populatedVendor?.city !== null
              ? (populatedVendor.city as any).cityname
              : populatedVendor?.city,
          status: vendorProfile.status,
          contactName: vendorProfile.contactName,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          tokenType: "Bearer",
        },
      },
    });
  } catch (error) {
    console.error("Vendor signup error:", error);
    res.status(500).json({
      error: "Error signing up vendor",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const loginVendor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find vendor by email
    const vendor = await VendorProfile.findOne({ email }).populate(
      "city",
      "cityname"
    );
    if (!vendor) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Check password (TODO: implement proper password hashing comparison)
    if (vendor.password !== password) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Check if vendor is active
    if (vendor.status !== "active") {
      res.status(403).json({
        error: "Account not active",
        details: "Your account is pending approval or has been suspended",
      });
      return;
    }

    // Generate tokens with login tracking
    const tokens = await generateVendorTokens(
      vendor._id.toString(),
      vendor.email,
      req
    );

    res.status(200).json({
      message: "Login successful!",
      data: {
        vendor: {
          id: vendor._id,
          brandname: vendor.brandname,
          email: vendor.email,
          phone: vendor.phone,
          city:
            typeof vendor.city === "object" && vendor.city !== null
              ? (vendor.city as any).cityname
              : vendor.city,
          status: vendor.status,
          contactName: vendor.contactName,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          tokenType: "Bearer",
        },
      },
    });
  } catch (error) {
    console.error("Vendor login error:", error);
    res.status(500).json({
      error: "Error logging in vendor",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    // Verify refresh token
    const decoded = await verifyRefreshToken(refreshToken);

    if (!decoded) {
      res.status(401).json({ error: "Invalid or expired refresh token" });
      return;
    }

    // Check if user is vendor
    if (decoded.role !== "vendor") {
      res.status(403).json({ error: "Invalid token type" });
      return;
    }

    // Verify vendor still exists and is active
    const vendor = await VendorProfile.findById(decoded.id);
    if (!vendor) {
      res.status(401).json({ error: "Vendor not found" });
      return;
    }

    if (vendor.status !== "active") {
      res.status(403).json({
        error: "Account not active",
        details: "Your account is pending approval or has been suspended",
      });
      return;
    }

    // Generate new tokens with login tracking
    const tokens = await generateVendorTokens(
      vendor._id.toString(),
      vendor.email,
      req
    );

    res.status(200).json({
      message: "Token refreshed successfully!",
      data: {
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          tokenType: "Bearer",
        },
      },
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      error: "Error refreshing token",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const logoutVendor = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    // Revoke the refresh token
    const revoked = await revokeRefreshToken(refreshToken);

    if (!revoked) {
      res.status(404).json({ error: "Refresh token not found" });
      return;
    }

    res.status(200).json({
      message: "Logout successful!",
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    console.error("Vendor logout error:", error);
    res.status(500).json({
      error: "Error logging out vendor",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
