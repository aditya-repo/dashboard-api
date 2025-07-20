import { Request, Response } from "express";
import * as vendorCategoryService from "../../services/vendorCategory.service";

function generateCategoryId(index: number) {
  return `CT${String(index).padStart(2, "0")}`;
}

function generateSubcategoryId(index: number) {
  return `SCT${String(index).padStart(2, "0")}`;
}

export const createVendorCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, slug, description, subcategories } = req.body;
    const existingCategory = await vendorCategoryService.findCategoryByName(
      name
    );
    if (existingCategory) {
      res.status(400).json({ error: "Category already exists" });
      return;
    }
    // Generate categoryId based on count
    const count = (await vendorCategoryService.getAllCategories()).length + 1;
    const categoryId = generateCategoryId(count);
    const newCategory = await vendorCategoryService.createCategory(
      categoryId,
      name,
      slug,
      description,
      subcategories
    );
    res.status(201).json({
      message: "Vendor category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating vendor category" });
  }
};

export const getAllVendorCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await vendorCategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor categories" });
  }
};

export const createSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, slug, description, status, categoryid } = req.body;

    console.log(req.body);
    
    // Generate subcategoryId based on count
    const count =
      (await vendorCategoryService.getAllSubcategories(categoryid)).length + 1;
    const subcategoryId = generateSubcategoryId(count);
    const newSubcategory = await vendorCategoryService.createSubcategory(
      subcategoryId,
      name,
      slug,
      description,
      status,
      categoryid
    );
    res.status(201).json({
      message: "Subcategory created successfully!",
      subcategory: newSubcategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating subcategory" });
  }
};

export const getAllSubcategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) {
      res.status(400).json({ error: "categoryId is required" });
      return;
    }
    const subcategories = await vendorCategoryService.getAllSubcategories(
      categoryId as string
    );
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subcategories" });
  }
};
