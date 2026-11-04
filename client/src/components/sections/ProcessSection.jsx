import React, { useState } from 'react';
import { 
  MessageSquare, Compass, ClipboardCheck, FileText, CheckCircle2, 
  Wrench, Activity, Award, Headphones, ArrowRight 
} from 'lucide-react';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Initial Consultation',
      desc: 'Discussion of project scope, architectural aspirations, luxury false ceiling elevations, and budget guidelines.',
      icon: MessageSquare,
      deliverable: 'Preliminary Feasibility Study'
    },
    {
      num: '02',
      title: 'Site Inspection',
      desc: 'Physical site walk-through by senior HVAC engineers to inspect structural beams, shaft routing, and electrical power supplies.',
      icon: Compass,
      deliverable: 'Site Measurement Report'
    },
    {
      num: '03',
      title: 'Requirement Analysis',
      desc: 'Detailed heat-load profiling factoring in solar exposure, glass U-factors, occupancy patterns, and fresh air standards.',
      icon: ClipboardCheck,
      deliverable: 'Carrier HAP Thermal Simulation'
    },
    {
      num: '04',
      title: 'HVAC Design & Planning',
      desc: 'Drafting 3D CAD/BIM duct layouts, linear slot diffuser locations, and refrigerant copper pipe schematics.',
      icon: FileText,
      deliverable: 'CAD Shop Drawings & Diffuser Schedule'
    },
    {
      num: '05',
      title: 'Quotation & Approval',
      desc: 'Transparent itemized Bill of Quantities (BOQ) covering equipment, piping, insulation, and labor with no hidden extras.',
      icon: CheckCircle2,
      deliverable: 'Certified BOQ & Project Schedule'
    },
    {
      num: '06',
      title: 'Installation & Execution',
      desc: 'Executing nitrogen-purged brazing, insulated refrigerant piping, drain piping slope checks, and ceiling unit mounting.',
      icon: Wrench,
      deliverable: 'Nitrogen Pressure Test Pass Report'
    },
    {
      num: '07',
      title: 'Testing & Commissioning',
      desc: 'Deep vacuum holding down to 500 microns, CFM air balancing, electrical load testing, and digital telemetry checks.',
      icon: Activity,
      deliverable: 'Commissioning & Balancing Data Sheet'
    },
    {
      num: '08',
      title: 'Project Handover',
      desc: 'Formal client walkthrough, smart thermostat configuration, user training, and delivery of warranties and as-built drawings.',
      icon: Award,
      deliverable: 'As-Built Documentation & Warranty Pack'
    },
    {
      num: '09',
      title: 'Maintenance & AMC Support',
      desc: 'Scheduled quarterly preventive health visits, 24/7 priority emergency breakdown support, and lifetime technical guidance.',
      icon: Headphones,
      deliverable: 'VIP Annual Maintenance Contract'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
            <span>Rigorous 9-Step Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Our Precision Project Execution Workflow
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From initial concept blueprints to ten years post-handover, our systematic protocol eliminates surprises, delays, and refrigerant leakages.
          </p>
        </div>

        {/* 9 Steps Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-hvac-600 shadow-premium ring-2 ring-hvac-500/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-extrabold tracking-wider px-2.5 py-1 rounded-lg ${
                      isSelected ? 'bg-hvac-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-hvac-50 text-hvac-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-navy-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Deliverable:</span>
                  <span className="font-semibold text-hvac-700">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
