import express from "express";
import {
  createVendorCategory,
  getAllVendorCategories,
} from "../controllers/vendorCategoryController";
import { createVendorFormField } from "../controllers/vendorSignupSchema";
import { addVendorFields, addVenueFields } from "../controllers/test";

const router = express.Router();

// Route to create a vendor category
router.post("/create", createVendorCategory);

router.post("/add-field", createVendorFormField);

// Route to get all vendor categories
router.get("/all", getAllVendorCategories);

router.get("/add-vendor", addVendorFields);
router.post("/add-venue", addVenueFields);

export default router;
