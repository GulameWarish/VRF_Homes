import React, { useState, useMemo } from 'react';
import { 
  Calculator, Zap, Wind, ShieldCheck, ArrowRight, CheckCircle2, 
  Building2, Home, Sparkles, Volume2, IndianRupee, Layers, ThermometerSun 
} from 'lucide-react';

const PROPERTY_TYPES = [
  { id: 'villa', label: 'Luxury Villa / Duplex', icon: Home, baseSqftPerTon: 160, typicalDiversity: 0.8 },
  { id: 'apartment', label: 'Apartment / Penthouse', icon: Building2, baseSqftPerTon: 175, typicalDiversity: 0.85 },
  { id: 'office', label: 'Corporate Office / IT Hub', icon: Building2, baseSqftPerTon: 130, typicalDiversity: 0.9 },
  { id: 'retail', label: 'Showroom / Hypermarket', icon: Layers, baseSqftPerTon: 115, typicalDiversity: 0.95 },
  { id: 'clinic', label: 'Hospital / Clinic / Lab', icon: ShieldCheck, baseSqftPerTon: 125, typicalDiversity: 0.9 }
];

const CEILING_HEIGHTS = [
  { id: 'standard', label: 'Standard (9 - 10 ft)', factor: 1.0 },
  { id: 'high', label: 'High Ceiling (11 - 13 ft)', factor: 1.15 },
  { id: 'double', label: 'Double Height (14 - 18 ft)', factor: 1.35 }
];

const SUN_EXPOSURES = [
  { id: 'moderate', label: 'Standard / Partial Shade', factor: 1.0 },
  { id: 'heavy', label: 'Top Floor / West Facing Glass', factor: 1.18 }
];

