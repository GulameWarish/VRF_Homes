import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, X, Calendar, Clock } from 'lucide-react';
import api from '../services/api';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const categories = [
    'HVAC Articles',
    'Installation Guides',
    'Energy Saving Tips',
    'Residential HVAC Guides',
    'Commercial HVAC Guides',
    'Industry News',
    'Case Studies',
    'Maintenance Tips'
  ];

  const initialForm = {
    title: '',
    slug: '',
    category: 'HVAC Articles',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: 'VRF Homes Technical Team',
    readTime: '5 min read',
    tags: 'VRF, Energy Savings, HVAC Design',
    isPublished: true,
    isFeatured: false
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs?all=true&limit=100');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Fetch blogs error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setFormData({
      ...b,
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags
    });
    setIsEditing(true);
    setActiveId(b._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(s => s.trim()).filter(Boolean)
        : formData.tags
    };

    try {
      if (isEditing) {
        await api.put(`/blogs/${activeId}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert('Error saving article: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete article?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert('Error deleting article: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Insights & Resources Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Author and publish technical HVAC guides, energy checklists, and case studies</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-hvac-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading articles...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Article Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Published Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950 max-w-[260px] truncate">{b.title}</div>
                      <div className="text-[10px] text-hvac-600 font-mono">/insights/{b.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{b.category}</td>
                    <td className="py-3.5 px-4 text-slate-600">{b.author}</td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(b.publishedAt || b.createdAt).toLocaleDateString()}
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">{isEditing ? 'Edit Article' : 'Publish Article'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern Cleanroom Ventilation Standards"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Article Category *</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Excerpt / Summary *</label>
                <textarea
                  rows="2"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short teaser paragraph..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Content (Markdown / HTML) *</label>
                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write complete technical content..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-mono"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="VRF, Chillers, Cleanroom"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
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
                  {isEditing ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
