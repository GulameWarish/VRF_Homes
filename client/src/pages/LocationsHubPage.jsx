import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck, Phone, MessageCircle, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';

const CITIES = [
  {
    name: 'New Delhi',
    slug: 'new-delhi',
    state: 'Delhi NCR',
    highlights: 'Villas, Penthouses, Embassies & Corporate HQs',
    coverage: 'South Delhi, Dwarka, Vasant Kunj, Rohini, Connaught Place'
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    highlights: 'Luxury Sea-Facing High-Rises & Commercial Towers',
    coverage: 'Bandra, Andheri, South Mumbai, Juhu, Powai, Worli'
  },
  {
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh / NCR',
    highlights: 'Expressway Tech Parks, Residential Townships & Hubs',
    coverage: 'Sector 62, Sector 150, Greater Noida, Expressway'
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    highlights: 'Registered Regional Office & Central UP HVAC Hub',
    coverage: 'Gomti Nagar, Hazratganj, Aliganj, Indira Nagar'
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    highlights: 'IT Tech Parks, Cleanrooms & Modern Residential Mansions',
    coverage: 'Indiranagar, Koramangala, Whitefield, Electronic City'
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    highlights: 'Coastal Heavy-Duty VRF & Industrial Plants',
    coverage: 'Anna Nagar, OMR IT Corridor, T. Nagar, Adyar'
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    highlights: 'Eastern Commercial Complex & Heritage Retrofits',
    coverage: 'Salt Lake Sector V, New Town, Park Street, Alipore'
  },
  {
    name: 'Chandigarh',
    slug: 'chandigarh',
    state: 'Punjab & Haryana',
    highlights: 'Architectural Mansions, Showrooms & Banquets',
    coverage: 'Sector 17, Sector 35, Mohali Phase 7, Panchkula'
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    highlights: 'GIFT City, Industrial Facilities & Large Residences',
    coverage: 'SG Highway, Prahlad Nagar, Bodakdev, GIFT City'
  }
];

export default function LocationsHubPage({ onOpenQuote }) {
  return (
    <>
      <SEO 
        title="National Presence | VRF Solutions & AC Services Across 9 Major Indian Cities"
        description="VRF Homes delivers certified VRF solutions, new AC install, AC repairing, and preventive maintenance across New Delhi, Mumbai, Chennai, Noida, Kolkata, Bangalore, Chandigarh, Ahmedabad & Lucknow."
      />

      {/* Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-cyan-300" />
            <span>National Engineering & Service Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            VRF Solution & AC Services Across India
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Doorstep AC repairing, new AC installation, annual maintenance contracts (AMC), and precision VRF engineering across 9 major metropolitan cities.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((c) => (
              <div
                key={c.slug}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-hvac-50 text-hvac-700">
                      {c.state}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Active Hub</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 mb-1">
                    {c.name}
                  </h3>
                  <p className="text-xs text-hvac-600 font-medium mb-3">
                    {c.highlights}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    <strong>Coverage:</strong> {c.coverage}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/locations/${c.slug}`}
                    className="text-xs font-bold text-hvac-600 hover:text-hvac-700 inline-flex items-center space-x-1"
                  >
                    <span>View {c.name} Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => onOpenQuote?.({ city: c.name })}
                    className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-hvac-50 text-slate-700 hover:text-hvac-700 rounded-lg transition-colors"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
