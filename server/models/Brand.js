import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  logo: { type: String, default: '' },
  description: { type: String, default: '' },
  categories: [{ type: String }],
  isPartner: { type: Boolean, default: false },
  authorizationNote: { type: String, default: 'Authorized sales and integration solutions partner' },
  website: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

brandSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Brand', brandSchema);
