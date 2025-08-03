import express from "express";
import {
  signupVendor,
  loginVendor,
  refreshToken,
  logoutVendor,
} from "../../controllers/vendor/vendorSignup";
import {
  validateVendorSignup,
  validateVendorLogin,
  handleValidationErrors,
} from "../../middlewares/validation";

const router = express.Router();

// Vendor signup
router.post(
  "/signup",
  validateVendorSignup,
  handleValidationErrors,
  signupVendor
);

// Vendor login
router.post("/login", validateVendorLogin, handleValidationErrors, loginVendor);

// Refresh token
router.post("/refresh-token", refreshToken);

// Logout
router.post("/logout", logoutVendor);

export default router;
