import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Animation trigger
    setIsVisible(true);

    return () => clearInterval(timer);
  }, []);



  return (
    <footer className={`footer ${isVisible ? 'footer-visible' : ''}`}>
      {/* Animated background elements */}
      <div className="footer-bg-elements">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-main">
          {/* Brand section */}
          <div className="footer-brand-section">
            <div className="footer-brand">
              <div className="logo-container">
                <span className="footer-logo">🥗</span>
                <div className="logo-glow"></div>
              </div>
              <div className="brand-text">
                <span className="footer-name">Bagiyah</span>
                <span className="footer-tagline">Healthy Living Starts Here</span>
              </div>
            </div>
            <p className="footer-description">
              Your trusted partner in healthy eating and lifestyle. Fresh ingredients, delicious recipes, and nutritional guidance.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-links-section">
            <h4 className="links-title">Quick Links</h4>
            <div className="footer-links-grid">
              <a href="#home" className="footer-link">
                <span className="link-icon">🏠</span>
                Home
              </a>
              <a href="#recipes" className="footer-link">
                <span className="link-icon">📖</span>
                Recipes
              </a>
              <a href="#nutrition" className="footer-link">
                <span className="link-icon">⚡</span>
                Nutrition
              </a>
              <a href="#blog" className="footer-link">
                <span className="link-icon">✍️</span>
                Blog
              </a>
            </div>
          </div>

          {/* Contact section */}
          <div className="footer-contact-section">
            <h4 className="links-title">Get In Touch</h4>
            <div className="contact-methods">
              <a href="https://wa.me/919172716786" className="contact-link" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon whatsapp">📱</div>
                <div className="contact-info">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-detail">+91 9172716786</span>
                </div>
              </a>
              <a href="mailto:info@bagiyah.com" className="contact-link">
                <div className="contact-icon email">✉️</div>
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <span className="contact-detail">info@bagiyah.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="links-title">Stay Updated</h4>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <span>Subscribe</span>
                <div className="btn-arrow">→</div>
              </button>
            </div>
            <p className="newsletter-text">
              Get weekly healthy recipes and nutrition tips
            </p>
          </div>
        </div>

        {/* Bottom section */}
        {/* <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <div className="social-bg"></div>
              <span className="social-emoji">📸</span>
              <span className="social-tooltip">Instagram</span>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <div className="social-bg"></div>
              <span className="social-emoji">🐦</span>
              <span className="social-tooltip">Twitter</span>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <div className="social-bg"></div>
              <span className="social-emoji">👍</span>
              <span className="social-tooltip">Facebook</span>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <div className="social-bg"></div>
              <span className="social-emoji">📺</span>
              <span className="social-tooltip">YouTube</span>
            </a>
          </div>

          <div className="footer-meta">
            <div className="footer-copy">
              &copy; {new Date().getFullYear()} Bagiyah. All rights reserved.
            </div>
            <div className="footer-time">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="footer-legal">
              <a href="#privacy" className="legal-link">Privacy Policy</a>
              <a href="#terms" className="legal-link">Terms of Service</a>
            </div>
          </div>
        </div> */}

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Bagiyah. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;