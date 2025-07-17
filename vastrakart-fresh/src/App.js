// src/App.js
import './index.css';
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from 'react';
import { useStore } from './context/StoreContext';

const App = () => {
  const { cart, setCart, wishlist } = useStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    if (!name || !address || !pincode || !paymentMethod) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    setPlacedOrder({
      name,
      address,
      pincode,
      paymentMethod,
      items: cart,
      total: totalPrice
    });

    // Clear form and cart
    setName("");
    setAddress("");
    setPincode("");
    setPaymentMethod("");
    setCart([]);
    window.location.hash = "#products";
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/script.js`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Navbar />

      <section id="wishlist">
        <h2>Wishlist</h2>
        <div className="product-list">
          {wishlist.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="cart">
        <h2>Your Cart</h2>
        <div className="product-list">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="checkout-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <a href="#checkout" className="checkout-button">Proceed to Checkout</a>
          </div>
        )}
      </section>

      <section id="checkout">
        <h2>Checkout</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </section>

      {placedOrder && (
        <section id="order-summary">
          <h2>Order Placed Successfully!</h2>
          <p><strong>Name:</strong> {placedOrder.name}</p>
          <p><strong>Address:</strong> {placedOrder.address}</p>
          <p><strong>Pincode:</strong> {placedOrder.pincode}</p>
          <p><strong>Payment Method:</strong> {placedOrder.paymentMethod}</p>
          <h3>Ordered Items:</h3>
          <ul>
            {placedOrder.items.map((item, index) => (
              <li key={index}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
          <h3>Total: ₹{placedOrder.total}</h3>
        </section>
      )}
    </div>
  );
};

export default App;




