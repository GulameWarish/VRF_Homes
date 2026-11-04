import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'VRF Air Conditioning Systems',
      'Central Air Conditioning Systems',
      'Ductable AC',
      'Cassette AC',
      'Split AC',
      'Tower AC',
      'Concealed AC',
      'Chiller Systems',
      'Air Handling Units (AHU)',
      'Fan Coil Units (FCU)',
      'Ventilation Systems',
      'Fresh Air Systems',
      'HVAC Accessories',
      'Smart AC Control Systems'
    ]
  },
  tagline: { type: String, default: '' },
  image: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  applications: [{ type: String }],
  keyFeatures: [{ type: String }],
  technicalSpecs: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  relatedBrands: [{ type: String }],
  brochureUrl: { type: String, default: '' },
  capacityRange: { type: String, default: '' },
  efficiencyRating: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', category: 'text' });

export default mongoose.model('Product', productSchema);
