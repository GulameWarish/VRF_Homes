import express from 'express';
import {
  getPublicProjects,
  getPublicProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicProjects);
router.get('/detail/:slug', getPublicProjectBySlug);

// Admin routes
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminProjects);
router.post('/', protect, authorize('admin', 'manager'), createProject);
router.put('/:id', protect, authorize('admin', 'manager'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

export default router;
