import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../assets/api';
import AdminLayout from '../../../layouts/AdminLayout';

const EditCategories = () => {
  const { id } = useParams();           // category ID from URL
  const navigate = useNavigate();

  const [form, setForm]   = useState({ name: '', status: 'active' });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  /* Fetch category on mount */
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/api/admin/categories/${id}`);
        setForm({ name: res.data.name, status: res.data.status });
      } catch (_) {
        toast.error('Failed to fetch category');
        navigate('/admin/categories/show', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put(`/api/admin/categories/${id}`, form);
      toast.success('Category updated!');
      setTimeout(() => navigate('/admin/categories/show'), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-center" />
      <div className="container-lg">
        <h3 className="fw-semibold mb-4">Edit Category</h3>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-4 border rounded" style={{ maxWidth: 500 }}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-medium">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="form-label fw-medium">Status</label>
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button type="submit" className="btn btn-dark" disabled={saving}>
              {saving ? 'Saving…' : 'Update Category'}
            </button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditCategories;
