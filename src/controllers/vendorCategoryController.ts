import { Request, Response } from "express";
import VendorCategory from "../models/VendorCategory";

export const createVendorCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await VendorCategory.findOne({ name });
    console.log(existingCategory);

    if (existingCategory) {
      res.status(400).json({ error: "Category already exists" });
      return;
    }

    // Create new category
    const newCategory = new VendorCategory({ name, description });
    await newCategory.save();

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
    const categories = await VendorCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor categories" });
  }
};
