import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  icon: { type: String, default: 'Zap' },
  badge: { type: String, default: '' },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  bulletPoints: [{ type: String }],
  benefits: [{
    title: { type: String },
    description: { type: String }
  }],
  image: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

featureSchema.index({ title: 'text', shortDescription: 'text' });

export default mongoose.model('Feature', featureSchema);
