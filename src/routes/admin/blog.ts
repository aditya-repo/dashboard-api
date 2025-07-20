import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlogMeta,
  updateBlogContent,
} from "../../controllers/admin/blog";
import { body, param } from "express-validator";

const router = express.Router();

// Step 1: Create blog meta
router.post(
  "/create-meta",
  [
    body("title").isString().isLength({ min: 5, max: 150 }),
    body("author").isString().isLength({ min: 2, max: 50 }),
    body("metaTitle").isString().isLength({ min: 5, max: 70 }),
    body("metaDescription").isString().isLength({ min: 10, max: 160 }),
    body("metaKeywords").isArray(),
    body("slug")
      .isString()
      .matches(/^[a-z0-9-]+$/),
    body("status").optional().isIn(["draft", "published"]),
    body("image").optional().isString(),
  ],
  createBlogMeta
);
// Step 2: Add/update blog content
router.put(
  "/:id/content",
  [param("id").isMongoId(), body("content").isString().isLength({ min: 1 })],
  updateBlogContent
);

// Create a blog (full, legacy)
router.post(
  "/create",
  [
    body("title").isString().isLength({ min: 5, max: 150 }),
    body("author").isString().isLength({ min: 2, max: 50 }),
    body("metaTitle").isString().isLength({ min: 5, max: 70 }),
    body("metaDescription").isString().isLength({ min: 10, max: 160 }),
    body("metaKeywords").isArray(),
    body("slug")
      .isString()
      .matches(/^[a-z0-9-]+$/),
    body("status").optional().isIn(["draft", "published"]),
    body("image").optional().isString(),
    body("content").isString(),
  ],
  createBlog
);
// Get all blogs
router.get("/all", getAllBlogs);
// Get a single blog by ID
router.get("/:id", [param("id").isMongoId()], getBlogById);
// Update a blog
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().isString().isLength({ min: 5, max: 150 }),
    body("author").optional().isString().isLength({ min: 2, max: 50 }),
    body("metaTitle").optional().isString().isLength({ min: 5, max: 70 }),
    body("metaDescription")
      .optional()
      .isString()
      .isLength({ min: 10, max: 160 }),
    body("metaKeywords").optional().isArray(),
    body("slug")
      .optional()
      .isString()
      .matches(/^[a-z0-9-]+$/),
    body("status").optional().isIn(["draft", "published"]),
    body("image").optional().isString(),
    body("content").optional().isString(),
  ],
  updateBlog
);
// Delete a blog
router.delete("/:id", [param("id").isMongoId()], deleteBlog);

export default router;
