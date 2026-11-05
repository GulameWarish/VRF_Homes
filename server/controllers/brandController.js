import mongoose from 'mongoose';
import Brand from '../models/Brand.js';
import { brandsData } from '../config/defaultData.js';

export const getBrands = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: brandsData.length, data: brandsData });
    }
    const query = req.query.all === 'true' ? {} : { isActive: true };
    const brands = await Brand.find(query).sort({ sortOrder: 1, name: 1 });
    if (!brands || brands.length === 0) {
      return res.json({ success: true, count: brandsData.length, data: brandsData });
    }
    res.json({ success: true, count: brands.length, data: brands });
  } catch (error) {
    res.json({ success: true, count: brandsData.length, data: brandsData });
  }
};

export const createBrand = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Brand.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Brand with this slug already exists' });
    }

    const brand = await Brand.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: brand, message: 'Brand added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, data: brand, message: 'Brand updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, message: 'Brand removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
