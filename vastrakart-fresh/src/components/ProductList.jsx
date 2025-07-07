import React from "react";
import products from "../data/products";
import { useStore } from "../context/StoreContext";

const ProductList = () => {
  const { addToCart, addToWishlist } = useStore();

  return (
    <section id="products">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              width="150"
              height="150"
            />
            <p>{product.name} - ₹{product.price}</p>
            <div className="button-row">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => addToWishlist(product)}>❤️</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;

