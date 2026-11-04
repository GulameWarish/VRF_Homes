import express from 'express';
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature
} from '../controllers/featureController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFeatures);
router.post('/', protect, authorize('admin', 'manager'), createFeature);
router.put('/:id', protect, authorize('admin', 'manager'), updateFeature);
router.delete('/:id', protect, authorize('admin'), deleteFeature);

export default router;
