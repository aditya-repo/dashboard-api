import { Router } from "express";
import {
  createVendorCategory,
  getAllVendorCategories,
  createSubcategory,
  getAllSubcategories,
  getVendorCategoryWithSubcategories,
  updateCategory,
  updateSubcategory,
  createManager,
} from "../../controllers/admin/category";
import {
  createVendorFormField,
  getSubcategoryFormFields,
} from "../../controllers/vendorSignupSchema";

const router = Router();

router.post("/", createVendorCategory);
router.get("/", getAllVendorCategories);
router.post("/:categoryid/sub-categories", createSubcategory);
router.get("/subcategory", getAllSubcategories);
router.post("/form-field", createVendorFormField);
router.get("/form-fields", getSubcategoryFormFields);
router.get("/:idOrSlug", getVendorCategoryWithSubcategories);
router.put("/:categoryid/sub-categories/:id", updateSubcategory);
router.put("/:id", updateCategory);
router.post("/manager", createManager);

export default router;
