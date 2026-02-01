// PRODUCT DATA
const products = [

  // 🥦 Groceries & Essentials
  {emoji:"🥛", name:"Milk", price:50},
  {emoji:"🍞", name:"Bread", price:30},
  {emoji:"🧂", name:"Salt", price:20},
  {emoji:"🍚", name:"Rice", price:60},
  {emoji:"🛢️", name:"Cooking Oil", price:120},
  {emoji:"🍯", name:"Sugar", price:40},
  {emoji:"🥔", name:"Potatoes", price:25},
  {emoji:"🧅", name:"Onions", price:30},
  {emoji:"🍅", name:"Tomatoes", price:35},
  {emoji:"🥬", name:"Spinach", price:20},

  // 🍫 Snacks & Beverages
  {emoji:"🍪", name:"Biscuits", price:20},
  {emoji:"🍫", name:"Chocolate", price:50},
  {emoji:"🥤", name:"Soft Drink", price:40},
  {emoji:"🍿", name:"Popcorn", price:35},
  {emoji:"☕", name:"Instant Coffee", price:80},
  {emoji:"🍵", name:"Tea Packets", price:60},
  {emoji:"🥨", name:"Chips", price:30},
  {emoji:"🥜", name:"Salted Peanuts", price:45},
  {emoji:"🧃", name:"Fruit Juice", price:50},
  {emoji:"🍦", name:"Ice Cream", price:60},

  // 🧴 Personal Care
  {emoji:"🪥", name:"Toothpaste", price:45},
  {emoji:"🧼", name:"Soap", price:25},
  {emoji:"🧴", name:"Shampoo", price:120},
  {emoji:"🧻", name:"Tissue Paper", price:30},
  {emoji:"🪒", name:"Razor", price:40},
  {emoji:"🧴", name:"Body Lotion", price:90},
  {emoji:"🧴", name:"Hand Sanitizer", price:35},
  {emoji:"🧴", name:"Face Wash", price:70},
  {emoji:"🧴", name:"Hair Oil", price:85},
  {emoji:"🧴", name:"Deodorant", price:110},

  // 🏠 Household
  {emoji:"🧽", name:"Dishwashing Liquid", price:60},
  {emoji:"🧹", name:"Broom", price:120},
  {emoji:"🧺", name:"Laundry Detergent", price:140},
  {emoji:"🕯️", name:"Candle", price:30},
  {emoji:"🧯", name:"Air Freshener", price:90},
  {emoji:"🧴", name:"Floor Cleaner", price:85},
  {emoji:"🧴", name:"Toilet Cleaner", price:75},
  {emoji:"🧴", name:"Glass Cleaner", price:70},
  {emoji:"🧴", name:"Garbage Bags", price:50},
  {emoji:"🧴", name:"Scrub Pads", price:25},

  // 🍎 Fruits & Vegetables
  {emoji:"🍌", name:"Bananas", price:40},
  {emoji:"🍎", name:"Apples", price:90},
  {emoji:"🍊", name:"Oranges", price:60},
  {emoji:"🍇", name:"Grapes", price:80},
  {emoji:"🍉", name:"Watermelon", price:70},
  {emoji:"🥭", name:"Mangoes", price:100},
  {emoji:"🥒", name:"Cucumbers", price:30},
  {emoji:"🥕", name:"Carrots", price:35},
  {emoji:"🌽", name:"Corn", price:40}
];

// LOAD PRODUCTS
function loadProducts() {
  const container = document.getElementById("productList");
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="emoji">${p.emoji}</div>
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add</button>
    `;
    container.appendChild(card);
  });
}
loadProducts();

// CART LOGIC
let cart = {};
let deliveryCharge = 30;
let open = false;
let orders = [];

function addToCart(name, price) {
  if (cart[name]) cart[name].qty += 1;
  else cart[name] = { price, qty: 1 };
  updateCount();
  updateCart();
}

function increaseItem(name) {
  cart[name].qty += 1;
  updateCount();
  updateCart();
}

function decreaseItem(name) {
  cart[name].qty -= 1;
  if (cart[name].qty <= 0) delete cart[name];
  updateCount();
  updateCart();
}

function removeItem(name) {
  delete cart[name];
  updateCount();
  updateCart();
}

function updateCount() {
  let totalItems = 0;
  for (let item in cart) totalItems += cart[item].qty;
  document.getElementById("count").innerText = totalItems;
}

function toggleCart() {
  open = !open;
  document.getElementById("cart").style.right = open ? "0" : "-320px";
}

function updateCart() {
  let list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;

  for (let item in cart) {
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${item}</strong><br>
      ₹${cart[item].price} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}
      <br>
      <button onclick="increaseItem('${item}')">➕</button>
      <button onclick="decreaseItem('${item}')">➖</button>
      <button onclick="removeItem('${item}')">❌</button>
    `;
    list.appendChild(li);
    total += cart[item].price * cart[item].qty;
  }

  document.getElementById("total").innerText = total;
  document.getElementById("final").innerText = total + deliveryCharge;
}

