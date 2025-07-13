import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../assets/api';
import AuthorLayout from '../../../layouts/AuthorLayout';

const BlogsCreate = () => {
  const [title, setTitle]       = useState('');
  const [image, setImage]       = useState(null);
  const [content, setContent]   = useState('');
  const [saving, setSaving]     = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim())   return toast.error('Title is required');
    if (!content.trim()) return toast.error('Content is required');

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      if (image) fd.append('image', image);

      await api.post('/api/author/blogs', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Blog submitted for review!');
      setTimeout(() => navigate('/author/blogs/show'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthorLayout>
      <ToastContainer position="top-center" />
      <div className="container-lg">
        <h3 className="fw-semibold mb-4">Create Blog</h3>

        <form onSubmit={handleSubmit} className="bg-white border rounded p-4">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-medium">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label fw-medium">Cover Image (optional)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Content – TinyMCE */}
          <div className="mb-4">
            <label className="form-label fw-medium d-block">Content</label>
            <Editor
              apiKey="yjmiwj6b7bvz7vsn7w6qeoa4e7epfecfftb5iliiokqy3vdo"      // or your Tiny cloud key
              value={content}
              init={{
                height: 350,
                menubar: false,
                plugins: 'link image lists table codesample',
                toolbar:
                  'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | removeformat',
              }}
              onEditorChange={(newValue) => setContent(newValue)}
            />
          </div>

          <button className="btn btn-dark" disabled={saving}>
            {saving ? 'Saving…' : 'Submit for Review'}
          </button>
        </form>
      </div>
    </AuthorLayout>
  );
};

export default BlogsCreate;
