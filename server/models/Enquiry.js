import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  mobile: { type: String, required: true, trim: true },
  enquiryType: { 
    type: String, 
    default: 'New Installation',
    enum: [
      'New Installation',
      'AC Replacement',
      'HVAC Design',
      'Commercial Project',
      'Residential Project',
      'Repair & Maintenance',
      'Annual Maintenance Contract',
      'General Enquiry'
    ]
  },
  segment: { 
    type: String, 
    enum: ['Commercial', 'Residential', 'General'],
    default: 'Commercial'
  },
  propertyType: { type: String, default: '' },
  serviceRequired: { type: String, default: '' },
  productInterest: { type: String, default: '' },
  city: { type: String, required: true, trim: true },
  pincode: { type: String, default: '', trim: true },
  projectSize: { type: String, default: '' }, // e.g., '4,500 sq ft'
  message: { type: String, default: '' },
  attachment: { type: String, default: '' },
  leadSource: { type: String, default: 'Website Quote Form' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Follow-up', 'Quotation Sent', 'Converted', 'Lost'],
    default: 'New'
  },
  followUpDate: { type: Date },
  internalNotes: { type: String, default: '' },
  assignedTo: { type: String, default: '' },
  ipAddress: { type: String, default: '' }
}, { timestamps: true });

enquirySchema.index({ fullName: 'text', email: 'text', mobile: 'text', city: 'text' });

export default mongoose.model('Enquiry', enquirySchema);
