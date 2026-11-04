import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true },
  category: { 
    type: String, 
    default: 'General',
    enum: ['General', 'Commercial', 'Residential', 'VRF Systems', 'Maintenance & AMC', 'Installation & Design']
  },
  isPublished: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

faqSchema.index({ question: 'text', answer: 'text' });

export default mongoose.model('FAQ', faqSchema);
