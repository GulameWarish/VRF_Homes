// Client-side instant fallback catalog
export const FALLBACK_PRODUCTS = [
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
    }
  ];

export const FALLBACK_BRANDS = [
      {
        name: 'Mitsubishi Electric',
        slug: 'mitsubishi-electric',
        logo: '/images/brands/mitsubishi-electric.svg',
        description: 'Renowned for Japanese precision, City Multi VRF systems, and ultra-quiet residential indoor units down to 19 dB.',
        categories: ['VRF', 'Residential', 'Commercial', 'Precision AC'],
        isPartner: true,
        authorizationNote: 'Authorized Sales & Technical Partner',
        sortOrder: 1
      },
      {
        name: 'O General',
        slug: 'o-general',
        logo: '/images/brands/o-general.svg',
        description: 'Unmatched heavy-duty tropical cooling performance engineered for extreme ambient temperatures up to 55°C.',
        categories: ['Residential', 'Commercial', 'Split AC', 'Cassette AC', 'VRF'],
        isPartner: true,
        authorizationNote: 'Authorized Dealer & Installer',
        sortOrder: 2
      },
      {
        name: 'Carrier',
        slug: 'carrier',
        logo: '/images/brands/carrier.svg',
        description: 'The company that invented modern air conditioning, leading commercial chiller systems, AHUs, and high-capacity ductable units.',
        categories: ['Commercial', 'Chillers', 'Ductable AC', 'Air Handling Units (AHU)'],
        isPartner: true,
        authorizationNote: 'Authorized Commercial Integration Partner',
        sortOrder: 3
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
      }
    ];

export const FALLBACK_RESIDENTIAL = [
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

export const FALLBACK_COMMERCIAL = [
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
          { title: 'Medical VRF with UVGI Sterilization', description: 'Variable Refrigerant Flow systems paired with Ultraviolet Germicidal Irradiation coils.', icon: 'ShieldCheck' },
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

export const FALLBACK_SERVICES = [
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
