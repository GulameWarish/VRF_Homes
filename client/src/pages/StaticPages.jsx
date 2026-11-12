import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Phone, Mail, MapPin, Clock, 
  ShieldCheck, Award, Users, CheckCircle2, Send, 
  ExternalLink, MessageCircle, Globe 
} from 'lucide-react';
import SEO from '../components/common/SEO';
import api from '../services/api';
import SocialLinks from '../components/common/SocialLinks';

export function AboutPage({ onOpenQuote }) {
  return (
    <>
      <SEO 
        title="About VRF Homes | Leading HVAC Mechanical Contracting"
        description="Over 18 years of pioneering Variable Refrigerant Flow, central chillers, and precision climate engineering across residential and commercial sectors."
      />

      <section className="bg-navy-950 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Engineering Legacy & Corporate Overview
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Pioneering Climate Engineering Since 2008
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            VRF Homes delivers end-to-end mechanical, electrical, and plumbing (MEP) HVAC contracting with certified factory partnerships across Mitsubishi Electric, Carrier, O General, Hitachi, Voltas, Trane, and Haier.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Architectural Harmony Meets Thermodynamic Precision
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a mission to eliminate noisy, inefficient cooling in Indian residential and commercial architecture, VRF Homes has executed over 650+ installations across luxury villas, corporate tech parks, cleanrooms, and multi-specialty hospitals.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe that air conditioning is an integral mechanical art. Our teams collaborate closely with interior designers, architects, and structural consultants to ensure that ducting runs are silent, ceilings remain elevated, and energy consumption is minimized.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-hvac-600">650+</div>
                  <div className="text-xs font-bold text-slate-700 mt-1">Commissioned Projects</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-hvac-600">9 Branches</div>
                  <div className="text-xs font-bold text-slate-700 mt-1">Nationwide Presence</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-96">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="VRF Homes Technical Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ onOpenQuote }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', message: '' });
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Settings fetch error:', err.message);
      }
    };
    fetchSettings();
  }, []);

  const phone = settings?.phone || '+91 88969 21318';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const email = settings?.email || 'sales@shuklaenterprises.in';

  const registeredOffice = settings?.registeredOffice || {
    title: 'Registered Office',
    address: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow - 226018, Uttar Pradesh, India',
    mapUrl: 'https://maps.google.com/?q=Unnao+Arcade+Building+5+Gautam+Buddha+Marg+Lucknow+226018'
  };

  const delhiOffice = settings?.delhiOffice || {
    title: 'Delhi Office',
    address: '14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi, Delhi - 110059, India',
    mapUrl: 'https://maps.google.com/?q=14A+Uttam+Vihar+Block+F+Mahavir+Enclave+Part+3+Bindapur+New+Delhi+110059'
  };

  const keralaOffice = settings?.keralaOffice || {
    title: 'Kerala State Headquarters & Regional Office',
    buildingName: 'St Joseph Tower',
    floorAndNo: 'First Floor, Building No. 18/143/08',
    road: 'Mannuthy Nadathara Road',
    locality: 'Pattalamkunnu',
    city: 'Thrissur',
    district: 'Thrissur',
    state: 'Kerala',
    pincode: '680655',
    address: 'First Floor, Building No. 18/143/08, St. Joseph Tower, Mannuthy Nadathara Road, Pattalamkunnu, Thrissur, Kerala - 680655',
    phone: '+91 88969 21318 / +91 92206 01573',
    mapUrl: 'https://maps.google.com/?q=St+Joseph+Tower+Mannuthy+Nadathara+Road+Pattalamkunnu+Thrissur+Kerala+680655'
  };

  const branches = settings?.branches || [
    'New Delhi', 'Mumbai', 'Chennai', 'Noida', 'Kolkata', 
    'Bangalore', 'Chandigarh', 'Ahmedabad', 'Lucknow'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/enquiries', {
        ...formData,
        city: 'Direct Contact Form',
        enquiryType: 'General Enquiry',
        leadSource: 'Contact Us Page'
      });
      setSent(true);
    } catch (err) {
      alert('Error submitting message: ' + err.message);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Our HVAC Specialists & Branch Network | VRF Homes"
        description="Reach our registered office in Lucknow or our Delhi office. Branches across New Delhi, Mumbai, Chennai, Noida, Kolkata, Bangalore, Chandigarh, Ahmedabad, and Lucknow."
      />

      <section className="bg-navy-950 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Direct Contact & National Office Locations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Connect With Our Engineering Team
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Discuss upcoming architectural projects, request site heat load surveys, or connect with our regional branch managers.
          </p>

          {/* Direct Clickable Action Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="px-5 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-cyan-200" />
              <span>Call: {phone}</span>
            </a>

            <a
              href={`https://wa.me/${cleanPhone.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us: {phone}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center space-x-2"
            >
              <Mail className="w-4 h-4 text-cyan-200" />
              <span>{email}</span>
            </a>
          </div>

          {/* Official Social Media Channels with Real Brand Logos */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Official Social Channels
            </span>
            <SocialLinks size="md" showLabels={true} />
          </div>
        </div>
      </section>

      {/* Main Office Locations (Registered + Delhi Office) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Corporate Headquarters & Regional Office
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Visit our offices or view exact pin locations directly on Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Registered Office Card */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-hvac-300 hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-hvac-50 text-hvac-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-hvac-100 text-hvac-800 text-xs font-bold">
                    Official Registered Office
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 mb-2">
                  {registeredOffice.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {registeredOffice.address}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200/60 pt-3">
                  <div><strong>City / State:</strong> Lucknow, Uttar Pradesh</div>
                  <div><strong>PIN:</strong> 226018</div>
                  <div><strong>Contact:</strong> +91 88969 21318</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={registeredOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-navy-950 hover:bg-hvac-600 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Delhi Office Card */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-hvac-300 hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-hvac-50 text-hvac-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                    National Capital Office
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 mb-2">
                  {delhiOffice.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {delhiOffice.address}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200/60 pt-3">
                  <div><strong>City / Region:</strong> Bindapur, New Delhi</div>
                  <div><strong>PIN:</strong> 110059</div>
                  <div><strong>Contact:</strong> +91 88969 21318</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={delhiOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-navy-950 hover:bg-hvac-600 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Kerala State Office Card */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-hvac-300 hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Kerala State Office
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 mb-2">
                  {keralaOffice.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {keralaOffice.address}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200/60 pt-3">
                  <div><strong>Premises:</strong> St. Joseph Tower, First Floor (18/143/08)</div>
                  <div><strong>Locality:</strong> Mannuthy Nadathara Road, Pattalamkunnu</div>
                  <div><strong>City / PIN:</strong> Thrissur, Kerala - 680655</div>
                  <div><strong>Contacts:</strong> +91 88969 21318 / +91 92206 01573</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={keralaOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-navy-950 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Professional Branch Network Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-2">
              <Globe className="w-3.5 h-3.5 text-hvac-600" />
              <span>National Operations Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Our Branches Across India
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active engineering, installation, and preventive maintenance hubs located in primary metropolitan zones.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {branches.map((branchName, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-hvac-300 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-hvac-600 flex items-center justify-center mb-3 group-hover:bg-hvac-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-navy-950">{branchName}</h4>
                <span className="text-[10px] text-slate-400 mt-1">Regional Branch Hub</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1">● Active Operations</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Kerala Commercial HVAC & Haier Duct AC Execution Locations */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-cyan-600 bg-cyan-50 px-3.5 py-1 rounded-full mb-2">
              <span>Kerala Commercial HVAC &amp; Haier Duct AC Execution Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Active Project Execution Locations Across Kerala
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Turnkey field execution by Shukla Enterprise: structural cantilever frame mounting, electronic inverter PCB diagnostics, nitrogen decay hold checks, and precision airflow balance for Haier commercial ducted AC systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { city: 'Thrissur (State Office)', desc: 'St. Joseph Tower, First Floor (18/143/08), Mannuthy Nadathara Road, Pattalamkunnu - 680655', badge: 'State Headquarters', phone: '+91 88969 21318' },
              { city: 'Aluva Office (Kochi Hub)', desc: '16/557A, Konathedath Road, Kunnumpuram, PO, Desom, Aluva, Kochi, Kerala - 683102', badge: 'Branch Office', phone: '+91 88969 21318' },
              { city: 'Noornad Office', desc: 'Central Travancore division: Ducted AC execution, electronic expansion valve calibration, and residential VRF', badge: 'Regional Hub', phone: '+91 88969 21318' },
              { city: 'Attingal & Trivandrum', desc: 'Capital division operations: Commercial complex twin-fan ductable AC & central inverter plant commissioning', badge: 'Capital Hub', phone: '+91 88969 21318' },
              { city: 'Marine Drive, Kochi', desc: 'Commercial waterfront towers & heavy-duty twin-fan ducted AC cantilever installation', badge: 'Active Site Project', phone: '+91 88969 21318' },
              { city: 'Poojapura, Trivandrum', desc: 'Commercial complex twin-fan ductable AC & central inverter plant execution', badge: 'Active Commissioning', phone: '+91 88969 21318' },
              { city: 'Kottayam', desc: 'Retail showrooms & turnkey high-static air distribution with custom duct runs', badge: 'Field Operations', phone: '+91 88969 21318' },
              { city: 'Kayamkulam', desc: 'Inverter ducted AC installation with precision PCB diagnostics & amp calibration', badge: 'Site Project', phone: '+91 88969 21318' }
            ].map((loc, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-sm group-hover:bg-[#059669] group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {loc.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-navy-950 group-hover:text-[#059669] transition-colors">{loc.city}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{loc.desc}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">By Shukla Enterprise</span>
                  <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-cyan-600 font-bold hover:underline flex items-center">
                    <Phone className="w-3 h-3 mr-1" /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Message & Direct Assistance Form */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h3 className="text-2xl font-bold text-navy-950">Send an Instant Message to Our Desk</h3>
              <p className="text-xs text-slate-500 mt-1">
                Prefer written correspondence? Submit your enquiry below or contact <strong>{phone}</strong> / <strong>{email}</strong>.
              </p>
            </div>

            {sent ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 max-w-md mx-auto">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
                <h4 className="font-bold text-base">Message Transmitted Successfully</h4>
                <p className="text-xs mt-1">Our regional technical desk will respond within 4 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                      placeholder="e.g. Alok Gupta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                      placeholder="alok@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Contact *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                    placeholder="+91 98100 00000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Requirements / Message</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    placeholder="Share requirements or preferred branch location..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-navy-950 mb-6">Privacy Policy</h1>
      <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
        <p>At VRF Homes, we take client confidentiality and digital privacy with absolute seriousness. This Privacy Policy details how we collect, store, and utilize technical and personal information gathered through our online consultation portals and quotation forms.</p>
        <h3 className="text-base font-bold text-navy-900 mt-4">1. Collection of Project & Contact Information</h3>
        <p>When you submit a quotation request, we collect contact credentials (name, email, phone number) alongside architectural parameters (project size, property classification, floor plans). This data is strictly utilized to prepare mechanical engineering calculations and equipment quotations.</p>
        <h3 className="text-base font-bold text-navy-900 mt-4">2. Non-Disclosure & Security</h3>
        <p>We never sell, rent, or trade client architectural blueprints, contact numbers, or internal pricing to third parties. All file uploads are stored on secured server directories with encryption.</p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-navy-950 mb-6">Terms & Conditions of Service</h1>
      <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
        <p>Welcome to VRF Homes. By accessing our website and engaging our mechanical MEP contracting services, you agree to comply with the terms stipulated herein.</p>
        <h3 className="text-base font-bold text-navy-900 mt-4">1. Engineering Quotations & Estimates</h3>
        <p>All online estimates, heat-load recommendations, and preliminary equipment sizing are subject to formal site inspection and confirmation of electrical power infrastructure, ambient structural allowances, and architectural duct routing.</p>
        <h3 className="text-base font-bold text-navy-900 mt-4">2. Equipment Warranties</h3>
        <p>Compressor and equipment warranties are provided directly by authorized equipment manufacturers (Mitsubishi Electric, Carrier, O General, Hitachi, Voltas, Trane, Haier, etc.) and backed by our certified commissioning inspection reports.</p>
      </div>
    </div>
  );
}

export function SitemapPage() {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Commercial HVAC Solutions', path: '/commercial' },
    { label: 'Residential Air Conditioning', path: '/residential' },
    { label: 'HVAC Products & Systems', path: '/products' },
    { label: 'Engineering Features & Tech', path: '/features' },
    { label: 'Completed Projects Portfolio', path: '/projects' },
    { label: 'Insights & Technical Resources', path: '/insights' },
    { label: 'Get a Free Estimate', path: '/quote' },
    { label: 'About VRF Homes', path: '/about' },
    { label: 'Contact Us & Branches', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Admin Login', path: '/admin/login' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-navy-950 mb-4">Website Sitemap</h1>
      <p className="text-xs text-slate-500 mb-8">Direct indexing of all public website pages and commercial resources.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-hvac-600 hover:border-hvac-300 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
