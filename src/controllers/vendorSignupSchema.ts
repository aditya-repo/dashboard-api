import { Request, Response } from "express";
import VendorField from "../models/VendorField";
import { VendorCategory } from "../models/VendorCategory";

// ✅ Controller to create a dynamic form field for a vendor category
export const createVendorFormField = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { vendorTypeId,
      fieldName,
      labelName,
      placeholder,
      fieldType,
      options,
      optional,
    } = req.body;

    // Check if vendor category exists
    const categoryExists = await VendorCategory.findById(vendorTypeId);
    if (!categoryExists) {
      res.status(404).json({ error: "Vendor category not found" });
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
    }

    // ✅ Create and save the new form field
    const newField = new VendorField({
      vendorTypeId,
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
