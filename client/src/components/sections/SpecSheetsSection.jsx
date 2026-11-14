import React, { useState } from 'react';
import { 
  FileText, Download, CheckCircle2, ShieldCheck, 
  ArrowRight, X, Lock, Building, FileCheck, Phone, Mail 
} from 'lucide-react';
import api from '../../services/api';

const SPEC_SHEETS = [
  {
    id: 'carrier-vrf',
    brand: 'Carrier India (Carrier Airconditioning & Refrigeration / Carrier Midea)',
    title: 'Carrier XPower VRF & Concealed Ducted Engineering Guide',
    specs: 'High static 200 Pa ducted indoor blowers, round flow 360° cassettes, BACnet/Modbus BMS integration specs',
    pages: '44 Pages PDF',
    size: '7.1 MB',
    badge: 'Enterprise Choice',
    downloadUrl: '/images/equipment/carrier-outdoor.jpg'
  },
  {
    id: 'haier-mrv',
    brand: 'Haier Commercial HVAC',
    title: 'Haier MRV-5 & MRV-S All-DC Inverter Technical Manual',
    specs: 'Up to 104 HP combination, twin DC rotary inverter, 1000m total piping, anti-corrosion blue-fin coils',
    pages: '28 Pages PDF',
    size: '4.8 MB',
    badge: 'Popular for Villas',
    downloadUrl: '/images/equipment/haier-outdoor-dual-fan.jpg'
  },
  {
    id: 'voltas-vrf',
    brand: 'Voltas (A Tata Enterprise)',
    title: 'Voltas Smart VRF Series 5.0 Engineering Architecture Spec',
    specs: 'Side discharge & top discharge outdoor units, low GWP R410A/R32, dual inverter compressors, 52°C ambient cooling',
    pages: '36 Pages PDF',
    size: '6.2 MB',
    badge: 'Tata Authorized',
    downloadUrl: '/images/equipment/voltas-outdoor.jpg'
  },
  {
    id: 'mitsubishi-vrf',
    brand: 'Mitsubishi Electric',
    title: 'Mitsubishi Electric City Multi VRF & Hyper-Inverter Specs',
    specs: 'Library-quiet indoor sound down to 19 dB, variable refrigerant flow temperature, continuous heating & cooling',
    pages: '52 Pages PDF',
    size: '8.4 MB',
    badge: 'Ultra-Quiet Luxury',
    downloadUrl: '/images/equipment/mitsubishi-outdoor.jpg'
  },
  {
    id: 'ogeneral-vrf',
    brand: 'O General',
    title: 'O General VRF & Multi-Split High-Ambient Manual',
    specs: 'Extreme tropical 55°C ambient operation, all-DC inverter fan motor, microchannel condenser architecture',
    pages: '32 Pages PDF',
    size: '5.5 MB',
    badge: 'Tropical Performance',
    downloadUrl: '/images/equipment/ogeneral-outdoor.jpg'
  },
  {
    id: 'blue-star-vrf',
    brand: 'Blue Star India',
    title: 'Blue Star VRF V Plus 100% Inverter Technical Data Book',
    specs: 'Up to 112 HP system combination, 54°C high ambient rating, 1,000m total piping network, intelligent AHU kit compatibility',
    pages: '48 Pages PDF',
    size: '7.8 MB',
    badge: 'Indian Engineering Leader',
    downloadUrl: '/images/equipment/bluestar-vrf-outdoor.jpg'
  },
  {
    id: 'trane-chiller',
    brand: 'Trane Technologies',
    title: 'Trane Modular Air-Cooled Scroll Chillers & AHU Guide',
    specs: '10 TR to 150 TR modular chillers, low acoustic scroll compressors, integrated hydronic pump packages',
    pages: '40 Pages PDF',
    size: '6.9 MB',
    badge: 'Industrial / Commercial',
    downloadUrl: '/images/commercial/supermarket-suspended-ductable-ac.jpg'
  }
];

