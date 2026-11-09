import React, { useState } from 'react';
import { 
  Star, CheckCircle2, ThumbsUp, MessageSquare, ExternalLink, 
  MapPin, ShieldCheck, Sparkles, Building, UserCheck 
} from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Dr. George Mathew',
    location: 'Aluva, Kochi, Kerala',
    role: 'Luxury Villa Homeowner (4,800 sq.ft)',
    rating: 5,
    date: '2 weeks ago',
    project: '14 HP Haier VRF System with Concealed Ducts',
    review: 'Installed a 14 HP VRF system for our new duplex villa in Aluva. The indoor units are remarkably quiet (under 25 dB) and our power consumption dropped by over 30% compared to our previous residence. The Shukla Enterprise engineering team handled cantilever roof mounting flawlessly with zero vibration.',
    verified: true
  },
  {
    id: 2,
    name: 'Rajesh Singhania',
    location: 'Dwarka Sector 11, New Delhi',
    role: 'Duplex Penthouse Owner',
    rating: 5,
    date: '1 month ago',
    project: 'Mitsubishi Electric City Multi 12 HP VRF',
    review: 'Replaced 7 old noisy split ACs with a single outdoor VRF unit on the terrace. Our balconies are completely free and clean now. Independent cooling for bedrooms and the family lounge is excellent. Highly recommend VRF Homes for residential VRF execution in Delhi NCR.',
    verified: true
  },
  {
    id: 3,
    name: 'Ar. Vivek Menon',
    location: 'Thrissur, Kerala',
    role: 'Principal Architectural Consultant',
    rating: 5,
    date: '3 weeks ago',
    project: 'Commercial Complex & Diagnostic Center (22 TR Ducted)',
    review: 'We collaborated with VRF Homes for a commercial medical complex near St. Joseph Tower, Mannuthy Nadathara Road. Their CAD heat load simulation, nitrogen pressure hold test at 550 PSI, and airflow balancing were strictly according to ISHRAE standards. Outstanding contractor.',
    verified: true
  },
  {
    id: 4,
    name: 'Ananya Srivastava',
    location: 'Gomti Nagar, Lucknow',
    role: 'Clinic Director, Vibhuti Khand',
    rating: 5,
    date: '1 month ago',
    project: 'Voltas Smart VRF 16 HP with Flush Cassettes',
    review: 'Very professional team in Lucknow. They installed ceiling-flush round flow cassettes across our 3 floors. Temperature control is uniform across all patient suites with zero compressor hum. 24/7 technical support is genuinely responsive.',
    verified: true
  },
  {
    id: 5,
    name: 'Vikram Mehra',
    location: 'Sector 62, Noida',
    role: 'Corporate Facility Head',
    rating: 5,
    date: '2 months ago',
    project: 'Carrier Commercial VRF 28 HP + AMC Contract',
    review: 'Handling our corporate floor AC for over a year now. The annual maintenance contract (AMC) service is proactive with chemical coil jet washing and power consumption audits. Electricity bills reduced by almost 35%.',
    verified: true
  },
  {
    id: 6,
    name: 'Cdr. K. R. Nair (Retd.)',
    location: 'Marine Drive, Kochi, Kerala',
    role: 'Coastal Penthouse Resident',
    rating: 5,
    date: '3 months ago',
    project: 'O General Tropical Inverter VRF 10 HP',
    review: 'Living right by the coastal backwaters, humidity and salt air corrosion were my biggest worries. The VRF Homes team recommended and installed marine-grade anti-corrosion blue fin units. Performs silently and flawlessly even in peak Kerala summer.',
    verified: true
  }
];

export default function GoogleReviewsSection() {
  const [filter, setFilter] = useState('all');

  return (
    <section id="google-reviews" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Banner with Google 4.9 Star Rating */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Google Logo & Rating */}
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center p-2 shrink-0">
              {/* Google G SVG */}
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Google</span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-3xl font-black text-navy-950">4.9</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Excellent
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 mt-1">
                Verified Customer Rating &amp; Reviews
              </h3>
              <p className="text-xs text-slate-500">
                Based on <strong>180+ turnkey residential VRF &amp; commercial HVAC projects</strong> across New Delhi, Kerala (Aluva/Thrissur), Lucknow &amp; Mumbai.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="https://maps.google.com/?q=Unnao+Arcade+Building+5+Gautam+Buddha+Marg+Lucknow+226018"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-navy-950 hover:bg-[#009fe3] text-white font-bold rounded-xl text-xs inline-flex items-center space-x-2 transition-colors shadow-sm"
            >
              <span>Review Us on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-800 font-black text-sm flex items-center justify-center">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950 flex items-center">
                        {rev.name}
                        {rev.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 ml-1.5" title="Google Verified Client" />
                        )}
                      </h4>
                      <div className="flex items-center text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-cyan-600 mr-0.5" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] text-slate-400 font-semibold ml-1.5">5.0</span>
                </div>

                {/* Project Badge */}
                <div className="inline-block bg-slate-100 text-navy-950 text-[11px] font-bold px-2.5 py-1 rounded-lg mb-3 border border-slate-200/60">
                  {rev.project}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Footer info */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{rev.role}</span>
                <span className="text-emerald-600 font-semibold flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Verified Installation
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
