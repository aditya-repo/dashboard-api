import express from "express";
import { searchVendors, searchCities } from "../../controllers/public/vendor";
import {
  validateVendorSearch,
  validateCitySearch,
  handleValidationErrors,
} from "../../middlewares/validation";

const router = express.Router();

// Public vendor search routes (no authentication required)
router.get(
  "/search",
  validateVendorSearch,
  handleValidationErrors,
  searchVendors
);

// Public city search routes (no authentication required)
router.get(
  "/cities/search",
  validateCitySearch,
  handleValidationErrors,
  searchCities
);

export default router;
