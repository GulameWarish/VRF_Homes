import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  targetDate: { type: Date },
  completedDate: { type: Date },
  isCompleted: { type: Boolean, default: false }
}, { _id: true });

const activityHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  note: { type: String, default: '' },
  changedBy: { type: String, default: 'Admin' },
  timestamp: { type: Date, default: Date.now }
}, { _id: true });

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  clientName: { type: String, default: '' }, // Admin internal; can be masked or private
  projectType: { 
    type: String, 
    required: true, 
    enum: ['Commercial', 'Residential'],
    default: 'Commercial'
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Commercial', 'Residential', 'Industrial', 'Hospitality', 'Healthcare', 'Corporate', 'Retail', 'Education']
  },
  location: { type: String, required: true }, // e.g., 'Noida, Sector 44'
  fullAddress: { type: String, default: '' }, // Private / internal
  hvacSystem: { type: String, required: true }, // e.g. 'Carrier XPower VRF High-Efficiency System'
  brand: { type: String, default: '' },
  capacity: { type: String, default: '' }, // e.g. '120 HP'
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  gallery: [{ type: String }],
  startDate: { type: Date, required: true },
  expectedCompletionDate: { type: Date },
  actualCompletionDate: { type: Date },
  status: { 
    type: String, 
    required: true,
    enum: [
      'Enquiry Received',
      'Site Inspection',
      'Quotation Sent',
      'Approval Pending',
      'Approved',
      'Work Scheduled',
      'Work In Progress',
      'Installation Completed',
      'Testing & Commissioning',
      'Completed',
      'On Hold',
      'Cancelled'
    ],
    default: 'Completed'
  },
  assignedTeam: { type: String, default: '' },
  adminNotes: { type: String, default: '' }, // Strictly internal
  completionNotes: { type: String, default: '' },
  
  // Public Display Visibility Toggles
  isPublic: { type: Boolean, default: true },
  showCompletionDatePublicly: { type: Boolean, default: true },
  showStartDatePublicly: { type: Boolean, default: true },
  showStatusPublicly: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },

  milestones: [milestoneSchema],
  activityHistory: [activityHistorySchema],

  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

projectSchema.index({ name: 'text', location: 'text', hvacSystem: 'text', description: 'text' });

export default mongoose.model('Project', projectSchema);
