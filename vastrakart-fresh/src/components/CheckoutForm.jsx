import React, { useState, useRef } from "react";
import { useStore } from "../context/StoreContext";

const CheckoutForm = ({ onOrderPlaced }) => {
  const {
    cart,
    directBuyProduct,
    directBuyFromCart,
    setDirectBuyProduct,
    setDirectBuyFromCart,
  } = useStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Credit Card");

  // ✅ Ref for scrolling to order details
  const orderDetailsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const order = {
      name,
      phone,
      address,
      payment,
      items: [],
      total: 0,
    };

    if (directBuyFromCart && cart.length > 0) {
      order.items = [...cart];
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = +(subtotal * 0.18).toFixed(2);
      order.total = subtotal + tax;
    } else if (directBuyProduct) {
      order.items = [directBuyProduct];
      order.total = directBuyProduct.price;
    }

    // Pass data to App.js
    onOrderPlaced(order);

    // Reset form
    setDirectBuyFromCart(false);
    setDirectBuyProduct(null);
    setName("");
    setPhone("");
    setAddress("");
    setPayment("Credit Card");

    // ✅ Scroll to order details
    setTimeout(() => {
      orderDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="checkout">
      <h2>Cart to Cash</h2>

      {(directBuyFromCart && cart.length > 0) && (
        <div className="summary-box">
          <h4>Summary from Cart:</h4>
          {cart.map((item) => (
            <p key={item.id}>
              {item.name} x {item.quantity} = ₹{item.price * item.quantity}
            </p>
          ))}
        </div>
      )}

      {directBuyProduct && (
        <div className="summary-box">
          <h4>Direct Buy:</h4>
          <p>{directBuyProduct.name} = ₹{directBuyProduct.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Address (with pincode):</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>Payment Method:</label>
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option>Credit Card</option>
          <option>UPI</option>
          <option>Cash on Delivery</option>
        </select>

        <button type="submit">Place Order</button>
      </form>

      {/* ✅ Placeholder for order details to scroll into */}
      <div ref={orderDetailsRef}></div>
    </section>
  );
};

export default CheckoutForm;

