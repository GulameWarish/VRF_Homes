import Project from '../models/Project.js';

// Public list with filters
export const getPublicProjects = async (req, res) => {
  try {
    const { category, type, limit = 50, page = 1 } = req.query;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public single project detail
export const getPublicProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isPublic: true })
      .select('-adminNotes -fullAddress');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Get related projects
    const relatedProjects = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
      isPublic: true
    }).select('-adminNotes -fullAddress').limit(3);

    res.json({
      success: true,
      data: project,
      relatedProjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all projects (including private notes, addresses, all statuses)
export const getAdminProjects = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { hvacSystem: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } }
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create project
export const createProject = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Project.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Project with this title or slug already exists' });
    }

    const projectData = {
      ...req.body,
      slug,
      activityHistory: [{
        status: req.body.status || 'Enquiry Received',
        note: 'Project initialized in system',
        changedBy: req.user ? req.user.name : 'Admin',
        timestamp: new Date()
      }]
    };

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update project
export const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if status changed to log activity history
    if (req.body.status && req.body.status !== existing.status) {
      existing.activityHistory.push({
        status: req.body.status,
        note: req.body.statusChangeNote || `Status changed from ${existing.status} to ${req.body.status}`,
        changedBy: req.user ? req.user.name : 'Admin',
        timestamp: new Date()
      });
    }

    // If marked Completed and no actualCompletionDate, auto-set if provided or use body date
    if (req.body.status === 'Completed' && !req.body.actualCompletionDate && !existing.actualCompletionDate) {
      req.body.actualCompletionDate = new Date();
    }

    Object.assign(existing, req.body);
    await existing.save();

    res.json({ success: true, data: existing, message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
