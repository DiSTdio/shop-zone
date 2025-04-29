import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ id, name, price, category, image }) {
    const { addToCart } = useContext(CartContext);
    const [isFlashing, setIsFlashing] = useState(false); // 

    const handleAddToCart = () => {
        setIsFlashing(true); // a
        addToCart({ id, name, price, category, image });
        setTimeout(() => setIsFlashing(false), 100); // 0.5 с
    };

    return (
        <div className={`product-card ${isFlashing ? "flash" : ""}`} data-category={category}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p className="product-price">${price.toFixed(2)}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}

export default ProductCard;