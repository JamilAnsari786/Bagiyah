import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const cardRefs = useRef([]);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      info: "info@bagiyah.com",
      description: "We'll respond within 24 hours",
      action: "mailto:info@bagiyah.com"
    },
    {
      icon: "📞",
      title: "Call Us",
      info: "+91 9172716786",
      description: "Mon-Sun, 8AM-11PM",
      action: "tel:+919172716786"
    },
    {
      icon: "📍",
      title: "Visit Us",
      info: "123 Food Street, Delhi",
      description: "India, 110001",
      action: "https://maps.google.com"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      info: "+91 9192716786",
      description: "Instant chat support",
      action: "https://wa.me/919172716786"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with form data
    const whatsappMessage = `
Hello Bagiyah! 

I'd like to get in touch with you:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

Looking forward to your response!
    `.trim();

    const whatsappUrl = `https://wa.me/919172716786?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp with the form data
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleContactMethodClick = (method) => {
    if (method.action.startsWith('http') || method.action.startsWith('mailto') || method.action.startsWith('tel')) {
      if (method.title === "WhatsApp") {
        const defaultMessage = `Hello Bagiyah! I'd like to get more information about your services.`;
        const whatsappUrl = `https://wa.me/919172716786?text=${encodeURIComponent(defaultMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.open(method.action, '_blank');
      }
    } else {
      alert(`Opening ${method.title}...`);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello Bagiyah! I'd like to get more information about your services.`;
    const whatsappUrl = `https://wa.me/919172716786?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="contact-page" ref={contactRef}>
      {/* Enhanced 3D Background Elements */}
      <div className="contact-bg-shapes">
        <div className="contact-shape shape-1"></div>
        <div className="contact-shape shape-2"></div>
        <div className="contact-shape shape-3"></div>
        <div className="contact-shape shape-4"></div>
      </div>

      <div className="container">
        <div className="section-header">
          {/* <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div> */}
          <h2 className="section-title">
            <span className="title-line">Get In Touch</span>
            <span className="title-line accent">With Bagiyah</span>
          </h2>
          <p className="section-subtitle">
            Have questions about our delicious Bagiyah pizzas? Fill out the form and 
            we'll connect you directly to our WhatsApp support team instantly!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-methods">
            <div className="methods-header">
              <h3 className="methods-title">Connect With Us</h3>
              <div className="methods-subtitle">Multiple ways to reach out</div>
            </div>
            
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className={`method-card ${method.title === "WhatsApp" ? 'whatsapp-highlight' : ''}`}
                  ref={addToCardRefs}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleContactMethodClick(method)}
                >
                  <div className="method-card-inner">
                    <div className={`method-icon ${method.title.toLowerCase().replace(' ', '-')}`}>
                      <span className="method-emoji">{method.icon}</span>
                      <div className="method-glow"></div>
                      {method.title === "WhatsApp" && (
                        <div className="whatsapp-pulse"></div>
                      )}
                    </div>
                    <div className="method-content">
                      <h4 className="method-title">{method.title}</h4>
                      <p className="method-info">{method.info}</p>
                      <span className="method-description">{method.description}</span>
                    </div>
                    <div className="method-arrow">
                      <span className="arrow-icon">→</span>
                    </div>
                  </div>
                  
                  {/* Enhanced 3D Edge Effects */}
                  <div className="card-edge edge-top"></div>
                  <div className="card-edge edge-right"></div>
                  <div className="card-edge edge-bottom"></div>
                  <div className="card-edge edge-left"></div>
                  
                  {/* Special WhatsApp gradient overlay */}
                  {method.title === "WhatsApp" && (
                    <div className="whatsapp-gradient"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Social Connect - Focus on WhatsApp */}
            <div className="social-connect">
              <div className="social-header">
                <h4 className="social-title">Quick WhatsApp Support</h4>
                <p className="social-subtitle">Instant help for orders & inquiries</p>
              </div>
              
              <div className="whatsapp-feature">
                <div className="whatsapp-card">
                  <div className="whatsapp-header">
                    <div className="whatsapp-icon">💬</div>
                    <div className="whatsapp-info">
                      <h5>WhatsApp Business</h5>
                      <span>Typically replies within minutes</span>
                    </div>
                    <div className="online-status">
                      <div className="status-dot"></div>
                      <span>Online Now</span>
                    </div>
                  </div>
                  
                  <div className="whatsapp-features">
                    <div className="feature-item">
                      <span className="feature-icon">⚡</span>
                      <span>Instant order tracking</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🎯</span>
                      <span>Quick issue resolution</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📸</span>
                      <span>Share photos of issues</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🕒</span>
                      <span>24/7 support available</span>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-whatsapp"
                    onClick={handleWhatsAppClick}
                  >
                    <span className="btn-icon">💬</span>
                    <span className="btn-text">Chat on WhatsApp</span>
                    <div className="btn-shine"></div>
                  </button>

                  <div className="whatsapp-note">
                    <span className="note-icon">💡</span>
                    <span>Click to start a conversation with our support team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <div className="form-header">
                <div className="form-icon">💬</div>
                <h3 className="form-title">Send Message via WhatsApp</h3>
                <p className="form-subtitle">Fill out the form and we'll open WhatsApp with your message</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <div className="input-container">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="form-input"
                        required
                      />
                      <div className="input-glow"></div>
                      <div className="input-border"></div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <div className="input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="form-input"
                        required
                      />
                      <div className="input-glow"></div>
                      <div className="input-border"></div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <div className="input-container">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Issue">Order Issue</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Catering Inquiry">Catering Inquiry</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="input-glow"></div>
                    <div className="input-border"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message *
                  </label>
                  <div className="input-container">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your Bagiyah experience or ask us anything..."
                      rows="6"
                      className="form-textarea"
                      required
                    ></textarea>
                    <div className="input-glow"></div>
                    <div className="input-border"></div>
                  </div>
                  <div className="form-character-count">
                    <span className={formData.message.length > 450 ? 'warning' : ''}>
                      {formData.message.length}/500 characters
                    </span>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-whatsapp submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="btn-content">
                    <span className="btn-icon">{isSubmitting ? '⏳' : '💬'}</span>
                    <span className="btn-text">
                      {isSubmitting ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
                    </span>
                  </span>
                  <div className="btn-shine"></div>
                  <div className="submit-spinner"></div>
                </button>

                <div className="form-note">
                  * Required fields. Your message will be sent directly to our WhatsApp support team.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h3 className="faq-title">Frequently Asked Questions</h3>
            <p className="faq-subtitle">Quick answers to common questions</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-icon">❓</div>
              <h4>How long does delivery take?</h4>
              <p>Delivery typically takes 30-45 minutes depending on your location and order volume.</p>
            </div>
            <div className="faq-item">
              <div className="faq-icon">💳</div>
              <h4>Do you offer refunds?</h4>
              <p>Yes, we offer refunds for orders that don't meet your satisfaction within 24 hours.</p>
            </div>
            <div className="faq-item">
              <div className="faq-icon">✏️</div>
              <h4>Can I modify my order?</h4>
              <p>You can modify your order within 5 minutes of placing it through the app or website.</p>
            </div>
            <div className="faq-item">
              <div className="faq-icon">🚚</div>
              <h4>Are there delivery fees?</h4>
              <p>Delivery is free on orders above ₹299. Below that, a ₹40 delivery fee applies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;