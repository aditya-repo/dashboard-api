import { Blog, IBlog } from "../models/Blog";

export const createBlog = async (data: Partial<IBlog>) => {
  const blog = new Blog(data);
  return blog.save();
};

export const getAllBlogs = async () => {
  return Blog.find();
};

export const getBlogById = async (id: string) => {
  return Blog.findById(id);
};

export const updateBlog = async (id: string, data: Partial<IBlog>) => {
  return Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id: string) => {
  return Blog.findByIdAndDelete(id);
};

export const updateBlogContent = async (id: string, content: string) => {
  return Blog.findByIdAndUpdate(id, { content }, { new: true });
};
