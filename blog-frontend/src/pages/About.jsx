import React from 'react';
import WebsiteLayout from '../layouts/WebsiteLayout';

const About = () => (
  <WebsiteLayout>
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <h2 className="fw-bold mb-4 text-center">
            About&nbsp;<span className="text-dark">E‑Blogs</span>
          </h2>

          <p className="lead">
            <strong>E‑Blogs</strong> is a multi‑category blogging platform crafted for
            inquisitive readers and passionate writers. From tech deep‑dives
            and lifestyle tips to creative prose and informed commentary,
            E‑Blogs brings diverse voices together under one intuitive interface.
          </p>

          <hr className="my-4" />

          <ul className="list-unstyled fs-5 mb-4">
            <li className="mb-2">📚&nbsp;Browse insightful articles in dozens of categories.</li>
            <li className="mb-2">✍️&nbsp;Publish as an author and engage a global audience.</li>
            <li className="mb-2">⚡&nbsp;Powered by a modern React &amp; Laravel stack for speed and security.</li>
            <li className="mb-2">🌓&nbsp;Distraction‑free reading with light &amp; dark modes.</li>
          </ul>

          <p className="mb-0">
            Our mission is simple: <em>make quality content accessible to everyone—one&nbsp;story at a time.</em>
            Whether you’re here to read, write, or both, we’re thrilled to have you as part of the E‑Blogs community.
          </p>
        </div>
      </div>
    </section>
  </WebsiteLayout>
);

export default About;
