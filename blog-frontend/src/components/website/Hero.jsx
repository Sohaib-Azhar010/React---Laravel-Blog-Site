import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Hero.css';
import bgImage from '../../assets/images/hero.jpg';

const HeroSection = () => {
  const lineContainer = useRef(null);

  useEffect(() => {
    const createLine = () => {
      const line = document.createElement('span');
      line.classList.add('diagonal-line');

      // Random start position and direction
      const fromTop = Math.random() < 0.5;
      const startX = Math.floor(Math.random() * window.innerWidth);
      const rotation = fromTop ? 45 : -45;

      line.style.left = `${startX}px`;
      line.style.top = fromTop ? '-20px' : '100%';
      line.style.transform = `rotate(${rotation}deg)`;
      line.style.backgroundColor = Math.random() < 0.5 ? 'rgba(0,0,0,0.3)' : 'rgba(128,128,128,0.2)';

      lineContainer.current.appendChild(line);

      // Remove after animation
      setTimeout(() => {
        line.remove();
      }, 4000); // must match CSS animation duration
    };

    const interval = setInterval(() => {
      for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        createLine();
      }
    }, 4000); // every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="dynamic-lines" ref={lineContainer}></div>

      <div className="hero-content text-center text-dark">
        <h1 className="display-5 fw-bold mb-4">Discover Stories That Matter</h1>
        <Link to="/blogs" className="btn btn-dark px-4 py-2 rounded-pill fw-semibold">
          Explore Blogs
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