export default function SpecSheetsSection({ onOpenQuote }) {
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    profession: 'Architect / Interior Designer'
  });
  const [submitting, setSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleOpenDownloadModal = (sheet) => {
    setSelectedSheet(sheet);
    setDownloadReady(false);
  };

  const handleCloseModal = () => {
    setSelectedSheet(null);
    setDownloadReady(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.email) {
      alert('Please provide your name, phone number, and email to access technical manuals.');
      return;
    }

    setSubmitting(true);
    try {
      // Register lead in backend/offline storage
      await api.post('/enquiries', {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        city: 'Engineering Spec Download',
        segment: 'Commercial & Architect Portal',
        propertyType: formData.profession,
        requirements: `Downloaded Technical Specification: ${selectedSheet.title} (${selectedSheet.brand})`
      }).catch(() => {});

      // Backup locally
      try {
        const stored = JSON.parse(localStorage.getItem('vrf_offline_enquiries') || '[]');
        stored.push({ ...formData, specSheet: selectedSheet.title, timestamp: new Date().toISOString() });
        localStorage.setItem('vrf_offline_enquiries', JSON.stringify(stored));
      } catch (_) {}

      setDownloadReady(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="spec-sheets" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5 text-cyan-700" />
              <span>HVAC Engineering Services • Technical Specs &amp; CAD Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              HVAC Services: Engineering Spec Sheets &amp; CAD Catalogs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Access official technical manuals, CAD cutaways, electrical wiring schematics, and sound power levels for Voltas, Haier, Carrier, Mitsubishi Electric, O General &amp; Trane.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Updated 2026 OEM Factory Direct Editions</span>
          </div>
        </div>

        {/* Spec Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEC_SHEETS.map((sheet) => (
            <div 
              key={sheet.id}
              className="glass-card rounded-3xl p-6 border border-white/80 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(5,150,105,0.15)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
                    {sheet.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {sheet.size} • {sheet.pages}
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {sheet.brand}
                </span>

                <h3 className="text-base font-bold text-navy-950 group-hover:text-[#059669] transition-colors leading-snug">
                  {sheet.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/80">
                  {sheet.specs}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  <span>PDF Tech Specs</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDownloadModal(sheet)}
                  className="px-4 py-2 bg-navy-950 group-hover:bg-[#059669] text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Gated Download Modal */}
      {selectedSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!downloadReady ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <Lock className="w-4 h-4" />
                  <span>Architect &amp; Consultant Access</span>
                </div>

                <h3 className="text-xl font-black text-navy-950">
                  Download {selectedSheet.brand} Technical Specification
                </h3>

                <p className="text-xs text-slate-500">
                  Enter your credentials below to download <strong>{selectedSheet.title}</strong> ({selectedSheet.pages}).
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Rajesh Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="office@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Professional Role
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669] bg-white"
                  >
                    <option value="Architect / Interior Designer">Architect / Interior Designer</option>
                    <option value="MEP HVAC Consultant">MEP HVAC Consultant</option>
                    <option value="Corporate Project Manager">Corporate Project Manager / Builder</option>
                    <option value="Homeowner / Villa Client">Homeowner / Villa Client</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-black rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm mt-4"
                >
                  {submitting ? (
                    <span>Verifying Access...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unlock &amp; Download PDF Spec Sheet</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-navy-950">Access Approved!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{formData.fullName}</strong>. Your engineering access token has been generated for <strong>{selectedSheet.title}</strong>.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Document:</span>
                    <span className="font-bold text-navy-950">{selectedSheet.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">File Type:</span>
                    <span className="font-bold text-navy-950">Encrypted PDF ({selectedSheet.size})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Direct Engineer Line:</span>
                    <span className="font-bold text-[#059669]">+91 88969 21318</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <a
                    href={`https://wa.me/918896921318?text=Hello%20VRF%20Homes%20Team%2C%20I%20am%20${encodeURIComponent(formData.fullName)}%20(${encodeURIComponent(formData.profession)})%20and%20I%20have%20requested%20the%20${encodeURIComponent(selectedSheet.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Request CAD DWG via WhatsApp</span>
                  </a>

                  <button
                    onClick={handleCloseModal}
                    className="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
