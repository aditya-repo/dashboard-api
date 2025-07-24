import { Request, Response } from "express";
import VendorField from "../models/VendorField";
import { VendorCategory } from "../models/VendorCategory";
import { Subcategory } from "../models/Subcategory";

// ✅ Controller to create a dynamic form field for a vendor category
export const createVendorFormField = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      subcategoryId, // required
      fieldName,
      labelName,
      placeholder,
      fieldType,
      options,
      optional,
    } = req.body;

    // Check if subcategoryId is provided and valid
    if (!subcategoryId) {
      res.status(400).json({ error: "subcategoryId is required" });
      return;
    }
    const subcategoryExists = await Subcategory.findById(subcategoryId);
    if (!subcategoryExists) {
      res.status(404).json({ error: "Subcategory not found" });
      return;
    }

    // Validate field type
    const validFieldTypes = [
      "text",
      "number",
      "email",
      "date",
      "checkbox",
      "radio",
      "select",
      "multiple_select",
    ];
    if (!validFieldTypes.includes(fieldType)) {
      res.status(400).json({ error: "Invalid field type" });
      return;
    }

    // Ensure options are provided for select, multiple_select, and radio fields
    if (
      ["select", "multiple_select", "radio"].includes(fieldType) &&
      (!options || options.length === 0)
    ) {
      res.status(400).json({
        error:
          "Options are required for select, multiple_select, and radio fields",
      });
      return;
    }

    // ✅ Create and save the new form field
    const newField = new VendorField({
      subcategoryId, // only subcategoryId
      fieldName,
      labelName,
      placeholder,
      fieldType,
      options,
      optional,
    });

    await newField.save();

    res.status(201).json({
      message: "Form field added successfully!",
      field: newField,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error adding form field" });
  }
};

export const getSubcategoryFormFields = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subcategoryId } = req.query;
    if (!subcategoryId) {
      res.status(400).json({ error: "subcategoryId is required" });
      return;
    }
    const fields = await VendorField.find({ subcategoryId });
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form fields" });
  }
};
