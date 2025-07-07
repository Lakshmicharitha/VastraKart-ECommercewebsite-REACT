// src/App.js
import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import CheckoutForm from "./components/CheckoutForm";
import "./index.css";

const App = () => {
  const hash = window.location.hash;

  return (
    <div className="App">
      <h1>VastraKart</h1>
      <Navbar />

      {hash === "#cart" ? (
        <CartPage />
      ) : hash === "#wishlist" ? (
        <WishlistPage />
      ) : hash === "#checkout" ? (
        <CheckoutForm />
      ) : (
        <ProductList />
      )}
    </div>
  );
};

export default App;
