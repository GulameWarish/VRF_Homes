import mongoose from 'mongoose';
import CommercialCategory from '../models/CommercialCategory.js';
import { commercialData } from '../config/defaultData.js';

export const getCommercialCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: commercialData.length, data: commercialData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const categories = await CommercialCategory.find(query).sort({ sortOrder: 1, name: 1 });
    if (!categories || categories.length === 0) {
      return res.json({ success: true, count: commercialData.length, data: commercialData });
    }
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.json({ success: true, count: commercialData.length, data: commercialData });
  }
};

export const getCommercialCategoryBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const cat = commercialData.find(c => c.slug === req.params.slug) || commercialData[0];
      return res.json({ success: true, data: cat });
    }
    const category = await CommercialCategory.findOne({ slug: req.params.slug });
    if (!category) {
      const fallbackCat = commercialData.find(c => c.slug === req.params.slug);
      if (fallbackCat) return res.json({ success: true, data: fallbackCat });
      return res.status(404).json({ success: false, message: 'Commercial category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    const cat = commercialData.find(c => c.slug === req.params.slug) || commercialData[0];
    res.json({ success: true, data: cat });
  }
};

export const createCommercialCategory = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await CommercialCategory.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const category = await CommercialCategory.create({
      ...req.body,
      slug
    });

    res.status(201).json({ success: true, data: category, message: 'Commercial category created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCommercialCategory = async (req, res) => {
  try {
    const category = await CommercialCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Commercial category not found' });
    }
    res.json({ success: true, data: category, message: 'Commercial category updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCommercialCategory = async (req, res) => {
  try {
    const category = await CommercialCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Commercial category not found' });
    }
    res.json({ success: true, message: 'Commercial category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
