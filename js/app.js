var cart = [];


window.onload = function () {
    renderMenu("all");
    updateCartDisplay();
};


function renderMenu(category) {
    var container = document.getElementById("menu-items");
    container.innerHTML = "";

    var items = getMenuItems();

    if (category !== "all") {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].category === category) {
                filtered.push(items[i]);
            }
        }
        items = filtered;
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML =
            '<img src="' + item.image + '" alt="' + item.name + '">' +
            '<div class="card-info">' +
            '  <h3>' + item.name + '</h3>' +
            '  <p class="card-desc">' + item.description + '</p>' +
            '  <div class="card-bottom">' +
            '    <span class="price">$' + item.price.toFixed(2) + '</span>' +
            '    <button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>' +
            '  </div>' +
            '</div>';
        container.appendChild(card);
    }
}


function filterMenu(category, button) {
    renderMenu(category);

    var allButtons = document.querySelectorAll(".category-btn");
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
    }
    button.classList.add("active");
}


function addToCart(itemId) {
    var items = getMenuItems();
    var item = null;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            item = items[i];
            break;
        }
    }

    var existing = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === itemId) {
            existing = cart[i];
            break;
        }
    }

    if (existing) {
        existing.quantity = existing.quantity + 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    updateCartDisplay();
    showToast(item.name + " added to cart");
}


function removeFromCart(itemId) {
    var updated = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== itemId) {
            updated.push(cart[i]);
        }
    }
    cart = updated;
    updateCartDisplay();
}


function changeQuantity(itemId, change) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === itemId) {
            cart[i].quantity = cart[i].quantity + change;
            if (cart[i].quantity <= 0) {
                removeFromCart(itemId);
                return;
            }
            break;
        }
    }
    updateCartDisplay();
}


function updateCartDisplay() {
    var cartContainer = document.getElementById("cart-items");
    var totalDisplay = document.getElementById("cart-total");
    var countDisplay = document.getElementById("cart-count");

    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems = totalItems + cart[i].quantity;
    }
    countDisplay.textContent = totalItems;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalDisplay.textContent = "$0.00";
        return;
    }

    cartContainer.innerHTML = "";
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        total = total + itemTotal;

        var row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML =
            '<span class="cart-item-name">' + item.name + '</span>' +
            '<div class="quantity-controls">' +
            '  <button onclick="changeQuantity(' + item.id + ', -1)">&minus;</button>' +
            '  <span>' + item.quantity + '</span>' +
            '  <button onclick="changeQuantity(' + item.id + ', 1)">+</button>' +
            '</div>' +
            '<span class="cart-item-price">$' + itemTotal.toFixed(2) + '</span>' +
            '<button class="remove-btn" onclick="removeFromCart(' + item.id + ')">&times;</button>';
        cartContainer.appendChild(row);
    }

    totalDisplay.textContent = "$" + total.toFixed(2);
}


function handleOrderSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showPopup("Your cart is empty. Please add items before placing an order.");
        return;
    }

    var name = document.getElementById("order-name").value;
    var phone = document.getElementById("order-phone").value;
    var address = document.getElementById("order-address").value;
    var notes = document.getElementById("order-notes").value;

    var orderData = {
        customer: name,
        phone: phone,
        address: address,
        notes: notes,
        items: cart,
        total: document.getElementById("cart-total").textContent
    };

    // TODO: Send orderData to the server when the database is ready
    console.log("Order placed:", orderData);

    showPopup("Thank you, " + name + "! Your order has been received and will be delivered to " + address + " shortly.");

    cart = [];
    updateCartDisplay();
    document.getElementById("order-form").reset();
}


function handleContactSubmit(event) {
    event.preventDefault();

    var name = document.getElementById("contact-name").value;
    var email = document.getElementById("contact-email").value;
    var message = document.getElementById("contact-message").value;

    var contactData = {
        name: name,
        email: email,
        message: message
    };

    // TODO: Save contactData to the server when the database is ready
    console.log("Contact message:", contactData);

    showPopup("Thank you, " + name + ". We have received your message and will respond to " + email + " as soon as possible.");

    document.getElementById("contact-form").reset();
}


function showPopup(message) {
    document.getElementById("popup-icon").innerHTML = "&#10003;";
    document.getElementById("popup-title").textContent = "Success";
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.add("show");
}

function closePopup(event) {
    if (event && event.target !== document.getElementById("popup")) return;
    document.getElementById("popup").classList.remove("show");
}


function showToast(message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add("show"); }, 50);
    setTimeout(function () { toast.classList.remove("show"); }, 2200);
    setTimeout(function () { toast.remove(); }, 2600);
}


function scrollToOrder() {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function toggleMobileMenu() {
    document.getElementById("nav-links").classList.toggle("open");
}


window.onscroll = function () {
    var navbar = document.getElementById("navbar");
    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};
