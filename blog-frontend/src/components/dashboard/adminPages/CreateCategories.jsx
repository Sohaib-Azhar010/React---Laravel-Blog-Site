import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../assets/api';            // axios instance with baseURL & token
import AdminLayout from '../../../layouts/AdminLayout';

const CreateCategories = () => {
  const [name, setName]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    try {
      setLoading(true);
      await api.post('/api/admin/categories', { name, status: 'active' });
      toast.success('Category created!');
      setName('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-center" />
      <div className="container-lg">
        <h3 className="mb-4 fw-semibold">Create Category</h3>

        <form onSubmit={handleSubmit} className="bg-white p-4 border rounded" style={{ maxWidth: 500 }}>
          <div className="mb-3">
            <label className="form-label fw-medium">Category Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Technology"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* status is always active, no input needed */}

          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? 'Saving…' : 'Create Category'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateCategories;