// CHECKOUT
function openCheckout() {
  let box = document.getElementById("checkout");
  let items = document.getElementById("checkoutItems");
  items.innerHTML = "";
  let total = 0;

  for (let item in cart) {
    let div = document.createElement("div");
    div.innerText = `${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}`;
    items.appendChild(div);
    total += cart[item].price * cart[item].qty;
  }

  document.getElementById("checkoutTotal").innerText = total + deliveryCharge;
  box.style.display = "block";
}

function confirmOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty 😭");
    return;
  }

  let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  storedOrders.push(cart);
  localStorage.setItem("orders", JSON.stringify(storedOrders));

  alert("Order placed successfully 🎉");

  cart = {};
  updateCart();
  updateCount();
  document.getElementById("checkout").style.display = "none";
}
let aiOpen = false;

function toggleAI() {
  aiOpen = !aiOpen;
  document.getElementById("aiBot").style.display = aiOpen ? "flex" : "none";
}

function aiReply(text) {
  const mode = document.getElementById("aiMode").value;
  const box = document.getElementById("aiMessages");

  let finalText = text;

  if (mode === "friendly") {
    finalText = "😄 " + text;
  } else if (mode === "professional") {
    finalText = "🧑‍💼 " + text.replace(/😄|💛|😋|💪/g, "");
  }

  box.innerHTML += `<div><strong>🤖 AI:</strong> ${finalText}</div>`;
  box.scrollTop = box.scrollHeight;
}


function askAI() {
  let input = document.getElementById("aiText");
  let msg = input.value.toLowerCase().trim();
  if (!msg) return;

  const box = document.getElementById("aiMessages");
  box.innerHTML += `<div><strong>🧑 You:</strong> ${input.value}</div>`;
  input.value = "";

  // keyword groups
  const sadWords = ["sad", "stress", "stressed", "depressed", "low", "tired"];
  const snackWords = ["snack", "chips", "craving", "hungry"];
  const healthyWords = ["healthy", "gym", "fitness", "diet"];
  const budgetWords = ["cheap", "budget", "low cost", "affordable"];

  // helper
  const containsAny = (arr) => arr.some(word => msg.includes(word));

  // AI responses
  if (containsAny(sadWords)) {
    aiReply("I got you 💛 When people feel sad or stressed, comfort items help a lot. Try 🍦 Ice Cream, 🍫 Chocolate, and 🧃 Fruit Juice.");
  }
  else if (containsAny(snackWords)) {
    aiReply("Snack time 😋 Best combo: 🍟 Chips + 🥤 Soft Drink + 🍫 Chocolate.");
  }
  else if (containsAny(healthyWords)) {
    aiReply("Health mode ON 💪 I recommend 🍎 Apples, 🍌 Bananas, 🥬 Spinach, and 🥒 Cucumbers.");
  }
  else if (containsAny(budgetWords)) {
    aiReply("Budget-friendly picks 💸: 🍞 Bread, 🧂 Salt, 🥔 Potatoes, 🧅 Onions.");
  }
  else if (msg.includes("cart")) {
    let items = Object.keys(cart);
    if (items.length === 0) {
      aiReply("Your cart is empty 👀 Let’s add something tasty!");
    } else {
      aiReply("You currently have 🧺: " + items.join(", "));
    }
  }
  else {
    aiReply("I can help with moods (sad, stressed), snacks, healthy food, budget items, or cart info 😊 Try typing naturally!");
  }
}


