import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Checkout({ onGoBack, onGoToOrders }) {
    const { cart, clearCart } = useContext(CartContext); //  
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState(""); // 

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // 
        setTimeout(() => {
            setLoading(false);
            setOrderSuccess(true);
            const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
            setOrderNumber(newOrderNumber); // 
            const orderDate = new Date().toLocaleString();

            const newOrder = { id: Date.now(), orderNumber: newOrderNumber, date: orderDate, items: cart, total: totalPrice };
            const savedOrders = localStorage.getItem("orders");
            const orders = savedOrders ? JSON.parse(savedOrders) : [];
            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));

            console.log("Cart cleared in Checkout");
            clearCart(); // 
            localStorage.removeItem("cart"); // У localStorage
        }, 1000); 
    };

    if (loading) {
        return <p>Processing your order...</p>;
    }

    if (orderSuccess) {
        return (
            <div>
                <h2>Order Successful!</h2>
                <p>Your order number is: {orderNumber}</p>
                <button onClick={onGoToOrders}>View Orders</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.price.toFixed(2)} × {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: {totalPrice.toFixed(2)}</p>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Place Order</button>
                    </form>
                    <button onClick={onGoBack}>Back to Cart</button>
                </>
            )}
        </div>
    );
}

export default Checkout;
