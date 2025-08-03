import { query } from "express-validator";

export const validateCitySearch = [
  query("query")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "Query parameter is required and must be between 1-50 characters"
    ),
];
