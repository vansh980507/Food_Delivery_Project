// ===== LOCATION DROPDOWN =====
const nearbyAreas = [
  { name: "Connaught Place",   sub: "New Delhi",        dist: "1.2 km", icon: "🏙️" },
  { name: "Karol Bagh",        sub: "New Delhi",        dist: "3.4 km", icon: "🛍️" },
  { name: "Lajpat Nagar",      sub: "South Delhi",      dist: "5.1 km", icon: "🏘️" },
  { name: "Saket",             sub: "South Delhi",      dist: "6.8 km", icon: "🏬" },
  { name: "Dwarka",            sub: "West Delhi",       dist: "14 km",  icon: "🏗️" },
  { name: "Rohini",            sub: "North Delhi",      dist: "16 km",  icon: "🌳" },
  { name: "Noida Sector 18",   sub: "Noida, UP",        dist: "18 km",  icon: "🏢" },
  { name: "Gurgaon Sector 29", sub: "Gurgaon, Haryana", dist: "22 km",  icon: "🌆" },
  { name: "Vasant Kunj",       sub: "South Delhi",      dist: "9.3 km", icon: "🌿" },
  { name: "Janakpuri",         sub: "West Delhi",       dist: "11 km",  icon: "🏡" },
  { name: "Pitampura",         sub: "North Delhi",      dist: "13 km",  icon: "🏫" },
  { name: "Greater Kailash",   sub: "South Delhi",      dist: "7.5 km", icon: "🌸" },
  { name: "Nehru Place",       sub: "South Delhi",      dist: "8.2 km", icon: "💻" },
  { name: "Rajouri Garden",    sub: "West Delhi",       dist: "10 km",  icon: "🌺" },
  { name: "Faridabad",         sub: "Haryana",          dist: "28 km",  icon: "🏭" },
];

let selectedArea = "New Delhi";
let locOpen = false;

function renderAreaList(list) {
  const ul = document.getElementById("loc-list");
  ul.innerHTML = "";
  list.forEach(area => {
    const li = document.createElement("li");
    if (area.name === selectedArea) li.classList.add("active-area");
    li.innerHTML = `
      <div class="loc-area-icon">${area.icon}</div>
      <div class="loc-area-info">
        <div class="loc-area-name">${area.name}</div>
        <div class="loc-area-sub">${area.sub}</div>
      </div>
      <span class="loc-area-dist">${area.dist}</span>
    `;
    li.onclick = () => selectArea(area.name);
    ul.appendChild(li);
  });
}

function filterAreas(query) {
  const q = query.toLowerCase();
  const filtered = q
    ? nearbyAreas.filter(a => a.name.toLowerCase().includes(q) || a.sub.toLowerCase().includes(q))
    : nearbyAreas;
  renderAreaList(filtered);
}

function selectArea(name) {
  selectedArea = name;
  document.getElementById("loc-city-text").innerHTML = `${name} <span class="loc-arrow">▾</span>`;
  closeLocationDropdown();
  showToast(`📍 Delivery location set to ${name}`);
}

function toggleLocationDropdown() {
  const dd = document.getElementById("loc-dropdown");
  locOpen = !locOpen;
  if (locOpen) {
    dd.classList.remove("hidden");
    document.getElementById("loc-search").value = "";
    renderAreaList(nearbyAreas);
    setTimeout(() => document.getElementById("loc-search").focus(), 100);
  } else {
    dd.classList.add("hidden");
  }
}

function closeLocationDropdown() {
  document.getElementById("loc-dropdown").classList.add("hidden");
  locOpen = false;
}

function detectLocation() {
  const btn = document.querySelector(".loc-detect-btn");
  btn.textContent = "⏳ Detecting...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => {
        selectArea("Current Location");
        btn.textContent = "🎯 Detect";
      },
      () => {
        showToast("❌ Location access denied");
        btn.textContent = "🎯 Detect";
      }
    );
  } else {
    showToast("❌ Geolocation not supported");
    btn.textContent = "🎯 Detect";
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const picker = document.getElementById("loc-picker");
  const dd = document.getElementById("loc-dropdown");
  if (locOpen && !picker.contains(e.target) && !dd.contains(e.target)) {
    closeLocationDropdown();
  }
});

