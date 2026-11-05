import mongoose from 'mongoose';
import Feature from '../models/Feature.js';
import { featuresData } from '../config/defaultData.js';

export const getFeatures = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: featuresData.length, data: featuresData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const features = await Feature.find(query).sort({ sortOrder: 1, createdAt: 1 });
    if (!features || features.length === 0) {
      return res.json({ success: true, count: featuresData.length, data: featuresData });
    }
    res.json({ success: true, count: features.length, data: features });
  } catch (error) {
    res.json({ success: true, count: featuresData.length, data: featuresData });
  }
};

export const createFeature = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Feature.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Feature with this slug already exists' });
    }

    const feature = await Feature.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: feature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Feature not found' });
    }
    res.json({ success: true, data: feature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Feature not found' });
    }
    res.json({ success: true, message: 'Feature removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
