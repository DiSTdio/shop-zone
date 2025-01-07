import { setupCategoryFilter } from './categoryFilter.js';
import { setupPriceFilter } from './priceFilter.js';

// Product Data and DOM Elements
const productCards = document.querySelectorAll('.product-card');

// Example product data
const productData = [
    { name: "Product 1", price: 10, category: "electronics" },
    { name: "Product 2", price: 20, category: "clothing" },
    { name: "Product 3", price: 30, category: "books" },
    { name: "Product 4", price: 40, category: "electronics" },
];

// Set up category and price filters
setupCategoryFilter(productCards);
setupPriceFilter(productCards, productData, document.getElementById('category'));

// Cart Counter
let cartCount = 0;

// Create and display the cart counter element
const cartCounter = document.createElement('div');
cartCounter.id = 'cart-counter';
cartCounter.textContent = `Cart: ${cartCount}`;
document.body.prepend(cartCounter);

// Add event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCounter.textContent = `Cart: ${cartCount}`;
        alert(`${button.dataset.product} added to cart!`);
    });
});
