import { Router } from "express";
import {
  createVendorCategory,
  getAllVendorCategories,
  createSubcategory,
  getAllSubcategories,
} from "../../controllers/admin/category";

const router = Router();

router.post("/", createVendorCategory);
router.get("/", getAllVendorCategories);
router.post("/subcategory", createSubcategory);
router.get("/subcategory", getAllSubcategories);

export default router;
