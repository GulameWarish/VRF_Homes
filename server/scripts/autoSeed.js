import User from '../models/User.js';
import CommercialCategory from '../models/CommercialCategory.js';
import ResidentialCategory from '../models/ResidentialCategory.js';
import Brand from '../models/Brand.js';
import Product from '../models/Product.js';
import Feature from '../models/Feature.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import WebsiteSettings from '../models/WebsiteSettings.js';
import Enquiry from '../models/Enquiry.js';

export const autoSeedData = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@vrfhomes.com' });
  if (!existingAdmin) {
    console.log('[Seed] Seeding default admin user...');
    await User.create({
      name: 'Executive HVAC Administrator',
      email: 'admin@vrfhomes.com',
      password: 'Admin@12345',
      role: 'admin',
      phone: '+91 98100 12345'
    });
  }

  // Seed or update Website Settings with exact company contact details
  let settingsDoc = await WebsiteSettings.findOne();
  const exactContactData = {
    companyName: 'VRF Homes',
    tagline: 'Advanced HVAC Solutions for Modern Living & Business',
    heroHeadline: 'Advanced HVAC Solutions for Modern Living & Business',
    heroSubheading: 'From luxury residences to large-scale commercial projects, we deliver reliable, efficient and intelligent air conditioning solutions.',
    phone: '+91 88969 21318',
    secondaryPhone: '+91 92206 01573',
    whatsapp: '+91 88969 21318',
    email: 'sales@shuklaenterprises.in',
    salesEmail: 'sales@shuklaenterprises.in',
    registeredOffice: {
      title: 'Registered Office',
      address: 'UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow - 226018, Uttar Pradesh, India',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226018',
      country: 'India',
      mapUrl: 'https://maps.google.com/?q=Unnao+Arcade+Building+5+Gautam+Buddha+Marg+Lucknow+226018'
    },
    delhiOffice: {
      title: 'Delhi Office',
      address: '14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi, Delhi - 110059, India',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110059',
      country: 'India',
      mapUrl: 'https://maps.google.com/?q=14A+Uttam+Vihar+Block+F+Mahavir+Enclave+Part+3+Bindapur+New+Delhi+110059'
    },
    keralaOffice: {
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
    },
    aluvaOffice: {
      title: 'Aluva Branch Office',
      address: '16/557A, Konathedath Road, Kunnumpuram, PO, Desom, Aluva, Kochi, Kerala - 683102',
      phone: '+91 88969 21318',
      mapUrl: 'https://maps.google.com/?q=Konathedath+Road+Kunnumpuram+Desom+Aluva+Kochi+Kerala+683102'
    },
    branches: [
      'New Delhi',
      'Mumbai',
      'Chennai',
      'Noida',
      'Kolkata',
      'Bangalore',
      'Chandigarh',
      'Ahmedabad',
      'Lucknow'
    ],
    keralaLocations: [
      'Thrissur (State Office)',
      'Aluva (Branch Office)',
      'Noornad (Alappuzha Hub)',
      'Attingal & Trivandrum (Capital Hub)',
      'Marine Drive Kochi',
      'Kottayam',
      'Kayamkulam',
      'Ernakulam',
      'Poojapura Trivandrum'
    ],
    socialLinks: {
      facebook: 'https://www.facebook.com/acsaleslko',
      twitter: 'https://x.com/ShuklaEnterpri5',
      instagram: 'https://www.instagram.com/shukla_enterprises?igsh=OGh1NnIwcmx3ZnQ1',
      youtube: 'https://www.youtube.com/@shuklaenterprises2895',
      linkedin: 'https://www.linkedin.com/company/shukla-enterprises/'
    },
    stats: {
      completedProjects: '650+',
      residentialProjects: '420+',
      commercialProjects: '230+',
      yearsOfExperience: '18+',
      serviceLocations: '16+ Locations (Delhi, UP & Kerala)'
    }
  };

  if (!settingsDoc) {
    await WebsiteSettings.create(exactContactData);
  } else {
    Object.assign(settingsDoc, exactContactData);
    await settingsDoc.save();
  }

  // Seed Commercial Categories
  console.log('[Seed] Seeding & syncing commercial categories...');
  const commercialData = [
      {
        name: 'Hospitals & Healthcare',
        slug: 'hospitals',
        tagline: 'Sterile, Continuous & Precision Cleanroom HVAC Engineering',
        heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Healthcare facilities require non-negotiable thermal precision, microbiological containment, laminar airflow, and 100% fresh air distribution.',
        overview: 'We engineer medical-grade HVAC solutions for Operation Theatres (OT), Intensive Care Units (ICU), Isolation Wards, and diagnostic laboratories complying with NABH, ASHRAE 170 and CDC healthcare guidelines.',
        challenges: [
          { title: 'Airborne Pathogen Control', description: 'Preventing cross-contamination between infectious isolation wards and public clinical areas.', icon: 'ShieldAlert' },
          { title: '24/7 Redundant Reliability', description: 'Zero-downtime requirements for life-support environments, emergency surgeries, and blood banks.', icon: 'Activity' },
          { title: 'Ultra-Clean Pressurization', description: 'Maintaining positive pressure in surgical suites and negative pressure in isolation rooms.', icon: 'Gauge' }
        ],
        solutions: [
          { title: 'HEPA & Laminar Flow AHUs', description: 'H14 Grade filtration with 99.995% particulate capture efficiency for sterile surgical zones.', icon: 'CheckCircle2' },
          { title: 'Medical VRF with UVGI Sterilization', description: 'Variable Refrigerant Flow systems paired with Ultraviolet Germicidal Irradiation coils.', icon: 'Sparkles' },
          { title: 'BMS Environmental Monitoring', description: 'Real-time differential pressure, relative humidity (RH 45-55%), and precision temperature logging.', icon: 'Cpu' }
        ],
        suitableProducts: ['Air Handling Units (AHU)', 'VRF Air Conditioning Systems', 'Chiller Systems', 'Fresh Air Systems'],
        benefits: [
          { title: 'NABH / ASHRAE 170 Compliant', description: 'Engineered specifically to satisfy strict medical accreditation requirements.', metric: '100%' },
          { title: 'Sterile Air Delivery', description: 'HEPA certified air filtration capturing spores, bacteria and microscopic particles.', metric: '99.99%' },
          { title: 'Energy Recovery Heat Wheel', description: 'Recovers up to 72% energy from hospital exhaust air while maintaining sterile separation.', metric: '38% Savings' }
        ],
        faqs: [
          { question: 'How do you prevent cross-contamination between hospital rooms?', answer: 'We engineer dedicated outdoor air systems (DOAS) with differential room pressure control, ensuring clean rooms maintain positive pressure while contagious zones maintain negative pressure.' },
          { question: 'What backup provisions are included for emergency suites?', answer: 'We design N+1 dual compressor redundancy and automatic generator transfer switches with instantaneous restart features.' }
        ],
        sortOrder: 1
      },
      {
        name: 'Hotels & Resorts',
        slug: 'hotels-resorts',
        tagline: 'Acoustic Luxury, Individual Comfort & Smart Guest Experience',
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Hospitality environments demand whisper-quiet operation, ultra-fast room cooling upon check-in, and centralized energy control.',
        overview: 'Deliver 5-star climate control with VRF heat recovery systems that simultaneously cool guest suites on sunny elevations while warming interior rooms, slashing utility costs.',
        challenges: [
          { title: 'Acoustic Disruption', description: 'Excessive air turbulence or compressor noise ruining guest sleep quality.', icon: 'VolumeX' },
          { title: 'Unoccupied Energy Waste', description: 'AC left running continuously when guests leave rooms for tours and amenities.', icon: 'ZapOff' },
          { title: 'Simultaneous Comfort Demands', description: 'Different guests requiring radically different room temperatures across floors.', icon: 'Thermometer' }
        ],
        solutions: [
          { title: 'Ultra-Quiet Slim Duct Units', description: 'Operating sound levels as low as 23 dB(A) - virtually imperceptible in luxury suites.', icon: 'Volume1' },
          { title: 'Keycard & PMS Automation', description: 'Seamless integration with Opera/Oracle PMS for automated eco-setback during vacancies.', icon: 'Key' },
          { title: 'Simultaneous Heat Recovery', description: 'Transfers waste heat from cooled kitchens and suites into free hot water heating.', icon: 'Flame' }
        ],
        suitableProducts: ['VRF Air Conditioning Systems', 'Concealed AC', 'Fan Coil Units (FCU)', 'Smart AC Control Systems'],
        benefits: [
          { title: 'Whisper Quiet Operation', description: 'Noise levels engineered down to library quiet standards for restful guest sleep.', metric: '23 dB(A)' },
          { title: 'PMS Energy Savings', description: 'Automated occupancy setback reduces hotel electricity consumption drastically.', metric: 'Up to 34%' }
        ],
        sortOrder: 2
      },
      {
        name: 'Corporate Offices & IT Parks',
        slug: 'corporate-offices',
        tagline: 'High-Efficiency Multi-Zone Workspaces Engineered for Productivity',
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Modern high-density offices require dynamic thermal load balancing across boardroom glass facades, open workstations, and server hubs.',
        overview: 'We provide modular VRF and high-COP Chiller networks featuring individual zone thermostats, fresh air CO2 demand-controlled ventilation, and centralized web-based BMS.',
        challenges: [
          { title: 'Afternoon Heat Radiation', description: 'Perimeter glass facades overheating while inner conference rooms remain chilly.', icon: 'Sun' },
          { title: 'CO2 Stagnation & Fatigue', description: 'Insufficient fresh air replenishment causing afternoon employee lethargy.', icon: 'Wind' }
        ],
        solutions: [
          { title: 'Variable Refrigerant Flow 3-Pipe', description: 'Independent cooling and heating in different office zones on a single network.', icon: 'Workflow' },
          { title: 'CO2 Sensor Demand Ventilation', description: 'Injects conditioned fresh outdoor air automatically whenever occupancy spikes.', icon: 'Gauge' }
        ],
        suitableProducts: ['VRF Air Conditioning Systems', 'Cassette AC', 'Ductable AC', 'Fresh Air Systems'],
        benefits: [
          { title: 'Energy Star / IGBC Points', description: 'Directly helps achieve LEED Platinum and IGBC Green Building certifications.', metric: 'LEED Certified' },
          { title: 'Tenant Billing Transparency', description: 'Individual power consumption calculation for multi-tenant commercial towers.', metric: 'Accurate to 1%' }
        ],
        sortOrder: 3
      },
      {
        name: 'Malls, Hypermarkets & Retail Spaces',
        slug: 'malls-retail',
        tagline: 'High-Displacement Suspended Ducted AC & High-Velocity Jet Nozzle Distribution',
        heroImage: '/images/commercial/hypermarket-ceiling-hvac.jpg',
        introduction: 'Large-format retail stores, hypermarkets, and shopping malls experience continuous door opening, heavy footfall surges, and high sensible heat loads around refrigeration aisles.',
        overview: 'We design and install heavy-duty ceiling-suspended ductable AC systems paired with high-velocity triple jet nozzle diffusers that distribute cold air evenly down through high-bay grocery and apparel aisles without draft spots or moisture condensation.',
        challenges: [
          { title: 'High Footfall Thermal Surges', description: 'Sudden peak customer crowds generating rapid temperature spikes across checkout and aisles.', icon: 'Users' },
          { title: 'Ceiling Height Air Stratification', description: 'Warm air accumulating near high warehouse ceilings while floor aisles need steady cooling.', icon: 'TrendingUp' },
          { title: 'Refrigeration Aisle Thermal Balance', description: 'Preventing moisture condensation and cold air stagnation near open freezer cases.', icon: 'Thermometer' }
        ],
        solutions: [
          { title: 'Suspended Commercial Ductable AC', description: 'Heavy-duty ceiling-hung units with multi-point unistrut rods and insulated refrigerant runs.', icon: 'Layers' },
          { title: 'High-Velocity Jet Nozzle Diffusers', description: 'Triple adjustable jet nozzles delivering focused airflow down high retail aisles.', icon: 'Wind' },
          { title: 'High-Ambient Inverter Condensers', description: 'Cantilever-mounted modular twin-fan condensers with variable inverter compressor modulation.', icon: 'Cpu' }
        ],
        suitableProducts: ['Ductable AC', 'Central Air Conditioning Systems', 'Ventilation Systems', 'Fresh Air Systems'],
        benefits: [
          { title: '100% Uniform Aisle Cooling', description: 'Even temperature distribution across every aisle from checkout to back-room storage.', metric: '100% Uniform' },
          { title: 'Energy Reduction', description: 'Inverter modulation automatically turns down during slow morning footfall.', metric: 'Up to 40%' },
          { title: 'Industrial Heavy Duty', description: 'Engineered for 16-18 hours of continuous daily retail duty cycles.', metric: 'Heavy-Duty' }
        ],
        faqs: [
          { question: 'Why use suspended ducted units with jet nozzles in retail hypermarkets?', answer: 'Suspended ducted units eliminate expensive false ceiling work in high-bay stores, while directional jet nozzles throw conditioned air precisely across long aisles without losing velocity.' },
          { question: 'How is maintenance handled in an active supermarket?', answer: 'All indoor units feature bottom service access panels and easily cleanable filter racks, allowing rapid filter and drain servicing without disrupting store shoppers.' }
        ],
        sortOrder: 4
      },
      {
        name: 'Restaurants & Cafes',
        slug: 'restaurants',
        tagline: 'Odor Control, Kitchen Make-Up Air & Front-of-House Dining Comfort',
        heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
        introduction: 'High kitchen exhaust rates create powerful negative pressures that suck cooking grease into dining areas without balanced engineering.',
        overview: 'We engineer synchronized kitchen hood make-up air and high-efficiency dining room air conditioning that isolates cooking aromas and keeps patrons comfortable.',
        challenges: [
          { title: 'Grease and Smoke Infiltration', description: 'Improper negative balance pulling hot kitchen fumes into customer dining areas.', icon: 'Flame' },
          { title: 'Latent Heat Spikes', description: 'Hot meals and high customer turnover creating humid, stuffy dining environments.', icon: 'Droplets' }
        ],
        solutions: [
          { title: 'Treated Fresh Air & Make-Up Systems', description: '100% make-up air compensation for commercial kitchen exhaust hoods.', icon: 'Wind' },
          { title: 'High-Capacity Concealed Air Conditioners', description: 'Heavy moisture removal and rapid cooling recovery during peak dining hours.', icon: 'Layers' }
        ],
        suitableProducts: ['Ductable AC', 'Cassette AC', 'Ventilation Systems', 'Fresh Air Systems'],
        benefits: [
          { title: 'Odor Isolation', description: 'Maintains positive pressure in dining areas so kitchen fumes never cross over.', metric: '100% Isolated' },
          { title: 'Consistent Dining Comfort', description: 'Balances moisture and high patron turnover even in peak summer rushes.', metric: 'Stable 23°C' }
        ],
        sortOrder: 4
      },
      {
        name: 'Pharmaceutical Industries',
        slug: 'pharmaceutical',
        tagline: 'ISO Class Cleanrooms, Relative Humidity Control & GMP Compliance',
        heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Pharmaceutical manufacturing demands exact relative humidity, airtight validation, and continuous particulate control.',
        overview: 'From tablet compression suites to sterile injectable ampoules, our pharmaceutical HVAC plants conform strictly to US FDA 21 CFR Part 11 and WHO-GMP standards.',
        challenges: [
          { title: 'Hygroscopic Powder Caking', description: 'High humidity ruining active pharmaceutical ingredients during formulation.', icon: 'CloudRain' },
          { title: 'Cross-Batch Contamination', description: 'Air recirculating between different formulation suites contaminating sensitive drugs.', icon: 'Biohazard' }
        ],
        solutions: [
          { title: 'Desiccant Dehumidification Rotors', description: 'Ultra-low dew point air treatment achieving sub-20% relative humidity where needed.', icon: 'Droplet' },
          { title: 'Terminal HEPA Modules', description: 'Aerosol challenge tested (PAO/DOP) terminal filters with gel seal integrity.', icon: 'CheckCircle' }
        ],
        suitableProducts: ['Air Handling Units (AHU)', 'Chiller Systems', 'Ventilation Systems'],
        benefits: [
          { title: 'WHO-GMP & US FDA Compliance', description: 'Fully validated DQ, IQ, OQ, and PQ documentation provided for audits.', metric: 'Audit Ready' },
          { title: 'Precise Humidity Control', description: 'Maintains tight relative humidity bands regardless of exterior weather.', metric: '±3% RH' }
        ],
        sortOrder: 5
      },
      {
        name: 'Industrial Facilities & Warehouses',
        slug: 'industrial',
        tagline: 'High-Bay Thermal Distribution & Robust 24/7 Cooling Infrastructure',
        heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Heavy manufacturing plants and logistics hubs generate massive equipment heat and require durable, high-CFM air movement.',
        overview: 'We design central chillers, high-static ductable units, and energy-efficient evaporative cooling systems built for uninterrupted industrial duty cycles.',
        challenges: [
          { title: 'High Ceiling Heat Stratification', description: 'Thermal energy trapped near ceilings while floor level equipment runs hot.', icon: 'TrendingUp' },
          { title: 'Dust & Ambient Particulates', description: 'Factory dust clogging standard cooling coils and causing premature compressor failure.', icon: 'Filter' }
        ],
        solutions: [
          { title: 'High-Static Heavy Duty Ductable AC', description: 'Fabric and spiral duct distribution delivering air across 200+ foot spans.', icon: 'Server' },
          { title: 'Variable Speed Water-Cooled Chillers', description: 'Industrial grade screw and centrifugal chillers with low partial load power draws.', icon: 'Cpu' }
        ],
        suitableProducts: ['Central Air Conditioning Systems', 'Chiller Systems', 'Ductable AC', 'Air Handling Units (AHU)'],
        benefits: [
          { title: 'Extended Equipment Lifespan', description: 'Heavy-gauge galvanized construction with anti-corrosion condenser fin coatings.', metric: 'Heavy-Duty' },
          { title: 'Low Operating Costs', description: 'Optimized part-load performance yielding dramatic kilowatt-hour savings.', metric: 'High COP' }
        ],
        sortOrder: 6
      },
      {
        name: 'Banquet Halls & Convention Centres',
        slug: 'banquet-halls',
        tagline: 'Instant High-Capacity Cooling for Gatherings of 100 to 5,000+ Guests',
        heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Banquet halls experience instantaneous occupancy spikes from zero to thousands of guests within thirty minutes.',
        overview: 'Our fast-pulldown chiller and modular VRF systems feature multi-stage compressors that rapidly chill massive volumes without blowing power breakers.',
        challenges: [
          { title: 'Rapid Occupancy Thermal Surge', description: 'Sudden arrival of hundreds of guests causing room temperatures to jump 5-8 degrees.', icon: 'Users' }
        ],
        solutions: [
          { title: 'Rapid Cool-Down Central Systems', description: 'Dual inverter compressor ramp-up achieving target comfort within 15 minutes of event start.', icon: 'Zap' }
        ],
        suitableProducts: ['Central Air Conditioning Systems', 'VRF Air Conditioning Systems', 'Ductable AC'],
        benefits: [
          { title: 'Zero Guest Discomfort', description: 'Smooth, continuous cooling across high ballroom ceilings and grand foyers.', metric: 'Rapid Pulldown' }
        ],
        sortOrder: 7
      },
      {
        name: 'Data Centres & Server Rooms',
        slug: 'data-centres',
        tagline: 'Continuous High-Sensible Heat Removal & Precision Air Conditioning (PAC)',
        heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
        introduction: 'IT infrastructure generates 100% sensible heat that must be extracted 24/7/365 without humidity drop or static electric buildup.',
        overview: 'We install Precision Air Conditioning (PAC) units with hot-aisle/cold-aisle containment, EC fans, and dual refrigerant circuits for 99.999% uptime.',
        challenges: [
          { title: 'Catastrophic Server Overheating', description: 'Single minute cooling failure causing thermal throttling and cloud server shutdown.', icon: 'Flame' }
        ],
        solutions: [
          { title: 'Dual-Circuit Precision PAC Units', description: 'Designed exclusively for high sensible heat ratios with auto-failover switching.', icon: 'Cpu' }
        ],
        suitableProducts: ['Central Air Conditioning Systems', 'Smart AC Control Systems'],
        benefits: [
          { title: '99.999% High Availability', description: 'Redundant N+1 or 2N architectural cooling infrastructure.', metric: 'Zero Downtime' }
        ],
        sortOrder: 8
      }
    ];

    for (const c of commercialData) {
      await CommercialCategory.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
    }

  // Seed Residential Categories
  const resCount = await ResidentialCategory.countDocuments();
  if (resCount === 0) {
    console.log('[Seed] Seeding residential categories...');
    const residentialData = [
      {
        name: 'Luxury Villas & Mansions',
        slug: 'luxury-villas',
        tagline: 'Architectural Concealment, Whisper-Quiet Comfort & Luxury Interior Aesthetics',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Grand architectural residences deserve air conditioning that is felt, never heard, and never spoils interior design.',
        overview: 'Our residential VRF Home systems power up to 14 indoor units from a single discreet outdoor unit tucked away on a terrace or service balcony. Enjoy individual room thermostats, linear slot ceiling diffusers, and luxury home automation.',
        recommendedSystems: [
          { title: 'VRF Home Systems', description: 'Trunk line piping with sleek slim concealed duct units hidden within false ceilings.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
          { title: 'Concealed Ducted AC', description: 'Continuous architectural slot diffusers that blend seamlessly into plaster and wood ceilings.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
          { title: 'Smart App & Voice Integration', description: 'Control climate room-by-room via Crestron, Control4, Apple HomeKit, or Google Home.', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80' }
        ],
        availableBrands: ['Mitsubishi Electric', 'O General', 'Hitachi', 'Carrier', 'Voltas', 'Trane', 'Haier'],
        benefits: [
          { title: 'No Ugly Balcony Clutter', description: 'One single compact outdoor unit replaces 8-12 unsightly split AC outdoor units.' },
          { title: 'Whisper Quiet Operation', description: 'Indoor sound levels down to 19 dB(A) - quieter than a whisper in a bedroom.' },
          { title: 'True Inverter Efficiency', description: 'Consumes power only for the active rooms, saving up to 50% compared to conventional ACs.' }
        ],
        faqs: [
          { question: 'Can each bedroom have its own preferred temperature?', answer: 'Yes! Every room has an independent digital thermostat or smartphone app control. One bedroom can be at 24°C while the master suite is at 20°C.' },
          { question: 'Will the AC units ruin my luxury false ceiling design?', answer: 'Not at all. We specialize in concealed duct units that require only minimal ceiling drop (as little as 200mm) and integrate with elegant linear slot grilles.' }
        ],
        sortOrder: 1
      },
      {
        name: 'Independent Houses & Kothis',
        slug: 'independent-houses',
        tagline: 'Multi-Floor Climate Zoning Without Structural Compromise',
        heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Custom-built houses across multiple floors need flexible piping runs and reliable cooling during harsh summers.',
        overview: 'We offer tailored multi-split and VRF residential setups that allow piping lengths of up to 100 meters, so outdoor equipment stays completely out of sight on the top terrace.',
        recommendedSystems: [
          { title: 'Multi-Split Inverter Systems', description: 'Cost-effective multi-room cooling connecting 3-5 rooms to one outdoor condenser.' },
          { title: '4-Way Cassette Units', description: 'Ceiling flush cassette units with 360-degree round airflow for living and dining spaces.' }
        ],
        availableBrands: ['O General', 'Hitachi', 'Carrier', 'Voltas', 'Haier', 'Trane'],
        benefits: [
          { title: 'Extended Piping Flexibility', description: 'Terrace-mounted condenser connects to ground floor living rooms effortlessly.' },
          { title: 'Durable Copper Condensers', description: '100% inner-grooved copper tubing with anti-corrosion blue fin technology.' }
        ],
        sortOrder: 2
      },
      {
        name: 'Premium Apartments & Penthouses',
        slug: 'apartments-penthouses',
        tagline: 'High-Rise Architectural Cooling With Restricted Service Balconies',
        heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        introduction: 'High-rise societies have strict aesthetic guidelines that prohibit exterior wall brackets or multiple outdoor units on balconies.',
        overview: 'Our compact VRF residential line is engineered specifically to fit into cramped high-rise utility ledges while delivering whole-home luxury cooling.',
        recommendedSystems: [
          { title: 'Compact VRF Home 4HP - 8HP', description: 'Slim outdoor profile engineered specifically for apartment utility balconies.' },
          { title: 'Slim Concealed Units', description: 'Requires only 200mm vertical ceiling clearance, preserving maximum apartment height.' }
        ],
        availableBrands: ['Mitsubishi Electric', 'Hitachi', 'Carrier', 'Voltas', 'Haier'],
        benefits: [
          { title: 'Society Bye-Law Approved', description: 'Leaves utility balconies free for laundry and recreation without heat blast.' },
          { title: 'Rapid Room Cooling', description: 'High-speed inverter turbo mode cools down sun-facing apartments within minutes.' }
        ],
        sortOrder: 3
      },
      {
        name: 'Builder Floor Projects',
        slug: 'builder-floors',
        tagline: 'Turnkey HVAC Execution for Premium Real Estate Developers',
        heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        introduction: 'Add tremendous buyer value to your builder floor project with pre-installed VRF air conditioning.',
        overview: 'We partner with luxury builders and architects to provide early-stage refrigerant copper piping, drainage planning, and complete testing before handover.',
        recommendedSystems: [
          { title: 'Turnkey Pre-Piping & Concealment', description: 'Pressure-tested R410A/R32 copper lines embedded during construction phase.' },
          { title: 'Modular VRF Solutions', description: 'Independent billing and metering for every floor in multi-story builder complexes.' }
        ],
        availableBrands: ['O General', 'Carrier', 'Hitachi', 'Voltas', 'Haier', 'Trane'],
        benefits: [
          { title: 'Higher Property Valuation', description: 'Premium HVAC infrastructure increases sales velocity and luxury appeal.' },
          { title: 'Zero Leakage Guarantee', description: 'Rigorous 40 bar nitrogen pressure testing across all concealed lines.' }
        ],
        sortOrder: 4
      }
    ];

    await ResidentialCategory.insertMany(residentialData);
  }

  // Seed Brands
  const brandCount = await Brand.countDocuments();
  if (brandCount === 0) {
    console.log('[Seed] Seeding & syncing brands with authentic logos...');

    const brandsData = [
      {
        name: 'Daikin India',
        slug: 'daikin',
        logo: '/images/brands/daikin.svg',
        description: 'The global inventor of VRV (Variable Refrigerant Volume) technology, world leader in luxury residential VRV Home systems, high-efficiency VRT chillers, and precision multi-splits.',
        categories: ['VRV', 'Residential', 'Commercial', 'Luxury Villas', 'Ducted AC'],
        isPartner: true,
        authorizationNote: 'Authorized Sales & Technical Engineering Partner',
        sortOrder: 1
      },
      {
        name: 'Mitsubishi Electric',
        slug: 'mitsubishi-electric',
        logo: '/images/brands/mitsubishi-electric.svg',
        description: 'Renowned for Japanese precision, City Multi VRF systems, and ultra-quiet residential indoor units down to 19 dB.',
        categories: ['VRF', 'Residential', 'Commercial', 'Precision AC'],
        isPartner: true,
        authorizationNote: 'Authorized Sales & Technical Partner',
        sortOrder: 2
      },
      {
        name: 'O General',
        slug: 'o-general',
        logo: '/images/brands/o-general.svg',
        description: 'Unmatched heavy-duty tropical cooling performance engineered for extreme ambient temperatures up to 55°C.',
        categories: ['Residential', 'Commercial', 'Split AC', 'Cassette AC', 'VRF'],
        isPartner: true,
        authorizationNote: 'Authorized Dealer & Installer',
        sortOrder: 3
      },
      {
        name: 'Carrier India',
        slug: 'carrier',
        logo: '/images/brands/carrier.svg',
        description: 'Carrier Airconditioning & Refrigeration Ltd. / Carrier Midea India Pvt. Ltd. — global innovator of air conditioning with heavy-duty XPower VRF, screw chillers, and commercial ductable HVAC.',
        categories: ['Commercial', 'Chillers', 'VRF', 'Ductable AC', 'Air Handling Units (AHU)'],
        isPartner: true,
        authorizationNote: 'Authorized Commercial Integration & Sales Partner',
        sortOrder: 4
      },
      {
        name: 'Hitachi',
        slug: 'hitachi',
        logo: '/images/brands/hitachi.svg',
        description: 'Set Free VRF systems and advanced inverter scroll compressor technology offering high seasonal efficiency.',
        categories: ['VRF', 'Residential', 'Commercial', 'Cassette AC'],
        isPartner: true,
        authorizationNote: 'Authorized HVAC Solutions Partner',
        sortOrder: 4
      },
      {
        name: 'Voltas',
        slug: 'voltas',
        logo: '/images/brands/voltas.svg',
        description: 'A Tata enterprise with vast nationwide service footprint, trusted for commercial ductable and residential split ACs.',
        categories: ['Residential', 'Commercial', 'Ductable AC', 'Split AC'],
        isPartner: true,
        authorizationNote: 'Authorized Channel Partner',
        sortOrder: 5
      },
      {
        name: 'Trane',
        slug: 'trane',
        logo: '/images/brands/trane.svg',
        description: 'Global benchmark in large industrial chillers, thermal energy storage, and hospital air distribution infrastructure.',
        categories: ['Commercial', 'Industrial', 'Chiller Systems', 'AHU'],
        isPartner: true,
        authorizationNote: 'Authorized Applied Systems Partner',
        sortOrder: 6
      },
      {
        name: 'Haier',
        slug: 'haier',
        logo: '/images/brands/haier.svg',
        description: 'MRV commercial multi-split solutions, magnetic levitation chillers, and energy-smart residential air conditioners.',
        categories: ['Residential', 'Commercial', 'VRF', 'Cassette AC'],
        isPartner: true,
        authorizationNote: 'Authorized Product Partner',
        sortOrder: 7
      },
      {
        name: 'Blue Star',
        slug: 'blue-star',
        logo: '/images/brands/blue-star.svg',
        description: "India's premier air conditioning brand with over 80 years of engineering expertise, VRF V Plus technology, and 54°C high ambient resilience.",
        categories: ['VRF', 'Residential', 'Commercial', 'Ductable AC'],
        isPartner: true,
        authorizationNote: 'Authorized Sales & Service Partner',
        sortOrder: 8
      }
    ];

    for (const b of brandsData) {
      await Brand.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, new: true });
    }
  }

  // Seed Products with Real Equipment Images from voltas folder
  console.log('[Seed] Seeding & syncing products with real equipment photos...');
  const productsData = [
    {
      name: 'Voltas 1.5 Ton 3 Star Inverter Split AC (Copper 183VADW White)',
      slug: 'voltas-1-5-ton-inverter-split-ac-183vadw',
      category: 'Split AC',
      tagline: 'High Ambient Cooling at 52°C with Dual Inverter DC Technology',
      image: '/images/equipment/voltas-indoor.jpg',
      description: 'The Voltas 183VADW 1.5 Ton 3-Star Inverter Split AC features 100% inner grooved copper coils, multi-stage filtration, turbo chill mode, and stable operation across wide voltage fluctuations without an external stabilizer.',
      applications: ['Master Bedrooms', 'Living Rooms', 'Home Offices', 'Guest Suites'],
      keyFeatures: [
        '100% Inner-Grooved Copper Condenser & Evaporator Tubes',
        'Stabilizer Free Operation across 160V to 270V',
        'High Ambient Cooling engineered for extreme Indian summers',
        'Anti-Dust and CO2 mitigation filtration mesh'
      ],
      technicalSpecs: [
        { label: 'Cooling Capacity', value: '1.5 TR (5100 Watts)' },
        { label: 'Energy Rating', value: '3 Star Inverter (BEE Certified)' },
        { label: 'Compressor Type', value: 'High-Torque Dual Inverter Rotary' },
        { label: 'Refrigerant', value: 'Eco-Friendly R32 Low-GWP' },
        { label: 'Condenser Coil', value: '100% Copper with Anti-Corrosive Blue Fins' }
      ],
      relatedBrands: ['Voltas'],
      capacityRange: '1.5 TR',
      efficiencyRating: '3 Star Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 1
    },
    {
      name: 'Voltas All-DC Inverter VRF Outdoor Unit',
      slug: 'voltas-ac-outdoor-inverter-unit',
      category: 'VRF Air Conditioning Systems',
      tagline: 'Heavy-Duty Central Condenser Engineered for Extreme Indian Climates',
      image: '/images/equipment/voltas-outdoor.jpg',
      description: 'Heavy commercial and luxury residential outdoor condenser bank. Replaces multiple noisy split compressors with a single centralized terrace-mounted unit with wide piping flexibility up to 100 meters.',
      applications: ['Luxury Villas', 'Boutique Hotels', 'Commercial Offices', 'Hospitals'],
      keyFeatures: [
        'All-DC Inverter scroll compression with dynamic capacity ramping',
        'Hydrophilic anti-corrosive fin coating for long outdoor durability',
        'High external static fan pressure for plant room ducted discharge',
        'Intelligent automatic oil balance and refrigerant volume optimization'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '6 HP to 48 HP modular combinations' },
        { label: 'Power Supply', value: '380-415V, 3 Phase, 50 Hz' },
        { label: 'Max Total Copper Piping', value: 'Up to 300 meters' },
        { label: 'Operating Ambient Range', value: '-5°C to 52°C dry bulb' }
      ],
      relatedBrands: ['Voltas'],
      capacityRange: '6 HP - 48 HP',
      efficiencyRating: 'High-COP Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 2
    },
    {
      name: 'Hitachi YOSHI 5500SWXL 1.5 TR Inverter Split AC',
      slug: 'hitachi-yoshi-5500swxl-1-5-tr-split-ac',
      category: 'Split AC',
      tagline: 'Super-Slit Fins & Precision 0.1 Hz Stepping Inverter Performance',
      image: '/images/equipment/hitachi-indoor.jpg',
      description: 'The Hitachi YOSHI series RAS.V518PCBISH delivers micro-climate comfort with expandable inverter capacity, whisper-silent operation, filter clean indicators, and tropical high-ambient heat rejection.',
      applications: ['Executive Bedrooms', 'Private Libraries', 'Villas', 'Conference Rooms'],
      keyFeatures: [
        'Expandable Inverter technology modulates capacity during peak heat',
        'Super-Slit fin geometry for accelerated thermodynamic exchange',
        'Auto-coil dry technology prevents odor and microbial formation',
        '100% inner grooved copper piping with high burst pressure resistance'
      ],
      technicalSpecs: [
        { label: 'Cooling Capacity', value: '1.5 TR (5275 W nominal)' },
        { label: 'Inverter Technology', value: 'DC Vector Stepping Inverter' },
        { label: 'Operating Noise', value: 'As low as 28 dB(A)' },
        { label: 'Refrigerant', value: 'R32 Eco-Green' }
      ],
      relatedBrands: ['Hitachi'],
      capacityRange: '1.5 TR',
      efficiencyRating: '5 Star Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 3
    },
    {
      name: 'Hitachi Commercial Ductable AC Outdoor Unit',
      slug: 'hitachi-ductable-ac-outdoor-unit',
      category: 'Ductable AC',
      tagline: 'High-Static Ductable Condenser for Luxury False Ceiling Architecture',
      image: '/images/equipment/hitachi-outdoor.jpg',
      description: 'Hitachi commercial ductable outdoor unit powers concealed ceiling blowers with precision refrigerant metering, high-lift condensate drainage, and whisper-quiet aerodynamic heat rejection.',
      applications: ['Corporate Offices', 'Luxury Mansions', 'Showrooms', 'Banquet Halls'],
      keyFeatures: [
        'High external static pressure for extended vertical piping runs',
        'Electronic Expansion Valve (EEV) micro-stepping control',
        'Anti-vibration compressor mounting damping mechanical noise',
        'Robust weather-resistant electro-galvanized outer casing'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '3.0 TR to 16.5 TR' },
        { label: 'Compressor', value: 'Hermetic Inverter Scroll' },
        { label: 'Piping Length', value: 'Up to 75m equivalent' },
        { label: 'Electrical', value: '415V, 3 Phase, 50 Hz' }
      ],
      relatedBrands: ['Hitachi'],
      capacityRange: '3.0 TR - 16.5 TR',
      efficiencyRating: 'High-COP Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 4
    },
    {
      name: 'O General 1.5 Ton 3 Star Split AC (ASGA18FUTD White)',
      slug: 'ogeneral-1-5-ton-split-ac-asga18futd',
      category: 'Split AC',
      tagline: 'Fujitsu General Tropical Cooling with Hyper-Tropical Rotary Compressor',
      image: '/images/equipment/ogeneral-indoor.jpg',
      description: 'O General ASGA18FUTD is engineered for unmatched heavy-duty cooling in scorching climates. Features massive airflow throw up to 15 meters, blue-fin condenser protection, and heavy-gauge construction.',
      applications: ['Living Rooms', 'Master Suites', 'Independent Houses', 'Commercial Cabins'],
      keyFeatures: [
        'Certified continuous cooling even when outdoor ambient heat touches 55°C',
        'Coanda airflow technology directs cold air across ceiling to prevent cold draft',
        'Anti-rust blue fin coil protection against coastal moisture and oxidation',
        'Long airflow throw reaches furthest corners of large halls'
      ],
      technicalSpecs: [
        { label: 'Nominal Capacity', value: '1.5 TR (5300 Watts)' },
        { label: 'Compressor Type', value: 'Hyper-Tropical Twin Rotary DC Drive' },
        { label: 'Airflow Volume', value: 'Up to 950 CFM' },
        { label: 'Operating Ambient Limit', value: '55°C Extreme Heat' }
      ],
      relatedBrands: ['O General'],
      capacityRange: '1.5 TR',
      efficiencyRating: '3 Star Tropical',
      isFeatured: true,
      isPublished: true,
      sortOrder: 5
    },
    {
      name: 'O General Hyper-Tropical Heavy-Duty Outdoor AC (55°C)',
      slug: 'ogeneral-tropical-heavy-outdoor-ac',
      category: 'Central Air Conditioning Systems',
      tagline: 'Extreme High-Ambient Outdoor Condenser Engineered for Scorching Temperatures',
      image: '/images/equipment/ogeneral-outdoor.jpg',
      description: 'The heavyweight benchmark in tropical outdoor air conditioning. Engineered with large-surface condenser heat exchangers and aerodynamic wide-blade discharge fans to reject heat seamlessly under punishing sun exposure.',
      applications: ['Rooftops', 'Terraces', 'Direct Sun-Facing Facades', 'Luxury Estates'],
      keyFeatures: [
        'Massive multi-layer copper condenser coil for maximum heat dissipation',
        'Heavy-duty vibration damping cushions eliminating structural hum',
        'Tough galvanized steel chassis with multi-coat powder finish',
        'Rapid cooling pull-down even at 55°C outdoor ambient temperatures'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '2.0 TR to 8.5 TR' },
        { label: 'Ambient Limit', value: 'Rated at 55°C' },
        { label: 'Coil Coating', value: 'Proprietary Blue Fin Anti-Corrosion' },
        { label: 'Fan Motor', value: 'High-Efficiency DC Brushless' }
      ],
      relatedBrands: ['O General'],
      capacityRange: '2.0 TR - 8.5 TR',
      efficiencyRating: 'Heavy-Duty Tropical',
      isFeatured: true,
      isPublished: true,
      sortOrder: 6
    },
    {
      name: 'Carrier 1 Ton 3 Star Fixed-Speed / Inverter AC',
      slug: 'carrier-1-ton-fixed-inverter-split-ac',
      category: 'Split AC',
      tagline: 'Modern Climate Engineering by the Pioneers of Air Conditioning',
      image: '/images/equipment/carrier-indoor.webp',
      description: 'Carrier 1 Ton high-performance room air conditioner with Insta Cool rapid pull-down, dual filtration, sleep temperature modulation, and 100% copper inner-grooved coils.',
      applications: ['Bedrooms', 'Study Rooms', 'Hotel Guest Suites', 'Clinic Rooms'],
      keyFeatures: [
        'Insta Cool rapid chill turbo technology for instant relief',
        'Dual filtration capturing microscopic allergens and PM2.5 particulates',
        'Hidden digital temperature display on sleek high-gloss front panel',
        'Auto cleanser drying coil after operation to prevent mildew'
      ],
      technicalSpecs: [
        { label: 'Capacity', value: '1.0 TR (3500 Watts)' },
        { label: 'Energy Star Rating', value: '3 Star BEE' },
        { label: 'Refrigerant', value: 'Eco-Friendly R32' },
        { label: 'Noise Level', value: '32 dB(A)' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '1.0 TR',
      efficiencyRating: '3 Star Rated',
      isFeatured: true,
      isPublished: true,
      sortOrder: 7
    },
    {
      name: 'Carrier Commercial XPower VRF Outdoor Unit',
      slug: 'carrier-xpower-commercial-outdoor-unit',
      category: 'VRF Air Conditioning Systems',
      tagline: 'Extended Piping Network up to 1,000m with Subcooling Thermodynamic Loops',
      image: '/images/equipment/carrier-outdoor.jpg',
      description: 'Carrier flagship XPower Variable Refrigerant Flow condenser bank. Features patented intelligent oil management, high seasonal ISEER ratings, and modular coupling up to 64 indoor units.',
      applications: ['Corporate Campuses', '5-Star Hotels', 'Commercial Towers', 'Hospitals'],
      keyFeatures: [
        'Connect up to 64 indoor units to a single refrigerant circuit',
        'Extended total copper piping network up to 1,000 meters',
        'Subcooling thermodynamic circuitry preventing flash gas in liquid lines',
        'High outdoor static pressure for plant room acoustic louvers'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '6 HP to 60 HP (Modular Combinations)' },
        { label: 'Compressor', value: 'DC Inverter Scroll' },
        { label: 'Piping Length', value: '1,000m total equivalent' },
        { label: 'Efficiency', value: 'ISEER 4.85' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '6 HP - 60 HP',
      efficiencyRating: 'ISEER 4.85',
      isFeatured: true,
      isPublished: true,
      sortOrder: 8
    },
    {
      name: 'Trane Applied Commercial Inverter Outdoor Unit',
      slug: 'trane-applied-commercial-outdoor-unit',
      category: 'VRF Air Conditioning Systems',
      tagline: 'Continuous 24/7 Heavy-Duty Cooling with Heavy-Gauge Anti-Vibration Chassis',
      image: '/images/equipment/trane-outdoor.jpg',
      description: 'Trane applied systems outdoor inverter unit built for mission-critical reliability. Engineered for hospitals, luxury estates, and data environments requiring zero thermal compromise.',
      applications: ['Hospitals & Cleanrooms', 'Luxury Estates', 'Data Facilities', 'Corporate HQs'],
      keyFeatures: [
        'Hospital and cleanroom grade reliability under heavy thermal loads',
        'Heavy-gauge galvanized steel anti-vibration chassis',
        'Advanced micro-channel and tube heat exchanger metallurgy',
        'Continuous 24/7 heavy duty operation cycles'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '8 HP to 54 HP' },
        { label: 'Design Ambient Max', value: '52°C' },
        { label: 'Protection', value: 'Corrosion-Resistant Cathodic Coating' },
        { label: 'Voltage', value: '380-415V, 3 Phase, 50 Hz' }
      ],
      relatedBrands: ['Trane'],
      capacityRange: '8 HP - 54 HP',
      efficiencyRating: 'Eurovent Certified',
      isFeatured: true,
      isPublished: true,
      sortOrder: 9
    },
    {
      name: 'Trane Applied High-Static Hi-Wall / Concealed Unit',
      slug: 'trane-applied-hi-static-indoor-unit',
      category: 'Concealed AC',
      tagline: 'Acoustically Attenuated Air Delivery with High-Static Static Throw',
      image: '/images/equipment/trane-indoor.jpg',
      description: 'Trane applied high-efficiency indoor terminal unit with multi-speed aerodynamic blowers, precision electronic expansion valves, and integrated condensate drainage.',
      applications: ['Hotel Suites', 'Executive Cabins', 'Luxury Villas', 'Auditoriums'],
      keyFeatures: [
        'Acoustically lined return air plenum ensuring library-quiet comfort',
        'Integrated high-lift drain pump preventing ceiling moisture leaks',
        'Modbus and BACnet BMS telemetry ready',
        'Washable high-efficiency air filtration media'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.0 TR to 4.5 TR' },
        { label: 'Airflow Range', value: '400 CFM to 1,600 CFM' },
        { label: 'Sound Level', value: 'Down to 23 dB(A)' }
      ],
      relatedBrands: ['Trane'],
      capacityRange: '1.0 TR - 4.5 TR',
      efficiencyRating: 'High-Static Inverter',
      isFeatured: false,
      isPublished: true,
      sortOrder: 10
    },
    {
      name: 'Mitsubishi Electric City Multi VRF Outdoor Unit',
      slug: 'mitsubishi-electric-city-multi-vrf',
      category: 'VRF Air Conditioning Systems',
      tagline: 'High Seasonal Efficiency with Two-Pipe Simplicity and Dynamic Shifting',
      image: '/images/equipment/mitsubishi-outdoor.jpg',
      description: 'Mitsubishi Electric City Multi VRF utilizes intelligent continuous heating and proprietary flat-tube aluminum heat exchangers for exceptional heat transfer and low total cost of ownership.',
      applications: ['Corporate Offices', 'IT Parks', 'Boutique Hotels', 'Educational Campuses'],
      keyFeatures: [
        'Two-pipe system allows substantial reduction in braze joints and piping cost',
        'Individual zone temperature control down to 0.5°C increments',
        'Integrated BACnet and Modbus interface for building management',
        'Blue-fin condenser coating with high salt-spray resistance'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '8 HP to 54 HP' },
        { label: 'Compressor Type', value: 'Inverter Driven Hermetic Twin Rotary' },
        { label: 'Piping Height Difference', value: 'Up to 90 meters' },
        { label: 'Design Ambient Max', value: '52°C' }
      ],
      relatedBrands: ['Mitsubishi Electric'],
      capacityRange: '8 HP - 54 HP',
      efficiencyRating: 'COP 4.70',
      isFeatured: true,
      isPublished: true,
      sortOrder: 11
    },
    {
      name: 'Mitsubishi Electric 19 dB(A) Whisper-Quiet Hi-Wall Unit',
      slug: 'mitsubishi-whisper-quiet-indoor-hiwall',
      category: 'Split AC',
      tagline: 'Virtually Silent Airflow Engineered for Uninterrupted Deep Sleep',
      image: '/images/equipment/mitsubishi-indoor.jpg',
      description: 'Mitsubishi Electric designer hi-wall indoor inverter unit with aero-spiral silent fan blades dropping noise down to 19 dB(A) — quieter than rustling leaves.',
      applications: ['Master Bedrooms', 'Audio Studios', 'Private Dens', 'Study Rooms'],
      keyFeatures: [
        'Whisper-silent sound level down to 19 dB(A) for deep sleep',
        'Dual-barrier anti-smudge coating preventing dust accumulation',
        'Nano-Platinum deodorizing and anti-allergen enzyme filters',
        'Precision 3D i-See Sensor monitoring room occupancy'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.0 TR to 2.2 TR' },
        { label: 'Sound Pressure', value: '19 dB(A) silent mode' },
        { label: 'Refrigerant', value: 'R32 Ultra-Low GWP' },
        { label: 'Energy Rating', value: '5 Star Inverter' }
      ],
      relatedBrands: ['Mitsubishi Electric'],
      capacityRange: '1.0 TR - 2.2 TR',
      efficiencyRating: '5 Star Rated (19 dB)',
      isFeatured: true,
      isPublished: true,
      sortOrder: 12
    },
    {
      name: 'Haier Commercial Inverter Ductable AC System',
      slug: 'haier-commercial-inverter-ductable-ac',
      category: 'Ductable AC',
      tagline: 'Twin-Fan High-Static Inverter Ducted Cooling by Shukla Enterprise',
      image: '/images/equipment/haier-outdoor-dual-fan.jpg',
      description: 'Heavy-duty commercial inverter ductable air conditioning system engineered for retail supermarkets, commercial malls, and coastal high-humidity environments. Features twin-fan vertical discharge outdoor units mounted on heavy structural MS cantilever frames, ceiling-suspended ducted indoor units with high-throw jet nozzles, intelligent PCB inverter modulation, and easy-access diagnostic manifolds for certified precision cooling.',
      applications: [
        'Commercial Waterfront Complexes (Marine Drive Kochi)',
        'Corporate & Healthcare Facilities (Poojapura Trivandrum)',
        'Retail Showrooms & Complexes (Kottayam & Kayamkulam)',
        'High-Ceiling Commercial Buildings (Ernakulam, Noornad & Adoor)'
      ],
      keyFeatures: [
        'Heavy duty twin-fan outdoor condenser bank with vertical aerodynamic heat rejection',
        'Custom structural MS cantilever frame mounting for exterior high-rise walls',
        'Digital electronic PCB inverter control with electronic expansion valves (EEV)',
        'Wide tropical ambient cooling capacity up to 52°C dry bulb',
        'External Static Pressure (ESP) up to 200 Pa for long architectural duct runs',
        'Dual service access panels for manifold gauge pressure checks and swift maintenance',
        'Hydrophilic blue fin anti-corrosive copper coil protection against coastal salt air'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '3.0 TR to 17.5 TR (Modular Outdoor Banks)' },
        { label: 'Compressor Technology', value: 'DC Twin Rotary Inverter' },
        { label: 'Outdoor Heat Exchanger', value: 'Twin-Fan High-Static Vertical Discharge' },
        { label: 'Refrigerant Type', value: 'Eco-Friendly R410A / R32' },
        { label: 'Coil Material', value: '100% Inner-Grooved Copper with Blue Fin' },
        { label: 'External Static Pressure', value: 'Up to 200 Pa selectable' },
        { label: 'Mounting Structure', value: 'Heavy Duty Structural MS Cantilever Frame' },
        { label: 'Execution & Service', value: 'Shukla Enterprise Certified Field Engineering' }
      ],
      relatedBrands: ['Haier', 'Carrier', 'Voltas', 'Hitachi'],
      capacityRange: '3.0 TR - 17.5 TR',
      efficiencyRating: 'High-COP Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 13
    },
    {
      name: 'Mitsubishi Electric 4-Way Inverter Ceiling Cassette (PLFY-P-VEM-E)',
      slug: 'mitsubishi-electric-4way-cassette',
      category: 'Cassette AC',
      tagline: '3D i-See Sensor Room Occupancy Heat-Load Scanning with 72 Airflow Patterns',
      image: '/images/equipment/mitsubishi-indoor.jpg',
      description: 'The Mitsubishi Electric PLFY series 4-way ceiling cassette delivers draft-free horizontal airflow. Featuring an integrated 3D i-See Sensor that detects floor temperature and occupancy distribution, direct/indirect airflow prevention, and an integrated high-lift 850mm condensate pump.',
      applications: ['Architectural Living Rooms', 'Corporate Boardrooms', 'Boutique Showrooms', 'Luxury Restaurants'],
      keyFeatures: [
        '3D i-See Sensor with 8-element infrared temperature detector scanning entire floor plane',
        'Independent vane flow setting allowing 4 flaps to blow at distinct directional angles',
        'Built-in drain mechanism with 850mm vertical lift from ceiling level',
        'Ultra-low sound pressure operation down to 26 dB(A)'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.5 TR to 4.5 TR (5.6 kW - 16.0 kW)' },
        { label: 'Airflow Pattern', value: '360° Round & 4-Way Independent Vane' },
        { label: 'Sound Pressure', value: '26 - 34 dB(A)' },
        { label: 'Integrated Drain Lift', value: '850mm DC Condensate Pump' }
      ],
      relatedBrands: ['Mitsubishi Electric'],
      capacityRange: '1.5 TR - 4.5 TR',
      efficiencyRating: '5 Star Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 14
    },
    {
      name: 'Hitachi Set-Free 4-Way Round-Flow Inverter Cassette AC',
      slug: 'hitachi-round-flow-cassette-ac',
      category: 'Cassette AC',
      tagline: 'Silent Turbo Fan with 4-Way Dynamic Coanda Air Distribution',
      image: '/images/equipment/hitachi-indoor.jpg',
      description: 'Hitachi Set-Free ceiling cassette incorporates 3-dimensional twisted blade turbo fans for whisper-quiet air induction. Eliminates corner stagnant zones with gentle circular discharge and anti-bacterial long-life filters.',
      applications: ['Fine Dining Spaces', 'Executive Cabins', 'Modern Villas', 'High-End Retail'],
      keyFeatures: [
        'Twisted-blade aerodynamic turbo fan reducing airflow resistance and turbulence noise',
        'Individual vane motorized control preventing drafts onto room occupants',
        'High-density anti-fungal filter with easy snap-down service panel',
        'Micro-step Electronic Expansion Valve (EEV) for accurate cooling precision'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.5 TR to 4.0 TR' },
        { label: 'Compressor Modulation', value: 'Inverter Dynamic Stepping' },
        { label: 'Vane Control', value: 'Individual 4-Motor Flap Positioning' },
        { label: 'Operating Noise', value: '28 dB(A) whisper low' }
      ],
      relatedBrands: ['Hitachi'],
      capacityRange: '1.5 TR - 4.0 TR',
      efficiencyRating: 'High-COP Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 15
    },
    {
      name: 'O General 4-Way Compact Cassette Inverter AC (AUXG-KRLB)',
      slug: 'o-general-4way-compact-cassette',
      category: 'Cassette AC',
      tagline: 'High Ambient Tropical Cooling with 2-Stage Turbo Fan Precision',
      image: '/images/equipment/ogeneral-indoor.jpg',
      description: 'O General compact cassette fits flush into 600x600mm European grid ceilings. Powered by high-durability tropical inverter DC motors and hyper-efficient heat exchangers, it delivers rapid cooling down to 18°C in demanding environments.',
      applications: ['Hospitality Suites', 'Luxury Master Suites', 'Commercial Offices', 'Conference Rooms'],
      keyFeatures: [
        'Compact 570x570mm chassis fits directly into standard false ceiling grids',
        '2-stage turbo fan delivers even air distribution across large carpet areas',
        'Seamless integration with Fujitsu / O General wired touch wall controllers',
        'Low ambient cooling capability down to -15°C and high ambient up to 52°C'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.5 TR to 3.0 TR' },
        { label: 'Ceiling Grid Size', value: '600mm x 600mm flush fit' },
        { label: 'Refrigerant', value: 'R32 / R410A High Efficiency' },
        { label: 'Drain Lift', value: '700mm integrated pump' }
      ],
      relatedBrands: ['O General'],
      capacityRange: '1.5 TR - 3.0 TR',
      efficiencyRating: 'Heavy-Duty Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 16
    },
    {
      name: 'Carrier 4-Way Concealed Ceiling Cassette AC (Superia Series)',
      slug: 'carrier-4way-ceiling-cassette-ac',
      category: 'Cassette AC',
      tagline: 'Whisper-Quiet 360-Degree Air Circulation for Corporate & Residential Spaces',
      image: '/images/equipment/carrier-indoor.webp',
      description: 'Carrier Superia 4-Way Cassette provides comprehensive uniform cooling with 360-degree radial louvers, motorized auto-swing, digital fault telemetry, and an integrated high-head condensate drain pump.',
      applications: ['Corporate Workstations', 'Open Plan Offices', 'Reception Lobbies', 'Luxury Apartments'],
      keyFeatures: [
        '360-degree round flow airflow eliminates hot and cold spots across the room',
        'Anti-cold air delay ensures only conditioned cool air is blown into the room',
        'Washable dual-filter mesh trapping dust mites and pollen',
        'BMS gateway ready with Modbus RTU communication'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '2.0 TR to 4.0 TR' },
        { label: 'Air Flow Direction', value: '360° Circular Airflow' },
        { label: 'Condensate Lift', value: '750mm Built-in Drain Pump' },
        { label: 'Sound Level', value: '31 dB(A)' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '2.0 TR - 4.0 TR',
      efficiencyRating: 'ISEER 4.2',
      isFeatured: true,
      isPublished: true,
      sortOrder: 17
    },
    {
      name: 'Voltas Inverter 4-Way Cassette Air Conditioner',
      slug: 'voltas-inverter-4way-cassette-ac',
      category: 'Cassette AC',
      tagline: 'Reliable TATA Climate Engineering for Commercial & Luxury Residential Spaces',
      image: '/images/equipment/voltas-indoor.jpg',
      description: 'Voltas Inverter 4-Way Cassette offers high sensible cooling ratio, energy-saving eco modes, and robust all-copper heat exchangers designed specifically for Indian power and climatic conditions.',
      applications: ['Commercial Retail Showrooms', 'Villas & Bungalows', 'Banks & Corporate Hubs', 'Hospitals'],
      keyFeatures: [
        '100% Inner-grooved copper coil with hydrophilic anti-rust fin treatment',
        'Wide voltage fluctuation tolerance without separate voltage stabilizer',
        'Dual drainage connection ports for versatile site piping constraints',
        'Multi-stage air purification filtration panel'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.5 TR to 4.0 TR' },
        { label: 'Energy Class', value: 'Inverter High Seasonal Efficiency' },
        { label: 'Refrigerant', value: 'R32 Eco-Green' },
        { label: 'Air Throw', value: 'Up to 9 meters reach' }
      ],
      relatedBrands: ['Voltas'],
      capacityRange: '1.5 TR - 4.0 TR',
      efficiencyRating: '3 Star / Inverter High-COP',
      isFeatured: true,
      isPublished: true,
      sortOrder: 18
    },
    {
      name: 'Trane Series R Helical Rotary Air-Cooled Screw Chiller (RTAC)',
      slug: 'trane-air-cooled-helical-rotary-chiller',
      category: 'Chiller Systems',
      tagline: 'Industrial Mission-Critical Central Water Chilling Plant (140 to 500 Tons)',
      image: '/images/equipment/trane-chiller-plant.jpg',
      description: 'The industry benchmark for central chilled water air conditioning. Trane RTAC helical rotary screw chillers provide extreme reliability, variable frequency drives, Adaptive Control microprocessor algorithms, and quiet acoustic attenuation for hospitals, corporate parks, and factories.',
      applications: ['Large Hospitals & Cleanrooms', 'IT Parks & Data Centers', '5-Star Hotels', 'Manufacturing Plants'],
      keyFeatures: [
        'Direct-drive, low-speed semi-hermetic helical rotary screw compressors with only 3 moving parts',
        'Adaptive Control microprocessor prevents nuisance chiller shutdowns during extreme power sags or heat spikes',
        'Falling film evaporator design dramatically reducing refrigerant charge by 40%',
        'Aero-acoustic low-noise condenser fans with dynamic VFD speed modulation'
      ],
      technicalSpecs: [
        { label: 'Cooling Capacity', value: '140 TR to 500 TR (500 kW - 1750 kW)' },
        { label: 'Compressor Type', value: 'Dual/Triple Helical Rotary Semi-Hermetic Screw' },
        { label: 'Full Load COP', value: 'Up to 3.40 (IPLV up to 4.80)' },
        { label: 'Refrigerant', value: 'R134a / R513A Low-GWP' },
        { label: 'Electrical', value: '415V, 3 Phase, 50 Hz' }
      ],
      relatedBrands: ['Trane'],
      capacityRange: '140 TR - 500 TR',
      efficiencyRating: 'AHRI & Eurovent Certified',
      isFeatured: true,
      isPublished: true,
      sortOrder: 19
    },
    {
      name: 'Carrier AquaForce 30XA High-Efficiency Air-Cooled Screw Chiller',
      slug: 'carrier-aquaforce-air-cooled-screw-chiller',
      category: 'Chiller Systems',
      tagline: 'Premium Central Hydronic Chiller with Greenspeed Intelligence',
      image: '/images/real/hotel-ahu.webp',
      description: 'Carrier AquaForce 30XA provides building owners with premier energy efficiency, quiet operation, and touch-screen BACnet building integration. Engineered with Novation micro-channel heat exchanger coils for corrosion immunity.',
      applications: ['Hotels & Resorts', 'Corporate HQ Towers', 'Educational Universities', 'Industrial Processing'],
      keyFeatures: [
        'Carrier 06T twin-rotor screw compressors with patented linear capacity slide valve',
        'Novation all-aluminum micro-channel coils offering 3x higher corrosion resistance',
        'SmartVu 7-inch color touchscreen controller with multi-language and remote BMS telemetry',
        'Certified low sound mode dropping night sound emissions by 6 dB(A)'
      ],
      technicalSpecs: [
        { label: 'Cooling Capacity', value: '80 TR to 450 TR' },
        { label: 'Compressor', value: 'Twin Screw 06T with Economizer Loop' },
        { label: 'Chilled Water Leaving Temp', value: '4°C to 15°C' },
        { label: 'Heat Exchanger', value: 'Direct Expansion Shell-and-Tube' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '80 TR - 450 TR',
      efficiencyRating: 'Eurovent Class A',
      isFeatured: true,
      isPublished: true,
      sortOrder: 20
    },
    {
      name: 'Mitsubishi Electric Ultra-Slim Concealed Duct Indoor Unit (PEFY)',
      slug: 'mitsubishi-electric-ultra-slim-concealed-duct',
      category: 'Concealed AC',
      tagline: 'Ultra-Compact 200mm Ceiling Profile for Architectural Linear Slot Grilles',
      image: '/images/equipment/mitsubishi-indoor.jpg',
      description: 'Requiring only 200mm of vertical false ceiling depth, the PEFY slim concealed duct indoor unit disappears completely into luxury interiors. Ideal for high-end residential bedrooms and hotel guest suites where only discreet architectural linear diffusers are visible.',
      applications: ['Luxury Villas & Mansions', 'Penthouse Suites', 'Boutique Hotel Rooms', 'Private Theaters'],
      keyFeatures: [
        'Ultra-slim 200mm height preserves maximum ceiling clearance in apartments and villas',
        'Multiple external static pressure steps (5/15/35/50 Pa) adaptable to duct layouts',
        'Acoustically lined blower chamber delivering ultra-quiet 22 dB(A) operation',
        'Integrated condensate drain pump with 550mm vertical lift'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '0.8 TR to 2.5 TR (2.2 kW - 9.0 kW)' },
        { label: 'Unit Height', value: 'Only 200 mm' },
        { label: 'Sound Level', value: '22 - 28 dB(A)' },
        { label: 'Static Pressure', value: 'Selectable up to 50 Pa' }
      ],
      relatedBrands: ['Mitsubishi Electric'],
      capacityRange: '0.8 TR - 2.5 TR',
      efficiencyRating: 'Whisper Silent Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 21
    },
    {
      name: 'Carrier Slim Profile Concealed Ducted Indoor Unit',
      slug: 'carrier-slim-profile-concealed-duct',
      category: 'Concealed AC',
      tagline: 'High-Static Concealed Ceiling Inverter with Architectural Diffusers',
      image: '/images/equipment/carrier-indoor.webp',
      description: 'Carrier concealed slim duct indoor unit engineered for high-end residential interiors. Hidden above drywall or wood slat ceilings with flexible return air options and easy-clean filter access.',
      applications: ['Living Rooms & Dining Halls', 'Modern Apartments', 'Corporate Cabins', 'Lounges'],
      keyFeatures: [
        'Compact profile designed for narrow corridor ceiling drops',
        'Multi-speed DC fan motor with intelligent static pressure self-adjustment',
        'Compatible with all architectural linear slot diffusers and bar grilles',
        'Low maintenance washable filter with anti-allergen treatment'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '1.0 TR to 3.0 TR' },
        { label: 'Operating Noise', value: '25 dB(A)' },
        { label: 'ESP Range', value: '0 - 80 Pa' },
        { label: 'Condensate Pump', value: 'Integrated DC lift pump' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '1.0 TR - 3.0 TR',
      efficiencyRating: 'High Seasonal Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 22
    },
    {
      name: 'Voltas Commercial High-Static Inverter Ductable AC',
      slug: 'voltas-commercial-inverter-ductable-ac',
      category: 'Ductable AC',
      tagline: 'High-Volume Air Handling Ducted System for Commercial & Industrial Floors',
      image: '/images/equipment/voltas-outdoor.jpg',
      description: 'Voltas commercial ducted split system powers extensive sheet metal duct distribution across restaurants, commercial showrooms, bank branches, and marriage halls with rock-solid durability.',
      applications: ['Restaurants & Cafes', 'Retail Showrooms', 'Offices & Co-working', 'Marriage Halls'],
      keyFeatures: [
        'High external static pressure up to 150 Pa for long sheet metal duct runs',
        'Heavy-duty scroll compressor with advanced internal thermal protection',
        'Blue-fin hydrophilic coil coating resisting harsh ambient humidity',
        'Microprocessor diagnostic controller with fault history memory'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '3.0 TR to 11.0 TR' },
        { label: 'Compressor', value: 'Hermetic Inverter Scroll' },
        { label: 'Voltage', value: '415V, 3 Phase, 50 Hz' },
        { label: 'Coil Material', value: '100% Inner-Grooved Copper' }
      ],
      relatedBrands: ['Voltas'],
      capacityRange: '3.0 TR - 11.0 TR',
      efficiencyRating: 'High-COP Commercial',
      isFeatured: true,
      isPublished: true,
      sortOrder: 23
    },
    {
      name: 'Carrier WeatherMaker Commercial Inverter Ductable System',
      slug: 'carrier-commercial-inverter-ductable-system',
      category: 'Ductable AC',
      tagline: 'Energy-Efficient Commercial Ductable AC with Electronic Expansion Control',
      image: '/images/equipment/carrier-outdoor.jpg',
      description: 'Carrier WeatherMaker ductable split unit delivers precise thermal control with electronic expansion valves, beltless direct-drive DC blowers, and quiet aerodynamic condenser heat rejection.',
      applications: ['Offices & IT Parks', 'Showrooms & Banks', 'Institutions & Auditoriums', 'Banquet Halls'],
      keyFeatures: [
        'Direct-drive high-efficiency fan motor eliminating belt maintenance',
        'Wide ambient cooling range up to 52°C dry bulb',
        'Optimized copper piping circuitry with low pressure drop',
        'Integrated phase protector and high/low pressure safety cutouts'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '3.5 TR to 16.5 TR' },
        { label: 'External Static Pressure', value: 'Up to 200 Pa' },
        { label: 'Power Supply', value: '415V, 3 Phase, 50 Hz' },
        { label: 'Refrigerant', value: 'Eco-Friendly R410A' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '3.5 TR - 16.5 TR',
      efficiencyRating: 'High Inverter COP',
      isFeatured: true,
      isPublished: true,
      sortOrder: 24
    },
    {
      name: 'O General Heavy-Duty Inverter Ductable AC (ARG-Series)',
      slug: 'o-general-inverter-ductable-ac',
      category: 'Ductable AC',
      tagline: 'Extreme High-Static Inverter Ducted Unit with Hyper-Tropical Outdoor Condenser',
      image: '/images/equipment/ogeneral-outdoor.jpg',
      description: 'O General ARG series inverter ducted air conditioner combines high static pressure capability with tropical outdoor engineering that maintains powerful cooling output under blistering heat.',
      applications: ['Bungalows & Large Mansions', 'Corporate HQs', 'Luxury Banquet Suites', 'Gymnasiums'],
      keyFeatures: [
        'Hyper-tropical DC twin rotary compressor performing in up to 55°C ambient heat',
        'Automatic airflow volume adjustment system calibrates static pressure dynamically',
        'Thick gauge galvanized steel casing with anti-corrosive epoxy coat',
        'Ultra-low vibration mounting reducing structural noise transmission'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '3.0 TR to 8.5 TR' },
        { label: 'Max Ambient Limit', value: '55°C Continuous Heat' },
        { label: 'Piping Length', value: 'Up to 75 meters' },
        { label: 'Static Pressure', value: 'Up to 200 Pa' }
      ],
      relatedBrands: ['O General'],
      capacityRange: '3.0 TR - 8.5 TR',
      efficiencyRating: 'Heavy-Duty Tropical',
      isFeatured: true,
      isPublished: true,
      sortOrder: 25
    },
    {
      name: 'Voltas Inverter Tower AC 2.0 TR / 3.0 TR (Floor Standing)',
      slug: 'voltas-inverter-floor-tower-ac',
      category: 'Tower AC',
      tagline: 'High-Velocity Floor Standing Tower AC for Large Living Halls & Commercial Spaces',
      image: '/images/equipment/voltas-indoor.jpg',
      description: 'Voltas floor-standing column tower AC delivers powerful vertical air displacement for spaces without false ceiling provisions. Features long air throw up to 15 meters, touch digital panel, and elegant aesthetic cabinet styling.',
      applications: ['Grand Living Halls', 'Commercial Showrooms', 'Restaurants & Clubs', 'Lobbies & Lounges'],
      keyFeatures: [
        'Powerful long-distance airflow throw reaching up to 15 meters',
        'Four-way auto air louvers distribute cool air evenly across tall rooms',
        'Sleek touch control interface with remote and child lock protection',
        'High ambient cooling performance up to 52°C'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '2.0 TR to 3.0 TR' },
        { label: 'Air Flow Reach', value: 'Up to 15 meters' },
        { label: 'Compressor', value: 'High-Torque Inverter Rotary' },
        { label: 'Power Supply', value: '230V Single Phase / 415V 3 Phase' }
      ],
      relatedBrands: ['Voltas'],
      capacityRange: '2.0 TR - 3.0 TR',
      efficiencyRating: '3 Star / Inverter',
      isFeatured: true,
      isPublished: true,
      sortOrder: 26
    },
    {
      name: 'Carrier Commercial Floor Standing Column Tower AC',
      slug: 'carrier-floor-standing-column-tower-ac',
      category: 'Tower AC',
      tagline: 'Architectural Slim Column AC for Auditoriums, Boutiques and High-Ceiling Halls',
      image: '/images/equipment/carrier-indoor.webp',
      description: 'Carrier commercial column tower air conditioner features high CFM vertical blowers, gold-fin anti-corrosion condenser coils, turbo cooling, and auto-restart function for heavy commercial applications.',
      applications: ['Hotel Foyers', 'Exhibition Centers', 'Conference Halls', 'High-Ceiling Bungalow Halls'],
      keyFeatures: [
        'High-displacement vertical centrifugal fan delivering strong horizontal throw',
        'Gold-fin heat exchanger protection preventing corrosion in humid environments',
        'Built-in self-diagnosis with instant error code readout',
        'Quiet sleep mode with progressive temperature ramping'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '2.0 TR to 4.0 TR' },
        { label: 'Air Flow Volume', value: 'Up to 1,200 CFM' },
        { label: 'Voltage', value: '230V / 415V Dual Options' },
        { label: 'Refrigerant', value: 'Eco-Friendly R32 / R410A' }
      ],
      relatedBrands: ['Carrier'],
      capacityRange: '2.0 TR - 4.0 TR',
      efficiencyRating: 'High Inverter COP',
      isFeatured: true,
      isPublished: true,
      sortOrder: 27
    },
    {
      name: 'Trane Climate Changer Modular Air Handling Unit (AHU)',
      slug: 'trane-climate-changer-modular-ahu',
      category: 'Air Handling Units (AHU)',
      tagline: 'Custom Thermal-Break Double-Skin AHU with H14 HEPA Cleanroom Filtration',
      image: '/images/real/hospital-hvac.webp',
      description: 'Trane Climate Changer custom air handling units are engineered to deliver sterile, precision-conditioned air for hospitals, pharmaceutical facilities, cleanrooms, and corporate buildings.',
      applications: ['Hospital Operation Theatres (OT)', 'Cleanrooms & Laboratories', 'Commercial Towers', 'Museums'],
      keyFeatures: [
        'True thermal break double-skin casing eliminating condensation on casing exterior',
        'Multi-stage filtration incorporating G4 pre-filters, F9 fine filters, and terminal H14 HEPA filters',
        'High-efficiency plug fans with direct-drive IE4 EC motors for ultra-low power consumption',
        'Integrated UVGI germicidal lamps and heat recovery wheels'
      ],
      technicalSpecs: [
        { label: 'Air Flow Range', value: '1,000 CFM to 60,000 CFM' },
        { label: 'Casing Construction', value: 'Double-Skin 50mm Polyurethane Foam (Thermal Break)' },
        { label: 'Leakage Class', value: 'Eurovent Class L1 certified airtightness' },
        { label: 'Filtration Efficiency', value: 'Up to 99.995% HEPA' }
      ],
      relatedBrands: ['Trane'],
      capacityRange: '1,000 - 60,000 CFM',
      efficiencyRating: 'Eurovent & AHRI Certified',
      isFeatured: true,
      isPublished: true,
      sortOrder: 28
    },
    {
      name: 'Blue Star VRF V Plus 100% Inverter Outdoor Condenser',
      slug: 'blue-star-vrf-v-plus-inverter-system',
      category: 'VRF Air Conditioning Systems',
      tagline: 'High Ambient Cooling up to 54°C with 100% Inverter Scroll Technology',
      image: '/images/equipment/blue-star-outdoor.jpg',
      description: "Blue Star VRF V Plus is India's leading 100% Inverter VRF system engineered to deliver unyielding comfort under extreme 54°C outdoor heat with 1,000m total piping length.",
      applications: ['Villas & Farmhouses', 'Boutique Hotels', 'Corporate Offices', 'Multi-Floor Residences'],
      keyFeatures: [
        'All-DC Inverter scroll compressors for maximum seasonal energy efficiency',
        'Operates effortlessly in punishing Indian ambient temperatures up to 54°C',
        'Extended total piping capability up to 1,000 meters for luxury villas and towers',
        'Intelligent AHU kit interface and BMS automation integration (Modbus/BACnet)'
      ],
      technicalSpecs: [
        { label: 'Capacity Range', value: '8 HP to 112 HP Combination' },
        { label: 'Compressor Type', value: 'DC Inverter Hermetic Scroll' },
        { label: 'Operating Ambient Temp', value: '-5°C to 54°C' },
        { label: 'Refrigerant', value: 'Eco-Friendly R410A' },
        { label: 'Max Total Piping Length', value: '1,000 meters' },
        { label: 'Power Supply', value: '415V / 3 Phase / 50 Hz' }
      ],
      relatedBrands: ['Blue Star'],
      capacityRange: '8 HP - 112 HP',
      efficiencyRating: 'High Seasonal COP',
      isFeatured: true,
      isPublished: true,
      sortOrder: 29
    },
    {
      name: 'Blue Star Inverter Concealed Ductable & Hi-Wall Indoor AC',
      slug: 'blue-star-inverter-concealed-ductable-hi-wall',
      category: 'Concealed AC',
      tagline: 'Concealed Architecture Cooling for High-End Residences & Corporate Offices',
      image: '/images/equipment/blue-star-indoor.jpg',
      description: 'Blue Star concealed ductable and hi-wall inverter units designed for minimalist luxury interiors, fitting seamlessly inside false ceilings with ultra-low sound levels.',
      applications: ['Living Rooms', 'Master Bedrooms', 'Boardrooms', 'Executive Cabins'],
      keyFeatures: [
        'Ultra-slim concealed chassis fits into tight false ceiling drops',
        'Whisper-silent indoor blower for peaceful living rooms and bedrooms',
        'Multi-stage filtration removing airborne dust and PM2.5 particles',
        'Backlit cordless remote and smart smartphone WiFi thermostat support'
      ],
      technicalSpecs: [
        { label: 'Tonnage Range', value: '1.5 TR to 5.5 TR' },
        { label: 'Indoor Noise Level', value: 'Down to 26 dB(A)' },
        { label: 'Blower Type', value: 'Centrifugal DIDW Aerodynamic Impeller' },
        { label: 'Filtration Efficiency', value: 'High-Efficiency Washable Filter' }
      ],
      relatedBrands: ['Blue Star'],
      capacityRange: '1.5 TR - 5.5 TR',
      efficiencyRating: '5 Star Inverter Grade',
      isFeatured: true,
      isPublished: true,
      sortOrder: 30
    },
    {
      name: 'Blue Star Commercial VRF Lineup (Ducted AHU, Package & Outdoor Condenser)',
      slug: 'blue-star-commercial-vrf-lineup',
      category: 'Commercial Solutions',
      tagline: 'Complete Commercial HVAC Ecosystem: Concealed Ducted, Packaged & VRF',
      image: '/images/equipment/blue-star-lineup.jpg',
      description: 'Comprehensive Blue Star commercial cooling lineup featuring low/high static concealed ductable indoor units, modular outdoor condensers, and vertical package ACs designed for retail showrooms, restaurants, and corporate floors.',
      applications: ['Corporate Offices', 'Retail Showrooms', 'Banquet Halls', 'Restaurants'],
      keyFeatures: [
        'Complete commercial lineup with matching indoor ducted AHUs and condensers',
        'Concealed low-height ducted chassis ideal for shallow false ceilings',
        'High external static pressure for long duct distribution runs',
        'Centralized touch-screen and Modbus/BACnet BMS integration'
      ],
      technicalSpecs: [
        { label: 'Product Range', value: 'VRF Outdoor + Concealed Ducted + Package AC' },
        { label: 'Static Pressure Range', value: 'Up to 200 Pa external static' },
        { label: 'Controller Protocols', value: 'BACnet / Modbus / Centralized Touch' },
        { label: 'Coil Coating', value: 'Hydrophilic Anti-Rust Fins' }
      ],
      relatedBrands: ['Blue Star'],
      capacityRange: '2.5 TR - 25 TR',
      efficiencyRating: 'Commercial High-ISEER',
      isFeatured: true,
      isPublished: true,
      sortOrder: 31
    },
    {
      name: 'Daikin VRV X & VRV Home Intelligent Inverter Outdoor Unit',
      slug: 'daikin-vrv-x-home-outdoor-unit',
      category: 'VRF Systems',
      tagline: 'Variable Refrigerant Temperature (VRT) Outdoor Condenser for Luxury Villas',
      image: '/images/equipment/daikin-outdoor.jpg',
      description: 'Daikin VRV X and VRV Home systems are the pinnacle of residential multi-room inverter air conditioning. Patented VRT prevents energy waste while delivering steady, draft-free comfort across all rooms.',
      applications: ['Luxury Villas', 'Bungalows', 'High-Rise Apartments', 'Corporate Offices'],
      keyFeatures: [
        'VRT (Variable Refrigerant Temperature) dynamic modulation for highest part-load savings',
        'Single compact outdoor unit powers up to 8 independent indoor rooms',
        'Automatic refrigerant containment and intelligent oil management',
        'Extreme ambient cooling capability with anti-corrosion condenser fin coating'
      ],
      technicalSpecs: [
        { label: 'Tonnage Range', value: '3 TR to 60 TR modular bank' },
        { label: 'COP / ISEER', value: 'Up to 6.2 Seasonal COP' },
        { label: 'Maximum Piping Length', value: 'Up to 1,000m total equivalent piping' },
        { label: 'Refrigerant', value: 'Eco-Friendly R-410A / R-32' }
      ],
      relatedBrands: ['Daikin', 'Daikin India'],
      capacityRange: '3 TR - 60 TR',
      efficiencyRating: 'ISEER 5-Star Equivalent',
      isFeatured: true,
      isPublished: true,
      sortOrder: 31
    },
    {
      name: 'Daikin VRV Concealed Duct & Designer Hi-Wall Indoor Unit',
      slug: 'daikin-vrv-concealed-duct-hiwall-indoor',
      category: 'Concealed AC',
      tagline: 'Architectural False-Ceiling Concealed & Ultra-Quiet Indoor Units',
      image: '/images/equipment/daikin-indoor.jpg',
      description: 'Daikin VRV indoor fan coil units feature ultra-slim chassis for seamless ceiling concealment, 3D airflow diffusion, and ultra-quiet acoustics down to 19 dB(A).',
      applications: ['Master Bedrooms', 'Living Salons', 'Home Theaters', 'Penthouses'],
      keyFeatures: [
        'Acoustically insulated blower housing with operating sound down to 19 dB(A)',
        'Ultra-flat profile installs into shallow false ceilings without compromising headroom',
        'Built-in high-lift condensate drain pump with antibacterial silver ion cartridge',
        'Smart BMS Modbus/BACnet and smartphone cloud connectivity'
      ],
      technicalSpecs: [
        { label: 'Tonnage Range', value: '0.8 TR to 4.0 TR' },
        { label: 'Indoor Noise Level', value: 'Down to 19 dB(A)' },
        { label: 'Static Pressure', value: 'Adjustable External Static up to 150 Pa' },
        { label: 'Filtration', value: 'Titanium Apatite PM2.5 Photocatalytic Filter' }
      ],
      relatedBrands: ['Daikin', 'Daikin India'],
      capacityRange: '0.8 TR - 4.0 TR',
      efficiencyRating: 'Inverter VRV Grade',
      isFeatured: true,
      isPublished: true,
      sortOrder: 32
    }
  ];

  for (const p of productsData) {
    await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }

  // Seed Features
  const featCount = await Feature.countDocuments();
  if (featCount === 0) {
    console.log('[Seed] Seeding features...');
    const featuresData = [
      {
        title: 'Energy Efficiency',
        slug: 'energy-efficiency',
        icon: 'Zap',
        badge: 'Up to 50% Power Savings',
        shortDescription: 'Inverter compressors dynamically match real-time cooling loads, minimizing electricity waste.',
        fullDescription: 'Traditional air conditioners cycle on and off abruptly, creating heavy power spikes and temperature swings. Our Variable Refrigerant Flow (VRF) systems utilize DC inverter compressors that continuously modulate output down to 10% capacity, lowering utility bills by up to 50%.',
        bulletPoints: ['Dynamic Inverter Output', 'Zero Current Inrush on Startup', 'Low Part-Load Energy Consumption'],
        sortOrder: 1
      },
      {
        title: 'Smart Temperature Control',
        slug: 'smart-temperature-control',
        icon: 'Thermometer',
        badge: 'Precision ±0.5°C',
        shortDescription: 'Individual room temperature modulation so every occupant enjoys tailored comfort.',
        fullDescription: 'No more arguing over the thermostat. With multi-zone VRF engineering, each room or office cabin possesses an independent digital control. You can set the master bedroom to 21°C while maintaining the guest room at 24°C.',
        bulletPoints: ['Room-by-Room Microclimate', 'Mobile App Integration', 'Programmable Sleep Curves'],
        sortOrder: 2
      },
      {
        title: 'Design Flexibility',
        slug: 'design-flexibility',
        icon: 'Layout',
        badge: 'Architect Friendly',
        shortDescription: 'Concealed duct, floor standing, and cassette indoor units tailored for any luxury interior.',
        fullDescription: 'Preserve the aesthetic beauty of your interior ceilings and exterior elevations. Connect up to 14 diverse indoor unit models - from slim ducted units hidden above ceilings to 360-degree round cassettes - all driven by a single outdoor condenser.',
        bulletPoints: ['Hidden Within 200mm Ceiling Drop', 'Linear Slot Architectural Diffusers', 'Discreet Terrace Outdoor Placement'],
        sortOrder: 3
      },
      {
        title: 'Indoor Air Comfort & Quality',
        slug: 'indoor-air-comfort',
        icon: 'Wind',
        badge: 'PM2.5 & Virus Defense',
        shortDescription: 'Multi-stage filtration, UVGI purification, and continuous fresh oxygen replenishment.',
        fullDescription: 'Air conditioning is not just cooling - it is the air your family and team breathe. Our systems integrate PM2.5 electrostatic filters, negative ion generators, and Energy Recovery Ventilators (ERV) that continuously exhaust indoor CO2 and introduce oxygen-rich fresh air.',
        bulletPoints: ['Active PM2.5 Particulate Capture', 'CO2 Reduction via Fresh Air Exchange', 'Balanced Relative Humidity Control'],
        sortOrder: 4
      },
      {
        title: 'Low Noise Operation',
        slug: 'low-noise-operation',
        icon: 'VolumeX',
        badge: 'As Low as 19 dB(A)',
        shortDescription: 'Acoustically insulated aero-spiral fans for peaceful sleep and distraction-free work.',
        fullDescription: 'Engineered with aerodynamic fan blades, vibration-isolated scroll compressors, and acoustic baffle ducting to achieve sound levels as low as 19 dB(A) - virtually imperceptible in quiet bedrooms and corporate boardrooms.',
        bulletPoints: ['Quieter Than a Whisper', 'Acoustic Sound Attenuator Boxes', 'Smooth Variable Fan Speeds'],
        sortOrder: 5
      },
      {
        title: 'Space Saving Installation',
        slug: 'space-saving-installation',
        icon: 'Maximize2',
        badge: 'Compact Footprint',
        shortDescription: 'Replaces multiple unsightly split AC outdoor units with one compact modular condenser.',
        fullDescription: 'Eliminate cluttered balconies and punctured exterior facades. A single compact outdoor unit replaces 6 to 12 separate conventional outdoor units, freeing precious balcony space for gardens and leisure.',
        bulletPoints: ['Preserves Building Elevation', 'Piping Runs Up to 1000m Total Length', 'Terrace-Mounted Central Plant'],
        sortOrder: 6
      },
      {
        title: 'Centralized Control & Smart Automation',
        slug: 'centralized-control',
        icon: 'Cpu',
        badge: 'BMS & Smart Home',
        shortDescription: 'Control whole-estate climate from smartphone, tablet, or central touchscreen BMS.',
        fullDescription: 'Integrate your air conditioning system directly into smart home ecosystems like Apple HomeKit, Google Home, Crestron, and Lutron. Commercial facilities benefit from cloud-based multi-site central telemetry with automated tenant power billing.',
        bulletPoints: ['Native BACnet / Modbus Integration', 'Remote Smartphone Monitoring', 'Automated Maintenance Alerts'],
        sortOrder: 7
      },
      {
        title: 'Professional Installation & AMC',
        slug: 'professional-installation',
        icon: 'Wrench',
        badge: 'Factory Certified Engineers',
        shortDescription: 'Precision nitrogen brazing, vacuum decay testing, and 24/7 priority AMC support.',
        fullDescription: 'A premium HVAC system is only as good as its installation. Our technicians are factory-certified in nitrogen-purged brazing, R410A/R32 deep vacuum holding down to 500 microns, and precision heat-load calculations using ASHRAE standards.',
        bulletPoints: ['Certified Refrigeration Engineers', 'Rigorous 40 Bar Nitrogen Pressure Test', 'Comprehensive Annual Maintenance Contracts (AMC)'],
        sortOrder: 8
      }
    ];

    await Feature.insertMany(featuresData);
  }

  // Seed Projects (with exact dates, completion dates, and public toggle)
  console.log('[Seed] Seeding & syncing showcase projects...');
  const projectsData = [
    {
      name: 'Smart Bazaar Retail Hypermarket — High-Static Ducted AC & Jet Nozzle System',
      slug: 'smart-bazaar-retail-hypermarket-ducted-ac',
      clientName: 'Smart Bazaar Hypermarket (Executed by Shukla Enterprise)',
      projectType: 'Commercial',
      category: 'Commercial',
      location: 'Ernakulam & Kochi, Kerala',
      fullAddress: 'Smart Bazaar Hypermarket Commercial Center, Ernakulam, Kerala',
      hvacSystem: 'Commercial Ceiling-Suspended Ducted AC with High-Velocity Triple Jet Nozzle Diffusers & Haier Condensers',
      brand: 'Haier',
      capacity: '85 TR Commercial Ducted Network',
      description: 'Turnkey suspended ducted air conditioning design and execution for high-bay supermarket and grocery hypermarket spaces by Shukla Enterprise. Features high-clearance ceiling-suspended ductable indoor units, threaded unistrut vibration-damped hangers, triple directional jet nozzle diffusers over open freezer aisles, and exterior wall cantilever-mounted Haier twin-fan inverter condensing units.',
      coverImage: '/images/commercial/hypermarket-ceiling-hvac.jpg',
      gallery: [
        '/images/commercial/hypermarket-ceiling-hvac.jpg',
        '/images/commercial/supermarket-suspended-ductable-ac.jpg',
        '/images/commercial/retail-jet-nozzle-diffuser.jpg',
        '/images/equipment/commercial-heavy-ductable-unit.jpg',
        '/images/equipment/haier-outdoor-dual-fan.jpg'
      ],
      startDate: new Date('2026-06-01'),
      expectedCompletionDate: new Date('2026-09-15'),
      actualCompletionDate: new Date('2026-09-10'),
      status: 'Completed',
      assignedTeam: 'Shukla Enterprise Commercial MEP Engineering Unit',
      adminNotes: 'Aisle temperature logged uniformly at 22.5°C across grocery, dairy, and checkout bays.',
      completionNotes: 'Triple jet nozzles provide precise air velocity without inducing condensation on cold display cases.',
      isPublic: true,
      showCompletionDatePublicly: true,
      showStartDatePublicly: true,
      showStatusPublicly: true,
      isFeatured: true,
      milestones: [
        { title: 'Supermarket Heat Load Sizing & Jet Nozzle Throw Mapping', isCompleted: true, completedDate: new Date('2026-06-15') },
        { title: 'Ceiling Threaded Rod Rigging & Heavy-Duty Indoor Unit Suspension', isCompleted: true, completedDate: new Date('2026-07-10') },
        { title: 'Haier Twin-Fan Outdoor Condenser Cantilever Installation & Piping', isCompleted: true, completedDate: new Date('2026-08-05') },
        { title: 'Triple Jet Nozzle Air Distribution Balancing & CFM Verification', isCompleted: true, completedDate: new Date('2026-08-25') },
        { title: 'Nitrogen Pressure Testing & Handover Commissioning', isCompleted: true, completedDate: new Date('2026-09-10') }
      ],
      sortOrder: 0
    },
      {
        name: 'Marine Drive Kochi Commercial Tower — Haier Inverter Duct AC Installation',
        slug: 'marine-drive-kochi-haier-duct-ac',
        clientName: 'Marine Drive Waterfront Commercial Complex (Executed by Shukla Enterprise)',
        projectType: 'Commercial',
        category: 'Commercial',
        location: 'Marine Drive, Kochi, Kerala',
        fullAddress: 'Marine Drive Waterfront Commercial Strip, Ernakulam, Kochi, Kerala 682031',
        hvacSystem: 'Haier Commercial Inverter Duct AC with Twin-Fan Cantilever Condenser Bank',
        brand: 'Haier',
        capacity: '60 TR Multi-Unit Modular Inverter Bank',
        description: 'Complete commercial ductable air conditioning execution by Shukla Enterprise along the coastal humidity corridor of Marine Drive, Kochi. Engineered with heavy-duty structural MS cantilever wall mounting brackets, multi-unit twin-fan outdoor heat rejection, nitrogen pressure decay testing at 40 bar, and seamless concealed indoor duct air distribution.',
        coverImage: '/images/projects/haier/haier-duct-ac-bank.jpg',
        gallery: [
          '/images/projects/haier/haier-duct-ac-bank.jpg',
          '/images/projects/haier/haier-condenser-line.jpg',
          '/images/projects/haier/haier-commissioning-diagnostics.jpg',
          '/images/projects/haier/haier-dual-fan-outdoor.jpg',
          '/images/projects/haier/haier-pcb-servicing.jpg'
        ],
        startDate: new Date('2026-05-10'),
        expectedCompletionDate: new Date('2026-08-15'),
        actualCompletionDate: new Date('2026-08-12'),
        status: 'Completed',
        assignedTeam: 'Shukla Enterprise Kerala Engineering Unit (Lead: Er. Shukla)',
        adminNotes: 'Field execution verified. Heavy MS frame passed 3x structural load check.',
        completionNotes: 'Refrigerant pressure hold verified at 380 PSI; precision temperature delivery achieved across all zones.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Structural MS Cantilever Wall Frame Fabrication & Rigging', isCompleted: true, completedDate: new Date('2026-05-24') },
          { title: 'Haier Double-Fan Outdoor Condenser Units Hoisting & Mounting', isCompleted: true, completedDate: new Date('2026-06-12') },
          { title: 'Heavy Gauge Refrigerant Line Insulation & High-Side Piping', isCompleted: true, completedDate: new Date('2026-07-05') },
          { title: 'Electronic Inverter PCB Diagnostics & Manifold Vacuuming', isCompleted: true, completedDate: new Date('2026-07-28') },
          { title: 'Balancing, Commissioning & Handover Inspection', isCompleted: true, completedDate: new Date('2026-08-12') }
        ],
        sortOrder: 0
      },
      {
        name: 'Poojapura Trivandrum Commercial Center — Haier Heavy-Duty Duct AC Project',
        slug: 'poojapura-trivandrum-haier-duct-ac',
        clientName: 'Poojapura Commercial Enterprise',
        projectType: 'Commercial',
        category: 'Commercial',
        location: 'Poojapura, Trivandrum, Kerala',
        fullAddress: 'Poojapura Junction, Thiruvananthapuram, Kerala 695012',
        hvacSystem: 'Haier Twin-Fan High-Static Ductable AC with Digital Inverter Management',
        brand: 'Haier',
        capacity: '42 TR Inverter Ducted Bank',
        description: 'Comprehensive installation and testing of Haier commercial ducted units for high-traffic office and retail spaces in Poojapura, Trivandrum. Features floor-level cantilever mounting, PCB micro-tuning, and ultra-quiet indoor airflow distribution.',
        coverImage: '/images/projects/haier/haier-condenser-line.jpg',
        gallery: [
          '/images/projects/haier/haier-condenser-line.jpg',
          '/images/projects/haier/haier-dual-fan-outdoor.jpg',
          '/images/projects/haier/haier-commissioning-diagnostics.jpg'
        ],
        startDate: new Date('2026-04-02'),
        expectedCompletionDate: new Date('2026-07-10'),
        actualCompletionDate: new Date('2026-07-06'),
        status: 'Completed',
        assignedTeam: 'Shukla Enterprise Southern Division',
        adminNotes: 'Full electronic commissioning with digital manifold diagnostics completed.',
        completionNotes: 'Energy consumption benchmarked 32% lower than previous non-inverter systems.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Site Inspection & Heat Load Assessment', isCompleted: true, completedDate: new Date('2026-04-10') },
          { title: 'Outdoor Frame Installation & Unit Placement', isCompleted: true, completedDate: new Date('2026-05-15') },
          { title: 'Electronic PCB Commissioning & Calibration', isCompleted: true, completedDate: new Date('2026-06-20') },
          { title: 'Testing, Balancing & Handover', isCompleted: true, completedDate: new Date('2026-07-06') }
        ],
        sortOrder: 0
      },
      {
        name: 'Kottayam & Kayamkulam Commercial Facilities — Haier Inverter Duct AC Execution',
        slug: 'kottayam-kayamkulam-haier-duct-ac',
        clientName: 'Central Kerala Commercial Group',
        projectType: 'Commercial',
        category: 'Commercial',
        location: 'Kottayam & Kayamkulam, Kerala',
        fullAddress: 'Central Kerala Commercial Corridor (Kottayam & Kayamkulam)',
        hvacSystem: 'Haier Heavy-Duty Inverter Duct AC with Advanced PCB Inverter Controls',
        brand: 'Haier',
        capacity: '35 TR High-Static Ducted System',
        description: 'Multi-location Haier commercial duct air conditioning execution across Kottayam and Kayamkulam by Shukla Enterprise. Rigorous electronic testing, clamp meter amp draw calibration, and weather-resistant copper piping installation.',
        coverImage: '/images/projects/haier/haier-dual-fan-outdoor.jpg',
        gallery: [
          '/images/projects/haier/haier-dual-fan-outdoor.jpg',
          '/images/projects/haier/haier-pcb-servicing.jpg',
          '/images/projects/haier/haier-commissioning-diagnostics.jpg'
        ],
        startDate: new Date('2026-03-01'),
        expectedCompletionDate: new Date('2026-05-30'),
        actualCompletionDate: new Date('2026-05-25'),
        status: 'Completed',
        assignedTeam: 'Shukla Enterprise Kerala Engineering Unit',
        adminNotes: 'Multi-site execution completed on schedule with zero punch list items.',
        completionNotes: 'Superb thermal comfort achieved across all zones.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Duct Routing & Indoor Unit Concealment', isCompleted: true, completedDate: new Date('2026-03-25') },
          { title: 'Outdoor Condenser Rigging & Anti-Vibration Pads', isCompleted: true, completedDate: new Date('2026-04-18') },
          { title: 'Nitrogen Holding & Vacuuming to 250 Microns', isCompleted: true, completedDate: new Date('2026-05-08') },
          { title: 'Commissioning & Operational Handover', isCompleted: true, completedDate: new Date('2026-05-25') }
        ],
        sortOrder: 0
      },
      {
        name: 'Ernakulam, Noornad & Adoor Air Conditioning Network — Haier Ducted Solutions',
        slug: 'ernakulam-noornad-adoor-haier-duct-ac',
        clientName: 'Kerala Multi-Branch Enterprise Network',
        projectType: 'Commercial',
        category: 'Commercial',
        location: 'Ernakulam, Noornad & Adoor, Kerala',
        fullAddress: 'Commercial Branch Facilities across Ernakulam, Noornad & Adoor, Kerala',
        hvacSystem: 'Haier Inverter Duct AC with Precision Air Distribution',
        brand: 'Haier',
        capacity: '48 TR Multi-Site Commercial Inverter Duct AC',
        description: 'Turnkey Haier ductable HVAC delivery spanning commercial buildings across Ernakulam, Noornad, and Adoor. Executed with high-durability cantilever brackets, twin-fan condensers, electronic inverter motor tuning, and emergency AMC maintenance back-up.',
        coverImage: '/images/projects/haier/haier-commissioning-diagnostics.jpg',
        gallery: [
          '/images/projects/haier/haier-commissioning-diagnostics.jpg',
          '/images/projects/haier/haier-pcb-servicing.jpg',
          '/images/projects/haier/haier-duct-ac-bank.jpg'
        ],
        startDate: new Date('2026-02-15'),
        expectedCompletionDate: new Date('2026-05-10'),
        actualCompletionDate: new Date('2026-05-05'),
        status: 'Completed',
        assignedTeam: 'Shukla Enterprise Technical Division',
        adminNotes: 'All branches inspected and commissioned with certified air balance reports.',
        completionNotes: 'Client renewed annual maintenance contract across all 3 centers.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Structural Planning & Wall Cantilever Mounting', isCompleted: true, completedDate: new Date('2026-03-05') },
          { title: 'Haier Ducted Equipment Delivery & Assembly', isCompleted: true, completedDate: new Date('2026-03-28') },
          { title: 'Refrigerant Vacuuming & Manifold Balancing', isCompleted: true, completedDate: new Date('2026-04-20') },
          { title: 'Final Handover & Client Training', isCompleted: true, completedDate: new Date('2026-05-05') }
        ],
        sortOrder: 0
      },
      {
        name: 'Grand Signature Luxury Villa HVAC Execution',
        slug: 'grand-signature-luxury-villa-noida',
        clientName: 'Dr. Rajesh Singhania (Private Residence)',
        projectType: 'Residential',
        category: 'Residential',
        location: 'Sector 44, Noida, NCR',
        fullAddress: 'Plot 18, Block B, Sector 44, Noida, UP 201301',
        hvacSystem: 'Carrier Inverter Multi-VRF System with Slim Duct Concealment',
        brand: 'Carrier',
        capacity: '24 HP Multi-Zone (18 Indoor Units)',
        description: 'Complete HVAC design, heat load calculation, concealed copper piping, and commissioning for a 12,000 sq ft luxury 4-floor modern villa. All bedrooms, formal lounges, and home theater feature linear slot ceiling diffusers with zero visible equipment. Centralized control integrated into Crestron home automation.',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2026-03-10'),
        expectedCompletionDate: new Date('2026-06-25'),
        actualCompletionDate: new Date('2026-06-22'),
        status: 'Completed',
        assignedTeam: 'Senior Project Engineering Team A (Lead: Er. Vikram Malhotra)',
        adminNotes: 'Client signed VIP AMC package. Inspection passed with zero punch list items.',
        completionNotes: 'Project completed 3 days ahead of schedule. Vacuum hold at 250 microns verified.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Heat Load Engineering & Duct Routing Approval', isCompleted: true, completedDate: new Date('2026-03-20') },
          { title: 'Concealed Refrigerant & Drain Piping Installation', isCompleted: true, completedDate: new Date('2026-04-18') },
          { title: '40 Bar Nitrogen Pressure Decay Verification', isCompleted: true, completedDate: new Date('2026-05-02') },
          { title: 'Indoor Units & Architectural Grilles Mounting', isCompleted: true, completedDate: new Date('2026-06-05') },
          { title: 'Testing, Balancing & Final Commissioning Handover', isCompleted: true, completedDate: new Date('2026-06-22') }
        ],
        sortOrder: 1
      },
      {
        name: 'Apex Multi-Specialty Hospital Surgical Complex',
        slug: 'apex-hospital-surgical-complex',
        clientName: 'Apex Health Systems Pvt Ltd',
        projectType: 'Commercial',
        category: 'Healthcare',
        location: 'Gurugram, Haryana',
        fullAddress: 'Golf Course Extension Road, Sector 65, Gurugram',
        hvacSystem: 'Hygienic Cleanroom Double-Skin AHU with H14 HEPA & Precision Chiller Plant',
        brand: 'Carrier',
        capacity: '180 TR Chiller Plant + 6 Operation Theater Laminar Flow AHUs',
        description: 'Engineered class 100 surgical cleanrooms complying strictly with NABH and ASHRAE 170 standards. Includes differential positive pressure gradients, terminal H14 HEPA filtration, dedicated fresh air make-up, and automated temperature/humidity micro-monitoring.',
        coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2025-11-15'),
        expectedCompletionDate: new Date('2026-04-30'),
        actualCompletionDate: new Date('2026-04-28'),
        status: 'Completed',
        assignedTeam: 'Healthcare Engineering Division',
        adminNotes: 'NABH validation audit completed with zero non-conformances.',
        completionNotes: 'All particulate counts validated below ISO Class 5 standards.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Structural Base & Vibration Isolators Mounting', isCompleted: true, completedDate: new Date('2025-12-10') },
          { title: 'Chilled Water Primary/Secondary Piping', isCompleted: true, completedDate: new Date('2026-02-14') },
          { title: 'DOP/PAO Filter Leak Testing', isCompleted: true, completedDate: new Date('2026-04-10') },
          { title: 'NABH Validation & Final Handover', isCompleted: true, completedDate: new Date('2026-04-28') }
        ],
        sortOrder: 2
      },
      {
        name: 'CyberTech World IT Campus Headquarters',
        slug: 'cybertech-it-campus-headquarters',
        clientName: 'CyberTech Solutions International',
        projectType: 'Commercial',
        category: 'Commercial',
        location: 'Sector 126, Noida Expressway',
        fullAddress: 'Tower 4, Expressway Tech Zone, Sector 126, Noida',
        hvacSystem: 'Mitsubishi Electric City Multi VRF with Heat Recovery & Central BMS',
        brand: 'Mitsubishi Electric',
        capacity: '420 HP VRF Network Across 8 Floors',
        description: 'Multi-zone air conditioning infrastructure for 3,500 software professionals across 180,000 sq ft. High sensible heat cooling in server labs, individual conference room scheduling, and centralized CO2 demand ventilation.',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2025-08-01'),
        expectedCompletionDate: new Date('2026-02-15'),
        actualCompletionDate: new Date('2026-02-10'),
        status: 'Completed',
        assignedTeam: 'Commercial Enterprise Projects Team',
        adminNotes: 'LEED Platinum credits achieved for building mechanical efficiency.',
        completionNotes: 'Energy telemetry verified 31% lower power consumption than baseline.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        milestones: [
          { title: 'Ductwork Fabrication & Insulation', isCompleted: true, completedDate: new Date('2025-10-05') },
          { title: 'VRF Outdoor Units Crane Lifting to Rooftop', isCompleted: true, completedDate: new Date('2025-11-20') },
          { title: 'BACnet BMS Integration', isCompleted: true, completedDate: new Date('2026-01-25') },
          { title: 'Commissioning & Handover', isCompleted: true, completedDate: new Date('2026-02-10') }
        ],
        sortOrder: 3
      },
      {
        name: 'The Royal Mirage 5-Star Resort & Spa',
        slug: 'the-royal-mirage-luxury-resort',
        clientName: 'Mirage Luxury Hotels Group',
        projectType: 'Commercial',
        category: 'Hospitality',
        location: 'Jaipur, Rajasthan',
        fullAddress: 'NH-8, Kukas Luxury Corridor, Jaipur',
        hvacSystem: 'Mitsubishi Electric Water-Cooled VRF with Heat Recovery',
        brand: 'Mitsubishi Electric',
        capacity: '280 HP + 140 Luxury Guest Suites',
        description: 'Complete HVAC integration for a destination palace resort in extreme desert temperatures. Whisper-quiet 21 dB(A) concealed bedroom units, centralized energy setback linked to Oracle Opera PMS, and waste heat recovery supplying free hot water to guest bathrooms.',
        coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2025-06-15'),
        expectedCompletionDate: new Date('2026-01-20'),
        actualCompletionDate: new Date('2026-01-18'),
        status: 'Completed',
        assignedTeam: 'Hospitality HVAC Division',
        adminNotes: 'General Manager commended the sound levels in the Presidential Suite.',
        completionNotes: 'Guest rooms acoustic test registered 21.2 dB(A) at bed level.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: true,
        sortOrder: 4
      },
      {
        name: 'Skyline Waterfront Penthouse Multi-Split VRF',
        slug: 'skyline-waterfront-penthouse-gurgaon',
        clientName: 'Kapoor Family',
        projectType: 'Residential',
        category: 'Residential',
        location: 'Golf Course Road, DLF Phase 5, Gurugram',
        fullAddress: 'The Camellias, 28th Floor, DLF Phase 5, Gurugram',
        hvacSystem: 'Hitachi Set-Free Mini VRF with Ultra-Slim Concealed Ducted Units',
        brand: 'Hitachi',
        capacity: '14 HP (10 Indoor Zones)',
        description: 'A 7,500 sq ft double-height luxury penthouse with full glass facades. Engineered for intense afternoon solar gain without obstructing panoramic skyline views. Controlled via custom touch panels and Apple HomeKit.',
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2026-07-01'),
        expectedCompletionDate: new Date('2026-09-30'),
        actualCompletionDate: new Date('2026-09-26'),
        status: 'Completed',
        assignedTeam: 'Residential Premium Solutions',
        adminNotes: 'Interior architect highly satisfied with slot grille alignment.',
        completionNotes: 'Completed and handed over with full user training.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: false,
        sortOrder: 5
      },
      {
        name: 'BioGen Formulations Sterile Oral Drug Plant',
        slug: 'biogen-sterile-oral-drug-plant',
        clientName: 'BioGen Pharma Ltd',
        projectType: 'Commercial',
        category: 'Industrial',
        location: 'Baddi Industrial Area, Himachal Pradesh',
        fullAddress: 'Plot 88, Phase 3, Industrial Area, Baddi',
        hvacSystem: 'Central Chiller Plant + Desiccant Dehumidifiers for RH < 30%',
        brand: 'Trane',
        capacity: '320 TR Chiller Plant with Desiccant Rotor AHUs',
        description: 'High-precision environmental control for effervescent tablet formulation requiring strict relative humidity under 30% and continuous positive room pressurization. Fully compliant with US FDA 21 CFR Part 11 audit trails.',
        coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80'
        ],
        startDate: new Date('2026-01-10'),
        expectedCompletionDate: new Date('2026-08-30'),
        actualCompletionDate: new Date('2026-08-25'),
        status: 'Completed',
        assignedTeam: 'Industrial Applied Systems Team',
        adminNotes: 'US FDA pre-approval inspection cleared without observations.',
        completionNotes: 'RH logged continuously at 28.5% ± 1.2% over 72-hour trial.',
        isPublic: true,
        showCompletionDatePublicly: true,
        showStartDatePublicly: true,
        showStatusPublicly: true,
        isFeatured: false,
        sortOrder: 6
      }
    ];

    for (const proj of projectsData) {
      await Project.findOneAndUpdate({ slug: proj.slug }, proj, { upsert: true, new: true });
    }

  // Seed Services
  console.log('[Seed] Seeding & syncing services...');
  const servicesData = [
    {
      title: 'Commercial HVAC Engineering & Contracting',
      slug: 'commercial-hvac-engineering',
      category: 'Commercial HVAC Solutions',
      shortDescription: 'Turnkey heating, ventilation, and air conditioning contracting for commercial buildings, retail hypermarkets, hospitals, and malls.',
      fullDescription: 'From heat load calculations to suspended ducted commissioning, we deliver comprehensive mechanical MEP contracting. Our certified engineers handle large-scale VRF projects, central chilled water piping, air handling units, and BMS integration with single-point accountability.',
      icon: 'Building2',
      image: '/images/commercial/supermarket-suspended-ductable-ac.jpg',
      features: ['Heat Load Calculation via ASHRAE/HAP', 'Chiller & VRF Equipment Sizing', 'Ductwork Fabrication & Static Balancing', 'Turnkey MEP Project Management'],
      deliverables: ['Detailed CAD & BIM Duct Drawings', 'Equipment Data Sheets', 'Pressure Test Certification', 'Operation & Maintenance Manuals'],
      isFeatured: true,
      sortOrder: 1
    },
    {
      title: 'Luxury Residential VRF Solutions',
      slug: 'residential-vrf-vrf-solutions',
      category: 'Residential HVAC Solutions',
      shortDescription: 'Custom architectural climate control for villas, farmhouses, and luxury apartments.',
      fullDescription: 'We transform residential climate comfort with Mitsubishi Electric, Carrier, and O General VRF systems. A single discreet outdoor unit powers concealed duct units across all rooms, keeping balconies clean, preserving false ceilings, and operating quieter than a whisper.',
      icon: 'Home',
      image: '/images/real/luxury-villa-hero.webp',
      features: ['Architectural False Ceiling Integration', 'Linear Slot Diffuser Coordination', 'Terrace-Mounted Single Condenser', 'Independent Room Thermostats'],
      deliverables: ['Pre-Piping Nitrogen Hold Report', 'Smart Thermostat Setup & App Configuration', '1-Year Free Comprehensive Service'],
      isFeatured: true,
      sortOrder: 2
    },
    {
      title: 'HVAC Design & Heat Load Calculation',
      slug: 'hvac-design-heat-load-calculation',
      category: 'HVAC Design & Heat Load Calculation',
      shortDescription: 'Certified thermal simulation, CFM balancing, and duct static pressure design.',
      fullDescription: 'Avoid undersized units that struggle during heatwaves or oversized systems that leave rooms clammy. Our engineers utilize Carrier HAP (Hourly Analysis Program) to calculate accurate sensible and latent heat loads based on window orientation, occupancy, and glass U-values.',
      icon: 'Compass',
      image: '/images/equipment/commercial-heavy-ductable-unit.jpg',
      features: ['Carrier HAP Hourly Thermal Simulation', 'ASHRAE 62.1 Fresh Air Compliance', 'Airflow CFM & Static Pressure Calculations', 'Equipment Optimization'],
      deliverables: ['Full Heat Load Analysis Report', 'Diffuser & Grille Selection Schedule', 'Refrigerant Pipe Sizing Schematics'],
      isFeatured: true,
      sortOrder: 3
    },
    {
      title: 'Annual Maintenance Contracts (AMC) & Servicing',
      slug: 'annual-maintenance-contracts-amc',
      category: 'Annual Maintenance Contract (AMC)',
      shortDescription: 'Comprehensive and non-comprehensive preventive maintenance with 4-hour emergency response.',
      fullDescription: 'Maximize system longevity and ensure uninterrupted comfort. Our factory-trained technicians execute quarterly coil jet washing, refrigerant pressure checks, electrical terminal torque testing, and microbial pan sanitization.',
      icon: 'ShieldCheck',
      image: '/images/real/outdoor-unit-testing-gauges.jpg',
      features: ['4 Scheduled Preventive Maintenance Visits', '24/7 Priority Emergency Breakdown Response', 'High-Pressure Hydrojet Coil Cleansing', 'Refrigerant Leakage Telemetry'],
      deliverables: ['Quarterly Health Inspection Certificate', 'Energy Consumption Trend Analysis', 'Discounted Genuine OEM Spare Parts'],
      isFeatured: true,
      sortOrder: 4
    }
  ];

  for (const s of servicesData) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
  }

  // Seed Insights & Resources (Blogs)
  console.log('[Seed] Syncing all insights and technical articles...');
  const blogsData = [
    {
      title: 'Case Study: Shukla Enterprise Commercial & Luxury Villa Haier VRF Commissioning in Kerala',
      slug: 'kerala-commercial-villa-haier-vrf-case-study',
      category: 'Case Studies',
      excerpt: 'How Shukla Enterprise engineered high-efficiency Haier VRF installations across Kottayam, Kochi, Trivandrum, and Alappuzha, conquering intense tropical humidity and coastal salinity.',
      content: `### Engineering Superior Climate Control Across Coastal Kerala

The tropical coastal climate of Kerala presents unique thermodynamics for central air conditioning. With relative humidity exceeding 85% during monsoon months and ambient salinity in coastal hubs like Kochi and Alappuzha, standard commercial cooling equipment often deteriorates prematurely.

**Shukla Enterprise** has spearheaded numerous commercial duct AC and centralized VRF installations utilizing heavy-duty **Haier** commercial inverter VRF equipment across key districts:
- **Marine Drive, Kochi & Ernakulam**: High-rise residential apartments and commercial corporate offices.
- **Kottayam & Kayamkulam**: Multi-story retail hubs, clinics, and private residences.
- **Noornad, Adoor & Poojapura, Trivandrum**: Healthcare facilities and independent luxury villas.

---

### Core Engineering Challenges & Field Solutions

#### 1. Zero Balcony Loss via Cantilever Wall Mounting
In luxury residences and commercial plazas, balcony space is high-value aesthetic real estate. Shukla Enterprise designed custom structural steel cantilever frames mounted directly onto reinforced shear walls. This allows dual-fan Haier outdoor units to operate in an organized row with unobstructed airflow while freeing up 100% of floor space.

#### 2. Advanced Inverter PCB & Microcomputer Modulation
Inside each Haier outdoor unit, an intelligent microcomputer inverter PCB board continuously monitors real-time suction pressure, liquid line temperature, and indoor ambient setpoints. The compressor modulates rotational frequency down to 15 Hz during night cycles, keeping energy draw to an absolute minimum.

#### 3. Salt-Spray & Moisture Protection (Gold-Fin Coating)
All outdoor heat exchanger coils feature hydrophilic gold-fin anti-corrosion chemical treatment, preventing oxidation from Arabian Sea coastal salt mist and ensuring an extended lifespan of 15+ years.

#### 4. Precision Digital Diagnostic Commissioning
Prior to refrigerant charging, our technicians execute triple-stage nitrogen pressure holding tests at 4.15 MPa (600 PSI) for 24 hours, followed by digital micron gauge vacuum pull-down below 500 microns to guarantee zero moisture contamination.

---

### Key Outcomes
- **52% Power Consumption Reduction** compared to distributed non-inverter split ACs.
- **Zero Balcony Visual Clutter** through elevated cantilever structural framing.
- **Rapid Pull-Down**: Reaching target indoor setpoints within 11 minutes even under peak afternoon thermal loads.`,
      featuredImage: '/images/real/outdoor-unit-control-pcb.jpg',
      author: 'Er. R. K. Shukla (Chief Mechanical Projects Director)',
      readTime: '7 min read',
      tags: ['Haier VRF', 'Kerala Projects', 'Coastal Humidity', 'Shukla Enterprise', 'Case Study'],
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date('2026-10-25')
    },
    {
      title: 'Architectural Guide: False Ceiling Ducted VRF Coordination & Linear Grille Design',
      slug: 'architectural-false-ceiling-ducted-vrf-guide',
      category: 'Residential HVAC Guides',
      excerpt: 'Mastering 200mm ceiling drops, concealed return air plenums, magnetic architectural slot diffusers, and gravity condensate slopes in modern villa interiors.',
      content: `### Seamless Architectural Integration of Central Air Conditioning

The defining characteristic of modern luxury architecture is minimalism. Bulky plastic indoor split AC units mounted on walls disrupt decorative panelling, Italian marble, and customized lighting layouts.

Central VRF systems with **Slim Concealed Ducted Units** resolve this aesthetic challenge by hiding all mechanical apparatus inside false ceilings.

---

### Critical Ceiling Dimensions & Structural Detailing

#### 1. Minimum Vertical Clearance (The 200mm Standard)
Modern slim VRF duct blowers have a chassis profile height of just 190mm to 200mm. By designing a perimeter bulkhead or corridor drop of 240mm (including gypsum frame and acoustic liner), interior ceiling height in primary living spaces remains expansive.

#### 2. Linear Slot Diffuser Selection
- **Supply Air**: 1-slot or 2-slot architectural linear slot diffusers (15mm to 20mm slot width) deliver gentle laminar air curtains along exterior glass facades without draft discomfort.
- **Return Air**: Discreet bottom return grilles with magnetic snap-on access filters enable filter cleaning without damaging ceiling plaster.

#### 3. Condensate Drain Gravity Traps & Safety
Every concealed unit features an integrated electronic condensate pump capable of lifting drainage water by 700mm, routed to a dedicated PVC drain riser with a standard P-trap to eliminate odor intrusion.

---

### Acoustic Isolation Details
- Canvas flexible duct connectors between unit discharge collar and sheet metal supply plenums to isolate blower motor harmonics.
- 13mm nitrile rubber acoustic lining inside plenums for whisper-silent operation below 22 dB(A).`,
      featuredImage: '/images/insights/linear-slot-diffuser-kitchen-villa.jpg',
      author: 'Ar. Nandita Kapoor (Principal Architectural Consultant)',
      readTime: '6 min read',
      tags: ['False Ceiling AC', 'Concealed Ducted', 'Interior Design', 'Slot Diffusers'],
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date('2026-10-18')
    },
    {
      title: 'Under the Hood: Inverter PCB Controls & Real-Time Telemetry in VRF Systems',
      slug: 'inverter-pcb-controls-telemetry-vrf-systems',
      category: 'HVAC Articles',
      excerpt: 'An engineering analysis of microcomputer PCB architecture, electronic expansion valves (EEVs), and sensor loops that keep VRF compressors running at peak COP.',
      content: `### The Brain of Modern VRF: Microcomputer Inverter Electronics

Unlike traditional air conditioners that switch a contactor relay ON and OFF, a Variable Refrigerant Flow outdoor unit operates on an embedded real-time computing platform.

---

### Core Circuitry & Sensor Architecture

#### 1. Dual 32-Bit Microcontrollers
The primary PCB houses dual microcontrollers responsible for:
- Field-Oriented Control (FOC) vector modulation of the DC brushless scroll compressor motor.
- Synchronizing electronic expansion valve (EEV) stepper motors with 480 discrete needle pulse positions.

#### 2. Continuous Multi-Point Telemetry
Sensors across the refrigerant loop sample vital parameters every 500 milliseconds:
- **Suction Line Pressure & Temperature**: Computes real-time superheat to protect the compressor from liquid slugging.
- **Discharge Line Thermistor**: Guards against excessive winding heat and oil breakdown.
- **Condenser Ambient & Liquid Temperature**: Continuously optimizes subcooling before refrigerant flows to indoor expansion headers.

#### 3. High-Voltage Inverter Power Module (IPM)
Converts three-phase AC mains electricity into high-voltage direct current (DC), then synthesizes smooth variable-frequency sinusoidal waves from 15 Hz to 120 Hz, maximizing electrical power factor (PF > 0.98).

---

### Field Service & Diagnostic Testing
Technicians connect digital manifold test gauges and clamp multimeters directly to test points on the chassis to verify operating frequency, DC bus voltage, and thermistor resistance during scheduled commissioning.`,
      featuredImage: '/images/real/outdoor-unit-testing-gauges.jpg',
      author: 'Er. Anupam Sharma (Chief HVAC Architect)',
      readTime: '8 min read',
      tags: ['PCB Controls', 'Inverter Technology', 'EEV Valves', 'Diagnostics'],
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date('2026-10-08')
    },
    {
      title: 'VRF vs Multi-Split vs Central Ducted AC: Which Solution Suits Your Luxury Villa?',
      slug: 'vrf-vs-multi-split-vs-central-ducted-villa-guide',
      category: 'Residential HVAC Guides',
      excerpt: 'A comprehensive comparative breakdown evaluating maximum piping distances, balcony aesthetics, Capex vs Opex, and room-level independent zoning.',
      content: `### Selecting the Right Cooling Topology for Your Home

When building or renovating a luxury bungalow, penthouse, or villa, homeowners often face conflicting advice between Central Ducted AC, Multi-Split units, and VRF systems. Here is an objective engineering comparison:

---

### Comparative Evaluation Matrix

| Metric | Central Ducted AC (Single Big Unit) | Multi-Split System | Central VRF Home System |
| :--- | :--- | :--- | :--- |
| **Zone Control** | Single thermostat controls entire home | Individual room remote controls | Precision ±0.5°C independent room zoning |
| **Piping Distance** | Very short (ductwork consumes ceiling) | Max 30m total copper length | Up to 1,000m total piping network |
| **Outdoor Footprint** | 1 large noisy rooftop package unit | 3 to 6 individual small outdoor units | Single compact outdoor unit on service terrace |
| **Balcony Aesthetics** | Balconies clear (bulky ducts inside) | Balconies crowded with units | Zero balcony clutter, 100% architectural freedom |
| **Indoor Sound Level** | 35 to 45 dB(A) duct noise | 28 to 34 dB(A) | 19 to 23 dB(A) whisper-silent |
| **Energy Efficiency** | Low (cools entire house at once) | Moderate | Ultra-High (up to 50% power savings) |
| **Connection Diversity** | Fixed 100% capacity | 100% fixed capacity | Up to 130% diversity factor |

---

### Understanding the Diversity Factor Advantage
In a 5-bedroom villa, you rarely cool all bedrooms, formal living rooms, dining spaces, and guest lounges at peak capacity simultaneously. VRF systems take advantage of this **130% connection ratio**, allowing a 10 HP outdoor unit to comfortably service 13 HP worth of indoor cooling demands by shifting refrigerant dynamically where people are present.`,
      featuredImage: '/images/insights/free-match-outdoor-unit-types.jpg',
      author: 'VRF Homes Engineering Advisory',
      readTime: '7 min read',
      tags: ['System Comparison', 'Villa AC', 'Multi-Split', 'HVAC Cost'],
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date('2026-09-28')
    },
    {
      title: 'Acoustic Engineering in Modern Living: How VRF Delivers Whisper-Quiet 19 dB(A) Cooling',
      slug: 'acoustic-engineering-vrf-19db-silent-cooling',
      category: 'HVAC Articles',
      excerpt: 'Discover how DC brushless fan motors, vibration-damped compressors, and remote refrigerant expansion valves eliminate noise for undisturbed sleep.',
      content: `### Silence as a Design Element in High-End Homes

Noise pollution is one of the most common complaints in modern air-conditioned homes. The sudden shudder of a split AC compressor clicking on at 2 AM or the constant drone of low-grade blower fans ruins restorative sleep.

VRF Home systems are engineered from the ground up to achieve operating sound levels down to **19 dB(A)**—quieter than a gentle rustling of leaves in a quiet garden.

---

### 3 Pillars of Acoustic Engineering

#### 1. Relocating Mechanical Compression Outdoors
In a VRF setup, all heavy mechanical compression takes place outside on the roof or service terrace. Inside your bedroom or nursery, the indoor unit contains only a low-friction DC brushless fan motor and a silent heat exchange coil.

#### 2. Electronic Expansion Valve (EEV) Throttling
Unlike traditional capillary tubes that produce turbulent refrigerant hissing sounds, VRF indoor units use micro-stepper EEV needles that adjust refrigerant expansion in microscopic increments with zero acoustic turbulence.

#### 3. Anti-Vibration Neoprene Isolation
Outdoor units are mounted on heavy-duty neoprene rubber anti-vibration isolator pads and spring mounts, ensuring zero mechanical vibration transmits through structural concrete slabs into bedrooms below.`,
      featuredImage: '/images/insights/whisper-quiet-luxury-bedroom-cassette.jpg',
      author: 'Acoustical Society MEP Panel',
      readTime: '5 min read',
      tags: ['Noise Reduction', 'Acoustic Insulation', 'Silent AC', 'Luxury Living'],
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date('2026-09-20')
    },
    {
      title: 'Seasonal Preventative Maintenance & Digital Diagnostic Checklist for VRF Outdoor Units',
      slug: 'seasonal-preventative-maintenance-digital-diagnostics-vrf',
      category: 'Maintenance Tips',
      excerpt: 'Technical preventative maintenance protocol: verifying subcooling and superheat, thermal paste renewal on inverter heatsinks, and anti-corrosive coil washing.',
      content: `### Protecting Your HVAC Investment for 15+ Years

A Variable Refrigerant Flow system is a high-performance mechanical asset. Regular preventative maintenance performed by certified HVAC technicians ensures the equipment runs at optimal Seasonal Energy Efficiency Ratio (SEER) while avoiding unexpected downtime during hot summer months.

---

### Shukla Enterprise Master Service Checklist

#### 1. Heat Exchanger Coil Washing
- Utilize low-pressure neutral-pH biodegradable coil cleaner to dissolve atmospheric dust, pollen, and coastal salt deposits.
- Comb bent aluminum fins to restore unrestricted laminar airflow through the condenser matrix.

#### 2. Electrical & Inverter PCB Verification
- Inspect inverter capacitor banks for bulging or ESR degradation.
- Retorque all high-voltage terminal screw connections to factory specifications (prevents hot spots and thermal arcing).
- Clean cooling heatsink cooling channels and reapply high-thermal-conductivity compound if necessary.

#### 3. Refrigerant Subcooling & Superheat Testing
- Connect calibrated digital manifold gauges to outdoor test ports.
- Verify that liquid subcooling remains strictly between 3°C and 6°C at design ambient temperature.

#### 4. Condensate Drain Lines & Trap Flushing
- Flush all indoor drain pans with biocide tablets to eliminate microbial biofilm and prevent condensate overflow into false ceilings.`,
      featuredImage: '/images/real/outdoor-units-installation-rack.jpg',
      author: 'Shukla Enterprise Service Division',
      readTime: '6 min read',
      tags: ['HVAC Maintenance', 'Diagnostics', 'Outdoor Units', 'Preventative Care'],
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date('2026-09-02')
    },
    {
      title: 'Why Central VRF Home Air Conditioning is Replacing Conventional Split ACs',
      slug: 'why-central-vrf-replaces-split-acs',
      category: 'Residential HVAC Guides',
      excerpt: 'Discover why high-end architects and luxury homeowners are abandoning multiple outdoor units in favor of single-condenser VRF technology.',
      content: `### The Evolution of Residential Cooling

For decades, multi-room residences in India relied on an assortment of individual split air conditioners. A five-bedroom luxury villa typically required eight to twelve separate outdoor condensing units bolted onto balconies, hanging on brackets, or littering terraces.

Beyond the obvious visual blight, conventional split systems create significant operational friction:
1. **Excessive Power Consumption**: Split AC compressors cycle rigidly between 100% capacity and zero, creating continuous high-amperage current spikes.
2. **Balcony Clutter**: High-rise apartments and villa verandas are turned into hot, noisy mechanical zones rather than peaceful outdoor spaces.
3. **Uneven Temperature Zones**: Standard units fluctuate by 2°C to 3°C around the setpoint, leading to chilly drafts followed by stuffiness.

### The VRF Home Advantage

Variable Refrigerant Flow (VRF) replaces this chaotic setup with a single, highly refined outdoor unit connected to multiple sleek indoor units via a compact copper trunk line.

#### 1. Architectural Concealment
With slim concealed duct units tucked into false ceilings, homeowners only see elegant linear slot diffusers that blend seamlessly into interior finishes.

#### 2. Up to 50% Energy Reduction
Because the inverter scroll compressor only pumps refrigerant to the rooms actively in use, electricity consumption drops dramatically.

#### 3. Acoustic Peace
Operating at 19 to 23 dB(A), VRF indoor units are quieter than a whisper, ensuring uninterrupted, restorative sleep.`,
      featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      author: 'Er. Anupam Sharma (Chief HVAC Architect)',
      readTime: '6 min read',
      tags: ['VRF Systems', 'Luxury Residences', 'Energy Efficiency', 'Villa Design'],
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date('2026-09-15')
    },
    {
      title: 'How to Choose the Right HVAC System for Hospital Operation Theaters',
      slug: 'hvac-system-selection-hospital-operation-theaters',
      category: 'Commercial HVAC Guides',
      excerpt: 'A technical breakdown of laminar airflow, positive room pressurization, and HEPA filtration complying with NABH standards.',
      content: `### Non-Negotiable Standards in Surgical Suite HVAC

In hospital environments, an HVAC system is not merely an amenity—it is a critical life-support apparatus. Microorganisms in surgical theaters can lead to Surgical Site Infections (SSIs), resulting in catastrophic patient complications.

#### Core Engineering Prerequisites
1. **Laminar Air Flow (LAF) Plenum**: Air must descend uniformly over the operating table at 25-35 FPM to form a sterile curtain that sweeps contaminants downward toward perimeter exhaust grilles.
2. **Differential Positive Pressure**: The OT must maintain at least +2.5 to +5.0 Pascals of positive pressure relative to adjacent corridors to prevent airborne ingress.
3. **Three-Stage Filtration**: Pre-filter (10 micron), micro-fine filter (3 micron), and terminal H14 HEPA filter (0.3 micron with 99.995% efficiency).
4. **Humidity Stabilization**: Keeping relative humidity strictly between 45% and 55% prevents electrostatic discharges and halts microbial propagation.`,
      featuredImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Vivek Mehra (Medical Cleanroom Consultant)',
      readTime: '8 min read',
      tags: ['Healthcare HVAC', 'NABH Compliance', 'Cleanroom Design', 'Hospitals'],
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date('2026-08-20')
    },
    {
      title: '10 Proven Energy Saving Tips for Commercial Chiller Plants',
      slug: '10-proven-energy-saving-tips-commercial-chillers',
      category: 'Energy Saving Tips',
      excerpt: 'Practical engineering strategies to reduce commercial cooling utility bills by up to 35% without sacrificing occupant comfort.',
      content: `### Optimizing Central Chiller Plant Performance

Chiller systems often represent between 40% and 60% of total electrical power consumed by a commercial office tower or shopping mall. Even minor efficiency optimizations yield massive financial dividends.

#### 1. Raise Chilled Water Supply Temperature
Every 1°C increase in chilled water temperature lowers chiller compressor power demand by roughly 2% to 3%.

#### 2. Implement Variable Primary Pumping
Transitioning from constant speed primary pumps to variable-speed drives (VFDs) slashes pumping energy during part-load operating hours.

#### 3. Maintain Condenser Tube Cleanliness
A scale layer as thin as 0.6 mm on condenser water tubes increases compressor power consumption by up to 20%. Ensure automated chemical dosing and regular descaling.

#### 4. Optimize Cooling Tower Approach
Maintain proper fan sequencing and clean fill media to provide the lowest possible entering condenser water temperature.`,
      featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      author: 'VRF Homes Technical Team',
      readTime: '5 min read',
      tags: ['Energy Efficiency', 'Chillers', 'Commercial HVAC', 'Cost Optimization'],
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date('2026-07-10')
    }
  ];

  for (const blog of blogsData) {
    await Blog.findOneAndUpdate(
      { slug: blog.slug },
      blog,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`[Seed] Successfully synchronized ${blogsData.length} insight articles.`);

  // Seed FAQs
  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    console.log('[Seed] Seeding FAQs...');
    const faqsData = [
      {
        question: 'What is the core difference between VRF and VRF air conditioning?',
        answer: 'VRF (Variable Refrigerant Volume) and VRF (Variable Refrigerant Flow) refer to the exact same technology. VRF systems modulate refrigerant flow in real time according to each room\'s cooling demand. Both modulate refrigerant flow according to exact zone requirements.',
        category: 'VRF Systems',
        sortOrder: 1
      },
      {
        question: 'How much energy can I save by upgrading to a VRF system?',
        answer: 'Compared to conventional fixed-speed split or package air conditioners, a VRF system typically reduces electricity consumption by 35% to 50%. This is accomplished through inverter-driven scroll compressors that dynamically adjust output to match real-time cooling loads rather than running full blast.',
        category: 'General',
        sortOrder: 2
      },
      {
        question: 'How long does a commercial or residential VRF installation take?',
        answer: 'For a 4-bedroom luxury villa, concealed copper piping and duct rough-ins typically take 2 to 3 weeks during the civil ceiling construction phase. Indoor unit mounting, testing, vacuum holding, and final commissioning require an additional 1 to 2 weeks once painting and interior work are completed.',
        category: 'Installation & Design',
        sortOrder: 3
      },
      {
        question: 'What is included in an Annual Maintenance Contract (AMC)?',
        answer: 'Our comprehensive AMC includes four scheduled quarterly preventive service visits (hydro-jet coil cleaning, electrical terminal check, condensate line clearing, refrigerant telemetry), 24/7 priority emergency breakdown support within 4 hours, and coverage for genuine replacement parts and refrigerant top-up.',
        category: 'Maintenance & AMC',
        sortOrder: 4
      },
      {
        question: 'Can the AC be controlled via my smartphone or home automation system?',
        answer: 'Yes! All modern VRF systems we install are fully compatible with smartphone apps, Google Assistant, Amazon Alexa, and luxury smart home automation protocols including Crestron, Control4, KNX, and Savant.',
        category: 'Residential',
        sortOrder: 5
      }
    ];

    await FAQ.insertMany(faqsData);
  }

  // Seed Testimonials
  const testCount = await Testimonial.countDocuments();
  if (testCount === 0) {
    console.log('[Seed] Seeding testimonials...');
    const testimonialsData = [
      {
        clientName: 'Dr. Rajesh Singhania',
        roleOrCompany: 'Owner, Luxury Villa, Sector 44, Noida',
        projectType: 'Residential',
        rating: 5,
        review: 'VRF Homes executed our villa HVAC flawlessly. The Carrier VRF Home system is whisper-quiet, our utility balconies have zero condenser units, and the linear slot diffusers look stunning with our false ceilings. Their engineering team was punctual and highly professional throughout the 4-month build.',
        sortOrder: 1
      },
      {
        clientName: 'Sunil Varma',
        roleOrCompany: 'Vice President Infrastructure, Apex Tech Park',
        projectType: 'Commercial',
        rating: 5,
        review: 'We contracted VRF Homes for our 180,000 sq ft IT headquarters. Their Mitsubishi Electric City Multi VRF installation was delivered on schedule with flawless BMS integration. Our power consumption has dropped by over 30% compared to our previous campus.',
        sortOrder: 2
      },
      {
        clientName: 'Dr. Shalini Kapoor',
        roleOrCompany: 'Medical Director, Apex Health Systems',
        projectType: 'Commercial',
        rating: 5,
        review: 'Healthcare HVAC requires zero tolerance for error. VRF Homes engineered our surgical cleanrooms with strict positive pressure and HEPA filtration that passed NABH hospital audit on the first inspection. Exceptional technical expertise.',
        sortOrder: 3
      }
    ];

    await Testimonial.insertMany(testimonialsData);
  }

  // Seed initial sample enquiries
  const enqCount = await Enquiry.countDocuments();
  if (enqCount === 0) {
    console.log('[Seed] Seeding initial enquiries...');
    await Enquiry.create([
      {
        fullName: 'Arjun Mehra',
        email: 'arjun.mehra@gmail.com',
        mobile: '+91 98765 43210',
        enquiryType: 'New Installation',
        segment: 'Residential',
        propertyType: 'Luxury Villa (8,000 sq ft)',
        serviceRequired: 'Residential HVAC Solutions',
        productInterest: 'VRF Air Conditioning Systems',
        city: 'Noida',
        pincode: '201301',
        projectSize: '8,000 sq ft',
        message: 'Looking for complete Central VRF Home air conditioning with concealed ducting for our under-construction villa in Sector 15A.',
        leadSource: 'Website Quote Form',
        status: 'New'
      },
      {
        fullName: 'Pooja Agarwal',
        email: 'pooja.a@innovatetech.in',
        mobile: '+91 99887 76655',
        enquiryType: 'Commercial Project',
        segment: 'Commercial',
        propertyType: 'Corporate Office',
        serviceRequired: 'Commercial HVAC Solutions',
        productInterest: 'VRF Air Conditioning Systems',
        city: 'Gurugram',
        pincode: '122002',
        projectSize: '25,000 sq ft',
        message: 'Need HVAC consultancy and bidding for our upcoming 3-floor office space on Cyber City road.',
        leadSource: 'Website Quote Form',
        status: 'Contacted',
        internalNotes: 'Initial requirement discussion completed. Quotation in preparation.'
      }
    ]);
  }

  console.log('[Seed] Database initialization and verification complete.');
};
