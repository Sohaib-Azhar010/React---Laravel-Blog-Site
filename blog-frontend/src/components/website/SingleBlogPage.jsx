import React from 'react';
import { Link } from 'react-router-dom'; // optional
import img from '../../assets/images/hero.jpg'
const SingleBlogPage = () => {
    /* Replace with real blog data fetched by ID/slug */
    const blog = {
        title: 'Mastering React in 30 Days',
        category: 'Development',
        author: 'John Doe',
        date: 'July 10, 2025',
        image: img,
        content: `
React is a powerful JavaScript library for building UI. In this comprehensive guide we’ll cover:
1. Setting up your environment
2. Understanding components and props
3. Hooks and state management
4. Routing best practices
5. Performance optimization
`,
    };

    return (
        <div className="container my-5">
            {/* Category + Back link */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-dark">{blog.category}</span>
                <Link to="/blogs" className="small text-dark text-decoration-none">
                    ← Back to all blogs
                </Link>
            </div>

            {/* Title */}
            <h1 className="fw-bold mb-2">{blog.title}</h1>

            {/* Meta */}
            <div className="text-muted mb-4">
                By <strong>{blog.author}</strong> &nbsp;|&nbsp; {blog.date}
            </div>

            {/* Featured image */}
            <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded mb-4"
                style={{ maxHeight: '420px', objectFit: 'cover', width: '100%' }}
            />

            {/* Blog content */}
            <article className="fs-5" style={{ whiteSpace: 'pre-wrap' }}>
                {blog.content}
            </article>

            {/* Bottom actions (optional) */}
            <hr className="my-5" />
            <div className="d-flex justify-content-between align-items-center">
                <Link to="/blogs" className="btn btn-outline-secondary">
                    ← All Blogs
                </Link>
                <div>
                    {/* Social icons or share buttons can go here */}
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPage;
