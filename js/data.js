var defaultMenuItems = [
    {
        id: 1,
        name: "Bruschetta",
        price: 7.49,
        category: "starters",
        description: "Toasted ciabatta with diced tomatoes, garlic, basil, and balsamic glaze",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=350&fit=crop"
    },
    {
        id: 2,
        name: "Caesar Salad",
        price: 8.99,
        category: "starters",
        description: "Crisp romaine, shaved parmesan, house croutons, and creamy caesar dressing",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=350&fit=crop"
    },
    {
        id: 3,
        name: "Garlic Bread",
        price: 4.99,
        category: "starters",
        description: "Oven-baked bread with roasted garlic butter and herbs",
        image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=500&h=350&fit=crop"
    },
    {
        id: 4,
        name: "Soup of the Day",
        price: 6.99,
        category: "starters",
        description: "Chef's daily selection served with crusty bread",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=350&fit=crop"
    },
    {
        id: 5,
        name: "Classic Burger",
        price: 8.99,
        category: "burgers",
        description: "Juicy beef patty with fresh lettuce, tomato, and our signature sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=350&fit=crop"
    },
    {
        id: 6,
        name: "Cheese Burger",
        price: 9.99,
        category: "burgers",
        description: "Double cheese with caramelized onions on a brioche bun",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=500&h=350&fit=crop"
    },
    {
        id: 7,
        name: "BBQ Bacon Burger",
        price: 11.99,
        category: "burgers",
        description: "Smoky BBQ sauce with crispy bacon and cheddar cheese",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=350&fit=crop"
    },
    {
        id: 8,
        name: "Veggie Burger",
        price: 7.99,
        category: "burgers",
        description: "Plant-based patty with avocado, sprouts, and herb mayo",
        image: "https://images.unsplash.com/photo-1520072959219-c595e6cdc652?w=500&h=350&fit=crop"
    },
    {
        id: 9,
        name: "Mushroom Swiss Burger",
        price: 10.99,
        category: "burgers",
        description: "Sauteed mushrooms, melted Swiss cheese, and truffle aioli",
        image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&h=350&fit=crop"
    },
    {
        id: 10,
        name: "Margherita Pizza",
        price: 12.99,
        category: "pizza",
        description: "San Marzano tomato sauce, fresh mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=350&fit=crop"
    },
    {
        id: 11,
        name: "Pepperoni Pizza",
        price: 14.99,
        category: "pizza",
        description: "Loaded with spicy pepperoni and melted mozzarella",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=350&fit=crop"
    },
    {
        id: 12,
        name: "Hawaiian Pizza",
        price: 13.99,
        category: "pizza",
        description: "Ham, pineapple, and mozzarella on a crispy golden crust",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop"
    },
    {
        id: 13,
        name: "Four Cheese Pizza",
        price: 13.49,
        category: "pizza",
        description: "Mozzarella, gorgonzola, fontina, and parmesan blend",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=350&fit=crop"
    },
    {
        id: 14,
        name: "BBQ Chicken Pizza",
        price: 14.49,
        category: "pizza",
        description: "Grilled chicken, red onion, cilantro, and tangy BBQ sauce",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&h=350&fit=crop"
    },
    {
        id: 15,
        name: "Spaghetti Bolognese",
        price: 11.99,
        category: "pasta",
        description: "Slow-cooked beef ragu with fresh spaghetti and parmesan",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=350&fit=crop"
    },
    {
        id: 16,
        name: "Carbonara",
        price: 12.99,
        category: "pasta",
        description: "Creamy egg sauce with pancetta, pecorino, and black pepper",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=350&fit=crop"
    },
    {
        id: 17,
        name: "Penne Arrabbiata",
        price: 10.99,
        category: "pasta",
        description: "Penne in a spicy tomato and garlic sauce with fresh chili",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=350&fit=crop"
    },
    {
        id: 18,
        name: "Fettuccine Alfredo",
        price: 11.49,
        category: "pasta",
        description: "Rich butter and parmesan cream sauce on fresh fettuccine",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&h=350&fit=crop"
    },
    {
        id: 19,
        name: "French Fries",
        price: 3.99,
        category: "sides",
        description: "Golden crispy fries with sea salt, served with ketchup",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=350&fit=crop"
    },
    {
        id: 20,
        name: "Onion Rings",
        price: 4.99,
        category: "sides",
        description: "Beer-battered onion rings with chipotle dipping sauce",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&h=350&fit=crop"
    },
    {
        id: 21,
        name: "Sweet Potato Fries",
        price: 4.49,
        category: "sides",
        description: "Crispy sweet potato fries with sriracha mayo",
        image: "https://images.unsplash.com/photo-1604497181015-76590d828b75?w=500&h=350&fit=crop"
    },
    {
        id: 22,
        name: "Garden Salad",
        price: 5.99,
        category: "sides",
        description: "Mixed greens, cherry tomatoes, cucumber, and vinaigrette",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=350&fit=crop"
    },
    {
        id: 23,
        name: "Cola",
        price: 2.99,
        category: "drinks",
        description: "Ice-cold classic cola served in a chilled glass",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&h=350&fit=crop"
    },
    {
        id: 24,
        name: "Fresh Lemonade",
        price: 3.99,
        category: "drinks",
        description: "Freshly squeezed lemons with a hint of mint and honey",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=350&fit=crop"
    },
    {
        id: 25,
        name: "Milkshake",
        price: 5.99,
        category: "drinks",
        description: "Creamy vanilla milkshake topped with whipped cream",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=350&fit=crop"
    },
    {
        id: 26,
        name: "Iced Coffee",
        price: 4.49,
        category: "drinks",
        description: "Cold brew coffee over ice with a splash of cream",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=350&fit=crop"
    },
    {
        id: 27,
        name: "Chocolate Cake",
        price: 6.99,
        category: "desserts",
        description: "Rich dark chocolate layered cake with ganache",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop"
    },
    {
        id: 28,
        name: "Ice Cream Sundae",
        price: 5.49,
        category: "desserts",
        description: "Three scoops with hot fudge, nuts, and a cherry on top",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=350&fit=crop"
    },
    {
        id: 29,
        name: "Tiramisu",
        price: 7.49,
        category: "desserts",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=350&fit=crop"
    },
    {
        id: 30,
        name: "New York Cheesecake",
        price: 6.99,
        category: "desserts",
        description: "Creamy baked cheesecake with a buttery graham cracker crust",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=350&fit=crop"
    }
];


var categoryOrder = ["starters", "burgers", "pizza", "pasta", "sides", "drinks", "desserts"];

var categoryNames = {
    starters: "Starters",
    burgers: "Burgers",
    pizza: "Pizza",
    pasta: "Pasta",
    sides: "Sides",
    drinks: "Drinks",
    desserts: "Desserts"
};


function getMenuItems() {
    var stored = localStorage.getItem("tastybite_menu");
    if (stored) {
        return JSON.parse(stored);
    }
    return JSON.parse(JSON.stringify(defaultMenuItems));
}


function saveMenuItems(items) {
    localStorage.setItem("tastybite_menu", JSON.stringify(items));
}
