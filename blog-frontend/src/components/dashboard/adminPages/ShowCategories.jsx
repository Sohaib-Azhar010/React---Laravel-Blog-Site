import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../assets/api';
import AdminLayout from '../../../layouts/AdminLayout';

const ShowCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* fetch list */
  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/categories');  // ← fixed
      setCategories(res.data);
    } catch (_) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  /* delete one */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/api/admin/categories/${id}`);  // ← fixed
      toast.success('Category deleted');
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (_) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => { loadCategories(); }, []);

  return (
    <AdminLayout>
      <ToastContainer position="top-center" />
      <div className="container-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-semibold">Categories</h3>
          <Link to="/admin/categories/create" className="btn btn-dark">
            + New Category
          </Link>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.id}>
                    <td>{idx + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      <span className={`badge bg-${cat.status === 'active' ? 'success' : 'secondary'}`}>
                        {cat.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/categories/${cat.id}/edit`}          // ← fixed
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ShowCategories;
