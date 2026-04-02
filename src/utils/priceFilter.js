export const handleMinPriceChange = (e, setMinPrice, setMaxPrice, products) => {
    let newMin = parseFloat(e.target.value) || 0;

    const realMin = Math.min(...products.map((p) => p.price));
    const realMax = Math.max(...products.map((p) => p.price));

    if (isNaN(newMin)) newMin = realMin;
    if (newMin < realMin) newMin = realMin;
    if (newMin > realMax) newMin = realMax;

    setMinPrice(newMin);
    setMaxPrice((prevMax) => Math.max(newMin, prevMax)); // Ensure max is always >= min
};

export const handleMaxPriceChange = (e, setMinPrice, setMaxPrice, products) => {
    let newMax = parseFloat(e.target.value) || Infinity;

    const realMin = Math.min(...products.map((p) => p.price));
    const realMax = Math.max(...products.map((p) => p.price));

    if (isNaN(newMax)) newMax = realMax;
    if (newMax > realMax) newMax = realMax;
    if (newMax < realMin) newMax = realMin;

    setMaxPrice(newMax);
    setMinPrice((prevMin) => Math.min(newMax, prevMin)); // Ensure min is always <= max
};