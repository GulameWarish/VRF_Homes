import mongoose from 'mongoose';

const commercialCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  tagline: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  introduction: { type: String, default: '' },
  overview: { type: String, default: '' },
  challenges: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'AlertCircle' }
  }],
  solutions: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'CheckCircle2' }
  }],
  suitableProducts: [{ type: String }],
  benefits: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    metric: { type: String, default: '' }
  }],
  gallery: [{ type: String }],
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  seoKeywords: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

commercialCategorySchema.index({ name: 'text', introduction: 'text', overview: 'text' });

export default mongoose.model('CommercialCategory', commercialCategorySchema);
