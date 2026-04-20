var adminUsername = "admin";
var adminPassword = "admin123";


function handleLogin(event) {
    event.preventDefault();
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if (username === adminUsername && password === adminPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        loadMenuTable();
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password";
    }
}


function handleLogout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("login-error").textContent = "";
}


function showSection(sectionId, link) {
    var sections = document.querySelectorAll(".content-section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById(sectionId).style.display = "block";

    var navItems = document.querySelectorAll(".nav-item");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }
    link.classList.add("active");

    if (sectionId === "menu-section") {
        loadMenuTable();
    }
}


function loadMenuTable() {
    var items = getMenuItems();
    var container = document.getElementById("menu-table-container");

    if (items.length === 0) {
        container.innerHTML = '<p class="no-items">No menu items yet. Click "Add New Item" to get started.</p>';
        return;
    }

    var html = '<table class="data-table">';
    html += '<thead><tr>';
    html += '<th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th>';
    html += '</tr></thead><tbody>';

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        html += '<tr>';
        html += '<td><img src="' + item.image + '" class="table-img" alt="' + item.name + '"></td>';
        html += '<td><strong>' + item.name + '</strong><br><small style="color:#999">' + item.description + '</small></td>';
        html += '<td><span class="category-badge">' + item.category + '</span></td>';
        html += '<td>$' + item.price.toFixed(2) + '</td>';
        html += '<td><div class="action-btns">';
        html += '<button class="edit-btn" onclick="openEditModal(' + item.id + ')">Edit</button>';
        html += '<button class="delete-btn" onclick="deleteItem(' + item.id + ')">Delete</button>';
        html += '</div></td>';
        html += '</tr>';
    }

    html += '</tbody></table>';
    container.innerHTML = html;
}


function openAddModal() {
    document.getElementById("modal-title").textContent = "Add Menu Item";
    document.getElementById("item-form").reset();
    document.getElementById("edit-item-id").value = "";
    document.getElementById("image-preview").innerHTML = "";
    document.getElementById("item-modal").style.display = "flex";
}


function openEditModal(itemId) {
    var items = getMenuItems();
    var item = null;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            item = items[i];
            break;
        }
    }

    document.getElementById("modal-title").textContent = "Edit Menu Item";
    document.getElementById("edit-item-id").value = item.id;
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-category").value = item.category;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-description").value = item.description;
    document.getElementById("item-image").value = item.image;
    document.getElementById("image-preview").innerHTML = '<img src="' + item.image + '">';
    document.getElementById("item-modal").style.display = "flex";
}


function closeModal() {
    document.getElementById("item-modal").style.display = "none";
}


function handleSaveItem(event) {
    event.preventDefault();

    var items = getMenuItems();
    var editId = document.getElementById("edit-item-id").value;

    var itemData = {
        name: document.getElementById("item-name").value,
        category: document.getElementById("item-category").value,
        price: parseFloat(document.getElementById("item-price").value),
        description: document.getElementById("item-description").value,
        image: document.getElementById("item-image").value
    };

    if (editId) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(editId)) {
                items[i].name = itemData.name;
                items[i].category = itemData.category;
                items[i].price = itemData.price;
                items[i].description = itemData.description;
                items[i].image = itemData.image;
                break;
            }
        }
    } else {
        var maxId = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id > maxId) {
                maxId = items[i].id;
            }
        }
        itemData.id = maxId + 1;
        items.push(itemData);
    }

    saveMenuItems(items);
    closeModal();
    loadMenuTable();
}


function deleteItem(itemId) {
    var confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    var items = getMenuItems();
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].id !== itemId) {
            filtered.push(items[i]);
        }
    }

    saveMenuItems(filtered);
    loadMenuTable();
}


function previewImage() {
    var url = document.getElementById("item-image").value;
    var preview = document.getElementById("image-preview");
    if (url && url.length > 10) {
        preview.innerHTML = '<img src="' + url + '" onerror="this.style.display=\'none\'">';
    } else {
        preview.innerHTML = "";
    }
}
