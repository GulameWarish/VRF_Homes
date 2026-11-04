import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Download, Trash2, Edit3, 
  Calendar, CheckCircle, Clock, AlertCircle, Eye, X 
} from 'lucide-react';
import api from '../services/api';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = `/enquiries?limit=200`;
      if (statusFilter !== 'All') url += `&status=${encodeURIComponent(statusFilter)}`;
      if (segmentFilter !== 'All') url += `&segment=${encodeURIComponent(segmentFilter)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await api.get(url);
      if (res.data.success) {
        setLeads(res.data.data);
      }
    } catch (err) {
      console.error('Fetch leads error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, segmentFilter, search]);

  const handleExportCSV = async () => {
    try {
      window.open('/api/enquiries/export/csv', '_blank');
    } catch (e) {
      alert('CSV export error: ' + e.message);
    }
  };

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setEditForm({
      status: lead.status || 'New',
      followUpDate: lead.followUpDate ? lead.followUpDate.split('T')[0] : '',
      internalNotes: lead.internalNotes || '',
      assignedTo: lead.assignedTo || ''
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/enquiries/${selectedLead._id}`, editForm);
      if (res.data.success) {
        setEditModalOpen(false);
        fetchLeads();
      }
    } catch (err) {
      alert('Error updating lead: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead inquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      fetchLeads();
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Lead & Enquiry CRM</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage customer quote requests, follow-ups, and sales conversions</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-2 shadow-2xs"
        >
          <Download className="w-4 h-4 text-hvac-600" />
          <span>Export All Leads (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, city..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Segment Filter */}
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Segments</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Total Leads: <strong className="text-navy-950">{leads.length}</strong>
        </span>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Querying leads database...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No leads found matching current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Interest & Property</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned & Follow-up</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-950">
                      <div>{l.fullName}</div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-semibold text-slate-800">{l.mobile}</div>
                      <div className="text-[11px] text-slate-400">{l.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      <div>{l.city}</div>
                      {l.pincode && <div className="text-[10px] text-slate-400">PIN: {l.pincode}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[200px]">
                        {l.productInterest || l.serviceRequired}
                      </span>
                      <span className="text-[10px] text-hvac-600 font-bold">{l.segment} • {l.propertyType}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        l.status === 'New' ? 'bg-emerald-100 text-emerald-800' :
                        l.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        l.status === 'Follow-up' ? 'bg-amber-100 text-amber-800' :
                        l.status === 'Quotation Sent' ? 'bg-purple-100 text-purple-800' :
                        l.status === 'Converted' ? 'bg-teal-100 text-teal-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">{l.assignedTo || 'Unassigned'}</div>
                      {l.followUpDate && (
                        <div className="text-[10px] text-amber-600 font-bold flex items-center mt-0.5">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(l.followUpDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(l)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                        title="Edit status, notes & assign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(l._id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Manage Lead Modal */}
      {editModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Update Lead: {selectedLead.fullName}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{selectedLead.mobile} • {selectedLead.city}</p>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lead Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up Scheduled</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Converted">Converted (Deal Closed)</option>
                  <option value="Lost">Lost / Unqualified</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Follow-Up Target Date</label>
                <input
                  type="date"
                  value={editForm.followUpDate}
                  onChange={(e) => setEditForm({ ...editForm, followUpDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign to Team Member</label>
                <input
                  type="text"
                  value={editForm.assignedTo}
                  onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
                  placeholder="e.g. Er. Vikram Malhotra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Engineering & Sales Notes</label>
                <textarea
                  rows="3"
                  value={editForm.internalNotes}
                  onChange={(e) => setEditForm({ ...editForm, internalNotes: e.target.value })}
                  placeholder="Private notes (never shown publicly)..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              {selectedLead.message && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Client Inbound Message:</span>
                  <p className="text-slate-600">{selectedLead.message}</p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md"
                >
                  Save Lead Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
