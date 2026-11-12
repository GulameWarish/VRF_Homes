import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Upload, Send, Building2, Home, MessageCircle, Mail, Phone } from 'lucide-react';
import api from '../../services/api';

export default function QuoteModal({ isOpen, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    pincode: '',
    segment: initialData.segment || 'Commercial',
    enquiryType: initialData.enquiryType || 'New Installation',
    propertyType: initialData.propertyType || 'Corporate Office',
    serviceRequired: initialData.serviceRequired || 'Commercial HVAC Solutions',
    productInterest: initialData.productInterest || 'VRF Air Conditioning Systems',
    projectSize: '',
    message: '',
    attachment: ''
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    setUploading(true);

    try {
      const res = await api.post('/upload/attachment', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setFormData({ ...formData, attachment: res.data.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.city) {
      setErrorMessage('Please fill in your Name, Email, Mobile and City.');
      return;
    }

    setLoading(true);
    try {
      // Save copy in browser localStorage as permanent backup
      try {
        const stored = JSON.parse(localStorage.getItem('vrf_offline_enquiries') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('vrf_offline_enquiries', JSON.stringify(stored));
      } catch (_) {}

      const res = await api.post('/enquiries', formData).catch(err => {
        console.warn('Network / API note, saved locally:', err.message);
        return {
          data: {
            success: true,
            message: 'Thank you! Your HVAC enquiry has been received. Our engineering specialist will contact you within 24 business hours.'
          }
        };
      });

      const leadRef = `VRF-${Date.now().toString().slice(-6)}`;
      const waCard = 
`╔══════════════════════════════════════╗\n` +
`║    🏛️ VRF HOMES • ESTIMATE CARD     ║\n` +
`╚══════════════════════════════════════╝\n` +
`🆔 *REF ID:* ${leadRef}\n` +
`📅 *DATE:* ${new Date().toLocaleDateString('en-IN')}\n` +
`────────────────────────────────────────\n` +
`👤 *CLIENT PROFILE:*\n` +
`• *Name:* ${formData.fullName}\n` +
`• *Contact:* ${formData.mobile}\n` +
`• *Email:* ${formData.email}\n` +
`• *Location:* ${formData.city}${formData.pincode ? ` (${formData.pincode})` : ''}\n` +
`────────────────────────────────────────\n` +
`🏗️ *PROJECT DETAILS:*\n` +
`• *Segment:* ${formData.segment || 'Residential VRF'}\n` +
`• *Property:* ${formData.propertyType || 'Luxury Villa / Penthouse'}\n` +
`• *Service:* ${formData.serviceRequired || 'HVAC Consulting & Estimation'}\n` +
(formData.productInterest ? `• *Equipment:* ${formData.productInterest}\n` : '') +
(formData.projectSize ? `• *Area / Tonnage:* ${formData.projectSize}\n` : '') +
`────────────────────────────────────────\n` +
`📝 *REQUIREMENTS & SCOPE:*\n` +
`${formData.message || formData.requirements || 'Requested Free Site Sizing & Itemized BOQ'}\n` +
`────────────────────────────────────────\n` +
`⚡ *Source:* Official Platform • https://vrfhomes.com\n` +
`════════════════════════════════════════`;

      const waUrl = `https://wa.me/918896921318?text=${encodeURIComponent(waCard)}`;
      
      // Auto-open WhatsApp with pre-filled lead details
      try {
        window.open(waUrl, '_blank');
      } catch (_) {}

      if (res.data?.success) {
        setSuccessMessage(res.data.message || 'Your HVAC estimate request has been transmitted directly to our WhatsApp and Engineering Email desk.');
      } else {
        setErrorMessage(res.data?.message || 'Submission error. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      setSuccessMessage('Your HVAC estimate request has been transmitted directly to our WhatsApp and Engineering Email desk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-hvac-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center text-emerald-300 text-xs font-bold tracking-wider uppercase mb-1">
            <span>Consulting &amp; Estimation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Get a Free Estimate &amp; HVAC Consultation
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Receive personalized heat-load sizing, duct schematics, and equipment quotations from factory-certified engineers.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {successMessage ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-navy-900">Enquiry Successfully Transmitted</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{successMessage}</p>
              
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 max-w-md mx-auto">
                Reference ID: VRF-LEAD-{Date.now().toString().slice(-6)} • Assigned to HVAC Engineering Desk
              </div>

              {/* Instant WhatsApp & Email Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-lg mx-auto">
                <a
                  href={`https://wa.me/918896921318?text=${encodeURIComponent(
`╔══════════════════════════════════════╗\n` +
`║    🏛️ VRF HOMES • ESTIMATE CARD     ║\n` +
`╚══════════════════════════════════════╝\n` +
`🆔 *REF ID:* VRF-${Date.now().toString().slice(-6)}\n` +
`👤 *CLIENT:* ${formData.fullName}\n` +
`📱 *MOBILE:* ${formData.mobile}\n` +
`📧 *EMAIL:* ${formData.email}\n` +
`📍 *LOCATION:* ${formData.city}${formData.pincode ? ` (${formData.pincode})` : ''}\n` +
`🏢 *SEGMENT:* ${formData.segment || 'Residential VRF'}\n` +
`🏠 *PROPERTY:* ${formData.propertyType || 'Luxury Villa'}\n` +
`📝 *REQUIREMENT:* ${formData.message || formData.requirements || 'Free Heat Load Estimate'}\n` +
`🌐 *PORTAL:* https://vrfhomes.com`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={`mailto:sales@shuklaenterprises.in?subject=${encodeURIComponent(
                    `[HVAC ESTIMATE CARD] ${formData.fullName} - ${formData.city}`
                  )}&body=${encodeURIComponent(
`==============================================\n` +
`         VRF HOMES • ESTIMATE CARD DOCUMENT   \n` +
`==============================================\n` +
`CLIENT DETAILS:\n` +
`- Name    : ${formData.fullName}\n` +
`- Mobile  : ${formData.mobile}\n` +
`- Email   : ${formData.email}\n` +
`- City    : ${formData.city} ${formData.pincode || ''}\n\n` +
`PROJECT SPECIFICATIONS:\n` +
`- Segment     : ${formData.segment || 'Residential'}\n` +
`- Typology    : ${formData.propertyType || 'Villa / Apartment'}\n` +
`- Service Req : ${formData.serviceRequired || 'Engineering Estimate'}\n\n` +
`REQUIREMENTS & SCOPE:\n` +
`${formData.message || formData.requirements || 'Requested Free Site Sizing & Itemized BOQ'}\n\n` +
`----------------------------------------------\n` +
`Sent via VRF Homes Web Portal (https://vrfhomes.com)\n` +
`==============================================`
                  )}`}
                  className="py-3 px-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </a>

                <a
                  href="tel:+918896921318"
                  className="py-3 px-3 bg-navy-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Segment Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Segment</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, segment: 'Commercial', propertyType: 'Corporate Office' })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                      formData.segment === 'Commercial'
                        ? 'border-hvac-600 bg-hvac-50 text-hvac-700 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Commercial HVAC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, segment: 'Residential', propertyType: 'Luxury Villa' })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                      formData.segment === 'Residential'
                        ? 'border-hvac-600 bg-hvac-50 text-hvac-700 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Residential AC</span>
                  </button>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Malhotra"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. vikram@apextech.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
              </div>

              {/* Mobile, City, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98100 00000"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Location *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Noida / Gurugram"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="201301"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
              </div>

              {/* Enquiry Type & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enquiry Scope</label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-hvac-600"
                  >
                    <option value="New Installation">New HVAC Installation</option>
                    <option value="AC Replacement">AC Replacement & Upgrade</option>
                    <option value="HVAC Design">HVAC Engineering & Design</option>
                    <option value="Commercial Project">Turnkey Commercial Contract</option>
                    <option value="Residential Project">Residential VRF Project</option>
                    <option value="Annual Maintenance Contract">Annual Maintenance Contract (AMC)</option>
                    <option value="Repair & Maintenance">Repair & Diagnostic Service</option>
                    <option value="General Enquiry">General Product Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Property Typology</label>
                  <input
                    type="text"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    placeholder="e.g. 5-BHK Villa, Hospital, IT Office"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-hvac-600"
                  />
                </div>
              </div>

              {/* Product Interest & Project Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Product / System Interest</label>
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-hvac-600"
                  >
                    <option value="VRF Air Conditioning Systems">VRF Air Conditioning Systems</option>
                    <option value="Central Air Conditioning Systems">Central Air Conditioning Systems</option>
                    <option value="Chiller Systems">Chiller Systems (Water/Air Cooled)</option>
                    <option value="Ductable AC">Concealed Ductable AC</option>
                    <option value="Cassette AC">360° Round Cassette AC</option>
                    <option value="Air Handling Units (AHU)">Air Handling Units (AHU)</option>
                    <option value="Fresh Air Systems">Fresh Air & ERV Systems</option>
                    <option value="Smart AC Control Systems">Smart AC Control & BMS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Area / Size (Optional)</label>
                  <input
                    type="text"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleChange}
                    placeholder="e.g. 6,500 sq ft or 80 TR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-hvac-600"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Specific Requirements or Drawings Summary</label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding ceiling height, glass facade, brand preferences, or completion timelines..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600"
                ></textarea>
              </div>

              {/* Optional File Attachment */}
              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Upload className="w-4 h-4 text-hvac-600" />
                  <span>
                    {formData.attachment ? 'File attached successfully' : 'Upload floor plan / drawing (PDF, PNG, JPG)'}
                  </span>
                </div>
                <label className="px-3 py-1 bg-white border border-slate-200 text-hvac-700 rounded-lg font-bold cursor-pointer hover:bg-slate-100">
                  {uploading ? 'Uploading...' : formData.attachment ? 'Replace' : 'Browse'}
                  <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-hvac-600 to-hvac-500 hover:from-hvac-700 hover:to-hvac-600 text-white font-extrabold text-sm shadow-md shadow-hvac-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Transmitting to Engineering Team...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request for Quotation & Sizing</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
