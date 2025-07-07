// src/components/WishlistPage.jsx
import React from "react";
import { useStore } from "../context/StoreContext";

const WishlistPage = () => {
  const {
    wishlist,
    addToCart,
    setDirectBuyProduct,
    setDirectBuyFromCart,
    removeFromWishlist,
  } = useStore();

  const handleBuyNow = (product) => {
    setDirectBuyProduct(product);
    setDirectBuyFromCart(false);
    window.location.hash = "#checkout";
  };

  if (wishlist.length === 0) {
    return <section id="wishlist"><h2>Your Wishlist</h2><p>No items in wishlist.</p></section>;
  }

  return (
    <section id="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <p><strong>{item.name}</strong> - ₹{item.price}</p>
          <button className="cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          <button className="buy-btn" onClick={() => handleBuyNow(item)} style={{ marginLeft: "0.5rem" }}>Buy Now</button>
          <button
            className="wishlist-btn"
            onClick={() => removeFromWishlist(item.id)}
            style={{ marginLeft: "0.5rem", background: "red", color: "white" }}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default WishlistPage;
