import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";
import { PRODUCTS_PER_PAGE } from "../config";
import { handleMinPriceChange, handleMaxPriceChange } from "../utils/priceFilter";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    console.log(products[0]);
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProducts();
                setProducts(data);

                const prices = data.map(p => p.price);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));
            } catch (err) {
                setError("Could not load products");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const categories = useMemo(
        () => ["all", ...new Set(products.map(p => p.category))],
        [products]
    );

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);
        const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;

    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="filters">
            <input
                className="filter-search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="select-wrapper">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >

                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>


            <div>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) =>
                        handleMinPriceChange(e, setMinPrice, setMaxPrice,
                            products, minPrice, maxPrice)
                    }
                    placeholder="Min 💲"
                />

                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) =>
                        handleMaxPriceChange(e, setMinPrice, setMaxPrice, products, minPrice, maxPrice)
                    }
                    placeholder="Max 💲"
                />

            </div>

            <div className="product-grid">
                {currentProducts.map((p) => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </div>

            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                Prev
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}

export default ProductGrid;