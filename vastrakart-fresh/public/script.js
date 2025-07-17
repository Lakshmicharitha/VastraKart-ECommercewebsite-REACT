// ====== VASTRAKART - FULL FEATURED JS (UPDATED) ======
let directBuyProduct = null;
let directBuyFromCart = false;


const products = [
  { id: 1, name: "Kurti Set", price: 999, category: "Women" },
  { id: 2, name: "Mens Shirt", price: 799, category: "Men" },
  { id: 3, name: "Kids Dress", price: 499, category: "Children" },
  { id: 4, name: "Saree", price: 1499, category: "Women" },
  { id: 5, name: "Lehenga", price: 2999, category: "Women" },
];

let cart = JSON.parse(localStorage.getItem("vastrakart-cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("vastrakart-wishlist")) || [];

function saveCart() {
  localStorage.setItem("vastrakart-cart", JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem("vastrakart-wishlist", JSON.stringify(wishlist));
}

// ====== ADD TO CART / WISHLIST HANDLERS ======
document.querySelectorAll(".product-card").forEach((card, index) => {
  const product = products[index];

  const addCartBtn = card.querySelector("button");
  const addWishlistBtn = document.createElement("button");
  const buyNowBtn = document.createElement("button");

  addWishlistBtn.innerText = "❤️";
  addWishlistBtn.title = "Add to Wishlist";
  addWishlistBtn.style.marginLeft = "0.5rem";

  buyNowBtn.innerText = "Buy Now";
  buyNowBtn.style.marginTop = "0.5rem";
  buyNowBtn.style.marginLeft = "0.5rem";

  // Create a row div for Add to Cart + Heart
const btnRow = document.createElement("div");
btnRow.className = "button-row";

// Add classes to style the buttons
addCartBtn.classList.add("cart-btn");
addWishlistBtn.classList.add("wishlist-btn");
buyNowBtn.classList.add("buy-btn");

// Place Add to Cart + Heart in one row
btnRow.appendChild(addCartBtn);
btnRow.appendChild(addWishlistBtn);
card.appendChild(btnRow);

// Add Buy Now button below
card.appendChild(buyNowBtn);


  addCartBtn.addEventListener("click", () => {
    addToCart(product);
    scrollToSection("cart");
  });

  buyNowBtn.addEventListener("click", () => {
  directBuyProduct = product;
  directBuyFromCart = false;
  renderDirectBuyForm();
  scrollToSection("carttocash");
  });

  addWishlistBtn.addEventListener("click", () => {
    if (!wishlist.some(p => p.id === product.id)) {
      wishlist.push(product);
      saveWishlist();
      renderWishlist();
      scrollToSection("wishlist");
    } else {
      alert("Already in wishlist");
    }
  });
});

function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
}

// ===== SEARCH ON ENTER ONLY =====
const searchInput = document.querySelector("nav input[type='text']");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    let found = false;
    productCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
        found = true;
      } else {
        card.style.display = "none";
      }
    });
    scrollToSection("products"); // Always scroll even if not found
  }
});

