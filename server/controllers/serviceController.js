import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { servicesData } from '../config/defaultData.js';

export const getServices = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: servicesData.length, data: servicesData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const services = await Service.find(query).sort({ sortOrder: 1, createdAt: -1 });
    if (!services || services.length === 0) {
      return res.json({ success: true, count: servicesData.length, data: servicesData });
    }
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.json({ success: true, count: servicesData.length, data: servicesData });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const service = servicesData.find(s => s.slug === req.params.slug) || servicesData[0];
      return res.json({ success: true, data: service });
    }
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      const fallback = servicesData.find(s => s.slug === req.params.slug);
      if (fallback) return res.json({ success: true, data: fallback });
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    const service = servicesData.find(s => s.slug === req.params.slug) || servicesData[0];
    res.json({ success: true, data: service });
  }
};

export const createService = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Service.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Service with this slug already exists' });
    }

    const service = await Service.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: service, message: 'Service created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service, message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
