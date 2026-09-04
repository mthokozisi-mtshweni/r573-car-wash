const menuItems = {
  Shisanyama: [
    ["Beef Steak", 85, "Grilled to perfection with special seasoning"],
    ["Chicken Braai", 65, "Juicy chicken pieces with homemade sauce"],
    ["Pork Chops", 75, "Tender pork chops with BBQ glaze"],
    ["Boerewors Roll", 45, "Traditional South African sausage roll"]
  ],
  Drinks: [["Craft Beer", 35, "Local brews on tap"], ["House Wine", 45, "Red or white, by the glass"], ["Cocktails", 55, "Signature R573 cocktails"], ["Soft Drinks", 20, "Cold refreshments"]],
  Sides: [["Pap & Sheba", 30, "Traditional South African staple"], ["Garlic Bread", 25, "Freshly baked with garlic butter"], ["Green Salad", 35, "Fresh garden salad with dressing"], ["Chips", 20, "Golden crispy fries"]]
};

const formatMoney = value => `R${value.toFixed(2)}`;

function initNavigation() {
  const toggle = document.querySelector("#mobileToggle");
  const mobile = document.querySelector("#mobileMenu");
  if (!toggle || !mobile) return;
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.textContent = open ? "×" : "☰";
    toggle.setAttribute("aria-expanded", String(open));
  });
  mobile.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mobile.classList.remove("open");
    toggle.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initMenu() {
  const grid = document.querySelector("#menuGrid");
  if (!grid) return;
  const draw = category => {
    grid.innerHTML = menuItems[category].map(item => `<article class="menu-item reveal"><div class="menu-item-top"><h4>${item[0]}</h4><span class="price">${formatMoney(item[1])}</span></div><div class="stars" aria-label="5 stars">★★★★★</div><p>${item[2]}</p></article>`).join("");
  };
  draw("Shisanyama");
  document.querySelectorAll(".menu-tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".menu-tab").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    draw(tab.dataset.tab);
  }));
}

function initGalleryFilters() {
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".gallery-card").forEach(card => { card.hidden = filter !== "all" && card.dataset.category !== filter; });
  }));
}

function initBooking() {
  const form = document.querySelector("#bookingForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = {
      name: document.querySelector("#name").value,
      vehicle: document.querySelector("#vehicle").value,
      vehicleType: document.querySelector("#vehicleType").value,
      vehicleModel: document.querySelector("#vehicleModel").value,
      vehicleColour: document.querySelector("#vehicleColour").value,
      service: document.querySelector("#service").value,
      date: document.querySelector("#date").value,
      time: document.querySelector("#time").value
    };
    const bookings = JSON.parse(localStorage.getItem("r573Bookings") || "[]");
    bookings.push({ ...data, bookingNumber: `R573-${Date.now().toString().slice(-6)}`, status: "Confirmed" });
    localStorage.setItem("r573Bookings", JSON.stringify(bookings));
    const customerData = JSON.parse(localStorage.getItem("r573CustomerData") || '{"bookings":[],"orders":[],"tickets":[],"notifications":[]}');
    customerData.bookings = bookings;
    customerData.notifications.unshift({ text: `Your ${data.service} booking is confirmed.`, date: "Just now", read: false });
    localStorage.setItem("r573CustomerData", JSON.stringify(customerData));
    sessionStorage.setItem("r573Booking", JSON.stringify(data));
    window.location.href = "queuemaster/index.html";
  });
}

function initContact() {
  const form = document.querySelector("#contactForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#contactName").value.trim();
    const email = document.querySelector("#contactEmail").value.trim();
    const subjectText = document.querySelector("#contactSubject").value.trim();
    const message = document.querySelector("#contactMessage").value.trim();
    const subject = encodeURIComponent(`${subjectText} - R573 enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@r573.co.za?subject=${subject}&body=${body}`;
    document.querySelector("#contactStatus").textContent = "Your email draft is ready. Send it from your email app to contact R573.";
  });
}

