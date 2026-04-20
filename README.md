# TastyBite - Food Ordering Website

A front-end food ordering website with an admin dashboard, built with HTML, CSS, and JavaScript.

## Project Structure

```
WebDevelopment/
├── index.html          Main customer-facing page
├── admin.html          Admin login and dashboard
├── css/
│   ├── main.css        Styles for the customer page
│   └── admin.css       Styles for the admin dashboard
├── js/
│   ├── data.js         Menu items data and localStorage functions
│   ├── app.js          Customer page logic (cart, forms, rendering)
│   └── admin.js        Admin dashboard logic (login, CRUD operations)
└── README.md
```

## Features

### Customer Page (index.html)
- Browse menu items with real food photography
- Filter items by category (Burgers, Pizza, Drinks, Desserts)
- Add items to cart with quantity controls
- Place delivery orders via checkout form
- Contact form for customer messages
- Fully responsive design

### Admin Dashboard (admin.html)
- Secure login (username: admin, password: admin123)
- View all menu items in a data table
- Add new menu items with image preview
- Edit existing items
- Delete items with confirmation
- Orders and Messages sections (ready for database)

## How to Run

Open `index.html` in your browser for the customer page.
Open `admin.html` for the admin dashboard.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage for temporary data persistence

## Future Plans

- Connect to a database (MySQL/MongoDB) to persist orders and messages
- User authentication with encrypted passwords
- Order tracking system

