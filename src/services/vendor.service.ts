import Vendor, { IVendor } from "../models/Vendor";
import Client from "../models/Manager";
import VendorType from "../models/VendorType";
import { Types } from "mongoose";

export const createVendor = async (data: Partial<IVendor>) => {
  const vendor = new Vendor(data);
  return vendor.save();
};

export const getAllVendors = async () => {
  return Vendor.find().populate("userId").populate("vendorTypeId");
};

export const getVendorById = async (id: string) => {
  return Vendor.findById(id).populate("userId").populate("vendorTypeId");
};

export const updateVendor = async (id: string, data: Partial<IVendor>) => {
  return Vendor.findByIdAndUpdate(id, data, { new: true })
    .populate("userId")
    .populate("vendorTypeId");
};

export const deleteVendor = async (id: string) => {
  return Vendor.findByIdAndDelete(id);
};
