import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Commercial HVAC Solutions',
      'Residential HVAC Solutions',
      'HVAC Design & Heat Load Calculation',
      'Installation & Commissioning',
      'Annual Maintenance Contract (AMC)',
      'Energy Auditing & Retrofitting'
    ],
    default: 'Commercial HVAC Solutions'
  },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  icon: { type: String, default: 'Wind' },
  image: { type: String, default: '' },
  features: [{ type: String }],
  deliverables: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

serviceSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text', category: 'text' });

export default mongoose.model('Service', serviceSchema);
