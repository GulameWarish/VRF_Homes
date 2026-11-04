import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, authorize('admin', 'manager'), createBlog);
router.put('/:id', protect, authorize('admin', 'manager'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

export default router;
