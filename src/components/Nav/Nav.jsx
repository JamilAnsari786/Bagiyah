import React, { useState, useEffect } from 'react';
import './nav.css';
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BiFoodMenu, BiMessageSquareDetail } from "react-icons/bi";
import { RiRestaurantLine } from "react-icons/ri";
import { useStore } from '../../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = ({ currentPage, setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { cart } = useStore();
  const cartCount = cart.length;

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: AiOutlineHome, label: 'Home' },
    { id: 'menu', icon: BiFoodMenu, label: 'Menu' },
    { id: 'cart', icon: AiOutlineShoppingCart, label: 'Cart', showBadge: true },
    { id: 'contact', icon: BiMessageSquareDetail, label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100 && !isHovered) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isHovered]);

  const handleNavClick = (pageId) => {
    if (pageId === 'cart') {
      navigate('/cart'); // ✅ navigate to cart page
      return;
    }

    // ✅ navigate back to home page for others
    if (location.pathname !== '/') navigate('/');

    setCurrentPage && setCurrentPage(pageId);
    const targetElement = document.getElementById(pageId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav 
      className={`navigation ${isVisible ? 'visible' : 'hidden'} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-glow"></div>
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive =
          (item.id === 'cart' && location.pathname === '/cart') ||
          (item.id !== 'cart' && location.pathname === '/' && currentPage === item.id);

        return (
          <button 
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-link ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            style={{ '--item-index': index }}
          >
            <div className="icon-container">
              <IconComponent className="nav-icon" />
              {isActive && <div className="active-glow"></div>}
              <div className="icon-hover-effect"></div>
            </div>
            
            {item.showBadge && cartCount > 0 && (
              <span className="cart-badge">
                <span className="badge-count">{cartCount}</span>
                <div className="badge-pulse"></div>
              </span>
            )}
            
            <span className="nav-tooltip">
              <span className="tooltip-text">{item.label}</span>
              <span className="tooltip-arrow"></span>
            </span>
            
            {isActive && (
              <div className="active-indicator">
                <div className="indicator-dot"></div>
              </div>
            )}
          </button>
        );
      })}
      <div className="nav-blob"></div>
    </nav>
  );
};

export default Nav;
