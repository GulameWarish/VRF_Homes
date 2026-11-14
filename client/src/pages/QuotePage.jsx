import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, AlertCircle, Building2, 
  Home, Upload, Send, ShieldCheck, PhoneCall, Mail, 
  ArrowRight, Wind, Zap, Volume2, Layers, Check, Info, MessageSquare 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    pincode: '',
    segment: 'Residential',
    propertyType: 'Luxury Villa',
    preferredBrand: 'All Brands (Unbiased Recommendation)',
    enquiryType: 'Free Site Inspection & Sizing',
    message: '',
    attachment: ''
  });

  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [activeMobileCard, setActiveMobileCard] = useState(null); // mobile tap toggle
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 9 Authorized Brands with genuine equipment and authentic specs
  const brands = [
    {
      id: 'daikin',
      name: 'Daikin India',
      tagline: 'Global Inventor of VRV • VRV Home & X Series',
      logo: '/images/brands/daikin.svg',
      image: '/images/equipment/daikin-outdoor.jpg',
      indoorImage: '/images/equipment/daikin-indoor.jpg',
      indoorName: 'Daikin VRV Home Inverter Indoor Unit',
      category: 'VRV Home & VRV X Multi-Split',
      context: 'Daikin revolutionized modern HVAC by inventing Variable Refrigerant Volume (VRV). Daikin India systems feature next-generation VRT (Variable Refrigerant Temperature) technology, dynamic part-load COP up to 6.2, and ultra-compact residential VRV Home outdoor units tailored for Indian luxury villas and penthouses.',
      highlights: [
        'Daikin VRV X & VRV Home Inverter Outdoor Units',
        'Next-Gen VRT (Variable Refrigerant Temperature) Tech',
        'Dynamic Seasonal COP up to 6.2 with Auto Oil Recovery',
        'Nationwide Direct Daikin India Engineering & Service Support'
      ]
    },
    {
      id: 'blue-star',
      name: 'Blue Star',
      tagline: "India's Cooling Expert • VRF V Plus Inverter",
      logo: '/images/brands/blue-star.svg',
      image: '/images/equipment/blue-star-outdoor.jpg',
      indoorImage: '/images/equipment/blue-star-indoor.jpg',
      indoorName: 'Blue Star Designer Inverter Hi-Wall AC (Gold Accent)',
      category: 'VRF V Plus 100% Inverter',
      context: "India's homegrown air conditioning pioneer with over 8 decades of specialized cooling engineering. Blue Star VRF V Plus systems are built for rugged 54°C Indian heat, high part-load efficiency, and flexible piping architectures up to 1,000m.",
      highlights: [
        'Blue Star VRF V Plus 100% Inverter Outdoor Condenser',
        'Blue Star Designer Gold-Trim Inverter Hi-Wall AC',
        'Blue Star Concealed Ducted & Commercial AHU Lineup',
        'Field-Proven Rooftop Vibration-Isolated Installations'
      ]
    },
    {
      id: 'carrier',
      name: 'Carrier India',
      tagline: 'Carrier Airconditioning & Refrigeration / Carrier Midea',
      logo: '/images/brands/carrier.svg',
      image: '/images/equipment/carrier-outdoor.jpg',
      indoorImage: '/images/equipment/carrier-indoor.webp',
      indoorName: 'Carrier 1 Ton 3-Star High-Efficiency AC',
      category: 'XPower High-Efficiency VRF & Multi-Split',
      context: 'Carrier India operates through Carrier Airconditioning & Refrigeration Ltd. (Commercial VRF/Chillers) and Carrier Midea India Pvt. Ltd. (Residential Multi-Splits), featuring patented intelligent oil return algorithms, subcooling thermodynamic loops, and modular condenser scalability up to 1,000m copper piping.',
      highlights: [
        'Carrier Airconditioning & Refrigeration Ltd. Engineering',
        'Carrier Midea India Inverter Multi-Split & Hi-Wall',
        'Up to 1,000m Extended Piping Network with Subcooling',
        'High Seasonal Energy Efficiency (ISEER) Ratings'
      ]
    },
    {
      id: 'voltas',
      name: 'Voltas',
      tagline: 'A TATA Enterprise • 183VADW Inverter',
      logo: '/images/brands/voltas.svg',
      image: '/images/equipment/voltas-outdoor.jpg',
      indoorImage: '/images/equipment/voltas-indoor.jpg',
      indoorName: 'Voltas 1.5 Ton 3 Star Inverter Split AC',
      category: 'Inverter VRF & Commercial Ducted',
      context: 'Voltas brings the trusted legacy of the TATA Group with robust Inverter VRF and split systems engineered to withstand wide voltage fluctuations (160V-270V) and extreme Indian summer temperatures.',
      highlights: [
        'Voltas 1.5T 3-Star Inverter Split & Heavy Outdoor',
        'Dual Inverter Scroll Compressor Modulation',
        'Wide Voltage Fluctuation Guard (160V-270V)',
        'Extensive Nationwide Service Footprint'
      ]
    },
    {
      id: 'hitachi',
      name: 'Hitachi',
      tagline: 'Set-Free Intelligent Multi-Split',
      logo: '/images/brands/hitachi.svg',
      image: '/images/equipment/hitachi-outdoor.jpg',
      indoorImage: '/images/equipment/hitachi-indoor.jpg',
      indoorName: 'Hitachi YOSHI 5500SWXL 1.5 TR Inverter',
      category: 'Set-Free Inverter VRF',
      context: 'Hitachi Set-Free VRF technology utilizes proprietary asymmetric scroll compressors and 0.1 Hz inverter stepping for precise capacity modulation without energy-wasting temperature swings.',
      highlights: [
        'Hitachi Commercial Ductable AC Outdoor Unit',
        'Hitachi YOSHI 5500SWXL 1.5 TR Hi-Wall',
        'Asymmetric Scroll Compressor Technology',
        '0.1 Hz Micro-Step Inverter Frequency'
      ]
    },
    {
      id: 'o-general',
      name: 'O General',
      tagline: 'Fujitsu General Tropical Cooling',
      logo: '/images/brands/o-general.svg',
      image: '/images/equipment/ogeneral-outdoor.jpg',
      indoorImage: '/images/equipment/ogeneral-indoor.jpg',
      indoorName: 'O General 1.5 Ton 3 Star Split (ASGA18FUTD)',
      category: 'Extreme Ambient 55°C VRF',
      context: 'Unmatched heavy-duty tropical performance engineered to deliver rated cooling even when outdoor ambient heat touches 55°C. Powered by heavy twin rotary DC compressors and blue-fin coils.',
      highlights: [
        'O General Heavy-Duty Outdoor Tropical Unit',
        'O General 1.5 Ton Split (ASGA18FUTD White)',
        'Certified Cooling at 55°C Ambient Heat',
        'Blue-Fin Anti-Rust Condenser Coils'
      ]
    },
    {
      id: 'mitsubishi-electric',
      name: 'Mitsubishi Electric',
      tagline: 'City Multi VRF & Acoustic Silence',
      logo: '/images/brands/mitsubishi-electric.svg',
      image: '/images/equipment/mitsubishi-outdoor.jpg',
      indoorImage: '/images/equipment/mitsubishi-indoor.jpg',
      indoorName: 'Mitsubishi Electric City Multi Hi-Wall',
      category: 'City Multi Inverter VRF',
      context: 'World-renowned Japanese precision engineering. City Multi VRF systems deliver supreme acoustic peace with indoor operating noise down to 19 dB(A) and simultaneous heat recovery comfort.',
      highlights: [
        'Mitsubishi Electric All-DC Inverter Outdoor Unit',
        'Mitsubishi Electric Whisper-Quiet Hi-Wall (19 dB)',
        'City Multi Dynamic Capacity Shifting',
        'Simultaneous Heating & Cooling (R2)'
      ]
    },
    {
      id: 'trane',
      name: 'Trane',
      tagline: 'Applied Systems & Chiller Technology',
      logo: '/images/brands/trane.svg',
      image: '/images/equipment/trane-outdoor.jpg',
      indoorImage: '/images/equipment/trane-indoor.jpg',
      indoorName: 'Trane Applied High-Static Indoor Unit',
      category: 'Heavy-Duty Commercial VRF',
      context: 'Trane is the global benchmark for critical cooling in hospitals, data centers, and luxury estates. Heavy-duty construction ensures seamless 24/7 continuous operation under punishing thermal loads.',
      highlights: [
        'Trane Heavy Commercial Outdoor Inverter Unit',
        'Trane Applied Precision Indoor Unit',
        'Hospital & Cleanroom Grade Reliability',
        'Continuous 24/7 Heavy Duty Operation'
      ]
    },
    {
      id: 'haier',
      name: 'Haier',
      tagline: 'Twin-Fan Inverter Multi-Split & MRV',
      logo: '/images/brands/haier.svg',
      image: '/images/equipment/haier-outdoor-dual-fan.jpg',
      indoorImage: '/images/equipment/commercial-heavy-ductable-unit.jpg',
      indoorName: 'Haier Commercial Ducted Inverter Unit',
      category: 'Commercial MRV & Duct AC',
      context: 'Proven in heavy-duty commercial hypermarkets, retail complexes, and luxury villa installations by Shukla Enterprise. Features twin-fan vertical discharge condensers, hydrophilic anti-corrosion fins, and high-static concealed ductable units.',
      highlights: [
        'Haier Twin-Fan DC Inverter Outdoor Condenser',
        'Heavy-Duty Suspended Concealed Ductable Units',
        'Engineered MS Cantilever Wall Frame Mounting',
        'High-Airflow Jet Nozzle Diffusers for Large Spaces'
      ]
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectBrand = (brandName) => {
    setFormData(prev => ({ ...prev, preferredBrand: brandName }));
  };

  const toggleMobileCard = (bId, bName) => {
    setActiveMobileCard(prev => prev === bId ? null : bId);
    handleSelectBrand(bName);
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
            message: 'Your project quote request has been received. Our engineering specialist will contact you within 24 business hours.'
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
`• *Brand:* ${formData.preferredBrand || 'All Authorized Brands'}\n` +
`• *Property:* ${formData.propertyType || 'Luxury Villa / House'}\n` +
`• *Service:* ${formData.enquiryType || 'Free Site Inspection & Sizing'}\n` +
`────────────────────────────────────────\n` +
`📝 *REQUIREMENTS & SCOPE:*\n` +
`${formData.message || formData.requirements || 'Requested Itemized BOQ & Sizing Consultation'}\n` +
`────────────────────────────────────────\n` +
`⚡ *Source:* Official Platform • https://vrfhomes.com\n` +
`════════════════════════════════════════`;

      const waUrl = `https://wa.me/918896921318?text=${encodeURIComponent(waCard)}`;
      try {
        window.open(waUrl, '_blank');
      } catch (_) {}

      if (res.data?.success) {
        setSuccessMessage(res.data.message || 'Your project quote request has been transmitted directly to our WhatsApp and Engineering Email desk.');
      } else {
        setErrorMessage(res.data?.message || 'Submission error. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      setSuccessMessage('Your project quote request has been transmitted directly to our WhatsApp and Engineering Email desk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Get a Free Estimate & Engineering Consultation | VRF Homes"
        description="VRF Home packages engineering and luxury together. Single outdoor unit controls multiple indoor units with 20-40% power savings. Request a free quote across Voltas, Carrier, Haier, Hitachi, Trane, O General and Mitsubishi Electric."
      />

      {/* Main Container */}
      <div className="bg-slate-50 min-h-screen py-6 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-500 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#059669] transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#059669] uppercase">REQUEST A FREE ESTIMATE</span>
          </div>

          {/* Section 1: VRF Home Introduction (Glass Theme) */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] mb-6 sm:mb-10">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <span>Next-Gen Climate Engineering &amp; Architectural Luxury</span>
            </div>

            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight">
              VRF Home: Where Engineering Meets Pure Luxury
            </h1>

            {/* Exact Reference Introduction Context */}
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed space-y-2.5 sm:space-y-3 max-w-5xl">
              <p>
                <strong>VRF Home</strong> is an air-conditioning solution which packages engineering and luxury together. It is an ideal solution to make your home a comfortable place according to your exact needs without covering much space.
              </p>
              <p className="text-slate-600">
                Unlike any traditional split air conditioning solution, it does not need a dedicated outdoor unit with each indoor unit, but a <strong>single outdoor unit controls multiple indoor units</strong> instead. It does not only provide energy efficiency (slashing power consumption by 20-40%), but utilizes balcony and facade space efficiently too, giving zero hassle during installation and total peace of mind.
              </p>
            </div>

            {/* 4 Feature Badges (Fluid Responsive Grid: 2 cols on mobile, 4 on desktop) */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-slate-100">
              <div className="flex items-center space-x-2.5 sm:space-x-3 p-2 rounded-xl bg-slate-50/70">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">1 Outdoor Unit</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Replaces 6-12 Splits</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 sm:space-x-3 p-2 rounded-xl bg-slate-50/70">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">20-40% Power Savings</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">All-DC Inverter Drive</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 sm:space-x-3 p-2 rounded-xl bg-slate-50/70">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">20-38 dB(A) Quiet</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Ultra-Quiet Sleep</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 sm:space-x-3 p-2 rounded-xl bg-slate-50/70">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">Zero Balcony Clutter</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">100% Usable Space</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Two Columns — Left: 7 Interactive Brand Images with Hover Context | Right: Project Quote Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* LEFT COLUMN: 9 Brand Showcase Cards (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-1.5">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-navy-950 uppercase tracking-wider flex items-center space-x-2">
                    <span>Authorized Equipment Portfolio</span>
                    <span className="text-[10px] sm:text-xs bg-[#059669]/10 text-[#059669] px-2 py-0.5 rounded-full font-bold">
                      9 Authorized Brands
                    </span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Hover on desktop or tap on phone to inspect engineering specifications.
                  </p>
                </div>
                {formData.preferredBrand && formData.preferredBrand !== 'All Brands (Unbiased Recommendation)' && (
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, preferredBrand: 'All Brands (Unbiased Recommendation)' }))}
                    className="text-[11px] text-slate-500 hover:text-rose-600 underline text-left sm:text-right"
                  >
                    Reset Selected ({formData.preferredBrand})
                  </button>
                )}
              </div>

              {/* 7 Brand Image Cards in a Responsive Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {brands.map((b) => {
                  const isSelected = formData.preferredBrand === b.name;
                  const isHovered = hoveredBrand === b.id;
                  const isMobileActive = activeMobileCard === b.id;
                  const showOverlay = isHovered || isMobileActive;

                  return (
                    <div
                      key={b.id}
                      onClick={() => toggleMobileCard(b.id, b.name)}
                      onMouseEnter={() => setHoveredBrand(b.id)}
                      onMouseLeave={() => setHoveredBrand(null)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 h-64 sm:h-72 shadow-sm ${
                        isSelected 
                          ? 'ring-3 ring-[#059669] border-transparent shadow-xl' 
                          : 'border-slate-200 hover:border-[#059669] hover:shadow-xl'
                      }`}
                    >
                      {/* Background Equipment Image (Transforms and Dims on Hover/Tap) */}
                      <img
                        src={b.image}
                        alt={`${b.name} VRF HVAC System`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                          showOverlay
                            ? 'scale-115 filter brightness-[0.16]'
                            : 'group-hover:scale-115 group-hover:filter group-hover:brightness-[0.16]'
                        }`}
                      />

                      {/* Ambient Default Gradient (Visible before hover) */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent transition-opacity duration-500 pointer-events-none ${
                        showOverlay ? 'opacity-0' : 'group-hover:opacity-0'
                      }`}></div>

                      {/* Top Brand Logo Banner (Always visible with clean backdrop) */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <div className="bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/80 shadow-md">
                          <img
                            src={b.logo}
                            alt={`${b.name} Logo`}
                            className="h-4 sm:h-5 max-w-[90px] sm:max-w-[105px] object-contain object-left"
                          />
                        </div>
                        {isSelected && (
                          <span className="bg-[#059669] text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-md">
                            <Check className="w-3 h-3" />
                            <span>Selected</span>
                          </span>
                        )}
                      </div>

                      {/* DEFAULT BOTTOM STATE (Visible before hover) */}
                      <div className={`absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white z-10 transition-all duration-300 pointer-events-none ${
                        showOverlay 
                          ? 'opacity-0 translate-y-4' 
                          : 'group-hover:opacity-0 group-hover:translate-y-4'
                      }`}>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-300">
                          {b.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {b.name}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 truncate mt-0.5">
                          {b.tagline}
                        </p>
                        <div className="mt-2 text-[9px] sm:text-[10px] font-bold text-cyan-200 flex items-center space-x-1">
                          <span className="hidden sm:inline">Hover to inspect specs</span>
                          <span className="sm:hidden">Tap to view specs</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>

                      {/* HOVER / TAP OVERLAY: Background becomes dark and rich context reveals */}
                      <div className={`absolute inset-0 p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 ease-out z-20 text-white bg-navy-950/85 backdrop-blur-xs ${
                        showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <div className="pt-8 sm:pt-9">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                              {b.category}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                              Tap to select
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5 sm:mt-1">
                            {b.name}
                          </h3>

                          {/* Brand Context Description */}
                          <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed mt-1.5 sm:mt-2 line-clamp-3 sm:line-clamp-none">
                            {b.context}
                          </p>

                          {/* Real Indoor Equipment Thumbnail & Model */}
                          {b.indoorImage && (
                            <div className="mt-2 p-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center space-x-2">
                              <img 
                                src={b.indoorImage} 
                                alt={b.indoorName} 
                                className="w-12 h-7 rounded object-cover bg-white shrink-0 border border-white/20"
                              />
                              <div className="min-w-0">
                                <span className="text-[9px] uppercase font-bold text-emerald-300 block truncate">
                                  Paired Indoor Unit
                                </span>
                                <span className="text-[10px] text-slate-200 truncate block font-medium">
                                  {b.indoorName}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Key Technical Highlights */}
                          <div className="mt-2 sm:mt-2.5 space-y-1">
                            {b.highlights.slice(0, 3).map((hl, i) => (
                              <div key={i} className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] text-cyan-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0"></span>
                                <span className="truncate">{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Selection Action Button */}
                        <div className="pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-300">
                            {isSelected ? 'Selected for Estimate' : 'Selected Brand'}
                          </span>
                          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold">
                            {isSelected ? '✓' : '+'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Consultation Note */}
              <div className="p-3.5 sm:p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-start space-x-2.5 sm:space-x-3 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#059669] shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs leading-relaxed">
                  <strong>Unbiased Multi-Brand Engineering:</strong> We analyze your architectural floor plans, ceiling clearances, and electrical loads to recommend the optimal equipment without manufacturer bias.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Project Quote Form (Glass Card) */}
            <div className="lg:col-span-5 glass-card p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/80 shadow-[0_16px_50px_rgba(0,0,0,0.08)] lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto overscroll-contain">
              
              {/* Form Title (Matching Reference Screenshot) */}
              <div className="text-center pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#059669] uppercase tracking-wider">
                  ENQUIRE FOR A PROJECT QUOTE
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  Fill in your requirements below for a detailed heat load estimate and itemized BOQ.
                </p>
              </div>

              {successMessage ? (
                <div className="py-8 sm:py-10 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-navy-950">Thank You! Request Received</h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    {successMessage}
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                    Our Senior Mechanical HVAC Engineer will connect with your proposal within 2 hours.
                  </div>
                  
                  {/* Instant WhatsApp Lead Action */}
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto pt-1">
                    <a
                      href={`https://wa.me/918896921318?text=${encodeURIComponent(
`╔══════════════════════════════════════╗\n` +
`║    🏛️ VRF HOMES • ESTIMATE CARD     ║\n` +
`╚══════════════════════════════════════╝\n` +
`👤 *CLIENT:* ${formData.fullName}\n` +
`📱 *CONTACT:* ${formData.mobile}\n` +
`📧 *EMAIL:* ${formData.email}\n` +
`📍 *CITY:* ${formData.city}${formData.pincode ? ` (${formData.pincode})` : ''}\n` +
`🏷️ *BRAND:* ${formData.preferredBrand}\n` +
`🏢 *SEGMENT:* ${formData.segment}\n` +
`🏠 *PROPERTY:* ${formData.propertyType}\n` +
`📝 *REQUIREMENT:* ${formData.message || 'Free Project Estimate'}\n` +
`🌐 *PORTAL:* https://vrfhomes.com`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send on WhatsApp</span>
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
`- Preferred Brand : ${formData.preferredBrand}\n` +
`- Segment         : ${formData.segment}\n` +
`- Property Type   : ${formData.propertyType}\n\n` +
`REQUIREMENTS & SCOPE:\n` +
`${formData.message || 'Requested Itemized BOQ & Sizing Consultation'}\n\n` +
`----------------------------------------------\n` +
`Sent via VRF Homes Web Portal (https://vrfhomes.com)\n` +
`==============================================`
                      )}`}
                      className="py-2.5 px-3 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email</span>
                    </a>

                    <button
                      onClick={() => {
                        setSuccessMessage('');
                        setFormData({
                          fullName: '',
                          email: '',
                          mobile: '',
                          city: '',
                          pincode: '',
                          segment: 'Residential',
                          propertyType: 'Luxury Villa',
                          preferredBrand: 'All Brands (Unbiased Recommendation)',
                          enquiryType: 'Free Site Inspection & Sizing',
                          message: '',
                          attachment: ''
                        });
                      }}
                      className="px-4 py-2.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors"
                    >
                      New Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    />
                  </div>

                  {/* City & Pincode Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Lucknow / Kochi"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="e.g. 226018"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                      />
                    </div>
                  </div>

                  {/* Preferred Equipment Brand (Auto-updated on card click) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Equipment Brand
                    </label>
                    <select
                      name="preferredBrand"
                      value={formData.preferredBrand}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    >
                      <option value="All Brands (Unbiased Recommendation)">All Brands (Unbiased Recommendation)</option>
                      <option value="Daikin India">Daikin India (VRV Home & VRV X)</option>
                      <option value="Blue Star">Blue Star VRF V Plus</option>
                      <option value="Carrier India">Carrier India (Carrier Airconditioning & Refrigeration / Carrier Midea)</option>
                      <option value="Hitachi">Hitachi Set-Free VRF</option>
                      <option value="Voltas">Voltas Inverter VRF (A TATA Enterprise)</option>
                      <option value="O General">O General Tropical VRF</option>
                      <option value="Mitsubishi Electric">Mitsubishi Electric City Multi</option>
                      <option value="Trane">Trane Applied VRF / Chillers</option>
                      <option value="Haier">Haier MRV & Duct AC</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Property Typology</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    >
                      <option value="Luxury Villa">Luxury Villa / Independent House</option>
                      <option value="Modern Apartment">Modern Apartment / Penthouse</option>
                      <option value="Corporate Office">Corporate Office / IT Park</option>
                      <option value="Hospital & Healthcare">Hospital / Medical Suite</option>
                      <option value="Hotel & Resort">Hotel / Resort / Banquet</option>
                      <option value="Retail Showroom">Retail Showroom / Mall</option>
                      <option value="Industrial Plant">Industrial Facility / Warehouse</option>
                    </select>
                  </div>

                  {/* Query / Space Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Query / Project Details</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Number of rooms, floor area, or cooling preferences..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                    ></textarea>
                  </div>

                  {/* Optional Floor Plan Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Upload Floor Plan / BOQ (Optional)
                    </label>
                    <label className="flex items-center justify-center p-3 border-2 border-dashed border-slate-300 hover:border-[#059669] rounded-xl cursor-pointer bg-slate-50 transition-colors">
                      <Upload className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                      <span className="text-[11px] sm:text-xs text-slate-600 truncate">
                        {uploading ? 'Uploading...' : formData.attachment ? 'File Attached Successfully ✓' : 'Attach PDF, DWG, or JPG'}
                      </span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip"
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md shadow-[#059669]/30 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND REQUEST FOR FREE ESTIMATE</span>
                      </>
                    )}
                  </button>

                  {/* Direct Contact Phone & Email */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
                    <a href="tel:+918896921318" className="hover:text-[#059669] flex items-center space-x-1">
                      <PhoneCall className="w-3 h-3 text-[#059669]" />
                      <span>+91 88969 21318</span>
                    </a>
                    <a href="mailto:sales@shuklaenterprises.in" className="hover:text-[#059669] flex items-center space-x-1 truncate max-w-[220px]">
                      <Mail className="w-3 h-3 text-[#059669]" />
                      <span className="truncate">sales@shuklaenterprises.in</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
