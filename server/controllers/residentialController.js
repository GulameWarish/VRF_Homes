import mongoose from 'mongoose';
import ResidentialCategory from '../models/ResidentialCategory.js';
import { residentialData } from '../config/defaultData.js';

export const getResidentialCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: residentialData.length, data: residentialData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const categories = await ResidentialCategory.find(query).sort({ sortOrder: 1, name: 1 });
    if (!categories || categories.length === 0) {
      return res.json({ success: true, count: residentialData.length, data: residentialData });
    }
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.json({ success: true, count: residentialData.length, data: residentialData });
  }
};

export const getResidentialCategoryBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const cat = residentialData.find(c => c.slug === req.params.slug) || residentialData[0];
      return res.json({ success: true, data: cat });
    }
    const category = await ResidentialCategory.findOne({ slug: req.params.slug });
    if (!category) {
      const fallbackCat = residentialData.find(c => c.slug === req.params.slug);
      if (fallbackCat) return res.json({ success: true, data: fallbackCat });
      return res.status(404).json({ success: false, message: 'Residential category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    const cat = residentialData.find(c => c.slug === req.params.slug) || residentialData[0];
    res.json({ success: true, data: cat });
  }
};

export const createResidentialCategory = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await ResidentialCategory.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const category = await ResidentialCategory.create({
      ...req.body,
      slug
    });

    res.status(201).json({ success: true, data: category, message: 'Residential category created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResidentialCategory = async (req, res) => {
  try {
    const category = await ResidentialCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Residential category not found' });
    }
    res.json({ success: true, data: category, message: 'Residential category updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResidentialCategory = async (req, res) => {
  try {
    const category = await ResidentialCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Residential category not found' });
    }
    res.json({ success: true, message: 'Residential category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
