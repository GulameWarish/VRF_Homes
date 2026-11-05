import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { projectsData } from '../config/defaultData.js';

// Public list with filters
export const getPublicProjects = async (req, res) => {
  try {
    const { category, type, limit = 50, page = 1 } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...projectsData];
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (type) {
        filtered = filtered.filter(p => p.projectType === type);
      }
      const total = filtered.length;
      const skip = (Number(page) - 1) * Number(limit);
      return res.json({
        success: true,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)) || 1,
        data: filtered.slice(skip, skip + Number(limit))
      });
    }

    const query = { isPublic: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (type) {
      query.projectType = type;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Project.countDocuments(query);
    
    // Select only public-safe fields
    const projects = await Project.find(query)
      .select('-adminNotes -fullAddress')
      .sort({ actualCompletionDate: -1, startDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: projects
    });
  } catch (error) {
    let filtered = [...projectsData];
    const { category, type, limit = 50, page = 1 } = req.query;
    if (category && category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (type) filtered = filtered.filter(p => p.projectType === type);
    const total = filtered.length;
    const skip = (Number(page) - 1) * Number(limit);
    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
      data: filtered.slice(skip, skip + Number(limit))
    });
  }
};

// Public single project detail
export const getPublicProjectBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const project = projectsData.find(p => p.slug === req.params.slug) || projectsData[0];
      return res.json({ success: true, data: project });
    }
    const project = await Project.findOne({ slug: req.params.slug, isPublic: true })
      .select('-adminNotes -fullAddress');
    
    if (!project) {
      const fallback = projectsData.find(p => p.slug === req.params.slug);
      if (fallback) return res.json({ success: true, data: fallback });
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    const project = projectsData.find(p => p.slug === req.params.slug) || projectsData[0];
    res.json({ success: true, data: project });
  }
};

// Admin list
export const getAdminProjects = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        total: projectsData.length,
        page: 1,
        pages: 1,
        data: projectsData
      });
    }
    const { category, projectType, clientName, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (projectType && projectType !== 'All') query.projectType = projectType;
    if (clientName) query.clientName = { $regex: clientName, $options: 'i' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
        { locationCity: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: projects
    });
  } catch (error) {
    res.json({
      success: true,
      total: projectsData.length,
      page: 1,
      pages: 1,
      data: projectsData
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Project.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Project with this slug already exists' });
    }

    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
