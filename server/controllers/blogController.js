import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import { blogsData } from '../config/defaultData.js';

export const getBlogs = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: blogsData.length, data: blogsData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 });
    if (!blogs || blogs.length === 0) {
      return res.json({ success: true, count: blogsData.length, data: blogsData });
    }
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.json({ success: true, count: blogsData.length, data: blogsData });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const blog = blogsData.find(b => b.slug === req.params.slug) || blogsData[0];
      return res.json({ success: true, data: blog });
    }
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      const fallback = blogsData.find(b => b.slug === req.params.slug);
      if (fallback) return res.json({ success: true, data: fallback });
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    const blog = blogsData.find(b => b.slug === req.params.slug) || blogsData[0];
    res.json({ success: true, data: blog });
  }
};

export const createBlog = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Article with this slug already exists' });
    }

    const blog = await Blog.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: blog, message: 'Blog post published successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog, message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
