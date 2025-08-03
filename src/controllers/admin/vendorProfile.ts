import { Request, Response } from "express";
import * as vendorProfileService from "../../services/vendorProfile.service";

export const getAllVendorProfiles = async (_req: Request, res: Response) => {
  try {
    const vendors = await vendorProfileService.getAllVendorProfiles();
    res.status(200).json({
      message: "Vendors fetched successfully",
      count: vendors.length,
      vendors: vendors,
    });
  } catch (error) {
    console.error("Error fetching vendor profiles:", error);
    res.status(500).json({
      error: "Error fetching vendor profiles",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVendorProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await vendorProfileService.getVendorProfileById(id);

    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    res.status(200).json({
      message: "Vendor fetched successfully",
      vendor: vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    res.status(500).json({
      error: "Error fetching vendor profile",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateVendorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const vendor = await vendorProfileService.updateVendorProfile(
      id,
      updateData
    );

    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    res.status(200).json({
      message: "Vendor updated successfully",
      vendor: vendor,
    });
  } catch (error) {
    console.error("Error updating vendor profile:", error);
    res.status(500).json({
      error: "Error updating vendor profile",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteVendorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await vendorProfileService.deleteVendorProfile(id);

    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }

    res.status(200).json({
      message: "Vendor deleted successfully",
      vendorId: id,
    });
  } catch (error) {
    console.error("Error deleting vendor profile:", error);
    res.status(500).json({
      error: "Error deleting vendor profile",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
