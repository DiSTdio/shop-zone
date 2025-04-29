import React, { useState, useEffect } from "react";

function OrderHistory({ onGoBack }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // ✅ Load orders from localStorage
        const savedOrders = localStorage.getItem("orders");
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    }, []);

    const handleDeleteOrder = (orderId) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (!confirmed) return;

        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    return (
        <div className="order-history-container">
            <h2>📦 Your Orders</h2>
            {orders.length === 0 ? (
                <p>No past orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h3>🛒 Order #{order.orderNumber}</h3>
                            <p>📅 Placed on: <strong>{order.date || "Unknown Date"}</strong></p>
                            <ul>
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.name} - 💲{item.price.toFixed(2)} × {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> 💵 ${order.total}</p>
                            <button className="delete-order" onClick={() => handleDeleteOrder(order.id)}>❌ Delete Order</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={onGoBack}>🔙 Back to Shop</button>
        </div>
    );
}

export default OrderHistory;