let menuItems = [
    { id: 1, name: "Classic Burger", price: 8.99, category: "burgers", description: "Juicy beef patty with fresh lettuce and tomato", emoji: "🍔" },
    { id: 2, name: "Cheese Burger", price: 9.99, category: "burgers", description: "Double cheese with caramelized onions", emoji: "🧀" },
    { id: 3, name: "BBQ Bacon Burger", price: 11.99, category: "burgers", description: "Smoky BBQ sauce with crispy bacon strips", emoji: "🥓" },
    { id: 4, name: "Veggie Burger", price: 7.99, category: "burgers", description: "Plant-based patty with avocado and sprouts", emoji: "🥬" },
    { id: 5, name: "Margherita Pizza", price: 12.99, category: "pizza", description: "Classic tomato sauce with fresh mozzarella and basil", emoji: "🍕" },
    { id: 6, name: "Pepperoni Pizza", price: 14.99, category: "pizza", description: "Loaded with spicy pepperoni and melted cheese", emoji: "🍕" },
    { id: 7, name: "Hawaiian Pizza", price: 13.99, category: "pizza", description: "Ham and pineapple on a crispy golden crust", emoji: "🍍" },
    { id: 8, name: "Cola", price: 2.99, category: "drinks", description: "Ice-cold refreshing cola", emoji: "🥤" },
    { id: 9, name: "Fresh Lemonade", price: 3.99, category: "drinks", description: "Freshly squeezed lemons with a hint of mint", emoji: "🍋" },
    { id: 10, name: "Milkshake", price: 5.99, category: "drinks", description: "Creamy vanilla milkshake with whipped cream", emoji: "🥛" },
    { id: 11, name: "Chocolate Cake", price: 6.99, category: "desserts", description: "Rich dark chocolate layered cake", emoji: "🍫" },
    { id: 12, name: "Ice Cream Sundae", price: 5.49, category: "desserts", description: "Three scoops with chocolate sauce and sprinkles", emoji: "🍨" }
];

let cart = [];


window.onload = function () {
    renderMenu("all");
    updateCartDisplay();
};


function renderMenu(category) {
    let container = document.getElementById("menu-items");
    container.innerHTML = "";

    let items = menuItems;
    if (category !== "all") {
        items = menuItems.filter(function (item) {
            return item.category === category;
        });
    }

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML =
            '<div class="card-emoji">' + item.emoji + '</div>' +
            '<h3>' + item.name + '</h3>' +
            '<p class="description">' + item.description + '</p>' +
            '<div class="card-bottom">' +
            '  <span class="price">$' + item.price.toFixed(2) + '</span>' +
            '  <button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>' +
            '</div>';
        container.appendChild(card);
    }
}


function filterMenu(category, button) {
    renderMenu(category);

    let allButtons = document.querySelectorAll(".category-btn");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
    }
    button.classList.add("active");
}


function addToCart(itemId) {
    let item = menuItems.find(function (m) { return m.id === itemId; });
    let existing = cart.find(function (c) { return c.id === itemId; });

    if (existing) {
        existing.quantity = existing.quantity + 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            emoji: item.emoji,
            quantity: 1
        });
    }

    updateCartDisplay();
    showToast(item.emoji + " " + item.name + " added to cart!");
}


function removeFromCart(itemId) {
    cart = cart.filter(function (item) {
        return item.id !== itemId;
    });
    updateCartDisplay();
}


function changeQuantity(itemId, change) {
    let item = cart.find(function (c) { return c.id === itemId; });
    item.quantity = item.quantity + change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    updateCartDisplay();
}


function updateCartDisplay() {
    let cartContainer = document.getElementById("cart-items");
    let totalDisplay = document.getElementById("cart-total");
    let countDisplay = document.getElementById("cart-count");

    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) {
        totalItems = totalItems + cart[i].quantity;
    }
    countDisplay.textContent = totalItems;

    countDisplay.classList.remove("cart-bounce");
    setTimeout(function () { countDisplay.classList.add("cart-bounce"); }, 10);

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Go add some food! 🍽️</p>';
        totalDisplay.textContent = "$0.00";
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;

        let row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML =
            '<span class="cart-item-name">' + item.emoji + ' ' + item.name + '</span>' +
            '<div class="quantity-controls">' +
            '  <button onclick="changeQuantity(' + item.id + ', -1)">−</button>' +
            '  <span>' + item.quantity + '</span>' +
            '  <button onclick="changeQuantity(' + item.id + ', 1)">+</button>' +
            '</div>' +
            '<span class="cart-item-price">$' + itemTotal.toFixed(2) + '</span>' +
            '<button class="remove-btn" onclick="removeFromCart(' + item.id + ')">✕</button>';
        cartContainer.appendChild(row);
    }

    totalDisplay.textContent = "$" + total.toFixed(2);
}


function handleOrderSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showPopup("🛒", "Cart is Empty!", "Please add some items to your cart before placing an order.");
        return;
    }

    let name = document.getElementById("order-name").value;
    let phone = document.getElementById("order-phone").value;
    let address = document.getElementById("order-address").value;
    let notes = document.getElementById("order-notes").value;

    let orderData = {
        customer: name,
        phone: phone,
        address: address,
        notes: notes,
        items: cart,
        total: document.getElementById("cart-total").textContent
    };

    // TODO: Send orderData to the database when backend is ready
    console.log("Order placed:", orderData);

    showPopup("🎉", "Order Placed!", "Thank you " + name + "! Your food is being prepared and will be delivered to " + address + " soon.");

    cart = [];
    updateCartDisplay();
    document.getElementById("order-form").reset();
}


function handleContactSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("contact-name").value;
    let email = document.getElementById("contact-email").value;
    let message = document.getElementById("contact-message").value;

    let contactData = {
        name: name,
        email: email,
        message: message
    };

    // TODO: Save contactData to the database when backend is ready
    console.log("Contact message:", contactData);

    showPopup("✉️", "Message Sent!", "Thanks " + name + "! We'll get back to you at " + email + " as soon as possible.");

    document.getElementById("contact-form").reset();
}


function showPopup(emoji, title, message) {
    document.getElementById("popup-emoji").textContent = emoji;
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.add("show");
}

function closePopup(event) {
    if (event && event.target !== document.getElementById("popup")) return;
    document.getElementById("popup").classList.remove("show");
}


function showToast(message) {
    let existing = document.querySelector(".toast");
    if (existing) existing.remove();

    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add("show"); }, 50);
    setTimeout(function () { toast.classList.remove("show"); }, 2500);
    setTimeout(function () { toast.remove(); }, 3000);
}


function scrollToOrder() {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function toggleMobileMenu() {
    document.getElementById("nav-links").classList.toggle("open");
}


window.onscroll = function () {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};
