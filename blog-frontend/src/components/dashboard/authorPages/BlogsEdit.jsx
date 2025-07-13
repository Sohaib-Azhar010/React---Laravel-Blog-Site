import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import api from '../../../assets/api';
import AuthorLayout from '../../../layouts/AuthorLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ title:'', content:'', category_id:'' });
  const [image,   setImage]   = useState(null);
  const [cats,    setCats]    = useState([]);
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load blog + categories in parallel
    Promise.all([
      api.get(`/api/author/blogs/${id}`),
      api.get('/api/categories')
    ])
    .then(([blogRes, catRes]) => {
      const b = blogRes.data;
      setForm({ title:b.title, content:b.content, category_id:b.categories[0]?.id || '' });
      setCats(catRes.data);
    })
    .catch(() => toast.error('Load failed'))
    .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.category_id)
      return toast.error('All fields required');

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      fd.append('category_id', form.category_id);
      if (image) fd.append('image', image);

      await api.post(`/api/author/blogs/${id}?_method=PUT`, fd,
        { headers:{'Content-Type':'multipart/form-data'} });

      toast.success('Updated (set to pending review)');
      setTimeout(()=>navigate('/author/blogs/show'), 1200);
    } catch (_) {
      toast.error('Update failed');
    } finally { setSaving(false); }
  };

  if (loading) return <AuthorLayout><p>Loading…</p></AuthorLayout>;

  return (
    <AuthorLayout>
      <ToastContainer position="top-center"/>
      <div className="container-lg">
        <h3 className="fw-semibold mb-4">Edit Blog</h3>
        <form onSubmit={handleSubmit} className="bg-white p-4 border rounded">
          {/* title */}
          <div className="mb-3">
            <label className="form-label fw-medium">Title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={e=>setForm({...form,title:e.target.value})}
              required
            />
          </div>

          {/* category */}
          <div className="mb-3">
            <label className="form-label fw-medium">Category</label>
            <select
              className="form-select"
              value={form.category_id}
              onChange={e=>setForm({...form,category_id:e.target.value})}
              required
            >
              <option value="">-- Select --</option>
              {cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* image */}
          <div className="mb-3">
            <label className="form-label fw-medium">Replace Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={e=>setImage(e.target.files[0])}
            />
          </div>

          {/* content */}
          <div className="mb-4">
            <Editor
              apiKey="yjmiwj6b7bvz7vsn7w6qeoa4e7epfecfftb5iliiokqy3vdo"
              value={form.content}
              init={{ height:350, menubar:false, plugins:'link image lists table', toolbar:'undo redo | bold italic | bullist numlist | alignleft aligncenter alignright | link image' }}
              onEditorChange={v=>setForm({...form,content:v})}
            />
          </div>

          <button className="btn btn-dark" disabled={saving}>
            {saving ? 'Saving…' : 'Update Blog'}
          </button>
        </form>
      </div>
    </AuthorLayout>
  );
};

export default BlogsEdit;
