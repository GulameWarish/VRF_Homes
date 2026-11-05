import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  MapPin, Phone, MessageCircle, Wrench, ShieldCheck, 
  Sparkles, CheckCircle2, ArrowRight, Zap, Building2, 
  Home, Award, Clock, HelpCircle, Star
} from 'lucide-react';
import SEO from '../components/common/SEO';

const CITY_DATA = {
  'new-delhi': {
    name: 'New Delhi',
    state: 'Delhi NCR',
    office: '14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi - 110059',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['South Delhi', 'Dwarka', 'Vasant Kunj', 'Rohini', 'Connaught Place', 'Janakpuri', 'Punjabi Bagh', 'Saket'],
    popularBrands: ['Voltas', 'Mitsubishi Electric', 'Haier', 'Carrier', 'O General', 'Hitachi', 'Trane']
  },
  'mumbai': {
    name: 'Mumbai',
    state: 'Maharashtra',
    office: 'Direct Engineering Service Hub, Mumbai Metro Region',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Bandra', 'Andheri', 'South Mumbai', 'Juhu', 'Powai', 'Worli', 'Thane', 'Navi Mumbai'],
    popularBrands: ['Mitsubishi Electric', 'O General', 'Voltas', 'Carrier', 'Haier', 'Hitachi', 'Trane']
  },
  'noida': {
    name: 'Noida',
    state: 'Uttar Pradesh / Delhi NCR',
    office: 'Service Hub Noida & Greater Noida Expressway',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Sector 62', 'Sector 18', 'Sector 150', 'Greater Noida', 'Noida Extension', 'Sector 128', 'Sector 50'],
    popularBrands: ['Voltas', 'Carrier', 'Haier', 'Mitsubishi Electric', 'Hitachi', 'O General', 'Trane']
  },
  'lucknow': {
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    office: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow - 226018',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Mahanagar', 'Vibhuti Khand', 'Sushant Golf City'],
    popularBrands: ['Voltas', 'Haier', 'Carrier', 'Hitachi', 'Mitsubishi Electric', 'O General', 'Trane']
  },
  'bangalore': {
    name: 'Bangalore',
    state: 'Karnataka',
    office: 'Technical Support & HVAC Project Division, Bengaluru',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Indiranagar', 'Koramangala', 'Whitefield', 'Electronic City', 'HSR Layout', 'Hebbal', 'Jayanagar'],
    popularBrands: ['Mitsubishi Electric', 'Carrier', 'Trane', 'O General', 'Voltas', 'Haier', 'Hitachi']
  },
  'chennai': {
    name: 'Chennai',
    state: 'Tamil Nadu',
    office: 'Commercial & Coastal HVAC Division, Chennai',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Anna Nagar', 'OMR IT Corridor', 'T. Nagar', 'Adyar', 'Velachery', 'Alwarpet', 'ECR'],
    popularBrands: ['O General', 'Mitsubishi Electric', 'Voltas', 'Carrier', 'Haier', 'Hitachi', 'Trane']
  },
  'kolkata': {
    name: 'Kolkata',
    state: 'West Bengal',
    office: 'Eastern Regional Service Hub, Kolkata',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Salt Lake Sector V', 'New Town', 'Park Street', 'Alipore', 'Ballygunge', 'Rajarhat', 'Howrah'],
    popularBrands: ['Voltas', 'Carrier', 'Haier', 'Hitachi', 'Mitsubishi Electric', 'O General', 'Trane']
  },
  'chandigarh': {
    name: 'Chandigarh',
    state: 'Punjab & Haryana Capital Region',
    office: 'Tri-City HVAC Hub, Chandigarh - Mohali - Panchkula',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['Sector 17', 'Sector 35', 'Sector 9', 'Mohali Phase 7', 'Panchkula Sector 20', 'Zirakpur', 'New Chandigarh'],
    popularBrands: ['O General', 'Voltas', 'Mitsubishi Electric', 'Carrier', 'Hitachi', 'Haier', 'Trane']
  },
  'ahmedabad': {
    name: 'Ahmedabad',
    state: 'Gujarat',
    office: 'Commercial & Industrial HVAC Hub, Ahmedabad - Gandhinagar',
    phone: '+91 88969 21318',
    whatsapp: '918896921318',
    coverage: ['SG Highway', 'Prahlad Nagar', 'Bodakdev', 'Satellite', 'Bopal', 'GIFT City Gandhinagar', 'Navrangpura'],
    popularBrands: ['Voltas', 'Carrier', 'Hitachi', 'Mitsubishi Electric', 'O General', 'Haier', 'Trane']
  }
};

