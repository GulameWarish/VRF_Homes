import React from 'react';
import { Award, Building, Home, Clock, MapPin } from 'lucide-react';

export default function StatsSection({ stats }) {
  const statList = [
    {
      label: 'Completed Projects',
      value: stats?.completedProjects || '650+',
      icon: Award,
      desc: 'Across residential & commercial'
    },
    {
      label: 'Residential Projects',
      value: stats?.residentialProjects || '420+',
      icon: Home,
      desc: 'Villas, penthouses & kothis'
    },
    {
      label: 'Commercial Projects',
      value: stats?.commercialProjects || '230+',
      icon: Building,
      desc: 'Hospitals, offices & cleanrooms'
    },
    {
      label: 'Years of Experience',
      value: stats?.yearsOfExperience || '18+',
      icon: Clock,
      desc: 'Mechanical HVAC excellence'
    },
    {
      label: 'Service Locations',
      value: stats?.serviceLocations || '15+',
      icon: MapPin,
      desc: 'Delhi NCR & North India'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {statList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-hvac-200 hover:shadow-xs transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-hvac-50 text-hvac-600 flex items-center justify-center mx-auto mb-2 group-hover:bg-hvac-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
