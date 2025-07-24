import { Request, Response } from "express";
import Vendor from "../../models/Vendor";
import Client from "../../models/Manager";
import VendorType from "../../models/VendorType";
import VendorField from "../../models/VendorField";
import VendorFieldValue from "../../models/VendorFieldValue";
import { Types } from "mongoose";

export const signupVendor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      vendorTypeId,
      phone,
      location,
    } = req.body;
    // Check if email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }
    // Create client
    const client = new Client({ name, email, password }); // TODO: hash password in production
    await client.save();
    // Create vendor
    const vendor = new Vendor({
      userId: client._id,
      vendorTypeId,
      businessName,
      location,
      phone,
    });
    await vendor.save();
    res.status(201).json({
      message: "Vendor registered successfully!",
      vendorId: vendor._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error signing up vendor" });
  }
};

export const getVendorFormFields = async (req: Request, res: Response) => {
  try {
    // Assume vendorId is available from auth/session (for demo, from query)
    const vendorId = req.query.vendorId as string;
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ error: "Invalid vendor ID" });
      return;
    }
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    const fields = await VendorField.find({
      vendorTypeId: vendor.vendorTypeId,
    });
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form fields" });
  }
};

export const submitVendorDetails = async (req: Request, res: Response) => {
  try {
    const { vendorId, fieldValues } = req.body;
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ error: "Invalid vendor ID" });
      return;
    }
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    // Fetch expected fields
    const expectedFields = await VendorField.find({
      vendorTypeId: vendor.vendorTypeId,
    });
    const expectedFieldIds = expectedFields.map((f: any) => f._id.toString());
    // Validate provided fields
    const validFields = fieldValues.filter(
      (f: { fieldId: string; value: string }) =>
        expectedFieldIds.includes(f.fieldId)
    );
    if (validFields.length !== fieldValues.length) {
      res.status(400).json({ error: "Some provided fields are not valid" });
      return;
    }
    // Save field values
    await VendorFieldValue.insertMany(
      validFields.map((f: { fieldId: string; value: string }) => ({
        vendorId: new Types.ObjectId(vendorId),
        fieldId: new Types.ObjectId(f.fieldId),
        value: f.value,
      }))
    );
    res.status(201).json({ message: "Vendor details submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting vendor details" });
  }
};
