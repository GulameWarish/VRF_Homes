import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, Plus, Search, Edit3, Trash2, Calendar, 
  CheckCircle2, Clock, MapPin, X, Upload, Eye, EyeOff 
} from 'lucide-react';
import api from '../services/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    name: '',
    clientName: '',
    projectType: 'Commercial',
    category: 'Commercial',
    location: '',
    fullAddress: '',
    hvacSystem: '',
    brand: '',
    capacity: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    startDate: new Date().toISOString().split('T')[0],
    expectedCompletionDate: '',
    actualCompletionDate: '',
    status: 'Completed',
    assignedTeam: '',
    adminNotes: '',
    completionNotes: '',
    isPublic: true,
    showCompletionDatePublicly: true,
    showStartDatePublicly: true,
    showStatusPublicly: true,
    isFeatured: false,
    milestones: []
  };

  const [formData, setFormData] = useState(initialForm);

  const statusOptions = [
    'Enquiry Received',
    'Site Inspection',
    'Quotation Sent',
    'Approval Pending',
    'Approved',
    'Work Scheduled',
    'Work In Progress',
    'Installation Completed',
    'Testing & Commissioning',
    'Completed',
    'On Hold',
    'Cancelled'
  ];

  const categories = ['All', 'Commercial', 'Residential', 'Industrial', 'Hospitality', 'Healthcare'];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let url = `/projects/admin/all?limit=200`;
      if (statusFilter !== 'All') url += `&status=${encodeURIComponent(statusFilter)}`;
      if (categoryFilter !== 'All') url += `&category=${encodeURIComponent(categoryFilter)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await api.get(url);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Fetch admin projects error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter, categoryFilter, search]);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setFormData({
      ...proj,
      startDate: proj.startDate ? proj.startDate.split('T')[0] : '',
      expectedCompletionDate: proj.expectedCompletionDate ? proj.expectedCompletionDate.split('T')[0] : '',
      actualCompletionDate: proj.actualCompletionDate ? proj.actualCompletionDate.split('T')[0] : '',
    });
    setIsEditing(true);
    setActiveId(proj._id);
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    setUploading(true);

    try {
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setFormData({ ...formData, coverImage: res.data.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/projects/${activeId}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Project Management & Completion Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">Record exact installation dates, status changes, and showcase portfolios</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Record</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name, location, HVAC system..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Statuses (12)</option>
            {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Showing: <strong className="text-navy-950">{projects.length}</strong> Projects
        </span>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Querying project repository...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No project records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Project & Location</th>
                  <th className="py-3 px-4">System & Capacity</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Start / Completion Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950 max-w-[220px] truncate">{p.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="font-semibold max-w-[200px] truncate">{p.hvacSystem}</div>
                      {p.capacity && <div className="text-[10px] text-hvac-600 font-bold">{p.capacity}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{p.category}</span>
                      <span className="block text-[10px] text-slate-400">{p.projectType}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>Start: {p.startDate ? new Date(p.startDate).toLocaleDateString() : 'N/A'}</div>
                      <div className="font-bold text-navy-900">
                        {p.actualCompletionDate 
                          ? `Done: ${new Date(p.actualCompletionDate).toLocaleDateString()}` 
                          : p.expectedCompletionDate 
                          ? `Exp: ${new Date(p.expectedCompletionDate).toLocaleDateString()}` 
                          : 'In Progress'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'Work In Progress' ? 'bg-emerald-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.isPublic ? (
                        <span className="inline-flex items-center text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          <Eye className="w-3 h-3 mr-1" /> Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                          <EyeOff className="w-3 h-3 mr-1" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                        title="Edit project & dates"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete record"
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

      {/* Create / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">
                {isEditing ? `Edit Project: ${formData.name}` : 'Record New Project Execution'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Title & Client Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Grand Signature Luxury Villa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-hvac-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client / Company Name (Private internal)</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Singhania"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Category, Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sector Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Classification *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Status (12 stages) *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  >
                    {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
              </div>

              {/* DATES - Crucial requirement from prompt */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Project Execution Timelines & Dates
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Starting Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Expected Completion Date</label>
                    <input
                      type="date"
                      value={formData.expectedCompletionDate}
                      onChange={(e) => setFormData({ ...formData, expectedCompletionDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-700 mb-1">Actual Completion Date (Important)</label>
                    <input
                      type="date"
                      value={formData.actualCompletionDate}
                      onChange={(e) => setFormData({ ...formData, actualCompletionDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-xs focus:outline-hidden bg-emerald-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* HVAC System & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">HVAC System Installed *</label>
                  <input
                    type="text"
                    required
                    value={formData.hvacSystem}
                    onChange={(e) => setFormData({ ...formData, hvacSystem: e.target.value })}
                    placeholder="e.g. Blue Star VRF V Plus System"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Public Location / City *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Sector 44, Noida, NCR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Brand & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Installed</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Blue Star / Mitsubishi / Carrier"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Capacity / Tonnage</label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g. 24 HP Multi-Zone or 180 TR Chiller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL / Upload</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                  <label className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer shrink-0">
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Overview & Description *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the mechanical layout, challenges, and duct design..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              {/* Internal Notes vs Public Visibility Toggles */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Public Visibility Controls (Prompt Requirement)
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="rounded text-hvac-600 focus:ring-hvac-500"
                    />
                    <span className="font-semibold text-slate-700">Publish in Portfolio</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showCompletionDatePublicly}
                      onChange={(e) => setFormData({ ...formData, showCompletionDatePublicly: e.target.checked })}
                      className="rounded text-hvac-600 focus:ring-hvac-500"
                    />
                    <span className="font-semibold text-slate-700">Display Completion Date</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showStartDatePublicly}
                      onChange={(e) => setFormData({ ...formData, showStartDatePublicly: e.target.checked })}
                      className="rounded text-hvac-600 focus:ring-hvac-500"
                    />
                    <span className="font-semibold text-slate-700">Display Start Date</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showStatusPublicly}
                      onChange={(e) => setFormData({ ...formData, showStatusPublicly: e.target.checked })}
                      className="rounded text-hvac-600 focus:ring-hvac-500"
                    />
                    <span className="font-semibold text-slate-700">Display Project Status</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Strictly Private Admin Notes (Never shown on public website)
                  </label>
                  <input
                    type="text"
                    value={formData.adminNotes}
                    onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                    placeholder="Internal client comments, billing notes..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md"
                >
                  {isEditing ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
