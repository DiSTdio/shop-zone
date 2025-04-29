import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart({ onGoToCheckout }) {
    const { cart, addToCart, removeFromCart, deleteProductFromCart } = useContext(CartContext);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - 💲{item.price.toFixed(2)} × {item.quantity}
                                <button onClick={() => addToCart(item)}>➕</button>
                                <button onClick={() => removeFromCart(item.id)}>➖</button>
                                <button onClick={() => deleteProductFromCart(item.id)}>🗑️</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total:</h3>
                    <button className="checkout-button" onClick={onGoToCheckout}>Go to Checkout</button>
                </>
            )}
        </div>
    );
}

export default Cart;


