// src/components/ProductCard.jsx
import React from "react";
import { useStore } from "../context/StoreContext";

const ProductCard = ({ product }) => {
  const {
    addToCart,
    addToWishlist,
    setDirectBuyProduct,
    setDirectBuyFromCart,
  } = useStore();

  const handleBuyNow = () => {
    setDirectBuyProduct(product);
    setDirectBuyFromCart(false);
    window.location.hash = "#checkout";
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.name} - ₹{product.price}</p>

      <div className="button-row">
        <button className="cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button
          className="wishlist-btn"
          onClick={() => addToWishlist(product)}
        >
          ❤️
        </button>
      </div>

      <button className="buy-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
