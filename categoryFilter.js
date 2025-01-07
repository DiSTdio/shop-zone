export function setupCategoryFilter(productCards) {
    const categorySelect = document.getElementById('category');

    // Filter products by category
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
}
