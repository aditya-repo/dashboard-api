import { Request, Response } from "express";
import * as blogService from "../../services/blog.service";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ message: "Blog created successfully!", blog });
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
};

export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json({ message: "Blog updated successfully!", blog });
  } catch (error) {
    res.status(500).json({ error: "Error updating blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog" });
  }
};

export const createBlogMeta = async (req: Request, res: Response) => {
  try {
    const metaFields = (({
      title,
      author,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords,
      slug,
      image,
      status,
    }) => ({
      title,
      author,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords,
      slug,
      image,
      status,
    }))(req.body);
    const blog = await blogService.createBlog(metaFields);
    res.status(201).json({ message: "Blog meta created successfully!", blog });
  } catch (error) {
    res.status(500).json({ error: "Error creating blog meta" });
  }
};

export const updateBlogContent = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: "Content is required" });
      return;
    }
    const blog = await blogService.updateBlogContent(req.params.id, content);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Blog content updated successfully!", blog });
  } catch (error) {
    res.status(500).json({ error: "Error updating blog content" });
  }
};
