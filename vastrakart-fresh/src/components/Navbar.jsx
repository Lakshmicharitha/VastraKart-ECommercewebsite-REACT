// src/components/Navbar.jsx
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

const Navbar = () => {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const found = products.find((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        window.location.hash = "#products";
      } else {
        alert("Product not found.");
      }
    }
  };

  return (
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#wishlist">Wishlist</a>
      <a href="#cart">Cart</a>
      <input
        type="text"
        placeholder="Search your wish"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </nav>
  );
};

export default Navbar;
