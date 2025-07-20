import express from "express";
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "../../controllers/admin/vendor";
import { body, param } from "express-validator";

const router = express.Router();

// Create a vendor
router.post(
  "/create",
  [
    body("userId").isMongoId(),
    body("vendorTypeId").isMongoId(),
    body("businessName").isString().isLength({ min: 2, max: 100 }),
    body("location").optional().isString().isLength({ min: 2, max: 100 }),
    body("phone").optional().isString().isLength({ min: 7, max: 15 }),
  ],
  createVendor
);
// Get all vendors
router.get("/all", getAllVendors);
// Get a single vendor by ID
router.get("/:id", [param("id").isMongoId()], getVendorById);
// Update a vendor
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("userId").optional().isMongoId(),
    body("vendorTypeId").optional().isMongoId(),
    body("businessName").optional().isString().isLength({ min: 2, max: 100 }),
    body("location").optional().isString().isLength({ min: 2, max: 100 }),
    body("phone").optional().isString().isLength({ min: 7, max: 15 }),
  ],
  updateVendor
);
// Delete a vendor
router.delete("/:id", [param("id").isMongoId()], deleteVendor);

export default router;
