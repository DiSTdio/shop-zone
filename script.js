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

// Filter products by category
const categorySelect = document.getElementById('category');
const productCards = document.querySelectorAll('.product-card');

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;

    productCards.forEach(card => {
        const productCategory = card.dataset.category;

        if (selectedCategory === 'all' || productCategory === selectedCategory) {
            card.style.display = 'block'; // Show matching products
        } else {
            card.style.display = 'none'; // Hide non-matching products
        }
    });
});

