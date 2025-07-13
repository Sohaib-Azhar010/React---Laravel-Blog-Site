import React, { useEffect, useState } from 'react';
import AuthorLayout from '../../../layouts/AuthorLayout';
import api from '../../../assets/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const BlogsShow = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorBlogs = async () => {
    try {
      const res = await api.get('/api/author/blogs');
      setBlogs(res.data);
    } catch (err) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorBlogs();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await api.delete(`/api/author/blogs/${id}`);
      toast.success('Deleted');
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (_) {
      toast.error('Delete failed');
    }
  };


  return (
    <AuthorLayout>
      <ToastContainer position="top-center" />
      <div className="container mt-4">
        <h3 className="mb-3">My Blogs</h3>

        {loading ? (
          <p>Loading…</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, idx) => (
                  <tr key={blog.id}>
                    <td>{idx + 1}</td>
                    <td>{blog.title}</td>
                    <td>
                      <span className={`badge bg-${blog.status === 'approved' ? 'success' :
                        blog.status === 'pending' ? 'warning' : 'secondary'
                        }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                    <td style={{ width: 140 }}>
                      {/* <Link
                        to={`/author/blogs/${blog.id}/edit`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link> */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(blog.id)}
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
    </AuthorLayout>
  );
};

export default BlogsShow;
