import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import bagiyaa from '../../assets/bagiya.jpg';
import "./Menu.css";

const menuItems = [
  { 
    id: 1, 
    name: "Bagiyah", 
    price: 299, 
    image: bagiyaa,
    description: "A traditional Indian dish made with fresh vegetables and spices, wrapped in a banana leaf and steamed to perfection.",
    category: "Special",
    rating: 4.8,
    cookTime: "20-25 min",
    popular: true
  }
];

const Menu = () => {
  const { addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const menuRef = useRef(null);
  const cardRefs = useRef([]);

  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

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

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const handleAddToCart = (item, event) => {
    addToCart(item);
    
    // Add animation effect
    const button = event.currentTarget;
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 600);
  };

  return (
    <section id="menu" className="menu-section" ref={menuRef}>
      <div className="container">
        {/* 3D Background Elements */}
        <div className="menu-bg-shapes">
          <div className="menu-shape shape-1"></div>
          <div className="menu-shape shape-2"></div>
          <div className="menu-shape shape-3"></div>
        </div>

        <div className="section-header">
          <h2 className="section-title">
            <span className="title-line">Our Delicious</span>
            <span className="title-line accent">Menu</span>
          </h2>
          <p className="section-subtitle">
            Fresh ingredients, amazing flavors, delivered fast
          </p>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button 
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="filter-text">{category}</span>
              <span className="filter-dot"></span>
            </button>
          ))}
        </div>

        <div className="menu-stats">
          <div className="stat-item">
            <div className="stat-number">{filteredItems.length}</div>
            <div className="stat-label">Items</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {filteredItems.length > 0 ? Math.max(...filteredItems.map(item => item.rating)) : 0}
            </div>
            <div className="stat-label">Top Rated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {categories.length - 1}
            </div>
            <div className="stat-label">Categories</div>
          </div>
        </div>

        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="menu-card"
              ref={addToCardRefs}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-inner">
                <div className="card-image">
                  <div className="image-container">
                    <img src={item.image} alt={item.name} className="food-image" />
                    <div className="image-glow"></div>
                  </div>
                  
                  <div className="card-badges">
                    <div className="card-badge category-badge">{item.category}</div>
                    {item.popular && (
                      <div className="card-badge popular-badge">
                        <span className="fire">🔥</span>
                        Popular
                      </div>
                    )}
                    <div className="card-badge time-badge">{item.cookTime}</div>
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="rating">
                      <div className="stars">
                        {"⭐".repeat(Math.floor(item.rating))}
                        <span className="rating-value">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="item-description">{item.description}</p>
                  
                  <div className="card-footer">
                    <div className="price-section">
                      <span className="price">₹{item.price}</span>
                      <span className="price-note">Inclusive of all taxes</span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(item, e)}
                    >
                      <span className="btn-icon">🛒</span>
                      <span className="btn-text">Add to Cart</span>
                      <div className="btn-shine"></div>
                    </button>
                  </div>
                </div>

                {/* 3D Edge Effects */}
                <div className="card-edge edge-top"></div>
                <div className="card-edge edge-right"></div>
                <div className="card-edge edge-bottom"></div>
                <div className="card-edge edge-left"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-emoji">🍽️</div>
            <h3>No items found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;