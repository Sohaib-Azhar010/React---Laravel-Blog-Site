import React, { useEffect, useState } from 'react';
import AuthorLayout from '../../../layouts/AuthorLayout';
import api from '../../../assets/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>
                      <span className={`badge bg-${blog.status === 'approved' ? 'success' : blog.status === 'pending' ? 'warning' : 'secondary'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td>{new Date(blog.created_at).toLocaleDateString()}</td>
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
