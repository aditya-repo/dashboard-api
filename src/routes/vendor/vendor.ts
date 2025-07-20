import express from "express";
import {
  signupVendor,
  getVendorFormFields,
  submitVendorDetails,
} from "../../controllers/vendor/vendor";
import { body, query } from "express-validator";

const router = express.Router();

// Vendor signup
router.post(
  "/signup",
  [
    body("name").isString().isLength({ min: 2, max: 50 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("businessName").isString().isLength({ min: 2, max: 100 }),
    body("vendorTypeId").isMongoId(),
    body("phone").optional().isString().isLength({ min: 7, max: 15 }),
    body("location").optional().isString().isLength({ min: 2, max: 100 }),
  ],
  signupVendor
);
// Get dynamic form fields for vendor
router.get(
  "/form-fields",
  [query("vendorId").isMongoId()],
  getVendorFormFields
);
// Submit additional vendor details
router.post(
  "/details",
  [
    body("vendorId").isMongoId(),
    body("fieldValues").isArray({ min: 1 }),
    body("fieldValues.*.fieldId").isMongoId(),
    body("fieldValues.*.value").isString().notEmpty(),
  ],
  submitVendorDetails
);

export default router;
