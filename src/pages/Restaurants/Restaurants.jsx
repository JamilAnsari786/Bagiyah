import React from "react";
import "./Restaurants.css";

const restaurants = [
  { 
    id: 1, 
    name: "Tasty Bites", 
    location: "Mumbai", 
    rating: 4.8,
    deliveryTime: "25-35 min",
    image: "🏪",
    cuisine: "Multi-cuisine",
    minOrder: 199
  },
  { 
    id: 2, 
    name: "Spice Heaven", 
    location: "Delhi", 
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "🌶️",
    cuisine: "North Indian",
    minOrder: 249
  },
  { 
    id: 3, 
    name: "Pizza Planet", 
    location: "Pune", 
    rating: 4.7,
    deliveryTime: "20-30 min",
    image: "🍕",
    cuisine: "Italian",
    minOrder: 299
  },
  { 
    id: 4, 
    name: "Sushi Master", 
    location: "Bangalore", 
    rating: 4.9,
    deliveryTime: "35-45 min",
    image: "🍣",
    cuisine: "Japanese",
    minOrder: 399
  },
  { 
    id: 5, 
    name: "Burger Hub", 
    location: "Chennai", 
    rating: 4.5,
    deliveryTime: "15-25 min",
    image: "🍔",
    cuisine: "Fast Food",
    minOrder: 149
  },
  { 
    id: 6, 
    name: "Dosa King", 
    location: "Hyderabad", 
    rating: 4.4,
    deliveryTime: "20-30 min",
    image: "🥘",
    cuisine: "South Indian",
    minOrder: 179
  }
];

const Restaurants = () => {
  return (
    <section id="restaurants" className="restaurants-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Restaurants</h2>
          <p className="section-subtitle">Partner restaurants delivering amazing food</p>
        </div>

        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image">
                <span className="restaurant-emoji">{restaurant.image}</span>
                <div className="restaurant-rating">
                  ⭐ {restaurant.rating}
                </div>
              </div>
              
              <div className="restaurant-content">
                <div className="restaurant-header">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <span className="cuisine-type">{restaurant.cuisine}</span>
                </div>
                
                <p className="restaurant-location">📍 {restaurant.location}</p>
                
                <div className="restaurant-info">
                  <div className="info-item">
                    <span className="info-label">Delivery</span>
                    <span className="info-value">{restaurant.deliveryTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Min Order</span>
                    <span className="info-value">₹{restaurant.minOrder}</span>
                  </div>
                </div>
                
                <button className="view-menu-btn">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Restaurants;