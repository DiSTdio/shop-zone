let cartCount = 0;

// Select the cart counter element (we'll create this next)
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
