import React, { useEffect, useRef } from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import bagiya from "../../assets/bagiya.jpg";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useStore();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const itemRefs = useRef([]);

  const deliveryFee = totalPrice > 299 ? 0 : 40;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + tax;

  // Navigate to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (cartRef.current) {
      observer.observe(cartRef.current);
    }

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [cart]);

  const addToItemRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name} x${item.quantity || 1} - ₹${
            item.totalPrice || item.price
          }`
      )
      .join("\n");

    return `Hello! I would like to place an order:\n\n${itemsList}\n\nSubtotal: ₹${totalPrice}\nDelivery Fee: ${
      deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`
    }\nTax: ₹${tax}\nTotal: ₹${finalTotal}\n\nPlease confirm my order.`;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.classList.add("processing");
    }

    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    const phoneNumber = "919172716786"; // Replace with your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");

      alert(
        `🎉 Order placed successfully!\n\nTotal: ₹${finalTotal}\nItems: ${totalItems}\nEstimated delivery: 30-45 minutes\n\nWe've opened WhatsApp to confirm your order.`
      );
      clearCart();
      if (checkoutBtn) {
        checkoutBtn.classList.remove("processing");
      }
      navigate("/");
    }, 2000);
  };

  const handleRemoveItem = (itemId, index) => {
    const itemElement = itemRefs.current[index];
    if (itemElement) {
      itemElement.classList.add("removing");
      setTimeout(() => {
        removeFromCart(itemId);
      }, 300);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleIncreaseQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      // If quantity is 1, find the index and remove with animation
      const index = cart.findIndex((item) => item.id === itemId);
      handleRemoveItem(itemId, index);
    }
  };

  const handleContinueShopping = () => {
    // Navigate to home page first, then scroll to menu section
    navigate("/");

    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleBrowseMenu = () => {
    // Navigate to home page first, then scroll to menu section
    navigate("/");

    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Group cart items by ID to avoid duplicates
  const cartItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      return acc; // Item already exists with proper quantity
    }
    return [...acc, item];
  }, []);

  return (
    <section className="cart-page" ref={cartRef}>
      {/* 3D Background Elements */}
      <div className="cart-bg-shapes">
        <div className="cart-shape shape-1"></div>
        <div className="cart-shape shape-2"></div>
        <div className="cart-shape shape-3"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-line">Your Shopping</span>
            <span className="title-line accent">Cart</span>
          </h2>
          <p className="section-subtitle">
            {cart.length === 0
              ? "Add some delicious items to get started!"
              : `Review your ${totalItems} item${
                  totalItems !== 1 ? "s" : ""
                } before checkout`}
          </p>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-illustration">
                <div className="cart-emoji">🛒</div>
                <div className="empty-glow"></div>
              </div>
              <h3>Your cart feels lonely</h3>
              <p>Add some delicious food from our menu to get started!</p>
              <button
                className="btn btn-primary browse-btn"
                onClick={handleBrowseMenu}
              >
                <span className="btn-icon">🍕</span>
                <span className="btn-text">Browse Menu</span>
                <div className="btn-shine"></div>
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items-section">
                <div className="section-header-mini">
                  <h3>Order Items ({totalItems})</h3>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    🗑️ Clear All
                  </button>
                </div>

                <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="cart-item"
                      ref={addToItemRefs}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="item-card">
                        <div className="item-image">
                          <div className="emoji-container">
                            <img
                              src={bagiya}
                              className="image-cartt"
                              alt={item.name}
                            />
                            <div className="emoji-glow"></div>
                          </div>
                          <div className="quantity-badge">
                            {item.quantity || 1}
                          </div>
                        </div>

                        <div className="item-details">
                          <div className="item-header">
                            <h4 className="item-name">{item.name}</h4>
                            <span className="item-category">
                              {item.category}
                            </span>
                          </div>
                          <p className="item-description">{item.description}</p>

                          {/* Quantity Controls */}
                          <div className="item-quantity">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn decrease"
                                onClick={() =>
                                  handleDecreaseQuantity(
                                    item.id,
                                    item.quantity || 1
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="quantity-display">
                                {item.quantity || 1}
                              </span>
                              <button
                                className="quantity-btn increase"
                                onClick={() =>
                                  handleIncreaseQuantity(
                                    item.id,
                                    item.quantity || 1
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <span className="item-total-price">
                              ₹{item.totalPrice || item.price}
                            </span>
                          </div>

                          <div className="item-footer">
                            <div className="item-rating">
                              <span className="stars">⭐ {item.rating}</span>
                              <span className="cook-time">
                                ⏱️ {item.cookTime}
                              </span>
                            </div>
                            <div className="item-actions">
                              <span className="item-price">
                                ₹{item.price} each
                              </span>
                              <button
                                className="remove-btn"
                                onClick={() => handleRemoveItem(item.id, index)}
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                <span className="remove-icon">🗑️</span>
                                Remove
                              </button>
                            </div>
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
              </div>

              <div className="cart-summary-section">
                <div className="summary-card">
                  <h3 className="summary-title">Order Summary</h3>

                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? "free" : ""}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Tax (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>

                  <div className="delivery-info">
                    <div className="info-item">
                      <span className="info-icon">⏱️</span>
                      <span>Delivery in 30-45 min</span>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🎁</span>
                      <span>Free delivery on orders above ₹299</span>
                    </div>
                  </div>

                  <div className="checkout-actions">
                    <button
                      className="btn btn-primary checkout-btn"
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      <span className="btn-icon">📱</span>
                      <span className="btn-text">Order via WhatsApp</span>
                      <span className="btn-price">₹{finalTotal}</span>
                      <div className="btn-shine"></div>
                      <div className="processing-spinner"></div>
                    </button>

                    <button
                      className="btn btn-secondary continue-btn"
                      onClick={handleContinueShopping}
                    >
                      <span className="btn-icon">←</span>
                      Continue Shopping
                    </button>
                  </div>
                </div>

                <div className="security-badge">
                  <div className="security-icon">🔒</div>
                  <div className="security-text">
                    <div className="security-title">Secure Checkout</div>
                    <div className="security-desc">
                      Your order is sent via WhatsApp for confirmation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
