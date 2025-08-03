import express from "express";
import { authenticateToken } from "../../middlewares/auth";
import { vendorProfileUpload } from "../../middlewares/upload";
import {
  getBasicInfo,
  updateBasicInfo,
  updateAdditionalInfo,
  updateSocialMediaInfo,
  updateContentMediaInfo,
  updateAddressInfo,
} from "../../controllers/vendor/vendorProfile";
import {
  validateBasicInfo,
  validateAdditionalInfo,
  validateSocialMediaInfo,
  validateContentMediaInfo,
  validateAddressInfo,
  handleValidationErrors,
} from "../../middlewares/validation";

const router = express.Router();

// Single GET endpoint for all profile data
router.get("/basic-info", authenticateToken, getBasicInfo);

// PATCH endpoints for updating specific sections
router.patch(
  "/basic-info",
  authenticateToken,
  validateBasicInfo,
  handleValidationErrors,
  updateBasicInfo
);

router.patch(
  "/additional-info",
  authenticateToken,
  validateAdditionalInfo,
  handleValidationErrors,
  updateAdditionalInfo
);

router.patch(
  "/social-media-info",
  authenticateToken,
  validateSocialMediaInfo,
  handleValidationErrors,
  updateSocialMediaInfo
);

// Content media info with file upload support
router.patch(
  "/content-media-info",
  authenticateToken,
  vendorProfileUpload.single("image"), // Handle single image upload
  validateContentMediaInfo,
  handleValidationErrors,
  updateContentMediaInfo
);

router.patch(
  "/address-info",
  authenticateToken,
  validateAddressInfo,
  handleValidationErrors,
  updateAddressInfo
);

export default router;
