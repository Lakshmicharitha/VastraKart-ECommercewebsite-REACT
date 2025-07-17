// src/components/CartPage.jsx
import React, { useEffect } from "react";
import { useStore } from "../context/StoreContext";

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    setDirectBuyFromCart,
    setDirectBuyProduct,
  } = useStore();

  useEffect(() => {
    if (typeof window.renderCart === "function") {
      window.renderCart();
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.18).toFixed(2);
  const total = subtotal + tax;

  const handleBuyNowAll = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setDirectBuyFromCart(true);
    setDirectBuyProduct(null);
    window.location.hash = "#checkout";
  };

  if (cart.length === 0) {
    return <section id="cart"><h2>Your Cart</h2><p>No items in cart.</p></section>;
  }

  return (
    <section id="cart">
      <h2>Your Cart</h2>

      {/* For compatibility with script.js */}
      <div id="cart-items" style={{ display: "none" }}></div>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <p><strong>{item.name}</strong></p>
          <p>₹{item.price}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            style={{ width: "60px" }}
          />
          <button className="cart-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <p><strong>Subtotal:</strong> ₹{subtotal}</p>
      <p><strong>Tax (18%):</strong> ₹{tax}</p>
      <p><strong>Total:</strong> ₹{total}</p>
      <button onClick={handleBuyNowAll}>Buy Now</button>
    </section>
  );
};

export default CartPage;

