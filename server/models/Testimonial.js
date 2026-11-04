import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  roleOrCompany: { type: String, required: true, trim: true }, // e.g. "Director, Apex Tech Park" or "Villa Owner, Sector 44"
  projectType: { type: String, default: 'Commercial' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  review: { type: String, required: true },
  image: { type: String, default: '' },
  isFeatured: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
