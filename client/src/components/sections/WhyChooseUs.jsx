import React from 'react';
import { 
  Award, Sliders, Zap, ShieldCheck, Users, 
  Headphones, FileSpreadsheet, HeartHandshake 
} from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: 'Professional HVAC Expertise',
      desc: '18+ years specializing exclusively in Variable Refrigerant Flow (VRF), chillers, and precision climate engineering.',
      icon: Award
    },
    {
      title: 'Customized Engineering Solutions',
      desc: 'Every system is custom-designed using Carrier HAP heat-load simulation matching specific glass facades and room volumes.',
      icon: Sliders
    },
    {
      title: 'Energy-Efficient Inverter Systems',
      desc: 'High-COP inverter scroll compressors lowering commercial and residential electricity consumption by up to 50%.',
      icon: Zap
    },
    {
      title: 'Flawless Installation Quality',
      desc: 'Factory-certified technicians adhering strictly to nitrogen-purged brazing and 40 bar pressure decay validation.',
      icon: ShieldCheck
    },
    {
      title: 'Experienced Technical Team',
      desc: 'Dedicated mechanical engineers, project managers, and certified refrigeration mechanics on every site.',
      icon: Users
    },
    {
      title: 'Reliable After-Sales Support & AMC',
      desc: 'Comprehensive Annual Maintenance Contracts with 24/7 priority emergency response within 4 hours.',
      icon: Headphones
    },
    {
      title: 'Transparent Project Management',
      desc: 'Real-time milestones tracking, accurate completion dates, clear bill of quantities (BOQ), and no hidden costs.',
      icon: FileSpreadsheet
    },
    {
      title: 'Customer-Focused Service',
      desc: 'Single-point accountability from initial consultation through 10-year operational lifecycle support.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
            <span>Engineering Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Why Discerning Clients Choose VRF Homes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A premium HVAC system requires far more than equipment procurement—it demands world-class mechanical design, uncompromising installation standards, and enduring post-handover care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-hvac-600 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
