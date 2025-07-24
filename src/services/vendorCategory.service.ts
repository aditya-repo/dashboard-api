import { VendorCategory, IVendorCategory } from "../models/VendorCategory";
import { Subcategory, ISubcategory } from "../models/Subcategory";
import mongoose from "mongoose";

export const findCategoryByName = async (name: string) => {
  return VendorCategory.findOne({ name });
};

export const createCategory = async (
  categoryId: string,
  name: string,
  slug: string,
  description?: string,
  subcategories: string[] = []
) => {
  const newCategory = new VendorCategory({
    categoryId,
    name,
    slug,
    description,
    subcategories,
  });
  return newCategory.save();
};

export const getAllCategories = async () => {
  return VendorCategory.find().populate("subcategories");
};

export const createSubcategory = async (
  subcategoryId: string,
  name: string,
  slug: string,
  description: string,
  status: boolean,
  categoryid: string | mongoose.Types.ObjectId
) => {
  const categoryObjectId =
    typeof categoryid === "string"
      ? new mongoose.Types.ObjectId(categoryid)
      : categoryid;
  const newSubcategory = new Subcategory({
    subcategoryId,
    name,
    slug,
    description,
    status,
    categoryid: categoryObjectId,
  });
  const savedSubcategory = await newSubcategory.save();
  // Add subcategory to category's subcategories array
  await VendorCategory.findByIdAndUpdate(categoryObjectId, {
    $push: { subcategories: savedSubcategory._id },
  });
  return savedSubcategory;
};

export const getAllSubcategories = async (
  categoryId: string | mongoose.Types.ObjectId
) => {
  const categoryObjectId =
    typeof categoryId === "string"
      ? new mongoose.Types.ObjectId(categoryId)
      : categoryId;
  return Subcategory.find({ categoryid: categoryObjectId });
};

export const getCategoryWithSubcategories = async (idOrSlug: string) => {
  // Try to find by _id or slug
  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  return VendorCategory.findOne(query).populate("subcategories");
};

export const getNextSubcategoryId = async () => {
  // Find the subcategory with the highest subcategoryId
  const lastSubcategory = await Subcategory.findOne({})
    .sort({ subcategoryId: -1 })
    .lean();
  if (!lastSubcategory || !lastSubcategory.subcategoryId) {
    return "SCT01";
  }
  // Extract the numeric part and increment
  const match = lastSubcategory.subcategoryId.match(/SCT(\d+)/);
  const nextNumber = match ? parseInt(match[1], 10) + 1 : 1;
  return `SCT${String(nextNumber).padStart(2, "0")}`;
};

export const updateCategory = async (
  id: string,
  update: Partial<IVendorCategory>
) => {
  // Allow update by _id or categoryId
  const query = id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: id }
    : { categoryId: id };
  return VendorCategory.findOneAndUpdate(query, update, { new: true });
};

export const updateSubcategory = async (
  id: string,
  update: Partial<ISubcategory>
) => {
  // Allow update by _id or subcategoryId
  const query = id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: id }
    : { subcategoryId: id };
  return Subcategory.findOneAndUpdate(query, update, { new: true });
};
