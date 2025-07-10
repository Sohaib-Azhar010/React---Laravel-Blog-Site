import React, { useState } from 'react';
import WebsiteLayout from '../layouts/WebsiteLayout';
import img from '../assets/images/hero.jpg';
// Mock data (replace with API response later)
const blogs = [
  {
    id: 1,
    title: 'Mastering React in 30 Days',
    category: 'Development',
    snippet:
      'React is a powerful JavaScript library for building modern UIs. This article covers the essentials you need...',
  },
  {
    id: 2,
    title: 'The Art of Minimal Design',
    category: 'Design',
    snippet:
      'Minimalism is not just aesthetics—it’s a philosophy. We explore how to embrace space and contrast...',
  },
  {
    id: 3,
    title: 'Boost Your Productivity as a Writer',
    category: 'Productivity',
    snippet:
      'Writers often struggle with focus. Here are 10 proven strategies that will help you stay in flow...',
  },
];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogs.map((b) => b.category))];

  const visibleBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <WebsiteLayout>
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">All Blogs</h2>

        {/* Category Filter */}
        <div className="row justify-content-end mb-4">
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="row g-4">
          {visibleBlogs.length ? (
            visibleBlogs.map((blog) => (
              <div className="col-lg-4 col-md-6" key={blog.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={img}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ objectFit: 'cover', height: '180px' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <span className="badge bg-dark mb-2">{blog.category}</span>
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {blog.snippet}
                    </p>
                    <a href={`/blogs/${blog.id}`} className="stretched-link text-dark">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blogs in this category.</p>
          )}
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default Blogs;
