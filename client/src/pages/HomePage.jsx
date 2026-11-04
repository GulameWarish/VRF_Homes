import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SEO from '../components/common/SEO';

// Streamlined Homepage Sections as requested
import HeroSection from '../components/sections/HeroSection';
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

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: settings?.companyName || 'VRF Homes',
    description: settings?.heroSubheading || 'Advanced VRF Home Central Air Conditioning Solutions for Modern Living & Luxury Architecture',
    telephone: settings?.phone || '+91 88969 21318',
    email: settings?.email || 'sales@shuklaenterprises.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      postalCode: '226018',
      addressCountry: 'IN'
    }
  };

  return (
    <>
      <SEO 
        title={settings?.companyName ? `${settings.companyName} | Advanced VRF Home Central Air Conditioning` : 'VRF Homes | Advanced VRF Home Air Conditioning Solutions'}
        description={settings?.heroSubheading || 'Pioneering Variable Refrigerant Flow central air conditioning for luxury residences, penthouses, and villas.'}
        schemaData={homeSchema}
      />

      {/* 1. Hero Section: Outdoor Unit Control Image & Interactive Villa Cutaway */}
      <HeroSection settings={settings} onOpenQuote={onOpenQuote} />

      {/* 2. VRF Home Introduction & Why Choose VRF Homes */}
      <VrfHomeIntroSection onOpenQuote={onOpenQuote} />

      {/* 3. Main Features with Technical Blueprint & CAD Drawing Style Graphics */}
      <VrfMainFeaturesSection onOpenQuote={onOpenQuote} />

      {/* Final Conversion Action Banner */}
      <CtaSection onOpenQuote={onOpenQuote} settings={settings} />

      {/* Major Upgrade: Exit-Intent Popup ("Leaving So Soon?") */}
      <ExitIntentModal onOpenQuote={onOpenQuote} />
    </>
  );
}