// ===== SCROLL TO SECTION =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===== SORT PRODUCTS =====
function sortProducts(order = "asc") {
  const grid = document.querySelector(".product-grid");
  const cards = Array.from(grid.children);
  cards.sort((a, b) => {
    const priceA = parseInt(a.querySelector("p").innerText.replace(/[^\d]/g, ""));
    const priceB = parseInt(b.querySelector("p").innerText.replace(/[^\d]/g, ""));
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
  cards.forEach(card => grid.appendChild(card));
}

// ===== RENDER CART =====
function renderCart() {
  const cartSection = document.getElementById("cart");
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartSection.style.display = "none";
    updateTotals();
    return;
  }

  cartSection.style.display = "block";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.padding = "1rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
    <p><strong>${item.name}</strong></p>
    <p>Price: ₹${item.price}</p>
    <label>Qty: 
    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input" style="width:60px" />
    </label>
    <button data-index="${index}" class="remove-btn cart-btn" style="margin-left:1rem;">Remove</button>
`   ;
    cartItemsDiv.appendChild(div);
  });

  updateTotals();
  setupQtyListeners();
  setupRemoveListeners();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.18).toFixed(2);
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("tax").innerText = tax;
  document.getElementById("total").innerText = total;
}

function setupQtyListeners() {
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", () => {
      const index = input.dataset.index;
      const newQty = parseInt(input.value);
      if (newQty > 0) {
        cart[index].quantity = newQty;
        saveCart();
        renderCart();
      }
    });
  });
}

function setupRemoveListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

function renderWishlist() {
  const wishlistSection = document.getElementById("wishlist");
  const div = wishlistSection.querySelector(".wishlist-items");
  div.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistSection.style.display = "none";
    return;
  }
  wishlistSection.style.display = "block";

  wishlist.forEach((item, index) => {
    const container = document.createElement("div");
    container.style.border = "1px dashed #999";
    container.style.marginBottom = "1rem";
    container.style.padding = "1rem";
    container.innerHTML = `
    <p><strong>${item.name}</strong> - ₹${item.price}</p>
    <button class="wishlist-btn" onclick="addToCart(products.find(p => p.id === ${item.id}))">Add to Cart</button>
    <button class="wishlist-btn" onclick="buyNowFromWishlist(${item.id})" style="margin-left: 0.5rem;">Buy Now</button>
    <button class="wishlist-btn" onclick="removeFromWishlist(${index})" style="margin-left: 0.5rem;background:red;">Remove</button>
`   ;
    div.appendChild(container);
  });
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  saveWishlist();
  renderWishlist();
}
function buyNowFromWishlist(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    directBuyProduct = product;
    directBuyFromCart = false;
    renderDirectBuyForm();
    scrollToSection("carttocash");
  }
}
// ===== FORM VALIDATION =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !address || !payment) {
      alert("Please fill in all required fields.");
      return;
    }

    let summary = "Order Summary:\n";

    if (directBuyFromCart && cart.length > 0) {
      cart.forEach(item => {
        summary += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
      });
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = +(subtotal * 0.18).toFixed(2);
      const total = subtotal + tax;
      summary += `\nSubtotal: ₹${subtotal}\nTax: ₹${tax}\nTotal: ₹${total}`;
    } else if (directBuyProduct) {
      summary += `${directBuyProduct.name} = ₹${directBuyProduct.price}\n`;
      summary += `\nTotal: ₹${directBuyProduct.price}`;
    } else {
      summary += "No product selected for order.";
    }

    alert(`Thank you, ${name}!\nYour order has been placed.\n\n${summary}`);

    cart = [];
    saveCart();
    renderCart();
    directBuyProduct = null;
    directBuyFromCart = false;
    const summaryDiv = document.getElementById("direct-buy-summary");
    if (summaryDiv) summaryDiv.remove();
    form.reset();
  });
});

function buyNowAll() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  directBuyFromCart = true;
  directBuyProduct = null;
  renderDirectBuyForm();
  scrollToSection("carttocash");
}

function redirectToPlaceOrder() {
  if (cart.length > 0) {
    scrollToSection("carttocash");
  } else {
    alert("Cart is empty. Add items first.");
  }
}

function renderDirectBuyForm() {
  const formSection = document.getElementById("carttocash");
  let summary = document.getElementById("direct-buy-summary");

  if (!summary) {
    summary = document.createElement("div");
    summary.id = "direct-buy-summary";
    summary.style.marginBottom = "1.5rem";
    summary.style.background = "#ffffff";
    summary.style.padding = "1rem";
    summary.style.borderRadius = "12px";
    summary.style.boxShadow = "0 5px 10px var(--shadow)";
    formSection.insertBefore(summary, formSection.querySelector("form"));
  }

  if (directBuyFromCart && cart.length > 0) {
    let total = 0;
    let html = "<p><strong>Products in Cart:</strong></p><ul>";
    cart.forEach(item => {
      html += `<li>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</li>`;
      total += item.price * item.quantity;
    });
    const tax = +(total * 0.18).toFixed(2);
    const grandTotal = total + tax;
    html += `</ul><p><strong>Subtotal:</strong> ₹${total}</p><p><strong>Tax (18%):</strong> ₹${tax}</p><p><strong>Total:</strong> ₹${grandTotal}</p>`;
    summary.innerHTML = html;
  } else if (directBuyProduct) {
    summary.innerHTML = `
      <p><strong>Product:</strong> ${directBuyProduct.name}</p>
      <p><strong>Price:</strong> ₹${directBuyProduct.price}</p>
    `;
  } else {
    summary.innerHTML = `<p>No product selected for direct purchase.</p>`;
  }
}



// ===== INITIALIZE =====
renderCart();
document.getElementById("buy-now-all").addEventListener("click", () => {
  directBuyFromCart = true;
  directBuyProduct = null;
  renderDirectBuyForm();
  scrollToSection("carttocash");
});

renderWishlist();