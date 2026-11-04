import React, { useState, useEffect } from 'react';
import { Award, Plus, Search, Edit3, Trash2, X, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80',
    description: '',
    authorizationNote: 'Authorized Integration Solutions Partner',
    categories: 'VRF, Commercial, Residential, Chillers',
    isPartner: true,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await api.get('/brands?all=true');
      if (res.data.success) {
        setBrands(res.data.data);
      }
    } catch (err) {
      console.error('Fetch brands error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (brand) => {
    setFormData({
      ...brand,
      categories: Array.isArray(brand.categories) ? brand.categories.join(', ') : brand.categories
    });
    setIsEditing(true);
    setActiveId(brand._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      categories: typeof formData.categories === 'string'
        ? formData.categories.split(',').map(s => s.trim()).filter(Boolean)
        : formData.categories
    };

    try {
      if (isEditing) {
        await api.put(`/brands/${activeId}`, payload);
      } else {
        await api.post('/brands', payload);
      }
      setModalOpen(false);
      fetchBrands();
    } catch (err) {
      alert('Error saving brand: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete brand partner?')) return;
    try {
      await api.delete(`/brands/${id}`);
      fetchBrands();
    } catch (err) {
      alert('Error deleting brand: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Brand Partnerships & Manufacturers</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage verified HVAC brand associations, logos, and certifications</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand Partner</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading brands...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Brand Logo & Name</th>
                  <th className="py-3 px-4">Authorization Note</th>
                  <th className="py-3 px-4">Categories</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brands.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-950 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        {b.logo ? (
                          <img src={b.logo} alt={b.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <Award className="w-5 h-5 text-hvac-600" />
                        )}
                      </div>
                      <div>
                        <div>{b.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/brand/{b.slug}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{b.authorizationNote}</td>
                    <td className="py-3.5 px-4 text-slate-500">{(b.categories || []).join(', ')}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {b.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">
                {isEditing ? `Edit Brand: ${formData.name}` : 'Add HVAC Brand Partner'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Daikin / Mitsubishi Electric / Voltas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Authorization Note</label>
                <input
                  type="text"
                  value={formData.authorizationNote}
                  onChange={(e) => setFormData({ ...formData, authorizationNote: e.target.value })}
                  placeholder="Authorized Integration Solutions Partner"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Equipment Categories (comma-separated)</label>
                <input
                  type="text"
                  value={formData.categories}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                  placeholder="VRF, Commercial, Residential, Chillers"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex items-center space-x-6 text-xs font-bold text-slate-700 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPartner}
                    onChange={(e) => setFormData({ ...formData, isPartner: e.target.checked })}
                    className="rounded text-hvac-600"
                  />
                  <span>Show Verified Partner Badge</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-hvac-600"
                  />
                  <span>Active & Visible</span>
                </label>
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
                  {isEditing ? 'Save Changes' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