// ===== FOOD DATA =====
const foodItems = [
  // Italian
  { id: 1,  name: "Margherita Pizza",    emoji: "🍕", price: 299, category: "italian",   desc: "Classic tomato, mozzarella & fresh basil",              img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",  veg: true,  discount: "20% OFF" },
  { id: 2,  name: "Pepperoni Pizza",     emoji: "🍕", price: 349, category: "italian",   desc: "Loaded with spicy pepperoni & melted cheese",           img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80", veg: false, discount: "" },
  { id: 3,  name: "Creamy Pasta",        emoji: "🍝", price: 199, category: "italian",   desc: "Penne in rich alfredo cream sauce",                     img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80", veg: true,  discount: "" },
  { id: 4,  name: "Spaghetti Bolognese", emoji: "🍝", price: 229, category: "italian",   desc: "Classic meat sauce over al dente spaghetti",            img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80",  veg: false, discount: "15% OFF" },
  { id: 5,  name: "Lasagna",             emoji: "🫕", price: 279, category: "italian",   desc: "Layered pasta with beef, béchamel & cheese",            img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80", veg: false, discount: "" },
  { id: 6,  name: "Garlic Bread",        emoji: "🥖", price: 89,  category: "italian",   desc: "Toasted baguette with garlic butter & herbs",           img: "https://images.unsplash.com/photo-1619531040576-f9416740661e?w=400&q=80", veg: true,  discount: "" },

  // Fast Food
  { id: 7,  name: "Cheese Burger",       emoji: "🍔", price: 149, category: "fast food", desc: "Juicy beef patty with cheddar & pickles",               img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", veg: false, discount: "10% OFF" },
  { id: 8,  name: "Double Smash Burger", emoji: "🍔", price: 199, category: "fast food", desc: "Two smashed patties, special sauce & caramelised onion", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",  veg: false, discount: "" },
  { id: 9,  name: "Club Sandwich",       emoji: "🥪", price: 129, category: "fast food", desc: "Triple-decker with chicken, bacon & veggies",           img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80", veg: false, discount: "" },
  { id: 10, name: "Fried Chicken",       emoji: "🍗", price: 219, category: "fast food", desc: "Crispy golden fried chicken pieces",                    img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80",  veg: false, discount: "25% OFF" },
  { id: 11, name: "Tacos",               emoji: "🌮", price: 159, category: "fast food", desc: "Spicy beef tacos with fresh salsa & guac",              img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80",  veg: false, discount: "" },
  { id: 12, name: "Hot Dog",             emoji: "🌭", price: 99,  category: "fast food", desc: "Grilled sausage in a soft bun with mustard",            img: "https://images.unsplash.com/photo-1612392062631-94b7f959c2a4?w=400&q=80", veg: false, discount: "" },
  { id: 13, name: "French Fries",        emoji: "🍟", price: 79,  category: "fast food", desc: "Crispy golden fries with sea salt",                     img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", veg: true,  discount: "" },
  { id: 14, name: "Chicken Wings",       emoji: "🍗", price: 249, category: "fast food", desc: "Spicy buffalo wings with blue cheese dip",              img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80", veg: false, discount: "30% OFF" },

  // Healthy
  { id: 15, name: "Caesar Salad",        emoji: "🥗", price: 179, category: "healthy",   desc: "Crisp romaine, croutons & caesar dressing",             img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",  veg: true,  discount: "" },
  { id: 16, name: "Veggie Wrap",         emoji: "🌯", price: 139, category: "healthy",   desc: "Grilled veggies in a whole wheat wrap",                 img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", veg: true,  discount: "" },
  { id: 17, name: "Fruit Bowl",          emoji: "🍓", price: 149, category: "healthy",   desc: "Seasonal fresh fruits drizzled with honey",             img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80", veg: true,  discount: "" },
  { id: 18, name: "Avocado Toast",       emoji: "🥑", price: 169, category: "healthy",   desc: "Smashed avocado on sourdough with chilli flakes",       img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80", veg: true,  discount: "10% OFF" },
  { id: 19, name: "Acai Bowl",           emoji: "🫐", price: 199, category: "healthy",   desc: "Blended acai topped with granola & fresh berries",      img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80", veg: true,  discount: "" },
  { id: 20, name: "Grilled Salmon",      emoji: "🐟", price: 349, category: "healthy",   desc: "Pan-seared salmon with lemon butter & asparagus",       img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", veg: false, discount: "" },

  // Drinks
  { id: 21, name: "Mango Smoothie",      emoji: "🥭", price: 99,  category: "drinks",    desc: "Fresh mango blended with yogurt & honey",               img: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80", veg: true,  discount: "" },
  { id: 22, name: "Cold Coffee",         emoji: "☕", price: 119, category: "drinks",    desc: "Chilled espresso with milk & ice",                      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", veg: true,  discount: "" },
  { id: 23, name: "Chocolate Shake",     emoji: "🍫", price: 109, category: "drinks",    desc: "Rich thick chocolate milkshake",                        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80", veg: true,  discount: "15% OFF" },
  { id: 24, name: "Fresh Lemonade",      emoji: "🍋", price: 79,  category: "drinks",    desc: "Freshly squeezed lemon with mint & soda",               img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", veg: true,  discount: "" },
  { id: 25, name: "Strawberry Shake",    emoji: "🍓", price: 119, category: "drinks",    desc: "Creamy strawberry milkshake with whipped cream",        img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",  veg: true,  discount: "" },
  { id: 26, name: "Green Detox Juice",   emoji: "🥤", price: 129, category: "drinks",    desc: "Spinach, cucumber, apple & ginger blend",               img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80", veg: true,  discount: "" },

  // Desserts
  { id: 27, name: "Chocolate Lava Cake", emoji: "🍰", price: 149, category: "desserts",  desc: "Warm cake with a gooey molten chocolate centre",        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80", veg: true,  discount: "20% OFF" },
  { id: 28, name: "Cheesecake",          emoji: "🍮", price: 169, category: "desserts",  desc: "New York style cheesecake with berry compote",          img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", veg: true,  discount: "" },
  { id: 29, name: "Ice Cream Sundae",    emoji: "🍨", price: 129, category: "desserts",  desc: "Three scoops with hot fudge, nuts & a cherry",          img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",  veg: true,  discount: "" },
  { id: 30, name: "Waffles",             emoji: "🧇", price: 159, category: "desserts",  desc: "Crispy Belgian waffles with maple syrup & berries",     img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80",  veg: true,  discount: "" },
];

// ===== RESTAURANT DATA =====
const restaurants = [
  { name: "The Pizza House",    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", rating: "4.5", time: "25-35 min", tags: ["Pizza", "Italian", "Pasta"],    offer: "20% OFF" },
  { name: "Burger Republic",    img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80", rating: "4.3", time: "20-30 min", tags: ["Burgers", "Fast Food", "Fries"], offer: "Free Delivery" },
  { name: "Green Bowl",         img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", rating: "4.7", time: "30-40 min", tags: ["Healthy", "Salads", "Wraps"],   offer: "15% OFF" },
  { name: "Spice Garden",       img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", rating: "4.4", time: "35-45 min", tags: ["Indian", "Curry", "Biryani"],   offer: "" },
  { name: "Sweet Tooth",        img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80", rating: "4.6", time: "20-30 min", tags: ["Desserts", "Cakes", "Shakes"],  offer: "Buy 1 Get 1" },
  { name: "Sushi World",        img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80", rating: "4.8", time: "40-50 min", tags: ["Sushi", "Japanese", "Ramen"],   offer: "10% OFF" },
  { name: "Taco Fiesta",        img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80", rating: "4.2", time: "25-35 min", tags: ["Mexican", "Tacos", "Wraps"],    offer: "" },
  { name: "The Coffee Corner",  img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80", rating: "4.5", time: "15-25 min", tags: ["Coffee", "Snacks", "Pastries"], offer: "Free Delivery" },
];

let cart = [];
let activeCategory = "all";

// ===== RENDER MENU =====
function loadMenu(items) {
  const foodList = document.getElementById("food-list");
  foodList.innerHTML = "";

  const source = items || foodItems;
  const filtered = activeCategory === "all"
    ? source
    : source.filter(i => i.category === activeCategory);

  if (filtered.length === 0) {
    foodList.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#bbb;">
      <div style="font-size:3rem;margin-bottom:12px">🔍</div>
      <p style="font-size:1rem;font-weight:600">No items found</p>
    </div>`;
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="card-image">
        <img src="${item.img}" alt="${item.name}" loading="lazy"
          onerror="this.style.display='none';this.parentElement.innerHTML+='<span class=\\'card-img-fallback\\'>${item.emoji}</span>'">
        ${item.veg ? '<span class="card-veg-badge">🟢 VEG</span>' : ''}
        ${item.discount ? `<span class="card-discount">${item.discount}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-category">${item.category}</div>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <span class="card-price">₹${item.price}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    `;
    foodList.appendChild(div);
  });
}

// ===== RENDER RESTAURANTS =====
function loadRestaurants() {
  const grid = document.getElementById("restaurant-grid");
  restaurants.forEach(r => {
    const div = document.createElement("div");
    div.classList.add("rest-card");
    div.innerHTML = `
      <img class="rest-img" src="${r.img}" alt="${r.name}" loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80'">
      <div class="rest-body">
        <div class="rest-name">${r.name}</div>
        <div class="rest-meta">
          <span class="rest-rating">★ ${r.rating}</span>
          <span>🕐 ${r.time}</span>
          ${r.offer ? `<span style="color:#fc8019;font-weight:700">🏷 ${r.offer}</span>` : ''}
        </div>
        <div class="rest-tags">
          ${r.tags.map(t => `<span class="rest-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ===== CATEGORY FILTER =====
function filterCategory(category, btn) {
  activeCategory = category;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  loadMenu();
}

// ===== FILTER + SCROLL (from mind section) =====
function filterAndScroll(category) {
  activeCategory = category;
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("active", b.textContent.toLowerCase().includes(category));
  });
  loadMenu();
  document.getElementById("menu-section").scrollIntoView({ behavior: "smooth" });
}

// ===== SEARCH =====
function handleSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) { loadMenu(); return; }
  const results = foodItems.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.category.toLowerCase().includes(q) ||
    i.desc.toLowerCase().includes(q)
  );
  activeCategory = "all";
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(".cat-btn").classList.add("active");
  loadMenu(results);
  document.getElementById("menu-section").scrollIntoView({ behavior: "smooth" });
}

// ===== CART =====
function addToCart(id) {
  const item = foodItems.find(f => f.id === id);
  cart.push({ ...item });
  updateCartCount();
  showToast(`${item.emoji} ${item.name} added to cart!`);
}

function removeItem(index) {
  const removed = cart[index];
  cart.splice(index, 1);
  updateCartCount();
  displayCart();
  showToast(`❌ ${removed.name} removed`);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function displayCart() {
  const cartList = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartFooter = document.getElementById("cart-footer");
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartFooter.classList.add("hidden");
    return;
  }
  cartEmpty.classList.add("hidden");
  cartFooter.classList.remove("hidden");

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">✕</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("subtotal-price").innerText = total;
  document.getElementById("total-price").innerText = total;
}

function toggleCart() {
  const sidebar = document.getElementById("cart-section");
  const overlay = document.getElementById("cart-overlay");
  const isHidden = sidebar.classList.contains("hidden");
  if (isHidden) {
    sidebar.classList.remove("hidden");
    overlay.classList.remove("hidden");
    displayCart();
  } else {
    sidebar.classList.add("hidden");
    overlay.classList.add("hidden");
  }
}

function placeOrder() {
  if (cart.length === 0) { showToast("🛒 Your cart is empty!"); return; }
  document.getElementById("cart-section").classList.add("hidden");
  document.getElementById("cart-overlay").classList.add("hidden");
  document.getElementById("modal-overlay").classList.remove("hidden");
  cart = [];
  updateCartCount();
}

function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ===== INIT =====
loadMenu();
loadRestaurants();
