import { useEffect } from 'react';

export default function SEO({ title, description, keywords, schemaData }) {
  useEffect(() => {
    // Clean Page Title: prevent repetitive brand suffixes
    let fullTitle = title || 'VRF Homes | VRF Solution, AC Solution, AC Repairing & New AC Install';
    if (!fullTitle.toLowerCase().includes('vrf home')) {
      fullTitle = `${fullTitle} | VRF Homes`;
    }
    document.title = fullTitle;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || 'Certified VRF solution, AC solution, 24/7 fast AC repairing, preventive AC maintenance AMC, and new AC installation services across New Delhi, Mumbai, Noida, Bangalore, Chennai, Kolkata, Chandigarh, Ahmedabad & Lucknow.';

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || 'vrfhome, vrf home, vrfsolution, vrf solution, acsolution, ac solution, hvac solution, ac repairing, ac maintenance, ac maintance, new ac install, new ac installation, ac amc, ductable ac, voltas, haier, carrier, hitachi, o general, mitsubishi electric, trane, new delhi, mumbai, noida, bangalore, chennai, kolkata, chandigarh, ahmedabad, lucknow';

    // Inject JSON-LD Schema if provided
    let scriptTag = document.getElementById('seo-jsonld');
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, schemaData]);

  return null;
}
