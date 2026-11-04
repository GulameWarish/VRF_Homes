import Feature from '../models/Feature.js';

export const getFeatures = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const features = await Feature.find(query).sort({ sortOrder: 1, createdAt: 1 });
    res.json({ success: true, count: features.length, data: features });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.json({ success: true, message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
