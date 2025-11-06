import React, { useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {
  const elementsRef = useRef([]);

 const scrollToMenu = () => {
  // Method 1: Using vanilla JavaScript to scroll to the menu section
  const menuSection = document.getElementById('menu');
  if (menuSection) {
    menuSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.log("Menu section not found");
    // Alternative: Navigate to menu page if using React Router
    // navigate('/menu');
  }
};

const viewMenu = () => {
  // Same functionality as scrollToMenu since both go to the menu
  const menuSection = document.getElementById('menu');
  if (menuSection) {
    menuSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.log("Menu section not found");
    // Alternative: Navigate to menu page if using React Router
    // navigate('/menu');
  }
};

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for faster animation
    );
    
    elementsRef.current.forEach(item => { 
      if (item) observer.observe(item); 
    });
    
    return () => observer.disconnect();
  }, []);

  const addToRefs = el => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section id="home" className="home">
      <div className="home-center">
        <div className="hero-content">
          {/* Brand Section */}
          <div className="brand-section" ref={addToRefs}>
            <h1 className="brand-name">Bagiyah</h1>
            <div className="brand-tagline">
              <span className="tagline-line">Jaha Swad bhi,</span>
              <span className="tagline-line">Sehat bhi</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="title-section" ref={addToRefs}>
            <h2 className="main-title">
              <span className="title-line">Fresh</span>
              <span className="title-line">Healthy</span>
              <span className="title-line">Homemade</span>
              <span className="title-line">Food</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle" ref={addToRefs}>
            Delhi NCR, get ready for a taste you haven't experienced before!
          </p>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat" ref={addToRefs}>
              <div className="stat-icon">🍲</div>
              <div className="stat-content">
                <h3>100%</h3>
                <p>Homemade</p>
              </div>
            </div>
            <div className="stat" ref={addToRefs}>
              <div className="stat-icon">🌿</div>
              <div className="stat-content">
                <h3>Fresh</h3>
                <p>Ingredients</p>
              </div>
            </div>
            <div className="stat" ref={addToRefs}>
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <h3>Fast</h3>
                <p>Delivery</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="buttons-section" ref={addToRefs}>
            <button className="btn btn-primary" onClick={scrollToMenu}>
              <span className="btn-text">Order Now</span>
              <span className="btn-emoji">🍛</span>
            </button>
            <button className="btn btn-secondary" onClick={viewMenu}>
              <span className="btn-text">View Menu</span>
              <span className="btn-emoji">📋</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;