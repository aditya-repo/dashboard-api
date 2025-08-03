import VendorProfile from "../models/VendorProfile";

export const getAllVendorProfiles = async () => {
  return VendorProfile.find()
    .populate("categoryId", "name")
    .populate("subcategoryId", "name")
    .select("-password"); // Exclude password from the response
};

export const getVendorProfileById = async (id: string) => {
  return VendorProfile.findById(id)
    .populate("categoryId", "name")
    .populate("subcategoryId", "name")
    .select("-password");
};

export const updateVendorProfile = async (id: string, data: any) => {
  return VendorProfile.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteVendorProfile = async (id: string) => {
  return VendorProfile.findByIdAndDelete(id);
};
