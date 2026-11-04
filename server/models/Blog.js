import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'HVAC Articles',
      'Installation Guides',
      'Energy Saving Tips',
      'Residential HVAC Guides',
      'Commercial HVAC Guides',
      'Industry News',
      'Case Studies',
      'Maintenance Tips'
    ],
    default: 'HVAC Articles'
  },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Markdown / HTML supported
  featuredImage: { type: String, required: true },
  author: { type: String, default: 'VRF Homes Technical Team' },
  readTime: { type: String, default: '5 min read' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' }
}, { timestamps: true });

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text' });

export default mongoose.model('Blog', blogSchema);
