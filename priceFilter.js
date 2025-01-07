export function setupPriceFilter(productCards, productData, categorySelect) {
    const priceSelect = document.getElementById('price');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const customPriceInputs = document.getElementById('custom-price-inputs');

    priceSelect.addEventListener('change', () => {
        if (priceSelect.value === 'custom') {
            customPriceInputs.style.display = 'flex';
            updatePriceInputs();
        } else {
            customPriceInputs.style.display = 'none';
            filterByPrice();
        }
    });

    [minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener('input', () => {
            const min = Math.min(...productData.map(p => p.price));
            const max = Math.max(...productData.map(p => p.price));

            if (minPriceInput.value < min) minPriceInput.value = min;
            if (maxPriceInput.value > max) maxPriceInput.value = max;

            filterByPrice();
        });
    });

    function filterByPrice() {
        const selectedCategory = categorySelect.value;
        const selectedPrice = priceSelect.value;
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            const productName = card.querySelector('h3').textContent;
            const productPrice = productData.find(p => p.name === productName).price;

            let show = true;

            if (selectedCategory !== 'all' && productCategory !== selectedCategory) show = false;
            if (selectedPrice === 'custom') show = productPrice >= minPrice && productPrice <= maxPrice;

            card.style.display = show ? 'block' : 'none';
        });
    }

    function updatePriceInputs() {
        const min = Math.min(...productData.map(p => p.price));
        const max = Math.max(...productData.map(p => p.price));
        minPriceInput.value = min;
        maxPriceInput.value = max;
    }
}
