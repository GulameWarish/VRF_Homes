import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, 
  Cpu, MessageCircle, ExternalLink, Globe 
} from 'lucide-react';
import api from '../../services/api';
import SocialLinks from '../common/SocialLinks';

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [commercialLinks, setCommercialLinks] = useState([]);
  const [residentialLinks, setResidentialLinks] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [settRes, commRes, resRes] = await Promise.all([
          api.get('/settings'),
          api.get('/commercial'),
          api.get('/residential')
        ]);
        if (settRes.data.success) setSettings(settRes.data.data);
        if (commRes.data.success) setCommercialLinks(commRes.data.data.slice(0, 6));
        if (resRes.data.success) setResidentialLinks(resRes.data.data.slice(0, 5));
      } catch (e) {
        console.error('Footer data error:', e.message);
      }
    };
    fetchFooterData();
  }, []);

  const currentYear = new Date().getFullYear();

  const branches = settings?.branches || [
    'New Delhi', 'Mumbai', 'Chennai', 'Noida', 'Kolkata', 
    'Bangalore', 'Chandigarh', 'Ahmedabad', 'Lucknow'
  ];

  const phone = settings?.phone || '+91 88969 21318';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const email = settings?.email || 'sales@shuklaenterprises.in';

  const registeredOffice = settings?.registeredOffice || {
    title: 'Registered Office',
    address: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow – 226018, Uttar Pradesh, India',
    mapUrl: 'https://maps.google.com/?q=Unnao+Arcade+Building+5+Gautam+Buddha+Marg+Lucknow+226018'
  };

  const delhiOffice = settings?.delhiOffice || {
    title: 'Delhi Office',
    address: '14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi, Delhi – 110059, India',
    mapUrl: 'https://maps.google.com/?q=14A+Uttam+Vihar+Block+F+Mahavir+Enclave+Part+3+Bindapur+New+Delhi+110059'
  };

  const keralaOffice = settings?.keralaOffice || {
    title: 'Kerala State Office',
    address: 'First Floor, Building No. 18/143/08, St. Joseph Tower, Mannuthy Nadathara Road, Pattalamkunnu, Thrissur – 680655, Kerala, India',
    phone: '+91 88969 21318 / +91 92206 01573',
    mapUrl: 'https://maps.google.com/?q=St+Joseph+Tower+Mannuthy+Nadathara+Road+Pattalamkunnu+Thrissur+Kerala+680655'
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-baseline space-x-1.5 group">
              <span className="text-2xl font-black italic tracking-tighter text-[#009fe3] uppercase drop-shadow-sm group-hover:scale-105 transition-transform">
                VRF
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase ml-1.5">
                HOME
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {settings?.footerAbout || 
                'VRF Homes is a premier HVAC engineering & contracting enterprise providing specialized Variable Refrigerant Flow (VRF), central chillers, and precision cooling solutions across luxury residences, commercial complexes, and industrial facilities.'}
            </p>

            {/* Quick Contact Buttons in Footer (Phone, Email, WhatsApp) */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a 
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-hvac-600/20 hover:bg-hvac-600 text-cyan-300 hover:text-white border border-hvac-500/30 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>

              <a 
                href={`https://wa.me/${cleanPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a 
                href={`mailto:${email}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{email}</span>
              </a>
            </div>

            {/* Official Social Links with Real Brand Logos */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Connect With Us
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Commercial Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-hvac-500 mr-2"></span>
              Commercial
            </h4>
            <ul className="space-y-2 text-xs">
              {commercialLinks.map((cat) => (
                <li key={cat._id || cat.slug}>
                  <Link to={`/commercial/${cat.slug}`} className="hover:text-hvac-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/commercial" className="text-hvac-400 hover:underline font-semibold flex items-center pt-1">
                  View All Sectors <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Residential Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-hvac-500 mr-2"></span>
              Residential
            </h4>
            <ul className="space-y-2 text-xs">
              {residentialLinks.map((res) => (
                <li key={res._id || res.slug}>
                  <Link to={`/residential/${res.slug}`} className="hover:text-hvac-400 transition-colors">
                    {res.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="hover:text-hvac-400 transition-colors">
                  All AC Products & Chillers
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-hvac-400 transition-colors">
                  Engineering Capabilities
                </Link>
              </li>
              <li>
                <Link to="/residential" className="text-hvac-400 hover:underline font-semibold flex items-center pt-1">
                  Residential Catalog <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Offices (Registered + Delhi Office) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-hvac-500 mr-2"></span>
              Corporate Offices
            </h4>
            <div className="space-y-4 text-xs text-slate-400">
              {/* Registered Office */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-white block mb-1">
                  {registeredOffice.title}
                </span>
                <p className="leading-relaxed text-[11px] text-slate-400">
                  {registeredOffice.address}
                </p>
                {registeredOffice.mapUrl && (
                  <a
                    href={registeredOffice.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[10px] font-bold text-hvac-400 hover:underline mt-1.5"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1" />
                  </a>
                )}
              </div>

              {/* Delhi Office */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-white block mb-1">
                  {delhiOffice.title}
                </span>
                <p className="leading-relaxed text-[11px] text-slate-400">
                  {delhiOffice.address}
                </p>
                {delhiOffice.mapUrl && (
                  <a
                    href={delhiOffice.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[10px] font-bold text-hvac-400 hover:underline mt-1.5"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1" />
                  </a>
                )}
              </div>

              {/* Kerala State Office (Thrissur) */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-cyan-300 block mb-1">
                  {keralaOffice.title} (Thrissur)
                </span>
                <p className="leading-relaxed text-[11px] text-slate-400">
                  {keralaOffice.address}
                </p>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                  Tel: +91 88969 21318 / +91 92206 01573
                </div>
                {keralaOffice.mapUrl && (
                  <a
                    href={keralaOffice.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[10px] font-bold text-hvac-400 hover:underline mt-1.5"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Branch Network Showcase Bar */}
        <div className="py-8 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2 text-white text-xs font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4 text-hvac-400" />
              <span>National Branch Presence ({branches.length} Locations)</span>
            </div>
            <Link to="/locations" className="text-xs font-bold text-hvac-400 hover:underline flex items-center">
              <span>View All 9 City Hubs</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {branches.map((branch, i) => {
              const slug = branch.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
              return (
                <Link
                  key={i}
                  to={`/locations/${slug}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-hvac-600/30 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-hvac-500/50 transition-colors flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{branch}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {currentYear} {settings?.companyName || 'VRF Homes'}. All rights reserved. Precision Air Conditioning & Mechanical Contracting.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-slate-400 transition-colors">Sitemap</Link>
            <Link to="/contact" className="hover:text-hvac-400 transition-colors flex items-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Verified ISO 9001 HVAC
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
