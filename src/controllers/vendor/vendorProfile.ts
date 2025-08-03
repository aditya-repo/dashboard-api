import { Request, Response } from "express";
import VendorProfile from "../../models/VendorProfile";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../../types/auth";

export const getBasicInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId)
      .populate("city", "cityname")
      .select(
        "brandname email phone city contactName whatsapp email2 phone2 website facebook instagram twitter youtube description image address"
      );

    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    res.status(200).json({
      message: "Profile data fetched successfully",
      data: {
        // Basic Info
        brandname: vendor.brandname,
        email: vendor.email,
        phone: vendor.phone,
        city:
          typeof vendor.city === "object" && vendor.city !== null
            ? (vendor.city as any).cityname
            : vendor.city,
        contactName: vendor.contactName,

        // Additional Info
        whatsapp: vendor.whatsapp,
        email2: vendor.email2,
        phone2: vendor.phone2,

        // Social Media Info
        website: vendor.website,
        facebook: vendor.facebook,
        instagram: vendor.instagram,
        twitter: vendor.twitter,
        youtube: vendor.youtube,

        // Content Media Info
        description: vendor.description,
        image: vendor.image,

        // Address Info
        address: vendor.address,

        // Password is not returned for security
      },
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({
      error: "Error fetching profile data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateBasicInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;
    const { brandname, email, phone, city, contactName, password } = req.body;

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // Check if email is being updated and if it already exists
    if (email && email !== vendor.email) {
      const existingVendor = await VendorProfile.findOne({ email });
      if (existingVendor) {
        res
          .status(400)
          .json({ error: "Email already registered with another vendor" });
        return;
      }
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    if (brandname !== undefined) updateData.brandname = brandname;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (city !== undefined) updateData.city = city;
    if (contactName !== undefined) updateData.contactName = contactName;
    if (password !== undefined) updateData.password = password; // TODO: Hash password in production

    // Update vendor profile
    const updatedVendor = await VendorProfile.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("city", "cityname")
      .select("brandname email phone city contactName");

    res.status(200).json({
      message: "Basic info updated successfully",
      data: {
        brandname: updatedVendor?.brandname,
        email: updatedVendor?.email,
        phone: updatedVendor?.phone,
        city:
          typeof updatedVendor?.city === "object" &&
          updatedVendor?.city !== null
            ? (updatedVendor.city as any).cityname
            : updatedVendor?.city,
        contactName: updatedVendor?.contactName,
      },
    });
  } catch (error) {
    console.error("Error updating basic info:", error);
    res.status(500).json({
      error: "Error updating basic info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateAdditionalInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;
    const { whatsapp, email2, phone2 } = req.body;

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp;
    if (email2 !== undefined) updateData.email2 = email2;
    if (phone2 !== undefined) updateData.phone2 = phone2;

    // Update vendor profile
    const updatedVendor = await VendorProfile.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, runValidators: true }
    ).select("whatsapp email2 phone2");

    res.status(200).json({
      message: "Additional info updated successfully",
      data: {
        whatsapp: updatedVendor?.whatsapp,
        email2: updatedVendor?.email2,
        phone2: updatedVendor?.phone2,
      },
    });
  } catch (error) {
    console.error("Error updating additional info:", error);
    res.status(500).json({
      error: "Error updating additional info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateSocialMediaInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;
    const { website, facebook, instagram, twitter, youtube } = req.body;

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    if (website !== undefined) updateData.website = website;
    if (facebook !== undefined) updateData.facebook = facebook;
    if (instagram !== undefined) updateData.instagram = instagram;
    if (twitter !== undefined) updateData.twitter = twitter;
    if (youtube !== undefined) updateData.youtube = youtube;

    // Update vendor profile
    const updatedVendor = await VendorProfile.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, runValidators: true }
    ).select("website facebook instagram twitter youtube");

    res.status(200).json({
      message: "Social media info updated successfully",
      data: {
        website: updatedVendor?.website,
        facebook: updatedVendor?.facebook,
        instagram: updatedVendor?.instagram,
        twitter: updatedVendor?.twitter,
        youtube: updatedVendor?.youtube,
      },
    });
  } catch (error) {
    console.error("Error updating social media info:", error);
    res.status(500).json({
      error: "Error updating social media info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateContentMediaInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;
    const { description } = req.body;

    // Handle image file upload
    let imagePath = undefined;
    if (req.file) {
      imagePath = req.file.filename; // Store the uploaded file name
    } else if (req.body.image) {
      imagePath = req.body.image; // If image is passed as string (existing path)
    }

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // Prepare update data with only provided fields
    const updateData: any = {};
    if (description !== undefined) updateData.description = description;
    if (imagePath !== undefined) updateData.image = imagePath;

    // Update vendor profile
    const updatedVendor = await VendorProfile.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, runValidators: true }
    ).select("description image");

    res.status(200).json({
      message: "Content media info updated successfully",
      data: {
        description: updatedVendor?.description,
        image: updatedVendor?.image,
      },
    });
  } catch (error) {
    console.error("Error updating content media info:", error);
    res.status(500).json({
      error: "Error updating content media info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateAddressInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const vendorId = req.user?.id;
    const { address } = req.body;

    if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
      res.status(401).json({ error: "Invalid vendor ID from token" });
      return;
    }

    const vendor = await VendorProfile.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // Prepare update data with only provided address fields
    const updateData: any = {};
    if (address) {
      updateData.address = {};
      if (address.state !== undefined) updateData.address.state = address.state;
      if (address.district !== undefined)
        updateData.address.district = address.district;
      if (address.city !== undefined) updateData.address.city = address.city;
      if (address.pincode !== undefined)
        updateData.address.pincode = address.pincode;
      if (address.address !== undefined)
        updateData.address.address = address.address;
      if (address.landmark !== undefined)
        updateData.address.landmark = address.landmark;
    }

    // Update vendor profile
    const updatedVendor = await VendorProfile.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, runValidators: true }
    ).select("address");

    res.status(200).json({
      message: "Address info updated successfully",
      data: {
        address: updatedVendor?.address,
      },
    });
  } catch (error) {
    console.error("Error updating address info:", error);
    res.status(500).json({
      error: "Error updating address info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
