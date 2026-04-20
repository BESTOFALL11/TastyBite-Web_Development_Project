var defaultMenuItems = [
    {
        id: 1,
        name: "Classic Burger",
        price: 8.99,
        category: "burgers",
        description: "Juicy beef patty with fresh lettuce, tomato, and our signature sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=350&fit=crop"
    },
    {
        id: 2,
        name: "Cheese Burger",
        price: 9.99,
        category: "burgers",
        description: "Double cheese with caramelized onions on a brioche bun",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=500&h=350&fit=crop"
    },
    {
        id: 3,
        name: "BBQ Bacon Burger",
        price: 11.99,
        category: "burgers",
        description: "Smoky BBQ sauce with crispy bacon and cheddar cheese",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=350&fit=crop"
    },
    {
        id: 4,
        name: "Veggie Burger",
        price: 7.99,
        category: "burgers",
        description: "Plant-based patty with avocado, sprouts, and herb mayo",
        image: "https://images.unsplash.com/photo-1520072959219-c595e6cdc652?w=500&h=350&fit=crop"
    },
    {
        id: 5,
        name: "Margherita Pizza",
        price: 12.99,
        category: "pizza",
        description: "San Marzano tomato sauce, fresh mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=350&fit=crop"
    },
    {
        id: 6,
        name: "Pepperoni Pizza",
        price: 14.99,
        category: "pizza",
        description: "Loaded with spicy pepperoni and melted mozzarella",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=350&fit=crop"
    },
    {
        id: 7,
        name: "Hawaiian Pizza",
        price: 13.99,
        category: "pizza",
        description: "Ham, pineapple, and mozzarella on a crispy golden crust",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop"
    },
    {
        id: 8,
        name: "Cola",
        price: 2.99,
        category: "drinks",
        description: "Ice-cold classic cola served in a chilled glass",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&h=350&fit=crop"
    },
    {
        id: 9,
        name: "Fresh Lemonade",
        price: 3.99,
        category: "drinks",
        description: "Freshly squeezed lemons with a hint of mint and honey",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=350&fit=crop"
    },
    {
        id: 10,
        name: "Milkshake",
        price: 5.99,
        category: "drinks",
        description: "Creamy vanilla milkshake topped with whipped cream",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=350&fit=crop"
    },
    {
        id: 11,
        name: "Chocolate Cake",
        price: 6.99,
        category: "desserts",
        description: "Rich dark chocolate layered cake with ganache",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop"
    },
    {
        id: 12,
        name: "Ice Cream Sundae",
        price: 5.49,
        category: "desserts",
        description: "Three scoops with hot fudge, nuts, and a cherry on top",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=350&fit=crop"
    }
];


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
