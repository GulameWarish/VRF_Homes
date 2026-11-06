import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' },
  country: { type: String, default: 'India' },
  mapUrl: { type: String, default: '' }
}, { _id: false });

const websiteSettingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'VRF Homes' },
  tagline: { type: String, default: 'Advanced HVAC Solutions for Modern Living & Business' },
  heroHeadline: { type: String, default: 'Advanced HVAC Solutions for Modern Living & Business' },
  heroSubheading: { type: String, default: 'From luxury residences to large-scale commercial projects, we deliver reliable, efficient and intelligent air conditioning solutions.' },
  phone: { type: String, default: '+91 88969 21318' },
  secondaryPhone: { type: String, default: '+91 92206 01573' },
  whatsapp: { type: String, default: '+91 88969 21318' },
  email: { type: String, default: 'sales@shuklaenterprises.in' },
  salesEmail: { type: String, default: 'sales@shuklaenterprises.in' },
  
  registeredOffice: {
    type: officeSchema,
    default: () => ({
      title: 'Registered Office',
      address: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow - 226018, Uttar Pradesh, India',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226018',
      country: 'India',
      mapUrl: 'https://maps.google.com/?q=Unnao+Arcade+Building+5+Gautam+Buddha+Marg+Lucknow+226018'
    })
  },
  
  delhiOffice: {
    type: officeSchema,
    default: () => ({
      title: 'Delhi Office',
      address: '14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi, Delhi - 110059, India',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110059',
      country: 'India',
      mapUrl: 'https://maps.google.com/?q=14A+Uttam+Vihar+Block+F+Mahavir+Enclave+Part+3+Bindapur+New+Delhi+110059'
    })
  },

  keralaOffice: {
    type: officeSchema,
    default: () => ({
      title: 'Kerala State Office',
      address: 'First Floor, Building No. 18/143/08, St. Joseph Tower, Mannuthy Nadathara Road, Pattalamkunnu, Thrissur - 680655, Kerala, India',
      city: 'Thrissur',
      state: 'Kerala',
      pincode: '680655',
      country: 'India',
      mapUrl: 'https://maps.google.com/?q=St+Joseph+Tower+Mannuthy+Nadathara+Road+Pattalamkunnu+Thrissur+Kerala+680655'
    })
  },

  branches: {
    type: [String],
    default: [
      'New Delhi',
      'Mumbai',
      'Chennai',
      'Noida',
      'Kolkata',
      'Bangalore',
      'Chandigarh',
      'Ahmedabad',
      'Lucknow'
    ]
  },

  keralaLocations: {
    type: [String],
    default: [
      'Kottayam',
      'Kayamkulam',
      'Ernakulam',
      'Noornad',
      'Adoor',
      'Poojapura Trivandrum',
      'Marine Drive Kochi'
    ]
  },

  workingHours: { type: String, default: 'Mon - Sat: 9:00 AM - 7:00 PM' },
  stats: {
    completedProjects: { type: String, default: '650+' },
    residentialProjects: { type: String, default: '420+' },
    commercialProjects: { type: String, default: '230+' },
    yearsOfExperience: { type: String, default: '18+' },
    serviceLocations: { type: String, default: '16+ Locations' }
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    facebook: { type: String, default: 'https://facebook.com' },
    youtube: { type: String, default: 'https://youtube.com' },
    twitter: { type: String, default: 'https://twitter.com' }
  },
  footerAbout: { 
    type: String, 
    default: 'VRF Homes is a premier HVAC engineering & contracting enterprise providing specialized Variable Refrigerant Flow (VRF), Haier commercial ductable systems, central chillers, and precision cooling solutions across luxury residences, commercial complexes, and industrial facilities.' 
  },
  seoDefaultTitle: { type: String, default: 'VRF Homes | Advanced HVAC & Haier Commercial Duct AC Solutions' },
  seoDefaultDescription: { type: String, default: 'Premium HVAC solutions, Haier commercial ductable air conditioning, VRF systems across Delhi, UP, and Kerala (Kochi, Trivandrum, Kottayam, Ernakulam, Kayamkulam, Adoor, Noornad).' }
}, { timestamps: true });

const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
export default WebsiteSettings;