function initFoodOrdering() {
  const grid = document.querySelector("#orderGrid");
  if (!grid) return;
  const products = [
    { name: "R573 Mixed Grill", price: 180, description: "Beef steak, chicken, boerewors, pap and chakalaka.", category: "grill", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85", rating: "4.9" },
    { name: "Chicken Braai", price: 65, description: "Juicy flame-grilled chicken with R573 sauce.", category: "chicken", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=900&q=85", rating: "4.8" },
    { name: "Beef Steak", price: 85, description: "Tender, seasoned steak straight from the grill.", category: "grill", image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=900&q=85", rating: "4.8" },
    { name: "Boerewors Roll", price: 45, description: "South African boerewors, fresh roll and relish.", category: "grill", image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?w=900&q=85", rating: "4.7" },
    { name: "Pap & Sheba", price: 30, description: "Traditional pap with rich tomato relish.", category: "sides", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900&q=85", rating: "4.7" },
    { name: "Golden Chips", price: 20, description: "Crispy, seasoned chips made to order.", category: "sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&q=85", rating: "4.6" },
    { name: "R573 Soft Drink", price: 20, description: "Chilled refreshment to complete your plate.", category: "drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=85", rating: "4.5" }
  ];
  let cart = JSON.parse(localStorage.getItem("r573Cart") || "[]");
  const modal = document.querySelector("#foodModal");
  const modalContent = document.querySelector("#foodModalContent");
  let selectedProduct = null;
  const addToCart = (product, quantity = 1, extras = []) => {
    const extraTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    const name = extras.length ? `${product.name} (${extras.map(extra => extra.name).join(", ")})` : product.name;
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += quantity; else cart.push({ ...product, name, price: product.price + extraTotal, quantity });
    update();
  };
  const renderProducts = () => {
    const query = (document.querySelector("#foodSearch")?.value || "").trim().toLowerCase();
    const category = document.querySelector(".food-categories .active")?.dataset.foodFilter || "all";
    grid.innerHTML = products.map((product, index) => ({ product, index })).filter(({ product }) => (category === "all" || product.category === category) && (!query || `${product.name} ${product.description}`.toLowerCase().includes(query))).map(({ product, index }) => `<article class="food-card order-product"><button class="food-card-image" data-details="${index}" aria-label="View ${product.name} details"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="food-rating">★ ${product.rating}</span></button><div class="food-card-body"><div class="menu-item-top"><h3>${product.name}</h3><span class="price">${formatMoney(product.price)}</span></div><p>${product.description}</p><div class="food-card-footer"><span class="availability">● Available</span><button class="button button-primary add" data-index="${index}">+ Add</button></div></div></article>`).join("") || `<p class="empty-state">No results found. Try searching for something else.</p>`;
    document.querySelectorAll(".add").forEach(button => button.addEventListener("click", () => {
      addToCart(products[Number(button.dataset.index)]);
    }));
    document.querySelectorAll("[data-details]").forEach(button => button.addEventListener("click", () => openDetails(products[Number(button.dataset.details)])));
  };
  renderProducts();
  const openDetails = product => {
    selectedProduct = product;
    modalContent.innerHTML = `<img class="food-detail-image" src="${product.image}" alt="${product.name}"><span class="section-label">R573 FOOD COUNTER</span><h2>${product.name}</h2><p>${product.description}</p><div class="food-detail-rating">★ ${product.rating} · Available</div><div class="food-extras"><strong>Choose extras</strong><label><input type="checkbox" data-extra-name="Extra meat" data-extra-price="40"> Extra meat <span>+R40</span></label><label><input type="checkbox" data-extra-name="Extra pap" data-extra-price="15"> Extra pap <span>+R15</span></label><label><input type="checkbox" data-extra-name="Extra sauce" data-extra-price="10"> Extra sauce <span>+R10</span></label></div><div class="detail-actions"><div class="quantity-control"><button data-quantity="-1" aria-label="Decrease quantity">−</button><strong id="detailQuantity">1</strong><button data-quantity="1" aria-label="Increase quantity">+</button></div><button class="button button-primary" id="detailAdd">Add to order <span id="detailPrice">${formatMoney(product.price)}</span></button></div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    let quantity = 1;
    const price = () => product.price + [...modal.querySelectorAll("[data-extra-name]:checked")].reduce((sum, input) => sum + Number(input.dataset.extraPrice), 0);
    const updateDetail = () => { modal.querySelector("#detailQuantity").textContent = quantity; modal.querySelector("#detailPrice").textContent = formatMoney(price() * quantity); };
    modal.querySelectorAll("[data-quantity]").forEach(button => button.addEventListener("click", () => { quantity = Math.max(1, quantity + Number(button.dataset.quantity)); updateDetail(); }));
    modal.querySelectorAll("[data-extra-name]").forEach(input => input.addEventListener("change", updateDetail));
    modal.querySelector("#detailAdd").addEventListener("click", () => { addToCart(product, quantity, [...modal.querySelectorAll("[data-extra-name]:checked")].map(input => ({ name: input.dataset.extraName, price: Number(input.dataset.extraPrice) }))); closeDetails(); });
  };
  const closeDetails = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); };
  document.querySelector("#foodModalClose").addEventListener("click", closeDetails);
  modal.addEventListener("click", event => { if (event.target === modal) closeDetails(); });
  const update = () => {
    localStorage.setItem("r573Cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#cartCount").textContent = itemCount;
    document.querySelector("#cartCountPanel").textContent = itemCount;
    document.querySelector("#cartTotal").textContent = formatMoney(total);
    const navTotal = document.querySelector("#cartTotalNav");
    if (navTotal) navTotal.textContent = formatMoney(total);
    document.querySelector("#orderItems").innerHTML = cart.length ? cart.map((item, index) => `<div class="order-line"><span>${item.name} × ${item.quantity}</span><b>${formatMoney(item.price * item.quantity)} <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">×</button></b></div>`).join("") : "<p>Your cart is empty.</p>";
    document.querySelectorAll(".remove-item").forEach(button => button.addEventListener("click", () => { cart.splice(Number(button.dataset.index), 1); update(); }));
  };
  const search = document.querySelector("#foodSearch");
  if (search) search.addEventListener("input", renderProducts);
  document.querySelectorAll("[data-food-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-food-filter]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts();
  }));
  document.querySelector("#checkout").addEventListener("click", () => {
    if (!cart.length) return alert("Add at least one item before checkout.");
    const orderNumber = `R573-${Date.now().toString().slice(-6)}`;
    sessionStorage.setItem("r573Order", JSON.stringify({ orderNumber, items: cart }));
    const customerData = JSON.parse(localStorage.getItem("r573CustomerData") || '{"bookings":[],"orders":[],"tickets":[],"notifications":[]}');
    customerData.orders = [{ id: orderNumber, items: cart.map(item => `${item.name} × ${item.quantity}`).join(" · "), date: "Just now", total: formatMoney(cart.reduce((sum, item) => sum + item.price * item.quantity, 0)), status: "Processing" }, ...customerData.orders];
    customerData.notifications.unshift({ text: `Food order ${orderNumber} has been accepted.`, date: "Just now", read: false });
    localStorage.setItem("r573CustomerData", JSON.stringify(customerData));
    cart = [];
    update();
    alert(`Order ${orderNumber} confirmed. This demo is ready to connect to payments.`);
  });
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initMenu();
  initGalleryFilters();
  initBooking();
  initContact();
  initFoodOrdering();
});
