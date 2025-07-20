import { Request, Response } from "express";
import * as vendorService from "../../services/vendor.service";

export const createVendor = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorService.createVendor(req.body);
    res.status(201).json({ message: "Vendor created successfully!", vendor });
  } catch (error) {
    res.status(500).json({ error: "Error creating vendor" });
  }
};

export const getAllVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await vendorService.getAllVendors();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendors" });
  }
};

export const getVendorById = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor" });
  }
};

export const updateVendor = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorService.updateVendor(req.params.id, req.body);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    res.status(200).json({ message: "Vendor updated successfully!", vendor });
  } catch (error) {
    res.status(500).json({ error: "Error updating vendor" });
  }
};

export const deleteVendor = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorService.deleteVendor(req.params.id);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    res.status(200).json({ message: "Vendor deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting vendor" });
  }
};