export default function CityLocationPage({ onOpenQuote }) {
  const { citySlug } = useParams();
  const city = CITY_DATA[citySlug?.toLowerCase()];

  if (!city) {
    return <Navigate to="/locations" replace />;
  }

  const allCitiesList = Object.entries(CITY_DATA).map(([slug, data]) => ({
    slug,
    name: data.name
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": `VRF Homes - ${city.name} VRF Solution & AC Repairing`,
    "alternateName": `VRF Solution, AC Repairing & New AC Install ${city.name}`,
    "url": `https://vrfhomes.com/locations/${citySlug}`,
    "telephone": city.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city.office,
      "addressLocality": city.name,
      "addressRegion": city.state,
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `AC & VRF Services in ${city.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `VRF Solution & Central AC in ${city.name}`,
            "description": `Single-condenser multi-indoor luxury VRF climate engineering in ${city.name}.`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `AC Repairing Service in ${city.name}`,
            "description": `Fast emergency AC repair, compressor replacement, and gas charging in ${city.name}.`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Preventive AC Maintenance AMC in ${city.name}`,
            "description": `Annual Maintenance Contract (AMC), chemical coil cleaning, and filter checkups in ${city.name}.`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `New AC Installation in ${city.name}`,
            "description": `Factory certified new AC installation for Voltas, Haier, Carrier, Mitsubishi Electric, O General & Hitachi in ${city.name}.`
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title={`VRF Solution, AC Repairing, Maintenance & New AC Install in ${city.name}`}
        description={`Top-rated VRF solution, AC solution, AC repairing, preventive AC maintenance AMC & new AC install in ${city.name}. Authorized dealer for Voltas, Haier, Carrier, Mitsubishi Electric, O General, Hitachi & Trane.`}
        schemaData={schemaData}
      />

      {/* Hero Section */}
      <section className="bg-navy-950 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-hvac-500/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-cyan-300">Locations</Link>
            <span>/</span>
            <span className="text-cyan-300 font-semibold">{city.name}</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/15 mb-4">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{city.name} Official HVAC & VRF Engineering Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl">
            VRF Solution, AC Repairing & New AC Install in <span className="text-cyan-400">{city.name}</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Looking for complete <strong>AC solutions</strong> or a certified <strong>VRF solution in {city.name}</strong>? 
            VRF Homes delivers factory-authorized <strong>new AC installation</strong>, 24/7 fast <strong>AC repairing</strong>, 
            and scheduled <strong>AC maintenance AMC</strong> for luxury villas, apartments, corporate offices, and commercial facilities.
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenQuote?.({ city: city.name, requirements: `Enquiry for ${city.name} AC/VRF Services` })}
              className="px-6 py-3.5 rounded-xl bg-hvac-600 hover:bg-hvac-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-hvac-600/30 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Get Free Quote in {city.name}</span>
            </button>

            <a
              href={`tel:${city.phone.replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call Engineer: {city.phone}</span>
            </a>

            <a
              href={`https://wa.me/${city.whatsapp}?text=Hi%20VRF%20Homes,%20I%20need%20AC%20/%20VRF%20service%20in%20${encodeURIComponent(city.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Doorstep Service in {city.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Same-Day AC Repairing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>7 Authorized Brands</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Energy Savings up to 50%</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-hvac-600 uppercase tracking-widest mb-2">
              Comprehensive Climate Engineering
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Our AC & VRF Services in {city.name}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Engineered solutions covering everything from emergency breakdown repairs to luxury multi-zone VRF home installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1: New AC Install */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-hvac-600 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-2">
                  New AC Install & Sizing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Turnkey new AC installation in {city.name} for VRF systems, Ductable AC, Inverter Split AC, and Cassette AC. We calculate room heat-load, supply authentic equipment, and execute pristine copper piping and commissioning.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1.5 mb-4">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Free heat-load calculation</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Factory certified warranty</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Clean concealed copper piping</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenQuote?.({ city: city.name, requirements: `New AC Install enquiry in ${city.name}` })}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-hvac-50 text-hvac-700 hover:text-hvac-800 text-xs font-bold transition-colors"
              >
                Book New AC Install
              </button>
            </div>

            {/* Service 2: AC Repairing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-2">
                  Emergency AC Repairing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Experiencing cooling failure, strange noises, or water leakage? Our expert AC repairing engineers in {city.name} diagnose compressor faults, repair inverter PCBs, fix refrigerant leaks, and restore rated cooling fast.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1.5 mb-4">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Same-day doorstep visit</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Genuine OEM spare parts</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Nitrogen leak testing & gas topup</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenQuote?.({ city: city.name, requirements: `AC Repairing request in ${city.name}` })}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-700 hover:text-rose-800 text-xs font-bold transition-colors"
              >
                Request AC Repair
              </button>
            </div>

            {/* Service 3: AC Maintenance AMC */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-2">
                  AC Maintenance & AMC
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Protect your cooling efficiency and slash power bills with comprehensive AC maintenance in {city.name}. Includes quarterly high-pressure jet wash, antibacterial coil chemical cleaning, and electrical health checkups.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1.5 mb-4">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Scheduled quarterly servicing</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Priority breakdown assistance</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Prevents sudden summer breakdowns</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenQuote?.({ city: city.name, requirements: `AC Maintenance AMC contract in ${city.name}` })}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 text-xs font-bold transition-colors"
              >
                Get AMC Package
              </button>
            </div>

            {/* Service 4: VRF Solution */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-2">
                  VRF Solution & Central AC
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Say goodbye to multiple outdoor compressors cluttering balconies in {city.name}. Our central VRF solutions connect up to 64 indoor units to a single compact outdoor condenser, operating down to 19 dB whisper-silence.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1.5 mb-4">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>1 Outdoor unit for entire house</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Up to 50% power savings</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Individual room climate control</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenQuote?.({ city: city.name, segment: 'Residential', requirements: `VRF Home engineering consultation in ${city.name}` })}
                className="w-full py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-700 text-white text-xs font-bold transition-colors"
              >
                Plan VRF System
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Authorized Brands Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
            Authorized Air Conditioning & VRF Brands Serviced in {city.name}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {city.popularBrands.map((b) => (
              <div 
                key={b}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-navy-950 flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-hvac-600" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Coverage Areas in City */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 text-hvac-600 text-xs font-bold uppercase mb-2">
              <MapPin className="w-4 h-4" />
              <span>Doorstep Service Neighborhoods in {city.name}</span>
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-4">
              Local Areas Served Across {city.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Our mobile HVAC engineering vans are stationed across major sectors and neighborhoods in {city.name} to deliver swift new AC installs, maintenance visits, and emergency repairing:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {city.coverage.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-hvac-50 text-slate-800 text-xs font-medium border border-slate-200/80 transition-colors flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hvac-500"></span>
                  <span>{area}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-hvac-600 uppercase tracking-widest mb-2">
              Got Questions?
            </h2>
            <h3 className="text-2xl font-extrabold text-navy-950">
              Frequently Asked Questions in {city.name}
            </h3>
          </div>

          <div className="space-y-4">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy-950 mb-2 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-hvac-600 shrink-0" />
                <span>How fast can I get AC repairing or new AC install in {city.name}?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Our technicians provide same-day or within 24-hour response across {city.name}. For emergency breakdown repairs or new site heat-load inspections, call us directly at {city.phone}.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy-950 mb-2 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-hvac-600 shrink-0" />
                <span>Which AC and VRF brands do you provide and repair?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                We are authorized system integrators and service partners for Voltas, Haier, Carrier, Mitsubishi Electric, O General, Hitachi, and Trane. All equipment comes with full manufacturer warranty and factory-certified technicians.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy-950 mb-2 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-hvac-600 shrink-0" />
                <span>Why choose a VRF Home system instead of normal split ACs?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Traditional split ACs require one noisy outdoor unit for every single room, cluttering your balcony and facade. A VRF Home system replaces all of them with just 1 terrace-mounted outdoor unit, saves up to 50% power, and lets you hide sleek indoor units inside your false ceiling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy-950 mb-2 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-hvac-600 shrink-0" />
                <span>Do you offer commercial HVAC contracts and AMC in {city.name}?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Yes! We manage comprehensive Annual Maintenance Contracts (AMC) for hospitals, corporate offices, hotels, banquet halls, and retail outlets in {city.name} with 24/7 uptime monitoring.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Switch City Footer Bar */}
      <section className="py-12 bg-navy-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Explore VRF & AC Solutions in Other Indian Cities
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {allCitiesList.map((c) => (
              <Link
                key={c.slug}
                to={`/locations/${c.slug}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  c.slug === citySlug
                    ? 'bg-hvac-600 text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
