import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { API_URL } from "../config";
import { handleMinPriceChange, handleMaxPriceChange } from "../utils/priceFilter";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // var for current page
    const productsPerPage = 8; 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                if (!data.products) throw new Error("Unexpected API response");

                const formattedProducts = data.products.map((product) => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category || "Unknown",
                }));

                setProducts(formattedProducts);
                setLoading(false);

                const prices = formattedProducts.map((p) => p.price);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not load products. Please try again later.");
                setLoading(false);
            }
        };

        if (products.length === 0) fetchProducts();
    }, [products]);

    const categories = useMemo(() => ["all", ...new Set(products.map((p) => p.category))], [products]);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice);
        const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);
        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) return <p className="loading">Loading products...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-container">
                <label htmlFor="category">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="price-filter">
                <div className="price-filter-min">
                    <label>Min Price:</label>
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) =>
                            handleMinPriceChange(e, setMinPrice, setMaxPrice, products, minPrice, maxPrice)
                        }
                    />
                </div>
                <div className="price-filter-max">
                <label>Max Price:</label>
                <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) =>
                        handleMaxPriceChange(e, setMinPrice, setMaxPrice, products, minPrice, maxPrice)
                    }
                />
                </div>
            </div>

            <div className="product-grid">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                    />
                ))}
            </div>

            {/* pagination button */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductGrid;