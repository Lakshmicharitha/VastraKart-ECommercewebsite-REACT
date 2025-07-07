// src/App.js
import './index.css';
import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import CheckoutForm from "./components/CheckoutForm";
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/script.js"; // must be in public folder
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <h1>VastraKart</h1>

      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#carttocash">Cart to Cash</a>
        <a href="#wishlist" onClick={() => window.scrollTo(0, document.getElementById('wishlist').offsetTop)}>
          <img src="/wishlist.png" alt="Wishlist" /> Wishlist
        </a>
        <a href="#cart" onClick={() => {
          if (window.renderCart) window.renderCart();
          window.scrollTo(0, document.getElementById('cart').offsetTop);
        }}>
          <img src="/addtocart.png" alt="Cart" /> Cart
        </a>
        <input type="text" placeholder="Search your wish" />
      </nav>

      <section id="home">
        <h2>Categories</h2>
        <div className="categories">
          <button>New Arrivals</button>
          <button>On Sale</button>
          <button>Women</button>
          <button>Men</button>
          <button>Children</button>
        </div>

        <div className="featured-images">
          <img src="/picture1.jpg" alt="Fashions for Women" />
          <img src="/picture2.jpg" alt="Fashions for Men" />
          <img src="/picture3.jpg" alt="Traditionals for all" />
          <img src="/picture4.jpg" alt="Fashions for Children" />
        </div>
      </section>

      <section id="products">
        <h2>Our Products</h2>

        <div className="sort-controls">
          <button onClick={() => window.sortProducts && window.sortProducts('asc')}>Sort Price ↑</button>
          <button onClick={() => window.sortProducts && window.sortProducts('desc')}>Sort Price ↓</button>
        </div>

        <div className="product-grid">
          <div className="product-card">
            <a href="kurti.html">
              <img src="/kurti.jpg" alt="Kurti Set" />
              <p>Kurti Set - ₹999</p>
            </a>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <a href="shirt.html">
              <img src="/shirt.jpg" alt="Men’s Shirt" />
              <p>Mens Shirt - ₹799</p>
            </a>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <a href="kidsdress.html">
              <img src="/kidsdress.jpg" alt="Kids Dress" />
              <p>Kids Dress - ₹499</p>
            </a>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <a href="saree.html">
              <img src="/saree.jpg" alt="Saree" />
              <p>Saree - ₹1499</p>
            </a>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <a href="lehenga.html">
              <img src="/lehenga.jpg" alt="Lehenga" />
              <p>Lehenga - ₹2999</p>
            </a>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      <section id="carttocash">
        <h2>Cart to Cash</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />

          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />

          <label htmlFor="address">Address (Must Include Pincode):</label>
          <textarea id="address" rows="4" required></textarea>

          <label htmlFor="payment">Payment Method:</label>
          <select id="payment">
            <option>Credit Card</option>
            <option>UPI</option>
            <option>Cash on Delivery</option>
          </select>

          <button type="submit">Place Order</button>
        </form>
      </section>

      <section id="wishlist" style={{ display: 'none' }}>
        <h2>Your Wishlist</h2>
        <div className="wishlist-items"></div>
      </section>

      <section id="cart" style={{ display: 'none' }}>
        <h2>Your Cart</h2>
        <div id="cart-items"></div>
        <p><strong>Subtotal:</strong> ₹<span id="subtotal">0</span></p>
        <p><strong>Tax (18%):</strong> ₹<span id="tax">0</span></p>
        <p><strong>Total:</strong> ₹<span id="total">0</span></p>
        <button id="buy-now-all" onClick={() => window.buyNowAll && window.buyNowAll()}>Buy Now</button>
      </section>
    </div>
  );
};

export default App;

