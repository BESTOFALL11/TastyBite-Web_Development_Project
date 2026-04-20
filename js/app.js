var cart = [];
var currentSearchQuery = "";

window.onload = function () {
    initTheme();
    renderMenu();
    updateCartDisplay();
    initReveal();
};

/* ===== THEME TOGGLE ===== */
function initTheme() {
    var savedTheme = localStorage.getItem("tastybite_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.getElementById("theme-toggle").textContent = "☀️";
    }
}

function toggleTheme() {
    var isDark = document.body.classList.toggle("dark-theme");
    var btn = document.getElementById("theme-toggle");
    
    if (isDark) {
        localStorage.setItem("tastybite_theme", "dark");
        btn.textContent = "☀️";
    } else {
        localStorage.setItem("tastybite_theme", "light");
        btn.textContent = "🌙";
    }
}

/* ===== SCROLL REVEAL (INTERSECTION OBSERVER) ===== */
function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(function(reveal) {
        observer.observe(reveal);
    });
}

function reObserveElements() {
    // Call this after dynamically adding new elements (like menu cards)
    setTimeout(function() {
        var newReveals = document.querySelectorAll('.menu-category.reveal:not(.active), .menu-card.reveal:not(.active)');
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        newReveals.forEach(function(reveal) {
            observer.observe(reveal);
        });
    }, 100);
}


/* ===== SEARCH ===== */
function handleSearch() {
    currentSearchQuery = document.getElementById("menu-search").value.toLowerCase().trim();
    renderMenu();
}


/* ===== MENU RENDERING ===== */
function renderMenu() {
    var container = document.getElementById("menu-items");
    container.innerHTML = "";
    var items = getMenuItems();

    // Filter items if search query exists
    if (currentSearchQuery !== "") {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].name.toLowerCase().indexOf(currentSearchQuery) > -1 || 
                items[i].description.toLowerCase().indexOf(currentSearchQuery) > -1) {
                filtered.push(items[i]);
            }
        }
        items = filtered;
        
        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 40px; color:#888;">No items match your search.</p>';
            return;
        }
    }

    for (var c = 0; c < categoryOrder.length; c++) {
        var cat = categoryOrder[c];

        var catItems = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].category === cat) {
                catItems.push(items[i]);
            }
        }

        if (catItems.length === 0) continue;

        var section = document.createElement("div");
        section.className = "menu-category reveal";
        section.id = "cat-" + cat;

        var heading = document.createElement("h3");
        heading.className = "category-heading";
        heading.textContent = categoryNames[cat] || cat;
        section.appendChild(heading);

        var grid = document.createElement("div");
        grid.className = "menu-grid";

        for (var i = 0; i < catItems.length; i++) {
            var item = catItems[i];
            var card = document.createElement("div");
            card.className = "menu-card reveal";
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
            grid.appendChild(card);
        }

        section.appendChild(grid);
        container.appendChild(section);
    }
    
    reObserveElements();
}


function scrollToCategory(categoryId) {
    var element = document.getElementById(categoryId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}


/* ===== CART LOGIC ===== */
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


/* ===== FORM VALIDATION HELPERS ===== */
function showError(inputId, message) {
    var input = document.getElementById(inputId);
    var errorSpan = document.getElementById("error-" + inputId);
    input.classList.add("input-error");
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add("active");
    }
}

function clearErrors(formId) {
    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll("input, textarea");
    var errors = form.querySelectorAll(".error-text");
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("input-error");
    }
    for (var j = 0; j < errors.length; j++) {
        errors[j].classList.remove("active");
        errors[j].textContent = "";
    }
}


/* ===== FORM HANDLERS ===== */
function handleOrderSubmit(event) {
    event.preventDefault();
    clearErrors("order-form");

    if (cart.length === 0) {
        showPopup("Your cart is empty. Please add items before placing an order.");
        return;
    }

    var name = document.getElementById("order-name").value.trim();
    var phone = document.getElementById("order-phone").value.trim();
    var address = document.getElementById("order-address").value.trim();
    var notes = document.getElementById("order-notes").value.trim();
    
    var isValid = true;

    if (name.length < 2) {
        showError("order-name", "Please enter a valid full name.");
        isValid = false;
    }
    
    // Basic phone validation (at least 7 numbers/characters to account for formatting)
    var phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(phone)) {
        showError("order-phone", "Please enter a valid phone number.");
        isValid = false;
    }
    
    if (address.length < 10) {
        showError("order-address", "Please provide a complete delivery address.");
        isValid = false;
    }
    
    if (!isValid) return; // Stop if validation failed

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
    clearErrors("contact-form");

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var message = document.getElementById("contact-message").value.trim();
    
    var isValid = true;
    
    if (name.length < 2) {
        showError("contact-name", "Please enter your name.");
        isValid = false;
    }
    
    // Basic email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("contact-email", "Please enter a valid email address.");
        isValid = false;
    }
    
    if (message.length < 10) {
        showError("contact-message", "Your message must be at least 10 characters long.");
        isValid = false;
    }

    if (!isValid) return;

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


/* ===== POPUPS AND TOASTS ===== */
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


/* ===== UTILS ===== */
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
