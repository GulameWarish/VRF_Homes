import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit3, Trash2, CheckCircle2, X, Upload } from 'lucide-react';
import api from '../services/api';

export default function AdminCommercial() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    name: '',
    slug: '',
    tagline: '',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    introduction: '',
    overview: '',
    challengesText: '',
    solutionsText: '',
    suitableProducts: 'VRF Air Conditioning Systems, Chiller Systems, Ductable AC',
    benefitsText: '',
    seoTitle: '',
    seoDescription: '',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchCommercial = async () => {
    setLoading(true);
    try {
      const res = await api.get('/commercial?all=true');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Fetch commercial error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommercial();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setFormData({
      ...cat,
      challengesText: cat.challenges ? cat.challenges.map(c => `${c.title}: ${c.description}`).join('\n') : '',
      solutionsText: cat.solutions ? cat.solutions.map(s => `${s.title}: ${s.description}`).join('\n') : '',
      suitableProducts: Array.isArray(cat.suitableProducts) ? cat.suitableProducts.join(', ') : cat.suitableProducts,
      benefitsText: cat.benefits ? cat.benefits.map(b => `${b.title}: ${b.description}`).join('\n') : ''
    });
    setIsEditing(true);
    setActiveId(cat._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const challenges = formData.challengesText
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const parts = line.split(':');
        return {
          title: parts[0]?.trim() || 'Challenge',
          description: parts.slice(1).join(':')?.trim() || line
        };
      });

    const solutions = formData.solutionsText
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const parts = line.split(':');
        return {
          title: parts[0]?.trim() || 'Solution',
          description: parts.slice(1).join(':')?.trim() || line
        };
      });

    const benefits = formData.benefitsText
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const parts = line.split(':');
        return {
          title: parts[0]?.trim() || 'Benefit',
          description: parts.slice(1).join(':')?.trim() || line
        };
      });

    const payload = {
      ...formData,
      suitableProducts: typeof formData.suitableProducts === 'string'
        ? formData.suitableProducts.split(',').map(s => s.trim()).filter(Boolean)
        : formData.suitableProducts,
      challenges,
      solutions,
      benefits
    };

    try {
      if (isEditing) {
        await api.put(`/commercial/${activeId}`, payload);
      } else {
        await api.post('/commercial', payload);
      }
      setModalOpen(false);
      fetchCommercial();
    } catch (err) {
      alert('Error saving category: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this commercial category?')) return;
    try {
      await api.delete(`/commercial/${id}`);
      fetchCommercial();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Commercial Landing Pages Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add unlimited commercial sector landing pages with custom SEO, challenges, and solutions without code changes
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Commercial Sector</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading commercial categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Sector Name & URL Slug</th>
                  <th className="py-3 px-4">Tagline</th>
                  <th className="py-3 px-4">Challenges & Solutions</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950">{c.name}</div>
                      <div className="text-[11px] text-hvac-600 font-mono mt-0.5">/commercial/{c.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[240px] truncate">
                      {c.tagline || 'Specialized Engineering'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {c.challenges?.length || 0} Challenges • {c.solutions?.length || 0} Solutions
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {c.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">
                {isEditing ? `Edit Sector: ${formData.name}` : 'Create Commercial Sector Page'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Commercial Sector Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Airports & Transit Terminals"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug (leave blank to auto-generate)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="airports"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. High Passenger Concourse Air Distribution & Heat Recovery"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Background Image URL</label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Introduction *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  placeholder="Introduction paragraph displayed in page hero..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sector Overview & Thermal Demands</label>
                <textarea
                  rows="3"
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="Detailed engineering explanation..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Challenges (Format: Title: Description, one per line)
                  </label>
                  <textarea
                    rows="4"
                    value={formData.challengesText}
                    onChange={(e) => setFormData({ ...formData, challengesText: e.target.value })}
                    placeholder="High Passenger Density: Rapid sudden surges in heat load&#10;Glass Facade Heat: Afternoon solar radiation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-mono"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Solutions (Format: Title: Description, one per line)
                  </label>
                  <textarea
                    rows="4"
                    value={formData.solutionsText}
                    onChange={(e) => setFormData({ ...formData, solutionsText: e.target.value })}
                    placeholder="Demand Controlled Ventilation: Automated CO2 sensor injection&#10;High Capacity Chillers: Efficient part-load modulation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-mono"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Suitable Products (comma-separated)</label>
                <input
                  type="text"
                  value={formData.suitableProducts}
                  onChange={(e) => setFormData({ ...formData, suitableProducts: e.target.value })}
                  placeholder="VRF Air Conditioning Systems, Chiller Systems, AHU"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
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
                  {isEditing ? 'Save Changes' : 'Create Commercial Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
