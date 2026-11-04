import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Search, Edit3, Trash2, X } from 'lucide-react';
import api from '../services/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    category: 'Commercial HVAC Solutions',
    shortDescription: '',
    fullDescription: '',
    featuresText: '',
    deliverablesText: '',
    isFeatured: true,
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services?all=true');
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error('Fetch services error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (serv) => {
    setFormData({
      ...serv,
      featuresText: Array.isArray(serv.features) ? serv.features.join('\n') : '',
      deliverablesText: Array.isArray(serv.deliverables) ? serv.deliverables.join('\n') : ''
    });
    setIsEditing(true);
    setActiveId(serv._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      deliverables: formData.deliverablesText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (isEditing) {
        await api.put(`/services/${activeId}`, payload);
      } else {
        await api.post('/services', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert('Error saving service: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Error deleting service: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Services Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage turnkey mechanical contracting, heat load engineering, and AMC plans</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading services...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Service Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-950 max-w-[220px] truncate">{s.title}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">{s.category}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-[300px] truncate">{s.shortDescription}</td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Commercial HVAC Turnkey Contracting"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brief Summary *</label>
                <textarea
                  rows="2"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Short 2-line summary..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Scope & Engineering Details</label>
                <textarea
                  rows="4"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Comprehensive technical deliverables..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Deliverables (one per line)</label>
                <textarea
                  rows="3"
                  value={formData.deliverablesText}
                  onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                  placeholder="Carrier HAP Heat Load Report&#10;Duct Fabrication Schematics&#10;40 Bar Nitrogen Pressure Test Certificate"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-mono"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md"
                >
                  {isEditing ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
