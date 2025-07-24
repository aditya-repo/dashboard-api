import { Request, Response } from "express";
import * as vendorCategoryService from "../../services/vendorCategory.service";
import mongoose from "mongoose";
import Client from "../../models/Manager";

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
    const { name, slug, description } = req.body;
    const existingCategory = await vendorCategoryService.findCategoryByName(
      name
    );
    if (existingCategory) {
      console.log("Category already exists");
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
      description
    );
    res.status(201).json({
      message: "Vendor category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
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
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedCategory = await vendorCategoryService.updateCategory(
      id,
      update
    );
    if (!updatedCategory) {
      res.status(404).json({ error: "Vendor category not found" });
      return;
    }
    res.status(200).json({
      message: "Vendor category updated successfully!",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating vendor category" });
  }
};

export const createSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, slug, description, status } = req.body;
    const { categoryid } = req.params;
    const categoryObjectId = new mongoose.Types.ObjectId(categoryid);

    // Generate a unique subcategoryId
    const subcategoryId = await vendorCategoryService.getNextSubcategoryId();
    const newSubcategory = await vendorCategoryService.createSubcategory(
      subcategoryId,
      name,
      slug,
      description,
      status,
      categoryObjectId
    );
    res.status(201).json({
      message: "Subcategory created successfully!",
      subcategory: newSubcategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    console.error("Request body:", req.body);
    console.error("Request params:", req.params);
    res.status(500).json({
      error: "Error creating subcategory",
      details: (error as Error).message,
    });
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

export const updateSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const update = req.body;
    console.log("update", update);
    const updatedSubcategory = await vendorCategoryService.updateSubcategory(
      id,
      update
    );
    if (!updatedSubcategory) {
      res.status(404).json({ error: "Subcategory not found" });
      return;
    }
    res.status(200).json({
      message: "Subcategory updated successfully!",
      subcategory: updatedSubcategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating subcategory" });
  }
};

export const getVendorCategoryWithSubcategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idOrSlug } = req.params;
    const category = await vendorCategoryService.getCategoryWithSubcategories(
      idOrSlug
    );
    if (!category) {
      res.status(404).json({ error: "Vendor category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor category" });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, name, username, email, password, status, permissions } =
      req.body;
    // Basic validation (add more as needed)
    if (!userId || !name || !username || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    // Check for existing userId, username, or email
    const existing = await Client.findOne({
      $or: [{ userId }, { username }, { email }],
    });
    if (existing) {
      res.status(400).json({
        error: "User with this ID, username, or email already exists",
      });
      return;
    }
    const newManager = new Client({
      userId,
      name,
      username,
      email,
      password, // In production, hash the password!
      status,
      permissions,
    });
    await newManager.save();
    res
      .status(201)
      .json({ message: "Manager created successfully!", user: newManager });
  } catch (error) {
    res.status(500).json({ error: "Error creating manager" });
  }
};
