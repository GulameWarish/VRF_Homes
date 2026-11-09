import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SEO from '../components/common/SEO';

// Streamlined Homepage Sections as requested
import HeroSection from '../components/sections/HeroSection';
import HvacSizingCalculator from '../components/sections/HvacSizingCalculator';
import VrfHomeIntroSection from '../components/sections/VrfHomeIntroSection';
import VrfMainFeaturesSection from '../components/sections/VrfMainFeaturesSection';
import CtaSection from '../components/sections/CtaSection';

// Major Upgrade: Exit Intent Popup Modal
import ExitIntentModal from '../components/modals/ExitIntentModal';

export default function HomePage({ onOpenQuote }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Settings load error:', err.message);
      }
    };
    fetchSettings();
  }, []);

  const homeKeywords = 'vrfhome, vrf home, vrfsolution, vrf solution, acsolution, ac solution, hvac solution, ac repairing, ac maintenance, ac maintance, new ac install, new ac installation, ac amc, ductable ac, voltas ac, haier ac, carrier ac, hitachi ac, o general ac, mitsubishi electric vrf, trane chiller, ac repairing new delhi, new ac install new delhi, vrf solution new delhi, ac repairing mumbai, vrf solution mumbai, ac repairing noida, vrf solution noida, ac repairing bangalore, vrf solution bangalore, ac repairing chennai, vrf solution chennai, ac repairing kolkata, vrf solution kolkata, ac repairing chandigarh, vrf solution chandigarh, ac repairing ahmedabad, vrf solution ahmedabad, ac repairing lucknow, vrf solution lucknow';

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'VRF Homes',
    alternateName: 'VRF Homes - VRF Solution, AC Solution, AC Repairing & Installation',
    url: 'https://vrfhomes.com/',
    logo: 'https://vrfhomes.com/vrf-logo.svg',
    image: 'https://vrfhomes.com/images/real/vrf-home-cutaway-hero.png',
    description: 'Certified VRF solution, AC solution, 24/7 emergency AC repairing, preventive AC maintenance AMC, and turnkey new AC installation across New Delhi, Mumbai, Chennai, Noida, Kolkata, Bangalore, Chandigarh, Ahmedabad & Lucknow.',
    telephone: settings?.phone || '+91 88969 21318',
    email: settings?.email || 'sales@shuklaenterprises.in',
    priceRange: '₹₹',
    areaServed: [
      { '@type': 'City', name: 'New Delhi' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Kolkata' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Lucknow' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'VRF, HVAC & AC Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'VRF Solution & Central Air Conditioning',
            description: 'Multi-room VRF Home systems with single outdoor unit, whisper-quiet operation, and 20-40% power savings.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AC Repairing & Breakdown Assistance',
            description: 'Rapid on-site AC repair, compressor replacement, gas leak charging, and PCB electronic troubleshooting.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preventive AC Maintenance AMC',
            description: 'Annual Maintenance Contracts, deep jet chemical cleaning, filter sterilization, and seasonal system health checkups.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'New AC Installation & Turnkey HVAC Contracting',
            description: 'Factory-certified new AC installation for Voltas, Haier, Carrier, Mitsubishi Electric, O General, Hitachi & Trane.'
          }
        }
      ]
    }
  };

  const targetCities = [
    { name: 'New Delhi', slug: 'new-delhi' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Noida', slug: 'noida' },
    { name: 'Lucknow', slug: 'lucknow' },
    { name: 'Bangalore', slug: 'bangalore' },
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Kolkata', slug: 'kolkata' },
    { name: 'Chandigarh', slug: 'chandigarh' },
    { name: 'Ahmedabad', slug: 'ahmedabad' }
  ];

  return (
    <>
      <SEO 
        title="VRF Homes | VRF Solution, AC Solution, AC Repairing, AC Maintenance & New AC Install"
        description="India's leading VRF solution, AC solution, 24/7 fast AC repairing, preventive AC maintenance AMC, and certified new AC installation in New Delhi, Mumbai, Chennai, Noida, Kolkata, Bangalore, Chandigarh, Ahmedabad & Lucknow."
        keywords={homeKeywords}
        schemaData={homeSchema}
      />

      {/* 1. Hero Section: Outdoor Unit Control Image & Interactive Villa Cutaway */}
      <HeroSection settings={settings} onOpenQuote={onOpenQuote} />

      {/* Google SEO Targeted City & Service Strip */}
      <section className="bg-navy-950 text-white border-y border-slate-800 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold uppercase tracking-wider shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Active Service Hubs & Certified Technicians:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {targetCities.map((c) => (
              <a
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-[#009fe3] text-slate-300 hover:text-white border border-slate-800 transition-colors text-[11px] font-semibold"
                title={`VRF Solution, AC Repairing & New AC Install in ${c.name}`}
              >
                📍 {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive HVAC Tonnage & Cost Sizing Calculator */}
      <HvacSizingCalculator onOpenQuote={onOpenQuote} />

      {/* 3. VRF Home Introduction & Why Choose VRF Homes */}
      <VrfHomeIntroSection onOpenQuote={onOpenQuote} />

      {/* 4. Main Features with Technical Blueprint & CAD Drawing Style Graphics */}
      <VrfMainFeaturesSection onOpenQuote={onOpenQuote} />

      {/* Final Conversion Action Banner */}
      <CtaSection onOpenQuote={onOpenQuote} settings={settings} />

      {/* Major Upgrade: Exit-Intent Popup ("Leaving So Soon?") */}
      <ExitIntentModal onOpenQuote={onOpenQuote} />
    </>
  );
}
