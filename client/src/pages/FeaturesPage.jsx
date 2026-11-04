import React, { useState, useEffect } from 'react';
import { 
  Zap, Thermometer, Layout, Wind, VolumeX, Maximize2, 
  Cpu, Wrench, ShieldCheck, CheckCircle2, ArrowRight 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function FeaturesPage({ onOpenQuote }) {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    Zap, Thermometer, Layout, Wind, VolumeX, Maximize2, Cpu, Wrench
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await api.get('/features');
        if (res.data.success) {
          setFeatures(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching features:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  return (
    <>
      <SEO 
        title="Engineering Capabilities & Technology Features"
        description="Discover how VRF technology delivers 50% energy savings, library-quiet 19 dB sound, precision room-by-room microclimates, and architectural concealment."
      />

      {/* Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            <span>Advanced HVAC Engineering Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Technology & System Capabilities
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Explore the core mechanical, thermodynamic, and digital control engineering principles behind our high-performance climate systems.
          </p>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Loading technical features...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {features.map((feat, idx) => {
                const IconComponent = iconMap[feat.icon] || Zap;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={feat._id || feat.slug}
                    id={feat.slug}
                    className={`scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-center gap-10 ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Visual Card Side */}
                    <div className="w-full lg:w-5/12 bg-gradient-to-tr from-navy-950 to-navy-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-hvac-500/10 rounded-full blur-2xl pointer-events-none"></div>

                      <div className="flex items-center justify-between relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-300 border border-white/15">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {feat.badge && (
                          <span className="text-xs font-bold px-3 py-1 bg-cyan-400/20 text-cyan-200 rounded-full border border-cyan-400/30">
                            {feat.badge}
                          </span>
                        )}
                      </div>

                      <div className="relative z-10 mt-6">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                          Feature Capability {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <h3 className="text-2xl font-extrabold text-white mt-1">
                          {feat.title}
                        </h3>
                      </div>
                    </div>

                    {/* Text Details Side */}
                    <div className="w-full lg:w-7/12 space-y-4">
                      <h4 className="text-xl font-bold text-navy-950">
                        {feat.shortDescription}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {feat.fullDescription}
                      </p>

                      {feat.bulletPoints && feat.bulletPoints.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {feat.bulletPoints.map((bp, i) => (
                            <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                              <span>{bp}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          onClick={() => onOpenQuote({ message: `I would like more information on implementing ${feat.title} in our facility.` })}
                          className="px-5 py-2.5 rounded-xl bg-hvac-50 hover:bg-hvac-600 text-hvac-700 hover:text-white font-bold text-xs transition-colors inline-flex items-center space-x-1.5"
                        >
                          <span>Consult on {feat.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
