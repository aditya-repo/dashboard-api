import { VendorCategory, IVendorCategory } from "../models/VendorCategory";
import { Subcategory, ISubcategory } from "../models/Subcategory";

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
  categoryid: string
) => {
  const newSubcategory = new Subcategory({
    subcategoryId,
    name,
    slug,
    description,
    status,
    categoryid,
  });
  const savedSubcategory = await newSubcategory.save();
  // Add subcategory to category's subcategories array
  await VendorCategory.findByIdAndUpdate(categoryid, {
    $push: { subcategories: savedSubcategory._id },
  });
  return savedSubcategory;
};

export const getAllSubcategories = async (categoryId: string) => {
  return Subcategory.find({ category: categoryId });
};
