// Handles visible elements and UI updates
export function setupCartCounter() {
    let cartCount = 0;

    // Create and display the cart counter element
    const cartCounter = document.createElement('div');
    cartCounter.id = 'cart-counter';
    cartCounter.textContent = `Cart: ${cartCount}`;
    document.body.prepend(cartCounter);

    // Function to update the cart count
    return function incrementCartCount() {
        cartCount++;
        cartCounter.textContent = `Cart: ${cartCount}`;
    };
}

export function setupCustomPriceInputs() {
    const priceSelect = document.getElementById('price');
    const customPriceInputs = document.getElementById('custom-price-inputs');

    // Ensure custom price inputs are hidden on page load
    if (priceSelect.value === 'custom') {
        customPriceInputs.style.display = 'flex';
    } else {
        customPriceInputs.style.display = 'none';
    }

    // Toggle visibility of custom price inputs when dropdown changes
    priceSelect.addEventListener('change', () => {
        if (priceSelect.value === 'custom') {
            customPriceInputs.style.display = 'flex';
        } else {
            customPriceInputs.style.display = 'none';
        }
    });
}
