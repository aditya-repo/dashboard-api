import { body, query } from "express-validator";

export const validateBasicInfo = [
  body("brandname")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("Brand name must be between 2-100 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("phone")
    .optional()
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be between 7-15 characters"),
  body("city")
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("City must be between 1-50 characters"),
  body("contactName")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("Contact person name must be between 2-50 characters"),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateAdditionalInfo = [
  body("whatsapp")
    .optional()
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage("WhatsApp number must be between 7-15 characters"),
  body("email2")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid secondary email address"),
  body("phone2")
    .optional()
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage("Secondary phone number must be between 7-15 characters"),
];

export const validateSocialMediaInfo = [
  body("website")
    .optional()
    .isURL()
    .withMessage("Please provide a valid website URL"),
  body("facebook")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Facebook URL"),
  body("instagram")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Instagram URL"),
  body("twitter")
    .optional()
    .isURL()
    .withMessage("Please provide a valid Twitter URL"),
  body("youtube")
    .optional()
    .isURL()
    .withMessage("Please provide a valid YouTube URL"),
];

export const validateContentMediaInfo = [
  body("description")
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage("Business description must be less than 1000 characters"),
  // Note: Image validation will be handled by multer middleware for file uploads
  // This validation is for when image is passed as a string (file path/name)
  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a valid file path"),
];

export const validateAddressInfo = [
  body("address.state")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2-50 characters"),
  body("address.district")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("District must be between 2-50 characters"),
  body("address.city")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2-50 characters"),
  body("address.pincode")
    .optional()
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be exactly 6 characters"),
  body("address.address")
    .optional()
    .isString()
    .isLength({ min: 10, max: 200 })
    .withMessage("Full address must be between 10-200 characters"),
  body("address.landmark")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("Landmark must be between 2-100 characters"),
];

// Public vendor search validation
export const validateVendorSearch = [
  query("query")
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1-100 characters"),
  query("category")
    .optional()
    .isString()
    .withMessage("Category must be a valid ObjectId"),
  query("subcategory")
    .optional()
    .isString()
    .withMessage("Subcategory must be a valid ObjectId"),
  query("city")
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("City must be between 1-50 characters"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1-100"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];
