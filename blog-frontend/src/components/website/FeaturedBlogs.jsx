import React from 'react';
import '../../assets/css/FeaturedBlogs.css';
import img from '../../assets/images/hero.jpg';

const blog = {
  title: 'Mastering React in 30 Days',
  category: 'Development',
  content:
    'React is a powerful JavaScript library for building modern UIs. This article covers the essentials you need to become proficient in React step-by-step...',
  image: img,
};

const FeaturedBlogs = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Featured Blogs</h2>

      <div className="row g-4">
        {[1, 2, 3].map((_, i) => (
          <div className="col-lg-4 col-md-6" key={i}>
            <div className="blog-card shadow-sm">
              <div className="blog-image-wrapper">
                <img src={blog.image} alt={blog.title} className="img-fluid blog-image" />
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span className="badge bg-dark mb-2">{blog.category}</span>
                <h5 className="fw-bold mb-2">{blog.title}</h5>
                <p className="text-muted small mb-0">
                  {blog.content.slice(0, 100)}...
                </p>
                <a href={`/blogs/${blog.id}`} className="stretched-link text-dark">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
