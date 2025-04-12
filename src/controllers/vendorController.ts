import { Request, Response } from "express";
import { Types } from "mongoose"; // ✅ Properly handle ObjectIds
import Vendor from "../models/Vendor";
import VendorFieldValue, {
  IVendorFieldValue,
} from "../models/VendorFieldValue";
import VendorField from "../models/VendorField";
import Client from "../models/Client";

export const signupVendor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, vendorTypeId, businessName, location, phone } = req.body;

    // ✅ Validate userId as a MongoDB ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    // ✅ Check if user exists (email validation)
    const existingUser = await Client.findById(userId);
    if (!existingUser) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // ✅ Check if phone number or userId already exists
    const existingVendor = await Vendor.findOne({
      $or: [{ userId: new Types.ObjectId(userId) }, { phone }],
    });

    if (existingVendor) {
      res
        .status(400)
        .json({ error: "Vendor with this email or phone already exists" });
      return;
    }

    // ✅ Create and save new vendor
    const newVendor = new Vendor({
      userId,
      vendorTypeId,
      businessName,
      location,
      phone,
    });
    await newVendor.save();

    res.status(201).json({
      message: "Vendor registered successfully!",
      vendorId: newVendor._id,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Error signing up vendor" });
  }
};

export const fillVendorDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { vendorId, fieldValues } = req.body;

    // ✅ Validate vendorId
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ error: "Invalid vendor ID" });
      return;
    }

    // ✅ Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    // ✅ Fetch expected fields for the vendor's type
    const expectedFields = await VendorField.find({
      vendorTypeId: vendor.vendorTypeId,
    });
    const expectedFieldIds = expectedFields.map((field) =>
      field._id.toString()
    );

    // ✅ Validate provided fields
    const validFields = fieldValues.filter(
      (field: { fieldId: string; value: string }) =>
        expectedFieldIds.includes(field.fieldId)
    );

    if (validFields.length !== fieldValues.length) {
      res.status(400).json({ error: "Some provided fields are not valid" });
      return;
    }

    // ✅ Save field values
    await VendorFieldValue.insertMany(
      validFields.map((field: IVendorFieldValue) => ({
        vendorId: new Types.ObjectId(vendorId),
        fieldId: new Types.ObjectId(field.fieldId),
        value: field.value,
      }))
    );

    res.status(201).json({ message: "Vendor details submitted successfully!" });
  } catch (error) {
    console.error("Fill Vendor Details Error:", error);
    res.status(500).json({ error: "Error submitting vendor details" });
  }
};
