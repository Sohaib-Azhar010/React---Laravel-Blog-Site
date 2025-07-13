import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../assets/api';
import AuthorLayout from '../../../layouts/AuthorLayout';

const CategoriesShow = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/author/categories');  // author route
      setCategories(res.data);
    } catch (_) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  return (
    <AuthorLayout>
      <ToastContainer position="top-center" />
      <div className="container-lg">
        <h3 className="fw-semibold mb-3">Categories</h3>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthorLayout>
  );
};

export default CategoriesShow;
