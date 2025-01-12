import { setupCategoryFilter } from './categoryFilter.js';
import { setupPriceFilter } from './priceFilter.js';
import { setupCartCounter, setupCustomPriceInputs } from './view.js';

const productCards = document.querySelectorAll('.product-card');
const productData = [
    { name: "Product 1", price: 10, category: "electronics" },
    { name: "Product 2", price: 20, category: "clothing" },
    { name: "Product 3", price: 30, category: "books" },
    { name: "Product 4", price: 40, category: "electronics" },
];

setupCategoryFilter(productCards);
setupPriceFilter(productCards, productData, document.getElementById('category'));

const incrementCartCount = setupCartCounter();
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        incrementCartCount();
        alert(`${button.dataset.product} added to cart!`);
    });
});

// Set up custom price inputs visibility
setupCustomPriceInputs();