export default function HvacSizingCalculator({ onOpenQuote }) {
  const [areaSqft, setAreaSqft] = useState(2400);
  const [propertyType, setPropertyType] = useState('villa');
  const [ceilingHeight, setCeilingHeight] = useState('standard');
  const [sunExposure, setSunExposure] = useState('moderate');

  // Real-time calculation engine based on ISHRAE / ASHRAE residential cooling guidelines
  const sizing = useMemo(() => {
    const selectedProp = PROPERTY_TYPES.find(p => p.id === propertyType) || PROPERTY_TYPES[0];
    const selectedCeiling = CEILING_HEIGHTS.find(c => c.id === ceilingHeight) || CEILING_HEIGHTS[0];
    const selectedExposure = SUN_EXPOSURES.find(s => s.id === sunExposure) || SUN_EXPOSURES[0];

    // Effective cooling tonnage needed
    const effectiveSqftPerTon = selectedProp.baseSqftPerTon / (selectedCeiling.factor * selectedExposure.factor);
    const rawTonnage = areaSqft / effectiveSqftPerTon;
    
    // VRF Horsepower (HP) sizing with diversity factor
    const vrfHp = Math.max(4, Math.round(rawTonnage * selectedProp.typicalDiversity * 1.15));
    const roundedTonnage = (rawTonnage).toFixed(1);
    
    // Airflow CFM calculation (approx 400 CFM per Ton)
    const totalCfm = Math.round(rawTonnage * 400);

    // Indoor units estimation
    let indoorUnitsCount = Math.max(2, Math.round(areaSqft / 450));
    let recommendedIndoorMix = '2x Concealed Slim Duct + 2x 4-Way Cassettes';
    if (areaSqft < 1500) {
      recommendedIndoorMix = '1x Ceiling Concealed + 2x Hi-Wall VRF';
    } else if (areaSqft > 3500) {
      recommendedIndoorMix = '4x High-Static Ducted + 3x Round-Flow Cassettes';
    }

    // Power savings estimation (VRF all-DC inverter saves 20-40% compared to standard split ACs)
    const annualHours = 2400; // ~8 hrs/day over 300 days
    const conventionalKwhPerTon = 1.35; // Standard non-inverter split
    const vrfKwhPerTon = 0.92; // High-efficiency VRF inverter (approx 32% savings)
    const tariffPerKwh = 8.5; // Average Indian metro commercial/residential slab

    const conventionalCost = rawTonnage * conventionalKwhPerTon * annualHours * tariffPerKwh;
    const vrfCost = rawTonnage * vrfKwhPerTon * annualHours * tariffPerKwh;
    const annualSavings = Math.round(conventionalCost - vrfCost);
    const savingsPercent = '20-40%';

    return {
      tonnage: roundedTonnage,
      vrfHp,
      totalCfm,
      indoorUnitsCount,
      recommendedIndoorMix,
      annualSavings,
      savingsPercent
    };
  }, [areaSqft, propertyType, ceilingHeight, sunExposure]);

  const handleApplyEstimate = () => {
    if (onOpenQuote) {
      const selectedProp = PROPERTY_TYPES.find(p => p.id === propertyType)?.label || propertyType;
      onOpenQuote({
        propertyType: selectedProp,
        requirements: `Calculated Load: ~${sizing.tonnage} TR (${sizing.vrfHp} HP VRF) for ${areaSqft} sq.ft area. Indoor Mix: ${sizing.recommendedIndoorMix}. Estimated 20-40% bill savings.`
      });
    }
  };

  return (
    <section id="hvac-calculator" className="py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#009fe3]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#009fe3]/20 border border-[#009fe3]/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Interactive Engineering Sizing Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Instant HVAC Tonnage &amp; Cost Sizing Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Select your space parameters to calculate recommended VRF outdoor unit capacity, indoor unit distribution, and projected <strong>20-40% annual electricity bill savings</strong>.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Controls (7 Columns) */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            
            {/* 1. Property Typology */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                1. Select Property Typology
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PROPERTY_TYPES.map((t) => {
                  const Icon = t.icon;
                  const isSelected = propertyType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPropertyType(t.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-[#009fe3] border-[#009fe3] text-white shadow-lg shadow-[#009fe3]/30 scale-[1.02]' 
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                      <span className="text-xs font-bold leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Carpet Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Air Conditioned Carpet Area
                </label>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-cyan-400">{areaSqft.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-semibold">sq.ft</span>
                  <span className="text-xs text-slate-500 ml-1">({Math.round(areaSqft / 10.764)} m²)</span>
                </div>
              </div>

              <input 
                type="range"
                min="200"
                max="10000"
                step="50"
                value={areaSqft}
                onChange={(e) => setAreaSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#009fe3]"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>200 sq.ft (Single Room)</span>
                <span>2,400 sq.ft (Villa)</span>
                <span>5,000 sq.ft</span>
                <span>10,000+ sq.ft</span>
              </div>
            </div>

            {/* 3. Ceiling Height & Sun Exposure in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Ceiling Clear Height
                </label>
                <div className="space-y-1.5">
                  {CEILING_HEIGHTS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCeilingHeight(c.id)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        ceilingHeight === c.id
                          ? 'bg-[#009fe3]/30 border-cyan-400 text-white'
                          : 'bg-slate-900/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  4. Solar Exposure &amp; Glazing
                </label>
                <div className="space-y-1.5">
                  {SUN_EXPOSURES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSunExposure(s.id)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        sunExposure === s.id
                          ? 'bg-[#009fe3]/30 border-cyan-400 text-white'
                          : 'bg-slate-900/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Sizing Results Card (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-900/90 to-slate-900/95 rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#009fe3] text-navy-950 font-black text-[11px] uppercase tracking-wider rounded-bl-2xl">
              Certified Sizing
            </div>

            <div>
              <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Recommended System Spec</span>
              </div>

              {/* Primary Capacity Display */}
              <div className="grid grid-cols-2 gap-3 mb-6 pt-2">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">VRF Outdoor Capacity</span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-cyan-400">{sizing.vrfHp}</span>
                    <span className="text-base font-bold text-slate-300">HP</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Single Compact Outdoor Unit</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">Cooling Load</span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">{sizing.tonnage}</span>
                    <span className="text-base font-bold text-slate-300">TR</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">~{sizing.totalCfm.toLocaleString()} CFM Total Airflow</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 mb-6 text-xs border-y border-white/10 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center">
                    <Layers className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Indoor Units Required:
                  </span>
                  <span className="font-bold text-white">~{sizing.indoorUnitsCount} Zones / Rooms</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center">
                    <Wind className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Recommended Mix:
                  </span>
                  <span className="font-bold text-cyan-300 text-right text-[11px] max-w-[200px]">
                    {sizing.recommendedIndoorMix}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center">
                    <Volume2 className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Acoustic Sound Level:
                  </span>
                  <span className="font-bold text-emerald-400">20 - 38 dB(A) Ultra Quiet</span>
                </div>

                <div className="flex items-center justify-between bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-300 font-bold flex items-center">
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Est. Annual Power Savings:
                  </span>
                  <span className="text-base font-black text-emerald-400">
                    ₹{sizing.annualSavings.toLocaleString()} / yr
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#009fe3] to-cyan-500 hover:from-cyan-400 hover:to-[#009fe3] text-navy-950 font-black rounded-2xl transition-all shadow-xl shadow-[#009fe3]/30 flex items-center justify-center space-x-2 group text-sm"
              >
                <span>Request Detailed Engineering Sizing Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                Includes official heat-load simulation, CAD duct schematics &amp; multi-brand quotation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
