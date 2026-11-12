import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, FolderKanban, Package, Wrench, BookOpen, 
  ArrowUpRight, Building2, Home, CheckCircle2, Clock, 
  AlertCircle, ArrowRight, TrendingUp 
} from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/stats/dashboard');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500 font-semibold">Gathering operational metrics & live CRM data...</p>
      </div>
    );
  }

  const s = data?.stats || {};
  const statusCounts = data?.enquiriesByStatus || {};

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-hvac-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-navy-950/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Executive Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              HVAC Enterprise Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Monitor customer inquiries, project completion milestones, product catalogs, and website content in real time.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/admin/leads"
              className="px-4 py-2.5 bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              View Inbound Leads
            </Link>
            <Link
              to="/admin/projects"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors"
            >
              Manage Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Enquiries</span>
            <Users className="w-4 h-4 text-hvac-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">{s.totalEnquiries || 0}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {s.newLeads || 0} pending new review
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-hvac-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">{s.totalProjects || 0}</div>
          <div className="text-[11px] text-hvac-600 font-semibold mt-1">
            {s.completedProjects || 0} verified completed
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Equipment Catalog</span>
            <Package className="w-4 h-4 text-hvac-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">{s.totalProducts || 0}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            {s.totalCommercial || 0} commercial sectors
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Knowledge Base</span>
            <BookOpen className="w-4 h-4 text-hvac-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">{s.totalBlogs || 0}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            {s.totalServices || 0} active services
          </div>
        </div>
      </div>

      {/* Analytics Charts & Segment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Commercial vs Residential Enquiries Distribution */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-navy-950 mb-1">
            Enquiries by Segment
          </h3>
          <p className="text-xs text-slate-400 mb-6">Commercial versus Residential incoming demand</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-1 text-hvac-600" /> Commercial HVAC</span>
                <span>{s.commercialLeads || 0} Leads</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-hvac-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${s.totalEnquiries ? ((s.commercialLeads || 0) / s.totalEnquiries) * 100 : 50}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span className="flex items-center"><Home className="w-3.5 h-3.5 mr-1 text-cyan-600" /> Residential AC</span>
                <span>{s.residentialLeads || 0} Leads</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${s.totalEnquiries ? ((s.residentialLeads || 0) / s.totalEnquiries) * 100 : 50}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Ongoing Projects</span>
              <div className="text-xl font-bold text-navy-950 mt-0.5">{s.ongoingProjects || 0}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Upcoming Pipeline</span>
              <div className="text-xl font-bold text-navy-950 mt-0.5">{s.upcomingProjects || 0}</div>
            </div>
          </div>
        </div>

        {/* Lead Status Breakdown */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-navy-950 mb-1">
            CRM Lead Funnel Statuses
          </h3>
          <p className="text-xs text-slate-400 mb-6">Distribution across enquiry lifecycle stages</p>

          <div className="space-y-2.5">
            {[
              { label: 'New Inquiries', key: 'New', color: 'bg-emerald-500' },
              { label: 'Contacted', key: 'Contacted', color: 'bg-blue-500' },
              { label: 'Follow-up Scheduled', key: 'Follow-up', color: 'bg-amber-500' },
              { label: 'Quotation Sent', key: 'Quotation Sent', color: 'bg-purple-500' },
              { label: 'Converted Contracts', key: 'Converted', color: 'bg-teal-500' },
              { label: 'Lost / Closed', key: 'Lost', color: 'bg-slate-400' }
            ].map((stage) => (
              <div key={stage.key} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></span>
                  <span className="font-semibold text-slate-700">{stage.label}</span>
                </div>
                <span className="font-extrabold text-navy-950 bg-slate-100 px-2 py-0.5 rounded">
                  {statusCounts[stage.key] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-navy-950 mb-1">
              Admin Quick Actions
            </h3>
            <p className="text-xs text-slate-400 mb-4">Direct shortcuts to add content</p>

            <div className="space-y-2">
              <Link
                to="/admin/projects"
                className="p-3 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50 text-xs font-bold text-slate-700 hover:text-hvac-700 flex items-center justify-between transition-colors"
              >
                <span>Record New Completed Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/admin/products"
                className="p-3 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50 text-xs font-bold text-slate-700 hover:text-hvac-700 flex items-center justify-between transition-colors"
              >
                <span>Add Product to Equipment Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/admin/commercial"
                className="p-3 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50 text-xs font-bold text-slate-700 hover:text-hvac-700 flex items-center justify-between transition-colors"
              >
                <span>Create New Commercial Landing Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/admin/blogs"
                className="p-3 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50 text-xs font-bold text-slate-700 hover:text-hvac-700 flex items-center justify-between transition-colors"
              >
                <span>Publish Engineering Guide / Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Current system time: <strong>{new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</strong>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-950">Recent Inbound Lead Inquiries</h3>
            <p className="text-xs text-slate-400 mt-0.5">Newly received quotation requests from prospective clients</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-bold text-hvac-600 hover:underline flex items-center"
          >
            <span>View All CRM Leads</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Client Name</th>
                <th className="py-3 px-5">Contact Details</th>
                <th className="py-3 px-5">City</th>
                <th className="py-3 px-5">Interest</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.recentEnquiries?.length > 0 ? (
                data.recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-navy-950">{enq.fullName}</td>
                    <td className="py-3.5 px-5 text-slate-600">
                      <div>{enq.mobile}</div>
                      <div className="text-[11px] text-slate-400">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-slate-700">{enq.city}</td>
                    <td className="py-3.5 px-5">
                      <span className="font-semibold text-slate-700 block truncate max-w-[180px]">
                        {enq.productInterest || enq.propertyType}
                      </span>
                      <span className="text-[10px] text-hvac-600 font-bold">{enq.segment}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        enq.status === 'New' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No leads recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
