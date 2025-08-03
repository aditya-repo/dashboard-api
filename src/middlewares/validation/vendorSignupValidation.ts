import { body } from "express-validator";

export const validateVendorSignup = [
  body("brandName")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Brand name is required and must be between 1-100 characters"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("city").isString().isLength({ min: 1 }).withMessage("City is required"),

  body("vendorCategory")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Vendor category is required"),

  body("subCategory")
    .isArray({ min: 1 })
    .withMessage("Sub category must be an array with at least one item"),

  body("subCategory.*")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Each sub category item must be a valid string"),

  body("phone")
    .isString()
    .isLength({ min: 1, max: 15 })
    .withMessage(
      "Phone number is required and must be between 1-15 characters"
    ),
];

export const validateVendorLogin = [
  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Password is required"),
];
