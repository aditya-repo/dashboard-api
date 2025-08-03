import express from "express";
import {
  getAllVendorProfiles,
  getVendorProfileById,
  updateVendorProfile,
  deleteVendorProfile,
} from "../../controllers/admin/vendorProfile";
import { param } from "express-validator";
import { handleValidationErrors } from "../../middlewares/validation";

const router = express.Router();

// Get all vendor profiles
router.get("/all", getAllVendorProfiles);

// Get a single vendor profile by ID
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid vendor ID")],
  handleValidationErrors,
  getVendorProfileById
);

// Update a vendor profile
router.put(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid vendor ID")],
  handleValidationErrors,
  updateVendorProfile
);

// Delete a vendor profile
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid vendor ID")],
  handleValidationErrors,
  deleteVendorProfile
);

export default router;
