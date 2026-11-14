import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit3, Trash2, CheckCircle2, X, Upload } from 'lucide-react';
import api from '../services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'VRF Air Conditioning Systems',
    'Central Air Conditioning Systems',
    'Ductable AC',
    'Cassette AC',
    'Split AC',
    'Tower AC',
    'Concealed AC',
    'Chiller Systems',
    'Air Handling Units (AHU)'
  ];

  const initialForm = {
    name: '',
    category: 'VRF Air Conditioning Systems',
    tagline: '',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: '',
    applications: '',
    keyFeatures: '',
    capacityRange: '',
    efficiencyRating: '',
    relatedBrands: 'Blue Star, Mitsubishi Electric',
    brochureUrl: '',
    isFeatured: false,
    isPublished: true,
    technicalSpecs: [
      { label: 'Outdoor Capacity Range', value: '6 HP to 60 HP' },
      { label: 'Refrigerant', value: 'R-410A / R-32' },
      { label: 'Power Supply', value: '380-415V, 3 Phase, 50 Hz' }
    ]
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/products?all=true&limit=200`;
      if (categoryFilter !== 'All') url += `&category=${encodeURIComponent(categoryFilter)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await api.get(url);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, search]);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setFormData({
      ...prod,
      applications: Array.isArray(prod.applications) ? prod.applications.join(', ') : prod.applications,
      keyFeatures: Array.isArray(prod.keyFeatures) ? prod.keyFeatures.join('\n') : prod.keyFeatures,
      relatedBrands: Array.isArray(prod.relatedBrands) ? prod.relatedBrands.join(', ') : prod.relatedBrands,
      technicalSpecs: prod.technicalSpecs || []
    });
    setIsEditing(true);
    setActiveId(prod._id);
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
        setFormData({ ...formData, image: res.data.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleAddSpecRow = () => {
    setFormData({
      ...formData,
      technicalSpecs: [...formData.technicalSpecs, { label: '', value: '' }]
    });
  };

  const handleSpecChange = (idx, field, val) => {
    const updated = [...formData.technicalSpecs];
    updated[idx][field] = val;
    setFormData({ ...formData, technicalSpecs: updated });
  };

  const handleRemoveSpec = (idx) => {
    setFormData({
      ...formData,
      technicalSpecs: formData.technicalSpecs.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      applications: typeof formData.applications === 'string' 
        ? formData.applications.split(',').map(s => s.trim()).filter(Boolean)
        : formData.applications,
      keyFeatures: typeof formData.keyFeatures === 'string'
        ? formData.keyFeatures.split('\n').map(s => s.trim()).filter(Boolean)
        : formData.keyFeatures,
      relatedBrands: typeof formData.relatedBrands === 'string'
        ? formData.relatedBrands.split(',').map(s => s.trim()).filter(Boolean)
        : formData.relatedBrands
    };

    try {
      if (isEditing) {
        await api.put(`/products/${activeId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Equipment & Product Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage VRF, Chillers, AHUs, and ductable AC catalog specifications</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New System</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title, category, description..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Categories ({categories.length})</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Total Products: <strong className="text-navy-950">{products.length}</strong>
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">System Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Capacity / Rating</th>
                  <th className="py-3 px-4">Brands</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <div>
                          <div className="font-bold text-navy-950 max-w-[220px] truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[220px]">{p.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{p.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-900">{p.efficiencyRating || 'Standard'}</div>
                      <div className="text-[10px] text-slate-400">{p.capacityRange}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {(p.relatedBrands || []).join(', ') || 'OEM'}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.isFeatured ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center w-fit">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-amber-500" /> Featured
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Regular</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-hvac-50 text-hvac-700 hover:bg-hvac-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
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
                {isEditing ? `Edit Product: ${formData.name}` : 'Add Product to Equipment Catalog'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Blue Star VRF V Plus System"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Equipment Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Variable Refrigerant Temperature with High Seasonal COP"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL or Upload</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                  <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer shrink-0">
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed equipment description..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Applications (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.applications}
                    onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                    placeholder="Luxury Villas, Hospitals, Corporate Towers"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Related Brands (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.relatedBrands}
                    onChange={(e) => setFormData({ ...formData, relatedBrands: e.target.value })}
                    placeholder="Blue Star, Mitsubishi, Carrier"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Capacity Range</label>
                  <input
                    type="text"
                    value={formData.capacityRange}
                    onChange={(e) => setFormData({ ...formData, capacityRange: e.target.value })}
                    placeholder="e.g. 6 HP - 60 HP or 150 TR"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Efficiency Rating</label>
                  <input
                    type="text"
                    value={formData.efficiencyRating}
                    onChange={(e) => setFormData({ ...formData, efficiencyRating: e.target.value })}
                    placeholder="e.g. ISEER 4.85 / 5 Star"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Features (One per line)</label>
                <textarea
                  rows="3"
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  placeholder="Variable Refrigerant Temperature&#10;Connect up to 64 indoor units&#10;Low acoustic levels down to 19 dB"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              {/* Technical Specifications Table Editor */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                    Technical Specifications (Key - Value Pairs)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-hvac-700 hover:bg-slate-100"
                  >
                    + Add Parameter Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.technicalSpecs.map((spec, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                        placeholder="Parameter (e.g. Refrigerant)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                        placeholder="Value (e.g. R-410A)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(i)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs font-bold text-slate-700 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-hvac-600"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-hvac-600"
                  />
                  <span>Published & Visible</span>
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
                  {isEditing ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
