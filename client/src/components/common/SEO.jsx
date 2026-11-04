import { useEffect } from 'react';

export default function SEO({ title, description, schemaData }) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | VRF Homes - Advanced HVAC Solutions` 
      : 'VRF Homes | Advanced HVAC & Air Conditioning Solutions';
    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || 'Premium residential and commercial HVAC solutions, VRF systems, chillers, and precision air conditioning installations.';

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
  }, [title, description, schemaData]);

  return null;
}
